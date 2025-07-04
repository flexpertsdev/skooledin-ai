import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutAligned",
  __ssrInlineRender: true,
  props: {
    alignment: { default: "center" },
    inline: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const alignmentMap = {
      topLeft: { alignItems: "flex-start", justifyContent: "flex-start" },
      topCenter: { alignItems: "flex-start", justifyContent: "center" },
      topRight: { alignItems: "flex-start", justifyContent: "flex-end" },
      centerLeft: { alignItems: "center", justifyContent: "flex-start" },
      center: { alignItems: "center", justifyContent: "center" },
      centerRight: { alignItems: "center", justifyContent: "flex-end" },
      bottomLeft: { alignItems: "flex-end", justifyContent: "flex-start" },
      bottomCenter: { alignItems: "flex-end", justifyContent: "center" },
      bottomRight: { alignItems: "flex-end", justifyContent: "flex-end" }
    };
    const alignedStyles = computed(() => ({
      ...alignmentMap[props.alignment],
      display: props.inline ? "inline-flex" : "flex"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-aligned",
        style: unref(alignedStyles)
      }, _attrs))} data-v-3d20c040>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutAligned.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d20c040"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=LayoutAligned-BniTJagZ.mjs.map
