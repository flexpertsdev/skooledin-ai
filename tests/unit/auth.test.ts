import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { firebaseAuth, firebaseDb } from '~/services/firebase'

// Mock Firebase services
vi.mock('~/services/firebase', () => ({
  firebaseAuth: {
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
    getCurrentUser: vi.fn(),
    onAuthStateChanged: vi.fn()
  },
  firebaseDb: {
    createUserProfile: vi.fn(),
    getUserProfile: vi.fn(),
    updateUserProfile: vi.fn()
  }
}))

// Mock Nuxt app
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    $firebase: {
      auth: {},
      firestore: {}
    }
  })
}))

describe('Auth Store', () => {
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(authStore.user).toBe(null)
      expect(authStore.profile).toBe(null)
      expect(authStore.loading).toBe(true)
      expect(authStore.error).toBe(null)
    })

    it('should have correct getters when not authenticated', () => {
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.isOnboarded).toBe(false)
      expect(authStore.userRole).toBe(null)
      expect(authStore.userId).toBe(null)
      expect(authStore.userEmail).toBe(null)
      expect(authStore.displayName).toBe('User')
    })
  })

  describe('Sign Up', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User'
    }

    const mockProfile = {
      id: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'student' as const,
      onboardingCompleted: false,
      preferences: {
        subjects: [],
        notifications: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    it('should successfully sign up a new user', async () => {
      vi.mocked(firebaseAuth.signUp).mockResolvedValue({
        user: mockUser
      } as any)
      vi.mocked(firebaseDb.getUserProfile).mockResolvedValue(mockProfile)

      const result = await authStore.signUp(
        'test@example.com',
        'password123',
        'Test User',
        'student'
      )

      expect(firebaseAuth.signUp).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        'Test User'
      )
      expect(firebaseDb.createUserProfile).toHaveBeenCalledWith(
        'test-uid',
        {
          email: 'test@example.com',
          displayName: 'Test User',
          role: 'student',
          onboardingCompleted: false,
          preferences: {
            subjects: [],
            notifications: true
          }
        }
      )
      expect(authStore.profile).toEqual(mockProfile)
      expect(result).toEqual(mockUser)
    })

    it('should handle sign up errors', async () => {
      const error = new Error('Email already in use')
      vi.mocked(firebaseAuth.signUp).mockRejectedValue(error)

      await expect(
        authStore.signUp('test@example.com', 'password123', 'Test User', 'student')
      ).rejects.toThrow('Email already in use')

      expect(authStore.error).toBe('Email already in use')
      expect(authStore.loading).toBe(false)
    })
  })

  describe('Sign In', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com'
    }

    it('should successfully sign in an existing user', async () => {
      vi.mocked(firebaseAuth.signIn).mockResolvedValue({
        user: mockUser
      } as any)

      const result = await authStore.signIn('test@example.com', 'password123')

      expect(firebaseAuth.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      )
      expect(result).toEqual(mockUser)
      expect(authStore.loading).toBe(false)
    })

    it('should handle sign in errors', async () => {
      const error = new Error('Invalid credentials')
      vi.mocked(firebaseAuth.signIn).mockRejectedValue(error)

      await expect(
        authStore.signIn('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials')

      expect(authStore.error).toBe('Invalid credentials')
      expect(authStore.loading).toBe(false)
    })
  })

  describe('Google Sign In', () => {
    const mockGoogleUser = {
      uid: 'google-uid',
      email: 'google@example.com',
      displayName: 'Google User',
      photoURL: 'https://example.com/photo.jpg'
    }

    it('should sign in with Google and create profile for new user', async () => {
      vi.mocked(firebaseAuth.signInWithGoogle).mockResolvedValue({
        user: mockGoogleUser
      } as any)
      vi.mocked(firebaseDb.getUserProfile)
        .mockResolvedValueOnce(null) // First call returns null (new user)
        .mockResolvedValueOnce({
          id: 'google-uid',
          email: 'google@example.com',
          displayName: 'Google User',
          role: 'student',
          photoURL: 'https://example.com/photo.jpg',
          onboardingCompleted: false,
          preferences: {
            subjects: [],
            notifications: true
          }
        })

      const result = await authStore.signInWithGoogle()

      expect(firebaseAuth.signInWithGoogle).toHaveBeenCalled()
      expect(firebaseDb.createUserProfile).toHaveBeenCalledWith(
        'google-uid',
        expect.objectContaining({
          email: 'google@example.com',
          displayName: 'Google User',
          role: 'student',
          photoURL: 'https://example.com/photo.jpg'
        })
      )
      expect(result).toEqual(mockGoogleUser)
    })

    it('should sign in with Google for existing user', async () => {
      const existingProfile = {
        id: 'google-uid',
        email: 'google@example.com',
        displayName: 'Existing Google User',
        role: 'teacher' as const,
        onboardingCompleted: true
      }

      vi.mocked(firebaseAuth.signInWithGoogle).mockResolvedValue({
        user: mockGoogleUser
      } as any)
      vi.mocked(firebaseDb.getUserProfile).mockResolvedValue(existingProfile)

      await authStore.signInWithGoogle()

      expect(firebaseDb.createUserProfile).not.toHaveBeenCalled()
      expect(authStore.profile).toEqual(existingProfile)
    })
  })

  describe('Sign Out', () => {
    it('should sign out user and clear state', async () => {
      // Set up authenticated state
      authStore.$patch({
        user: { uid: 'test-uid' } as any,
        profile: { id: 'test-uid', email: 'test@example.com' } as any
      })

      await authStore.signOut()

      expect(firebaseAuth.signOut).toHaveBeenCalled()
      expect(authStore.user).toBe(null)
      expect(authStore.profile).toBe(null)
      expect(authStore.error).toBe(null)
    })
  })

  describe('Profile Updates', () => {
    beforeEach(() => {
      authStore.$patch({
        user: { uid: 'test-uid' } as any,
        profile: {
          id: 'test-uid',
          email: 'test@example.com',
          displayName: 'Test User',
          role: 'student',
          onboardingCompleted: false,
          preferences: {
            subjects: [],
            notifications: true
          }
        } as any
      })
    })

    it('should update user profile', async () => {
      const updates = {
        displayName: 'Updated Name',
        preferences: {
          subjects: ['Math', 'Science'],
          gradeLevel: '10th',
          notifications: false
        }
      }

      const updatedProfile = {
        ...authStore.profile,
        ...updates
      }

      vi.mocked(firebaseDb.updateUserProfile).mockResolvedValue(undefined)
      vi.mocked(firebaseDb.getUserProfile).mockResolvedValue(updatedProfile)

      await authStore.updateProfile(updates)

      expect(firebaseDb.updateUserProfile).toHaveBeenCalledWith(
        'test-uid',
        updates
      )
      expect(authStore.profile).toEqual(updatedProfile)
    })

    it('should complete onboarding', async () => {
      const preferences = {
        subjects: ['Math', 'English'],
        gradeLevel: '11th',
        learningStyle: 'visual',
        notifications: true
      }

      vi.mocked(firebaseDb.updateUserProfile).mockResolvedValue(undefined)
      vi.mocked(firebaseDb.getUserProfile).mockResolvedValue({
        ...authStore.profile,
        onboardingCompleted: true,
        preferences
      })

      await authStore.completeOnboarding(preferences)

      expect(firebaseDb.updateUserProfile).toHaveBeenCalledWith(
        'test-uid',
        {
          onboardingCompleted: true,
          preferences
        }
      )
      expect(authStore.profile?.onboardingCompleted).toBe(true)
    })

    it('should throw error when updating profile without user', async () => {
      authStore.$patch({ user: null })

      await expect(
        authStore.updateProfile({ displayName: 'Test' })
      ).rejects.toThrow('No user logged in')
    })
  })

  describe('Password Reset', () => {
    it('should send password reset email', async () => {
      await authStore.resetPassword('test@example.com')

      expect(firebaseAuth.resetPassword).toHaveBeenCalledWith('test@example.com')
    })

    it('should handle password reset errors', async () => {
      const error = new Error('User not found')
      vi.mocked(firebaseAuth.resetPassword).mockRejectedValue(error)

      await expect(
        authStore.resetPassword('nonexistent@example.com')
      ).rejects.toThrow('User not found')

      expect(authStore.error).toBe('User not found')
    })
  })

  describe('Auth State Listener', () => {
    it('should initialize auth listener and load user profile', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com'
      }

      const mockProfile = {
        id: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'student'
      }

      let authCallback: ((user: any) => void) | null = null

      vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((callback) => {
        authCallback = callback
        return () => {} // Return unsubscribe function
      })

      vi.mocked(firebaseDb.getUserProfile).mockResolvedValue(mockProfile)

      const initPromise = authStore.initializeAuth()

      // Simulate auth state change
      if (authCallback) {
        authCallback(mockUser)
      }

      await initPromise

      expect(authStore.user).toEqual(mockUser)
      expect(authStore.profile).toEqual(mockProfile)
      expect(authStore.loading).toBe(false)
    })

    it('should handle auth state change to null', async () => {
      let authCallback: ((user: any) => void) | null = null

      vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((callback) => {
        authCallback = callback
        return () => {}
      })

      authStore.$patch({
        user: { uid: 'test-uid' } as any,
        profile: { id: 'test-uid' } as any
      })

      const initPromise = authStore.initializeAuth()

      // Simulate sign out
      if (authCallback) {
        authCallback(null)
      }

      await initPromise

      expect(authStore.user).toBe(null)
      expect(authStore.profile).toBe(null)
      expect(authStore.loading).toBe(false)
    })
  })

  describe('Getters', () => {
    it('should return correct values when authenticated', () => {
      authStore.$patch({
        user: {
          uid: 'test-uid',
          email: 'user@example.com',
          displayName: 'Firebase User'
        } as any,
        profile: {
          id: 'test-uid',
          email: 'profile@example.com',
          displayName: 'Profile User',
          role: 'teacher',
          onboardingCompleted: true
        } as any
      })

      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.isOnboarded).toBe(true)
      expect(authStore.userRole).toBe('teacher')
      expect(authStore.userId).toBe('test-uid')
      expect(authStore.userEmail).toBe('user@example.com')
      expect(authStore.displayName).toBe('Profile User')
    })

    it('should fallback to user displayName when profile name is missing', () => {
      authStore.$patch({
        user: {
          displayName: 'Firebase User'
        } as any,
        profile: {
          displayName: null
        } as any
      })

      expect(authStore.displayName).toBe('Firebase User')
    })

    it('should use default name when both are missing', () => {
      authStore.$patch({
        user: { displayName: null } as any,
        profile: { displayName: null } as any
      })

      expect(authStore.displayName).toBe('User')
    })
  })
})