import { _ as __nuxt_component_0 } from './nuxt-link-D4SBA0xZ.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-layout" }, _attrs))} data-v-e8892b12><div class="auth-background" data-v-e8892b12><div class="auth-pattern" data-v-e8892b12></div></div><div class="auth-content" data-v-e8892b12><nav class="auth-nav" data-v-e8892b12>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "auth-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:school",
              class: "auth-brand-icon"
            }, null, _parent2, _scopeId));
            _push2(`<span class="auth-brand-text" data-v-e8892b12${_scopeId}>Skooledin AI</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:school",
                class: "auth-brand-icon"
              }),
              createVNode("span", { class: "auth-brand-text" }, "Skooledin AI")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><main class="auth-main" data-v-e8892b12>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="auth-footer" data-v-e8892b12><p class="auth-copyright" data-v-e8892b12> \xA9 ${ssrInterpolate(unref(currentYear))} Skooledin AI. All rights reserved. </p><div class="auth-links" data-v-e8892b12>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "auth-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms`);
          } else {
            return [
              createTextVNode("Terms")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="auth-link-separator" data-v-e8892b12>\xB7</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "auth-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="auth-link-separator" data-v-e8892b12>\xB7</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/help",
        class: "auth-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Help`);
          } else {
            return [
              createTextVNode("Help")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e8892b12"]]);

export { auth as default };
//# sourceMappingURL=auth-DUOSAOS7.mjs.map
