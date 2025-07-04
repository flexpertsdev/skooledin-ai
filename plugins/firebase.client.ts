import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey || '',
    authDomain: config.public.firebaseAuthDomain || '',
    projectId: config.public.firebaseProjectId || '',
    storageBucket: config.public.firebaseStorageBucket || '',
    messagingSenderId: config.public.firebaseMessagingSenderId || '',
    appId: config.public.firebaseAppId || '',
    measurementId: config.public.firebaseMeasurementId || ''
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize services
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  
  // Initialize Analytics (only in production)
  let analytics = null
  if (process.client && !config.public.isDevelopment) {
    analytics = getAnalytics(app)
  }

  // Connect to emulators in development
  if (config.public.useFirebaseEmulator) {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(firestore, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost', 9199)
  }

  return {
    provide: {
      firebase: {
        app,
        auth,
        firestore,
        storage,
        analytics
      }
    }
  }
})