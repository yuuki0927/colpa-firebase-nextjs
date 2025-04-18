'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function StatusCard() {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h2 className="font-bold text-lg">進捗ステータス</h2>
        <ul className="text-sm space-y-1">
          <li>すべて：59件</li>
          <li>連絡中：4件</li>
          <li>商談予定：10件</li>
          <li>アツ🔥：3件</li>
          <li>成約：6件</li>
          <li>保留：17件</li>
          <li>NG：25件</li>
        </ul>
        <Button variant="outline" className="mt-2">詳細を見る</Button>
      </CardContent>
    </Card>
  )
}