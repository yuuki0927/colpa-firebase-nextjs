'use client'

import Link from 'next/link'

interface CompanyInfoCardProps {
  companyName: string
  address: string
  representative: string
  companyUrl: string
  messageUrl: string
  hasLogo: boolean
}

const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({
  companyName,
  address,
  representative,
  companyUrl,
  messageUrl,
  hasLogo,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border">
      <h2 className="text-lg font-bold">登録情報</h2>
      <div className="text-sm space-y-1">
        <p>企業名：{companyName}</p>
        <p>所在地：{address || 'まだ登録されていません'}</p>
        <p>代表者：{representative}</p>
        <p>企業URL：<a href={companyUrl} className="text-blue-600 underline" target="_blank">{companyUrl}</a></p>
        <p>メッセージ先URL：<a href={messageUrl} className="text-blue-600 underline" target="_blank">{messageUrl}</a></p>
        <p>登録企業ロゴ：{hasLogo ? '登録あり' : '未登録'}</p>
      </div>
      <Link href="/mypage/company-info" className="text-blue-600 text-sm font-semibold hover:underline">
        詳細を見る
      </Link>
    </div>
  )
}

export default CompanyInfoCard
