import { defineComponent, ref, watch, nextTick, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderVNode } from 'vue/server-renderer';
import { u as useResponsive } from './useResponsive-se3uXWjp.mjs';
import { u as useFocusTrap } from './useFocusTrap-D4TnBTVv.mjs';
import { _ as _export_sfc } from './server.mjs';
import './index-Bun7oj4a.mjs';
import './index-C7HDIHE6.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ActionSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    actions: {},
    title: {},
    description: {},
    showCancel: { type: Boolean, default: true },
    cancelLabel: { default: "Cancel" },
    persistent: { type: Boolean, default: false },
    ariaLabel: { default: "Action menu" }
  },
  emits: ["update:modelValue", "action", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const sheetRef = ref();
    const descriptionId = `action-sheet-desc-${Math.random().toString(36).substr(2, 9)}`;
    useResponsive();
    const { activate, deactivate } = useFocusTrap(sheetRef, {
      immediate: false
    });
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        (void 0).body.style.overflow = "hidden";
        nextTick(() => {
          var _a;
          (_a = sheetRef.value) == null ? void 0 : _a.focus();
          activate();
        });
      } else {
        (void 0).body.style.overflow = "";
        deactivate();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.modelValue) {
          _push2(`<div class="action-sheet-wrapper" data-v-8d5fa63c><div class="action-sheet-backdrop" data-v-8d5fa63c></div><div class="action-sheet" role="dialog"${ssrRenderAttr("aria-modal", true)}${ssrRenderAttr("aria-label", _ctx.ariaLabel)}${ssrRenderAttr("aria-describedby", descriptionId)} data-v-8d5fa63c>`);
          if (_ctx.title || _ctx.description) {
            _push2(`<div class="action-sheet-header" data-v-8d5fa63c>`);
            if (_ctx.title) {
              _push2(`<h3 class="action-sheet-title" data-v-8d5fa63c>${ssrInterpolate(_ctx.title)}</h3>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.description) {
              _push2(`<p${ssrRenderAttr("id", descriptionId)} class="action-sheet-description" data-v-8d5fa63c>${ssrInterpolate(_ctx.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="action-sheet-actions" data-v-8d5fa63c><!--[-->`);
          ssrRenderList(_ctx.actions, (action, index) => {
            var _a;
            _push2(`<button class="${ssrRenderClass([{
              "action-sheet-item-destructive": action.destructive,
              "action-sheet-item-disabled": action.disabled
            }, "action-sheet-item"])}"${ssrIncludeBooleanAttr(action.disabled) ? " disabled" : ""} type="button" data-v-8d5fa63c>`);
            if (action.icon) {
              _push2(`<span class="action-sheet-icon" data-v-8d5fa63c>`);
              if (typeof action.icon !== "string") {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(action.icon), null, null), _parent);
              } else {
                _push2(`<span data-v-8d5fa63c>${(_a = action.icon) != null ? _a : ""}</span>`);
              }
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="action-sheet-label" data-v-8d5fa63c>${ssrInterpolate(action.label)}</span></button>`);
          });
          _push2(`<!--]--></div>`);
          if (_ctx.showCancel) {
            _push2(`<div class="action-sheet-cancel" data-v-8d5fa63c><button class="action-sheet-item action-sheet-item-cancel" type="button" data-v-8d5fa63c>${ssrInterpolate(_ctx.cancelLabel)}</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay/ActionSheet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ActionSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d5fa63c"]]);

export { ActionSheet as default };
//# sourceMappingURL=ActionSheet-DhkTpjnR.mjs.map
