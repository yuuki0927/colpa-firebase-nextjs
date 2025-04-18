'use client'

import { useAuthContext } from '@/components/auth/AuthContext'
import Dashboard from '@/components/dashboard/Dashboard'

export default function Mypage() {
  const { currentUser } = useAuthContext()

  if (currentUser === undefined) {
    return <div className="p-6">読み込み中...</div>
  }

  if (!currentUser) {
    return <div className="p-6">ログインしてください</div>
  }

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <Dashboard />
    </div>
  )
}
