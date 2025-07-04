import { defineStore } from 'pinia';
import { onAuthStateChanged, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { enableNetwork, disableNetwork, doc, updateDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { b as useNuxtApp } from './server.mjs';

const firebaseAuth = {
  // Sign in with email/password
  async signIn(email, password) {
    const { $firebase } = useNuxtApp();
    return await signInWithEmailAndPassword($firebase.auth, email, password);
  },
  // Create new user account
  async signUp(email, password, displayName) {
    const { $firebase } = useNuxtApp();
    const userCredential = await createUserWithEmailAndPassword($firebase.auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential;
  },
  // Sign in with Google
  async signInWithGoogle() {
    const { $firebase } = useNuxtApp();
    const provider = new GoogleAuthProvider();
    return await signInWithPopup($firebase.auth, provider);
  },
  // Sign out
  async signOut() {
    const { $firebase } = useNuxtApp();
    return await signOut($firebase.auth);
  },
  // Send password reset email
  async resetPassword(email) {
    const { $firebase } = useNuxtApp();
    return await sendPasswordResetEmail($firebase.auth, email);
  },
  // Get current user
  getCurrentUser() {
    const { $firebase } = useNuxtApp();
    return $firebase.auth.currentUser;
  },
  // Watch auth state changes
  onAuthStateChanged(callback) {
    const { $firebase } = useNuxtApp();
    return onAuthStateChanged($firebase.auth, callback);
  }
};
const firebaseDb = {
  // Create user profile
  async createUserProfile(userId, data) {
    const { $firebase } = useNuxtApp();
    const userRef = doc($firebase.firestore, "users", userId);
    return await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },
  // Get user profile
  async getUserProfile(userId) {
    const { $firebase } = useNuxtApp();
    const userRef = doc($firebase.firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null;
  },
  // Update user profile
  async updateUserProfile(userId, data) {
    const { $firebase } = useNuxtApp();
    const userRef = doc($firebase.firestore, "users", userId);
    return await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },
  // Enable offline persistence
  async enableOffline() {
    const { $firebase } = useNuxtApp();
    await disableNetwork($firebase.firestore);
  },
  // Disable offline persistence
  async disableOffline() {
    const { $firebase } = useNuxtApp();
    await enableNetwork($firebase.firestore);
  }
};
const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    profile: null,
    loading: true,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isOnboarded: (state) => {
      var _a2;
      var _a;
      return (_a2 = (_a = state.profile) == null ? void 0 : _a.onboardingCompleted) != null ? _a2 : false;
    },
    userRole: (state) => {
      var _a2;
      var _a;
      return (_a2 = (_a = state.profile) == null ? void 0 : _a.role) != null ? _a2 : null;
    },
    userId: (state) => {
      var _a2;
      var _a;
      return (_a2 = (_a = state.user) == null ? void 0 : _a.uid) != null ? _a2 : null;
    },
    userEmail: (state) => {
      var _a2, _b2;
      var _a, _b;
      return (_b2 = (_a2 = (_a = state.user) == null ? void 0 : _a.email) != null ? _a2 : (_b = state.profile) == null ? void 0 : _b.email) != null ? _b2 : null;
    },
    displayName: (state) => {
      var _a2, _b2;
      var _a, _b;
      return (_b2 = (_a2 = (_a = state.profile) == null ? void 0 : _a.displayName) != null ? _a2 : (_b = state.user) == null ? void 0 : _b.displayName) != null ? _b2 : "User";
    }
  },
  actions: {
    // Initialize auth listener
    async initializeAuth() {
      this.loading = true;
      return new Promise((resolve) => {
        firebaseAuth.onAuthStateChanged(async (user) => {
          this.user = user;
          if (user) {
            try {
              const profile = await firebaseDb.getUserProfile(user.uid);
              this.profile = profile;
            } catch (error) {
              console.error("Error fetching user profile:", error);
              this.error = "Failed to load user profile";
            }
          } else {
            this.profile = null;
          }
          this.loading = false;
          resolve();
        });
      });
    },
    // Sign up new user
    async signUp(email, password, name, role) {
      try {
        this.loading = true;
        this.error = null;
        const userCredential = await firebaseAuth.signUp(email, password, name);
        const profileData = {
          email,
          displayName: name,
          role,
          onboardingCompleted: false,
          preferences: {
            subjects: [],
            notifications: true
          }
        };
        await firebaseDb.createUserProfile(userCredential.user.uid, profileData);
        const profile = await firebaseDb.getUserProfile(userCredential.user.uid);
        this.profile = profile;
        return userCredential.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Sign in existing user
    async signIn(email, password) {
      try {
        this.loading = true;
        this.error = null;
        const userCredential = await firebaseAuth.signIn(email, password);
        return userCredential.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Sign in with Google
    async signInWithGoogle() {
      try {
        this.loading = true;
        this.error = null;
        const result = await firebaseAuth.signInWithGoogle();
        let profile = await firebaseDb.getUserProfile(result.user.uid);
        if (!profile) {
          const profileData = {
            email: result.user.email,
            displayName: result.user.displayName || "Google User",
            role: "student",
            // Default role
            photoURL: result.user.photoURL || void 0,
            onboardingCompleted: false,
            preferences: {
              subjects: [],
              notifications: true
            }
          };
          await firebaseDb.createUserProfile(result.user.uid, profileData);
          profile = await firebaseDb.getUserProfile(result.user.uid);
        }
        this.profile = profile;
        return result.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Sign out
    async signOut() {
      try {
        await firebaseAuth.signOut();
        this.user = null;
        this.profile = null;
        this.error = null;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },
    // Update user profile
    async updateProfile(updates) {
      if (!this.userId) throw new Error("No user logged in");
      try {
        this.loading = true;
        await firebaseDb.updateUserProfile(this.userId, updates);
        const profile = await firebaseDb.getUserProfile(this.userId);
        this.profile = profile;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Complete onboarding
    async completeOnboarding(preferences) {
      if (!this.userId) throw new Error("No user logged in");
      await this.updateProfile({
        onboardingCompleted: true,
        preferences
      });
    },
    // Reset password
    async resetPassword(email) {
      try {
        await firebaseAuth.resetPassword(email);
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    }
  }
});

export { firebaseAuth as f, useAuthStore as u };
//# sourceMappingURL=auth-Bugpmb1I.mjs.map
