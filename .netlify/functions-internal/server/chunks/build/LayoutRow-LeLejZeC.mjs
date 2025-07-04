import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { u as useResponsive } from './useResponsive-DKjduhWV.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutRow",
  __ssrInlineRender: true,
  props: {
    gap: { default: "md" },
    align: { default: "stretch" },
    justify: { default: "start" },
    wrap: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useResponsive();
    const gapValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const rowClasses = computed(() => ({
      "row-wrap": props.wrap,
      "row-reverse": props.reverse
    }));
    const rowStyles = computed(() => ({
      gap: gapValues[props.gap],
      alignItems: props.align,
      justifyContent: props.justify === "between" ? "space-between" : props.justify === "around" ? "space-around" : props.justify === "evenly" ? "space-evenly" : `flex-${props.justify}`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["layout-row", unref(rowClasses)],
        style: unref(rowStyles)
      }, _attrs))} data-v-b473e931>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutRow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b473e931"]]);

export { __nuxt_component_3 as _ };
//# sourceMappingURL=LayoutRow-LeLejZeC.mjs.map
