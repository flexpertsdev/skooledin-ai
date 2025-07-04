import { f as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-Bugpmb1I.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'firebase/auth';
import 'firebase/firestore';

const auth = defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.loading) return;
  const protectedRoutes = ["/app"];
  const authRoutes = ["/auth/login", "/auth/signup"];
  const isProtectedRoute = protectedRoutes.some((route) => to.path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => to.path === route);
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
  if (isAuthRoute && authStore.isAuthenticated) {
    if (!authStore.isOnboarded) {
      return navigateTo("/onboarding");
    }
    return navigateTo("/app");
  }
  if (authStore.isAuthenticated && !authStore.isOnboarded && !to.path.startsWith("/onboarding")) {
    return navigateTo("/onboarding");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CCE6-7We.mjs.map
