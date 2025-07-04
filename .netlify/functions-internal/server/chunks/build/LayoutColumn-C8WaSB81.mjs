import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutColumn",
  __ssrInlineRender: true,
  props: {
    gap: { default: "md" },
    align: { default: "stretch" },
    justify: { default: "start" },
    reverse: { type: Boolean, default: false },
    flex: {}
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
    const columnClasses = computed(() => ({
      "column-reverse": props.reverse
    }));
    const columnStyles = computed(() => ({
      gap: gapValues[props.gap],
      alignItems: props.align,
      justifyContent: props.justify === "between" ? "space-between" : props.justify === "around" ? "space-around" : props.justify === "evenly" ? "space-evenly" : `flex-${props.justify}`,
      flex: props.flex !== void 0 ? props.flex : void 0
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["layout-column", unref(columnClasses)],
        style: unref(columnStyles)
      }, _attrs))} data-v-15ad2189>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutColumn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15ad2189"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=LayoutColumn-C8WaSB81.mjs.map
