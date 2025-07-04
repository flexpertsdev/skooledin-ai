import { defineComponent, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormField",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    error: {},
    hint: {},
    required: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = resolveComponent("Icon");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["form-field", { "form-field--error": _ctx.error }]
      }, _attrs))} data-v-b5fbe302>`);
      if (_ctx.label) {
        _push(`<label${ssrRenderAttr("for", _ctx.id)} class="form-field-label" data-v-b5fbe302>${ssrInterpolate(_ctx.label)} `);
        if (_ctx.required) {
          _push(`<span class="form-field-required" data-v-b5fbe302>*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-field-input" data-v-b5fbe302>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (_ctx.error) {
        _push(`<p class="form-field-error" data-v-b5fbe302>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle",
          class: "form-field-error-icon"
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.error)}</p>`);
      } else if (_ctx.hint) {
        _push(`<p class="form-field-hint" data-v-b5fbe302>${ssrInterpolate(_ctx.hint)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/FormField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5fbe302"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=FormField-Bpl71xcO.mjs.map
