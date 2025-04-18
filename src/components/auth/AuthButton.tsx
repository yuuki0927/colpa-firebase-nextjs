// src/components/auth/AuthButton.tsx
'use client'

import { useAuthContext } from '@/components/auth/AuthContext'

export default function AuthButton() {
  const { currentUser, logout } = useAuthContext()

  return (
    <button onClick={logout}>
      {currentUser ? 'ログアウト' : 'ログイン'}
    </button>
  )
}
