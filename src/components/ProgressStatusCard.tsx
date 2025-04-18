'use client'

import React from 'react'

const statuses = [
  { label: 'すべて', count: 59 },
  { label: '連絡中', count: 4 },
  { label: '商談予定', count: 10 },
  { label: 'アツ🔥', count: 3 },
  { label: '成約', count: 6 },
  { label: '保留', count: 17 },
  { label: 'NG', count: 25 },
]

export default function ProgressStatusCard() {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">進捗ステータス</h2>
      <ul className="space-y-1 text-sm">
        {statuses.map((status) => (
          <li key={status.label} className="flex justify-between">
            <span>{status.label}</span>
            <span className="font-semibold">{status.count}件</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-right">
        <a
          href="/mypage/status"
          className="text-sm text-blue-600 hover:underline"
        >
          詳細を見る
        </a>
      </div>
    </div>
  )
}
