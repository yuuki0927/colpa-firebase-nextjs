'use client'

import { useAuthContext } from '@/components/AuthContext'
import { useState } from 'react'

export default function CancelButton() {
  const { currentUser } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleCancel = async () => {
    if (!currentUser) {
      alert('ログインが必要です')
      return
    }

    if (!confirm('本当にサブスクリプションを解約しますか？')) return

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: currentUser.uid }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ サブスクリプションを解約しました')
      } else {
        console.error('❌ キャンセル失敗:', data.message)
        setMessage('❌ 解約に失敗しました')
      }
    } catch (err) {
      console.error('❌ 通信エラー:', err)
      setMessage('❌ 通信エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCancel}
        disabled={loading}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50"
      >
        {loading ? '解約中...' : 'サブスクリプションを解約する'}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </div>
  )
}
