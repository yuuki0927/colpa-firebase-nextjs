import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json()

    if (!uid) {
      return NextResponse.json({ message: 'uid が必要です' }, { status: 400 })
    }

    // Firestore からユーザー情報取得
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()

    if (!userData?.stripeCustomerId) {
      return NextResponse.json({ message: 'stripeCustomerId が登録されていません' }, { status: 400 })
    }

    // Stripe からサブスクリプション取得
    const subscriptions = await stripe.subscriptions.list({
      customer: userData.stripeCustomerId,
      status: 'active',
    })

    const activeSubscription = subscriptions.data.find((sub) => sub.status === 'active')

    if (!activeSubscription) {
      return NextResponse.json({ message: 'アクティブなサブスクリプションが見つかりません' }, { status: 400 })
    }

    // Stripe 上でキャンセル処理（即時）
    await stripe.subscriptions.cancel(activeSubscription.id)

    // Firestore のユーザーデータをリセット
    await updateDoc(userRef, {
      plan: '',
      maxListings: 0,
      stripeCustomerId: '', // 任意で残すならコメントアウト
    })

    return NextResponse.json({ message: 'サブスクリプションをキャンセルしました' })
  } catch (err: unknown) {
    const error = err as { message: string }
    console.error('❌ キャンセルエラー:', error.message)
    return NextResponse.json({ message: error.message || '不明なエラーが発生しました' }, { status: 500 })
  }
}
