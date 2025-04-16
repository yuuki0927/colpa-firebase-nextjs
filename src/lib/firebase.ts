// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCYX1spzLZA9BD3c91-x8GWSs9taYhR-80",
    authDomain: "colpa-firebase-shoji.firebaseapp.com",
    projectId: "colpa-firebase-shoji",
    storageBucket: "colpa-firebase-shoji.firebasestorage.app",
    messagingSenderId: "187071249932",
    appId: "1:187071249932:web:d877497cc560414f713829"
  };

// Firebase 初期化（複数回初期化されないように）
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
