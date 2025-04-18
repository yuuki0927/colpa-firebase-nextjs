// src/app/layout.tsx
import './globals.css'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { AuthProvider } from '@/components/auth/AuthContext'

export const metadata = {
  title: '代理店募集サイト | COLPA',
  description: '業界最大級の代理店情報プラットフォーム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-black font-sans">
        <AuthProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto bg-white p-6">{children}</main>
              {/* Footer は後日 */}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
