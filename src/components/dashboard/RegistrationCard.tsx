'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function RegistrationCard() {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h2 className="font-bold text-lg">登録情報</h2>
        <ul className="text-sm space-y-1">
          <li>企業名：〇〇〇〇株式会社</li>
          <li>所在地：大阪府大阪市中央区難波4-6-10ザ・なんばタワー</li>
          <li>代表者：荘司悠樹</li>
          <li>企業URL：https://〇〇〇〇</li>
          <li>メッセージ先URL：https://公式ラインURLとか</li>
          <li>登録企業ロゴ：登録あり</li>
        </ul>
        <Button variant="outline" className="mt-2">詳細を見る</Button>
      </CardContent>
    </Card>
  )
}