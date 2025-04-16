import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

export async function POST(req: Request) {
  const buf = await req.arrayBuffer()
  const rawBody = Buffer.from(buf)
  const signature = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('❌ Webhook署名検証失敗:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // ✅ イベントの種類と全データログ
  console.log('🔥 Webhookイベント受信:', event.type)
  console.log('📄 event.data:', JSON.stringify(event.data, null, 2))

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const uid = session.metadata?.uid
    const priceId = session.metadata?.planId
    const customerId = session.customer as string

    console.log('📦 session情報:', { uid, priceId, customerId })

    const priceToPlanMap: Record<string, { plan: string; maxListings: number }> = {
      'price_1RDNwPGgbvYp6VwfFMfaf2so': { plan: 'plan_light', maxListings: 1 },
      'price_1RDNwkGgbvYp6VwfxzmHGQrL': { plan: 'plan_premium', maxListings: 2 },
      'price_1RDNx2GgbvYp6VwfhN71TqPr': { plan: 'plan_business', maxListings: 5 },
    }

    const mapped = priceToPlanMap[priceId ?? '']

    if (uid && mapped && customerId) {
      try {
        await updateDoc(doc(db, 'users', uid), {
          plan: mapped.plan,
          maxListings: mapped.maxListings,
          stripeCustomerId: customerId,
        })

        console.log('✅ Firestore 更新完了:', { uid, ...mapped })
      } catch (error) {
        console.error('❌ Firestore 更新失敗:', error)
      }
    } else {
      console.warn('⚠️ Firestore更新スキップ: 条件不足', { uid, priceId, customerId })
    }
  }

  return NextResponse.json({ received: true })
}
