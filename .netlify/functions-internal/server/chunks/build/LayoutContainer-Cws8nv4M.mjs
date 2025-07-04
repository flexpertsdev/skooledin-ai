import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutContainer",
  __ssrInlineRender: true,
  props: {
    fluid: { type: Boolean, default: false },
    maxWidth: { default: "xl" },
    padding: { type: [Boolean, String], default: true },
    center: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const maxWidthValues = {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      full: "100%"
    };
    const paddingValues = {
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      true: "var(--spacing-md)"
    };
    const containerClasses = computed(() => ({
      "container-fluid": props.fluid,
      "container-center": props.center && !props.fluid
    }));
    const containerStyles = computed(() => ({
      maxWidth: props.fluid ? "100%" : maxWidthValues[props.maxWidth],
      paddingLeft: props.padding ? typeof props.padding === "string" ? paddingValues[props.padding] : paddingValues.true : "0",
      paddingRight: props.padding ? typeof props.padding === "string" ? paddingValues[props.padding] : paddingValues.true : "0"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["layout-container", unref(containerClasses)],
        style: unref(containerStyles)
      }, _attrs))} data-v-99928a7e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutContainer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99928a7e"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=LayoutContainer-Cws8nv4M.mjs.map
