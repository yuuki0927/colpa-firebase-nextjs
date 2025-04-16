'use client'

import { useEffect, useState } from 'react'
import { useAuthContext } from '@/components/AuthContext'
import { db } from '@/lib/firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import PricingPlans from '@/components/PricingPlans'
import CancelButton from '@/components/CancelButton'
import CompanyForm from '@/components/CompanyForm'
import { prefectures } from '@/constants/prefectures'
import { FormData } from '@/types/listing'

export default function Mypage() {
  const { currentUser } = useAuthContext()

  // フックをトップで定義（順序保護）
  const [isCompany, setIsCompany] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingDocId, setEditingDocId] = useState<string | null>(null)
  const [canPost, setCanPost] = useState(false)
  const [userPlan, setUserPlan] = useState('')
  const [maxListings, setMaxListings] = useState<number | null>(null)

  const [form, setForm] = useState<FormData>({
    title: '',
    businessOverview: '',
    area: [],
    category: '',
    subCategory: '',
    initialCost: '',
    marginRate: '',
    contractPeriod: '',
    description: '',
    companyName: '',
    companyUrl: '',
    imageUrl: '',
  })

  // ✅ currentUserの状態によってuseEffect内部でガード
  useEffect(() => {
    if (currentUser === undefined || currentUser === null) return

    const fetchUserData = async () => {
      const userRef = doc(db, 'users', currentUser.uid)
      const userSnap = await getDoc(userRef)
      const userData = userSnap.data()

      if (userData?.type === 'company') {
        setIsCompany(true)
        setUserPlan(userData.plan || '')
        setMaxListings(userData.maxListings || 0)

        const q = query(collection(db, 'companies'), where('companyUid', '==', currentUser.uid))
        const snap = await getDocs(q)

        if (!snap.empty) {
          const docData = snap.docs[0]
          setEditingDocId(docData.id)
          setForm(docData.data() as FormData)
        }

        setCanPost(snap.size < (userData.maxListings || 0))
      }

      setLoading(false)
    }

    fetchUserData()
  }, [currentUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingDocId) {
        await updateDoc(doc(db, 'companies', editingDocId), { ...form })
        alert('案件を更新しました！')
      } else {
        await addDoc(collection(db, 'companies'), {
          ...form,
          companyUid: currentUser?.uid,
          createdAt: serverTimestamp(),
          viewCount: 0,
        })
        alert('投稿が完了しました！')
      }
    } catch (err) {
      console.error('保存に失敗:', err)
      alert('保存に失敗しました')
    }
  }

  // ✅ フック後に描画条件をガード
  if (loading || currentUser === undefined) {
    return <div className="p-6">読み込み中...</div>
  }

  if (!currentUser) {
    return <div className="p-6">ログインしてください</div>
  }

  if (!isCompany) {
    return <div className="p-6">企業ユーザーのみ投稿可能です</div>
  }

  if (!canPost && !editingDocId) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white text-black space-y-6">
        <div className="text-red-600 font-semibold">
          ご契約プランではこれ以上投稿できません。プランをアップグレードしてください。
        </div>
        <PricingPlans />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-black space-y-6">
      <div className="p-4 bg-gray-100 rounded shadow-sm text-sm space-y-2">
        <p>現在のプラン: <span className="font-bold">{userPlan}</span></p>
        <p>最大登録可能数: <span className="font-bold">{maxListings ?? '-'}</span> 件</p>
        {userPlan !== 'free' && <CancelButton />}
      </div>

      <CompanyForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editing={!!editingDocId}
        prefectures={prefectures}
      />
    </div>
  )
}
