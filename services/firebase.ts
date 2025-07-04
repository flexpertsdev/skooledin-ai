import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore'

// Auth helpers
export const firebaseAuth = {
  // Sign in with email/password
  async signIn(email: string, password: string) {
    const { $firebase } = useNuxtApp()
    return await signInWithEmailAndPassword($firebase.auth, email, password)
  },

  // Create new user account
  async signUp(email: string, password: string, displayName?: string) {
    const { $firebase } = useNuxtApp()
    const userCredential = await createUserWithEmailAndPassword($firebase.auth, email, password)
    
    if (displayName) {
      await updateProfile(userCredential.user, { displayName })
    }
    
    return userCredential
  },

  // Sign in with Google
  async signInWithGoogle() {
    const { $firebase } = useNuxtApp()
    const provider = new GoogleAuthProvider()
    return await signInWithPopup($firebase.auth, provider)
  },

  // Sign out
  async signOut() {
    const { $firebase } = useNuxtApp()
    return await signOut($firebase.auth)
  },

  // Send password reset email
  async resetPassword(email: string) {
    const { $firebase } = useNuxtApp()
    return await sendPasswordResetEmail($firebase.auth, email)
  },

  // Get current user
  getCurrentUser() {
    const { $firebase } = useNuxtApp()
    return $firebase.auth.currentUser
  },

  // Watch auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    const { $firebase } = useNuxtApp()
    return onAuthStateChanged($firebase.auth, callback)
  }
}

// Firestore helpers
export const firebaseDb = {
  // Create user profile
  async createUserProfile(userId: string, data: any) {
    const { $firebase } = useNuxtApp()
    const userRef = doc($firebase.firestore, 'users', userId)
    
    return await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  },

  // Get user profile
  async getUserProfile(userId: string) {
    const { $firebase } = useNuxtApp()
    const userRef = doc($firebase.firestore, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null
  },

  // Update user profile
  async updateUserProfile(userId: string, data: any) {
    const { $firebase } = useNuxtApp()
    const userRef = doc($firebase.firestore, 'users', userId)
    
    return await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    })
  },

  // Enable offline persistence
  async enableOffline() {
    const { $firebase } = useNuxtApp()
    await disableNetwork($firebase.firestore)
  },

  // Disable offline persistence
  async disableOffline() {
    const { $firebase } = useNuxtApp()
    await enableNetwork($firebase.firestore)
  }
}