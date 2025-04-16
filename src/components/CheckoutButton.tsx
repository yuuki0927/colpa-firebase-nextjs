'use client'

import { useAuthContext } from '@/components/AuthContext'
import { useState } from 'react'

type CheckoutButtonProps = {
  planId: string
}

export default function CheckoutButton({ planId }: CheckoutButtonProps) {
  const { currentUser } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('ログインが必要です')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          planId,
        }),
      })

      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error('❌ セッション作成失敗:', data.message)
        alert('決済ページの作成に失敗しました')
      }
    } catch (err) {
      console.error('❌ 通信エラー:', err)
      alert('通信エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
    >
      {loading ? 'リダイレクト中...' : 'プラン購入'}
    </button>
  )
}
