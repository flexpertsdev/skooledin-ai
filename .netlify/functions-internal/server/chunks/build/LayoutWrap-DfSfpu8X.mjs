import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutWrap",
  __ssrInlineRender: true,
  props: {
    gap: { default: "md" },
    align: { default: "center" },
    justify: { default: "start" }
  },
  setup(__props) {
    const props = __props;
    const gapValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const wrapStyles = computed(() => ({
      gap: gapValues[props.gap],
      alignItems: props.align,
      justifyContent: props.justify === "between" ? "space-between" : props.justify === "around" ? "space-around" : props.justify === "evenly" ? "space-evenly" : `flex-${props.justify}`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-wrap",
        style: unref(wrapStyles)
      }, _attrs))} data-v-77e021eb>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutWrap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77e021eb"]]);

export { __nuxt_component_4 as _ };
//# sourceMappingURL=LayoutWrap-DfSfpu8X.mjs.map
