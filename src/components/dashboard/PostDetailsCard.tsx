'use client'

import Link from 'next/link'

interface PostDetailsCardProps {
  maxListings: number
  currentListings: number
  archivedListings: number
}

export function PostDetailsCard({
  maxListings,
  currentListings,
  archivedListings,
}: PostDetailsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border">
      <h2 className="text-lg font-bold">投稿詳細</h2>
      <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
        <p>最大投稿数：{maxListings}件</p>
        <p>現在の投稿数：{currentListings}件</p>
        <p>アーカイブ：{archivedListings}件</p>
      </div>
      <Link
        href="/mypage/posts"
        className="text-blue-600 text-sm font-semibold hover:underline"
      >
        詳細を見る
      </Link>
    </div>
  )
}
