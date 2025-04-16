// src/lib/getCompanyListings.ts
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export async function getCompanyListings() {
  const q = query(collection(db, 'companies'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}
