'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

type AuthContextType = {
  currentUser: User | null | undefined
}

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)

        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        // Firestoreにまだユーザーが登録されていなければ追加
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName || '',
            type: 'company', // 👈仮で "company" 固定！後で切替可能にします
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

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
