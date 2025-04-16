// src/app/search/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getCompanyListings } from '@/lib/getCompanyListings'

type Company = {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
}

export default function SearchPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const listings = await getCompanyListings()
      setCompanies(listings as Company[])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-6">読み込み中...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map(company => (
        <div key={company.id} className="border rounded-lg p-4 bg-white shadow">
          <img src={company.imageUrl} alt={company.title} className="w-full h-40 object-cover mb-2 rounded" />
          <h2 className="text-lg font-bold">{company.title}</h2>
          <p className="text-sm text-gray-600">{company.category}</p>
          <p className="mt-2 text-gray-700">{company.description}</p>
        </div>
      ))}
    </div>
  )
}
