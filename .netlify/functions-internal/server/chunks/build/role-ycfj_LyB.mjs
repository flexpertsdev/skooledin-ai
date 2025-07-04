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

const role = defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) return;
  const roleRoutes = {
    student: ["/app/chat", "/app/notebook", "/app/study", "/app/progress"],
    teacher: ["/app/teacher", "/app/classes", "/app/content"],
    parent: ["/app/parent", "/app/children"],
    admin: ["/app/admin"]
  };
  const userRole = authStore.userRole;
  if (!userRole) return;
  if (userRole === "admin") return;
  const isRoleSpecificRoute = Object.entries(roleRoutes).some(([role2, routes]) => {
    return role2 !== userRole && routes.some((route) => to.path.startsWith(route));
  });
  if (isRoleSpecificRoute) {
    const dashboards = {
      student: "/app",
      teacher: "/app/teacher",
      parent: "/app/parent",
      admin: "/app/admin"
    };
    return navigateTo(dashboards[userRole]);
  }
});

export { role as default };
//# sourceMappingURL=role-ycfj_LyB.mjs.map
