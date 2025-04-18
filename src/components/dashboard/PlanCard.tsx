'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PlanCardProps {
  currentPlan: string
  maxListings: number
}

export function PlanCard({ currentPlan, maxListings }: PlanCardProps) {
  return (
    <Card className="bg-white shadow-md rounded-2xl p-4">
      <CardContent className="space-y-2">
        <h2 className="text-lg font-bold">現在のプラン</h2>
        <p>
          プラン名: <span className="font-semibold text-blue-600">{currentPlan}</span>
        </p>
        <p>
          投稿上限数: <span className="font-semibold text-blue-600">{maxListings}</span> 件
        </p>
        <div className="pt-2">
          <Link href="/mypage#plan">
            <Button variant="outline">プランを確認・変更する</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
