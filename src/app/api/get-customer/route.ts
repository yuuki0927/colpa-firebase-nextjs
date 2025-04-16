// src/app/api/get-customer/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

export async function POST(req: NextRequest) {
  try {
    const { customerId }: { customerId: string } = await req.json()

    if (!customerId) {
      return NextResponse.json({ message: 'customerId が必要です' }, { status: 400 })
    }

    const customer = await stripe.customers.retrieve(customerId)

    return NextResponse.json({ customer })
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ 顧客情報取得エラー:', err.message)
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      console.error('❌ 想定外のエラー:', err)
      return NextResponse.json({ message: '不明なエラーが発生しました' }, { status: 500 })
    }
  }
}
