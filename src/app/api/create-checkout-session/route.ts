// src/app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// ✅ Stripeインスタンス（型アサーション付き）
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

export async function POST(req: Request) {
  try {
    const { uid, planId, email }: { uid: string; planId: string; email: string } = await req.json()

    if (!uid || !planId || !email) {
      return NextResponse.json(
        { message: 'uid / planId / email のいずれかが不足しています' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      metadata: {
        uid,
        planId,
      },
      customer_email: email,
      success_url: 'http://localhost:3000/mypage?success=true',
      cancel_url: 'http://localhost:3000/mypage?canceled=true',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Checkout Session 作成エラー:', err.message)
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      console.error('❌ 想定外のエラー:', err)
      return NextResponse.json({ message: '不明なエラーが発生しました' }, { status: 500 })
    }
  }
}
