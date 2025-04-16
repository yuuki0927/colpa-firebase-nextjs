'use client'

import Link from 'next/link'
import AuthButton from './AuthButton'

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-red-500">
        COLPA
      </Link>
      <AuthButton />
    </header>
  )
}
