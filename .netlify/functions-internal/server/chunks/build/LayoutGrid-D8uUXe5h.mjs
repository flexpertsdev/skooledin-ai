import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { u as useResponsive } from './useResponsive-se3uXWjp.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutGrid",
  __ssrInlineRender: true,
  props: {
    cols: { default: 1 },
    gap: { default: "md" },
    autoFit: { type: Boolean, default: false },
    minChildWidth: { default: "250px" }
  },
  setup(__props) {
    const props = __props;
    const { match } = useResponsive();
    const gapValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const currentCols = computed(() => {
      if (typeof props.cols === "object") {
        return match(props.cols) || 1;
      }
      return props.cols;
    });
    const gridGap = computed(() => {
      if (typeof props.gap === "string") {
        return gapValues[props.gap];
      }
      return {
        rowGap: props.gap.row ? gapValues[props.gap.row] : gapValues.md,
        columnGap: props.gap.col ? gapValues[props.gap.col] : gapValues.md
      };
    });
    const gridStyles = computed(() => {
      const gap = typeof gridGap.value === "string" ? { gap: gridGap.value } : { rowGap: gridGap.value.rowGap, columnGap: gridGap.value.columnGap };
      if (props.autoFit) {
        return {
          ...gap,
          gridTemplateColumns: `repeat(auto-fit, minmax(${props.minChildWidth}, 1fr))`
        };
      }
      const cols = currentCols.value;
      return {
        ...gap,
        gridTemplateColumns: cols === "auto" ? `repeat(auto-fill, minmax(${props.minChildWidth}, 1fr))` : `repeat(${cols}, 1fr)`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-grid",
        style: unref(gridStyles)
      }, _attrs))} data-v-93ce7de0>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93ce7de0"]]);

export { __nuxt_component_4 as _ };
//# sourceMappingURL=LayoutGrid-D8uUXe5h.mjs.map
