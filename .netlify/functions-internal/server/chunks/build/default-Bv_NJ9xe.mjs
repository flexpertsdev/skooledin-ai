import { defineComponent, resolveComponent, mergeProps, useSSRContext } from 'vue';
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
        id: "navigation",
        label: "Navigation",
        to: "/demo/navigation"
      },
      {
        id: "overlays",
        label: "Overlays",
        to: "/demo/overlays"
      },
      {
        id: "content",
        label: "Content",
        to: "/demo/content"
      },
      {
        id: "layouts",
        label: "Layouts",
        to: "/demo/layouts"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = resolveComponent("NavBar");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-b7be3387>`);
      _push(ssrRenderComponent(_component_NavBar, {
        brand: "Nuxtplate",
        "nav-items": navItems,
        sticky: true,
        "collapse-on-scroll": true
      }, null, _parent));
      _push(`<main class="main-content" data-v-b7be3387>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7be3387"]]);

export { _default as default };
//# sourceMappingURL=default-Bv_NJ9xe.mjs.map
