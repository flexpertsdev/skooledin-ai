import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D4SBA0xZ.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const currentContext = ref("Mathematics");
    const userName = ref("Student Name");
    const userAvatar = ref("");
    const bottomNavItems = [
      {
        id: "chat",
        label: "Chat",
        icon: "mdi:message-text",
        to: "/app/chat"
      },
      {
        id: "notebook",
        label: "Notebook",
        icon: "mdi:notebook",
        to: "/app/notebook"
      },
      {
        id: "study",
        label: "Study",
        icon: "mdi:school",
        to: "/app/study"
      },
      {
        id: "progress",
        label: "Progress",
        icon: "mdi:chart-line",
        to: "/app/progress"
      },
      {
        id: "settings",
        label: "Settings",
        icon: "mdi:cog",
        to: "/app/settings"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = resolveComponent("Icon");
      const _component_Avatar = resolveComponent("Avatar");
      const _component_BottomNav = resolveComponent("BottomNav");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-69e2de94><header class="app-header" data-v-69e2de94>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-content" data-v-69e2de94${_scopeId}><div class="header-left" data-v-69e2de94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/app",
              class: "app-logo"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "mdi:school",
                    class: "logo-icon"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="logo-text" data-v-69e2de94${_scopeId2}>Skooledin AI</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "mdi:school",
                      class: "logo-icon"
                    }),
                    createVNode("span", { class: "logo-text" }, "Skooledin AI")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="header-center" data-v-69e2de94${_scopeId}><button class="context-switcher" data-v-69e2de94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:book-open-variant",
              class: "context-icon"
            }, null, _parent2, _scopeId));
            _push2(`<span class="context-label" data-v-69e2de94${_scopeId}>${ssrInterpolate(unref(currentContext))}</span>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:chevron-down",
              class: "dropdown-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></div><div class="header-right" data-v-69e2de94${_scopeId}><button class="header-icon-btn" data-v-69e2de94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "mdi:bell" }, null, _parent2, _scopeId));
            _push2(`<span class="notification-badge" data-v-69e2de94${_scopeId}>3</span></button><button class="user-menu-btn" data-v-69e2de94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Avatar, {
              src: unref(userAvatar),
              name: unref(userName),
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(`</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "header-content" }, [
                createVNode("div", { class: "header-left" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/app",
                    class: "app-logo"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "mdi:school",
                        class: "logo-icon"
                      }),
                      createVNode("span", { class: "logo-text" }, "Skooledin AI")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "header-center" }, [
                  createVNode("button", { class: "context-switcher" }, [
                    createVNode(_component_Icon, {
                      name: "mdi:book-open-variant",
                      class: "context-icon"
                    }),
                    createVNode("span", { class: "context-label" }, toDisplayString(unref(currentContext)), 1),
                    createVNode(_component_Icon, {
                      name: "mdi:chevron-down",
                      class: "dropdown-icon"
                    })
                  ])
                ]),
                createVNode("div", { class: "header-right" }, [
                  createVNode("button", { class: "header-icon-btn" }, [
                    createVNode(_component_Icon, { name: "mdi:bell" }),
                    createVNode("span", { class: "notification-badge" }, "3")
                  ]),
                  createVNode("button", { class: "user-menu-btn" }, [
                    createVNode(_component_Avatar, {
                      src: unref(userAvatar),
                      name: unref(userName),
                      size: "sm"
                    }, null, 8, ["src", "name"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><main class="app-main" data-v-69e2de94>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_BottomNav, {
        items: bottomNavItems,
        class: "app-bottom-nav"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const app = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69e2de94"]]);

export { app as default };
//# sourceMappingURL=app-BK-FOHpN.mjs.map
