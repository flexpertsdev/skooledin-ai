import { defineComponent, ref, computed, watch, nextTick, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { u as useFocusTrap } from './useFocusTrap-D4TnBTVv.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    title: {},
    size: { default: "md" },
    persistent: { type: Boolean, default: false },
    showCloseButton: { type: Boolean, default: true },
    closeOnEscape: { type: Boolean, default: true },
    closeOnBackdrop: { type: Boolean, default: true },
    transition: { default: "scale" },
    centered: { type: Boolean, default: true },
    fullscreen: { type: Boolean, default: false },
    closeAriaLabel: { default: "Close modal" },
    maxWidth: {},
    maxHeight: {}
  },
  emits: ["update:modelValue", "open", "close", "after-open", "after-close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const modalRef = ref();
    const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
    const descriptionId = `modal-description-${Math.random().toString(36).substr(2, 9)}`;
    const sizeMap = {
      sm: "400px",
      md: "600px",
      lg: "800px",
      xl: "1000px",
      full: "100%"
    };
    const modalClasses = computed(() => ({
      [`modal-${props.size}`]: true,
      "modal-centered": props.centered,
      "modal-fullscreen": props.fullscreen
    }));
    const modalStyles = computed(() => ({
      maxWidth: props.maxWidth || (props.fullscreen ? "100%" : sizeMap[props.size]),
      maxHeight: props.maxHeight || (props.fullscreen ? "100%" : "90vh")
    }));
    computed(() => `modal-${props.transition}`);
    const { activate, deactivate } = useFocusTrap(modalRef, {
      immediate: false
    });
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        (void 0).body.style.overflow = "hidden";
        emit("open");
        nextTick(() => {
          var _a;
          (_a = modalRef.value) == null ? void 0 : _a.focus();
          activate();
          emit("after-open");
        });
      } else {
        (void 0).body.style.overflow = "";
        deactivate();
        nextTick(() => {
          emit("after-close");
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.modelValue) {
          _push2(`<div class="modal-wrapper" data-v-82f0a1ff><div class="${ssrRenderClass([unref(modalClasses), "modal"])}" style="${ssrRenderStyle(unref(modalStyles))}" role="dialog"${ssrRenderAttr("aria-modal", true)}${ssrRenderAttr("aria-labelledby", titleId)}${ssrRenderAttr("aria-describedby", descriptionId)} tabindex="-1" data-v-82f0a1ff>`);
          if (_ctx.$slots.header || _ctx.title) {
            _push2(`<div class="modal-header" data-v-82f0a1ff>`);
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(`<h2${ssrRenderAttr("id", titleId)} class="modal-title" data-v-82f0a1ff>${ssrInterpolate(_ctx.title)}</h2>`);
            }, _push2, _parent);
            if (_ctx.showCloseButton) {
              _push2(`<button class="modal-close"${ssrRenderAttr("aria-label", _ctx.closeAriaLabel)} type="button" data-v-82f0a1ff><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-82f0a1ff><path d="M18 6L6 18M6 6l12 12" data-v-82f0a1ff></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div${ssrRenderAttr("id", descriptionId)} class="modal-content" data-v-82f0a1ff>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (_ctx.$slots.footer) {
            _push2(`<div class="modal-footer" data-v-82f0a1ff>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
            _push2(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82f0a1ff"]]);

export { Modal as default };
//# sourceMappingURL=Modal-3vaVA3fi.mjs.map
