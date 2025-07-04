import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutStack",
  __ssrInlineRender: true,
  props: {
    spacing: { default: "md" },
    direction: { default: "vertical" },
    align: { default: "stretch" },
    divider: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const spacingValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const stackStyles = computed(
      () => ({
        "--stack-spacing": spacingValues[props.spacing],
        flexDirection: props.direction === "horizontal" ? "row" : "column",
        alignItems: props.align
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-stack",
        style: unref(stackStyles)
      }, _attrs))} data-v-34ded344>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutStack.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34ded344"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=LayoutStack-BIvVaTu9.mjs.map
