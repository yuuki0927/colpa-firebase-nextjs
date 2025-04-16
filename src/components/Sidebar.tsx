// src/components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'トップ', href: '/' },
  { label: '検索', href: '/search' },
  { label: 'お気に入り', href: '/favorite' },
  { label: '履歴', href: '/history' },
  { label: 'マイページ', href: '/mypage' },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-48 bg-white border-r h-full p-4 space-y-2">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`block px-3 py-2 rounded ${
            pathname === href
              ? 'bg-red-100 text-red-600 font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {label}
        </Link>
      ))}
    </aside>
  )
}
