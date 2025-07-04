import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const navItems = [
      {
        id: "home",
        label: "Home",
        to: "/"
      },
      {
        id: "features",
        label: "Features",
        to: "/features"
      },
      {
        id: "about",
        label: "About",
        to: "/about"
      },
      {
        id: "login",
        label: "Login",
        to: "/auth/login"
      },
      {
        id: "signup",
        label: "Get Started",
        to: "/auth/signup",
        variant: "primary"
        // Make this a CTA button
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = resolveComponent("NavBar");
      const _component_LayoutContainer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-aafde574>`);
      _push(ssrRenderComponent(_component_NavBar, {
        brand: "Skooledin AI",
        "nav-items": navItems,
        sticky: true,
        "collapse-on-scroll": true
      }, null, _parent));
      _push(`<main class="main-content" data-v-aafde574>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="app-footer" data-v-aafde574>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="footer-content" data-v-aafde574${_scopeId}><p data-v-aafde574${_scopeId}>\xA9 2024 Skooledin AI. Learn Smarter with AI.</p></div>`);
          } else {
            return [
              createVNode("div", { class: "footer-content" }, [
                createVNode("p", null, "\xA9 2024 Skooledin AI. Learn Smarter with AI.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aafde574"]]);

export { _default as default };
//# sourceMappingURL=default-DNzC96-c.mjs.map
