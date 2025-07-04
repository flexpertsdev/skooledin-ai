import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutSafeArea",
  __ssrInlineRender: true,
  props: {
    top: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    all: { type: Boolean, default: false },
    minPadding: { default: "16px" }
  },
  setup(__props) {
    const props = __props;
    const safeAreaClasses = computed(() => ({
      "safe-area-all": props.all,
      "safe-area-top": props.top && !props.all,
      "safe-area-right": props.right && !props.all,
      "safe-area-bottom": props.bottom && !props.all,
      "safe-area-left": props.left && !props.all
    }));
    const safeAreaStyles = computed(() => {
      const minPad = props.minPadding;
      if (props.all) {
        return {
          paddingTop: `max(${minPad}, var(--safe-area-inset-top))`,
          paddingRight: `max(${minPad}, var(--safe-area-inset-right))`,
          paddingBottom: `max(${minPad}, var(--safe-area-inset-bottom))`,
          paddingLeft: `max(${minPad}, var(--safe-area-inset-left))`
        };
      }
      const styles = {};
      if (props.top) styles.paddingTop = `max(${minPad}, var(--safe-area-inset-top))`;
      if (props.right) styles.paddingRight = `max(${minPad}, var(--safe-area-inset-right))`;
      if (props.bottom) styles.paddingBottom = `max(${minPad}, var(--safe-area-inset-bottom))`;
      if (props.left) styles.paddingLeft = `max(${minPad}, var(--safe-area-inset-left))`;
      return styles;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["layout-safe-area", unref(safeAreaClasses)],
        style: unref(safeAreaStyles)
      }, _attrs))} data-v-a980f99b>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutSafeArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a980f99b"]]);
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
    const stackStyles = computed(() => ({
      "--stack-spacing": spacingValues[props.spacing],
      flexDirection: props.direction === "horizontal" ? "row" : "column",
      alignItems: props.align
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-stack",
        style: unref(stackStyles)
      }, _attrs))} data-v-53767af3>`);
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
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53767af3"]]);

export { __nuxt_component_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=LayoutStack-2FRHhzw9.mjs.map
