import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutExpanded",
  __ssrInlineRender: true,
  props: {
    flex: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const expandedStyles = computed(() => ({
      flex: props.flex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-expanded",
        style: unref(expandedStyles)
      }, _attrs))} data-v-cf247fb8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutExpanded.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf247fb8"]]);

export { __nuxt_component_4 as _ };
//# sourceMappingURL=LayoutExpanded-B2m_FVss.mjs.map
