'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

type AuthContextType = {
  currentUser: User | null | undefined
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  logout: async () => {}, // 空の関数（初期値）
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)

        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName || '',
            type: 'company',
            createdAt: serverTimestamp(),
          })
          console.log('✅ Firestoreにユーザー情報を保存しました')
        }
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      console.log('👋 ログアウト成功')
    } catch (err) {
      console.error('❌ ログアウト失敗:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
