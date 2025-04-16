'use client'

import React from 'react'
import { FormData } from '@/types/listing'

type Props = {
  form: FormData
  setForm: React.Dispatch<React.SetStateAction<FormData>>
  handleSubmit: (e: React.FormEvent) => void
  editing: boolean
  prefectures: string[]
}

export default function CompanyForm({ form, setForm, handleSubmit, editing, prefectures }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">企業案件を{editing ? '編集' : '投稿'}する</h2>

      {/* 入力フィールド一覧 */}
      {[
        { label: 'タイトル', name: 'title' },
        { label: 'ビジネス概要', name: 'businessOverview' },
        { label: 'サービス概要（例: エステ）', name: 'subCategory' },
        { label: '初期費用', name: 'initialCost' },
        { label: 'マージン率', name: 'marginRate' },
        { label: '契約期間', name: 'contractPeriod' },
        { label: '会社名', name: 'companyName' },
        { label: '会社URL', name: 'companyUrl' },
        { label: '画像URL', name: 'imageUrl' },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
      ))}

      {/* カテゴリー */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリー（1つ選択）</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">-- 選択してください --</option>
          {[
            'IT・通信情報', '美容・健康', '生活・教育', '飲食・娯楽',
            '小売・流通', '保険・金融', '不動産・修理', '各種サービス',
          ].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* エリア（都道府県） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">エリア（複数選択可）</label>
        <div className="flex flex-wrap gap-3">
          {prefectures.map((region) => (
            <label key={region} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={region}
                checked={form.area.includes(region)}
                onChange={(e) => {
                  const value = e.target.value
                  setForm((prev) => ({
                    ...prev,
                    area: prev.area.includes(value)
                      ? prev.area.filter((v) => v !== value)
                      : [...prev.area, value],
                  }))
                }}
              />
              <span>{region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 詳細説明 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">詳細説明</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        {editing ? '更新する' : '投稿する'}
      </button>
    </form>
  )
}
