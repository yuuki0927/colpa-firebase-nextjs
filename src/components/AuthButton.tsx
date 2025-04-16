'use client'

import { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('ログインに失敗しました:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('ログアウトに失敗しました:', error)
    }
  }

  if (loading) return null

  return (
    <div className="p-4">
      {user ? (
        <div className="text-center">
          <p className="mb-2">こんにちは、{user.displayName}</p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          Googleでログイン
        </button>
      )}
    </div>
  )
}
