import { f as defineNuxtRouteMiddleware, g as useRoute, n as navigateTo } from './server.mjs';
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

const onboarding = defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) return;
  if (useRoute().path.startsWith("/onboarding")) return;
  if (!authStore.isOnboarded) {
    return navigateTo("/onboarding");
  }
});

export { onboarding as default };
//# sourceMappingURL=onboarding-Bjh_ChEX.mjs.map
