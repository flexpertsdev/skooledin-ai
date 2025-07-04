import { defineStore } from 'pinia'
import type { User as FirebaseUser } from 'firebase/auth'
import { firebaseAuth, firebaseDb } from '~/services/firebase'

// User roles
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin'

// User profile interface
export interface UserProfile {
  id: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string
  onboardingCompleted: boolean
  preferences: {
    subjects: string[]
    gradeLevel?: string
    learningStyle?: string
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

// Auth state interface
interface AuthState {
  user: FirebaseUser | null
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    profile: null,
    loading: true,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isOnboarded: (state) => state.profile?.onboardingCompleted ?? false,
    userRole: (state) => state.profile?.role ?? null,
    userId: (state) => state.user?.uid ?? null,
    userEmail: (state) => state.user?.email ?? state.profile?.email ?? null,
    displayName: (state) => state.profile?.displayName ?? state.user?.displayName ?? 'User'
  },

  actions: {
    // Initialize auth listener
    async initializeAuth() {
      this.loading = true
      
      return new Promise<void>((resolve) => {
        firebaseAuth.onAuthStateChanged(async (user) => {
          this.user = user
          
          if (user) {
            // Fetch user profile
            try {
              const profile = await firebaseDb.getUserProfile(user.uid)
              this.profile = profile as UserProfile
            } catch (error) {
              console.error('Error fetching user profile:', error)
              this.error = 'Failed to load user profile'
            }
          } else {
            this.profile = null
          }
          
          this.loading = false
          resolve()
        })
      })
    },

    // Sign up new user
    async signUp(email: string, password: string, name: string, role: UserRole) {
      try {
        this.loading = true
        this.error = null

        // Create Firebase auth user
        const userCredential = await firebaseAuth.signUp(email, password, name)
        
        // Create user profile in Firestore
        const profileData = {
          email,
          displayName: name,
          role,
          onboardingCompleted: false,
          preferences: {
            subjects: [],
            notifications: true
          }
        }
        
        await firebaseDb.createUserProfile(userCredential.user.uid, profileData)
        
        // Fetch the created profile
        const profile = await firebaseDb.getUserProfile(userCredential.user.uid)
        this.profile = profile as UserProfile
        
        return userCredential.user
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Sign in existing user
    async signIn(email: string, password: string) {
      try {
        this.loading = true
        this.error = null

        const userCredential = await firebaseAuth.signIn(email, password)
        
        // Profile will be fetched by auth state listener
        return userCredential.user
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Sign in with Google
    async signInWithGoogle() {
      try {
        this.loading = true
        this.error = null

        const result = await firebaseAuth.signInWithGoogle()
        
        // Check if user profile exists
        let profile = await firebaseDb.getUserProfile(result.user.uid)
        
        // Create profile if new user
        if (!profile) {
          const profileData = {
            email: result.user.email!,
            displayName: result.user.displayName || 'Google User',
            role: 'student' as UserRole, // Default role
            photoURL: result.user.photoURL || undefined,
            onboardingCompleted: false,
            preferences: {
              subjects: [],
              notifications: true
            }
          }
          
          await firebaseDb.createUserProfile(result.user.uid, profileData)
          profile = await firebaseDb.getUserProfile(result.user.uid)
        }
        
        this.profile = profile as UserProfile
        return result.user
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Sign out
    async signOut() {
      try {
        await firebaseAuth.signOut()
        this.user = null
        this.profile = null
        this.error = null
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },

    // Update user profile
    async updateProfile(updates: Partial<UserProfile>) {
      if (!this.userId) throw new Error('No user logged in')
      
      try {
        this.loading = true
        await firebaseDb.updateUserProfile(this.userId, updates)
        
        // Refresh profile
        const profile = await firebaseDb.getUserProfile(this.userId)
        this.profile = profile as UserProfile
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Complete onboarding
    async completeOnboarding(preferences: UserProfile['preferences']) {
      if (!this.userId) throw new Error('No user logged in')
      
      await this.updateProfile({
        onboardingCompleted: true,
        preferences
      })
    },

    // Reset password
    async resetPassword(email: string) {
      try {
        await firebaseAuth.resetPassword(email)
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    }
  }
})