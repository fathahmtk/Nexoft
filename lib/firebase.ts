
/**
 * Simulated Firebase configuration.
 * In a production environment, you would use:
 * import { initializeApp } from 'firebase/app';
 * import { getFirestore } from 'firebase/firestore';
 */

export const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nexoft-agency.firebaseapp.com",
  projectId: "nexoft-agency",
  storageBucket: "nexoft-agency.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Mock Firestore implementation for the demo
export const db = {
  collection: (path: string) => ({
    add: async (data: any) => {
      console.log(`[Firebase] Added to ${path}:`, data);
      return { id: Math.random().toString(36).substr(2, 9) };
    }
  })
};

export const submitContactForm = async (data: any) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return await db.collection('contact_submissions').add({
    ...data,
    timestamp: new Date().toISOString()
  });
};
