import { defineComponent, ref, computed, watch, nextTick, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { c as useSwipe } from './index-Bun7oj4a.mjs';
import { u as useResponsive } from './useResponsive-DKjduhWV.mjs';
import { u as useFocusTrap } from './useFocusTrap-DjmPMxVY.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "Drawer",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    position: { default: "left" },
    size: { default: "md" },
    backdrop: { type: Boolean, default: true },
    persistent: { type: Boolean, default: false },
    showCloseButton: { type: Boolean, default: true },
    swipeToClose: { type: Boolean, default: true },
    title: {},
    ariaLabel: { default: "Drawer" },
    width: {},
    height: {}
  },
  emits: ["update:modelValue", "open", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const drawerRef = ref();
    const isAnimating = ref(false);
    const { isMobile } = useResponsive();
    const sizeMap = {
      sm: { width: "280px", height: "200px" },
      md: { width: "360px", height: "300px" },
      lg: { width: "480px", height: "400px" },
      xl: { width: "640px", height: "500px" },
      full: { width: "100%", height: "100%" }
    };
    const drawerClasses = computed(() => ({
      [`drawer-${props.position}`]: true,
      [`drawer-${props.size}`]: true,
      "drawer-mobile": isMobile.value
    }));
    const drawerStyles = computed(() => {
      const isHorizontal = props.position === "left" || props.position === "right";
      const dimension = isHorizontal ? "width" : "height";
      const sizeValue = props[dimension] || sizeMap[props.size][dimension];
      return {
        [dimension]: props.size === "full" ? "100%" : sizeValue
      };
    });
    const close = () => {
      emit("update:modelValue", false);
      emit("close");
    };
    watch(
      () => props.modelValue,
      (isOpen) => {
        if (isOpen) {
          isAnimating.value = true;
          (void 0).body.style.overflow = "hidden";
          emit("open");
        } else {
          (void 0).body.style.overflow = "";
          setTimeout(() => {
            isAnimating.value = false;
          }, 300);
        }
      }
    );
    if (props.swipeToClose && isMobile.value && drawerRef.value) {
      const { lengthX, lengthY, direction } = useSwipe(drawerRef, {
        threshold: 50,
        onSwipeEnd() {
          const horizontalSwipe = Math.abs(lengthX.value) > Math.abs(lengthY.value);
          const verticalSwipe = Math.abs(lengthY.value) > Math.abs(lengthX.value);
          if (props.position === "left" && direction.value === "left" && lengthX.value > 100 && horizontalSwipe || props.position === "right" && direction.value === "right" && lengthX.value > 100 && horizontalSwipe || props.position === "top" && direction.value === "up" && lengthY.value > 100 && verticalSwipe || props.position === "bottom" && direction.value === "down" && lengthY.value > 100 && verticalSwipe) {
            close();
          }
        }
      });
    }
    const { activate, deactivate } = useFocusTrap(drawerRef, {
      immediate: false
    });
    watch(
      () => props.modelValue,
      (isOpen) => {
        if (isOpen) {
          nextTick(() => {
            var _a;
            (_a = drawerRef.value) == null ? void 0 : _a.focus();
            activate();
          });
        } else {
          deactivate();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.modelValue || unref(isAnimating)) {
          _push2(`<div class="drawer-wrapper" data-v-3170097a>`);
          if (_ctx.modelValue && _ctx.backdrop) {
            _push2(`<div class="drawer-backdrop" data-v-3170097a></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.modelValue) {
            _push2(`<div class="${ssrRenderClass([unref(drawerClasses), "drawer"])}" style="${ssrRenderStyle(unref(drawerStyles))}" role="dialog"${ssrRenderAttr("aria-modal", true)}${ssrRenderAttr("aria-label", _ctx.ariaLabel)} data-v-3170097a>`);
            if (_ctx.$slots.header || _ctx.title) {
              _push2(`<div class="drawer-header" data-v-3170097a>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                _push2(`<h2 class="drawer-title" data-v-3170097a>${ssrInterpolate(_ctx.title)}</h2>`);
              }, _push2, _parent);
              if (_ctx.showCloseButton) {
                _push2(`<button class="drawer-close" aria-label="Close drawer" type="button" data-v-3170097a><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3170097a><path d="M18 6L6 18M6 6l12 12" data-v-3170097a></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="drawer-content" data-v-3170097a>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
            _push2(`</div>`);
            if (_ctx.$slots.footer) {
              _push2(`<div class="drawer-footer" data-v-3170097a>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay/Drawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3170097a"]]);

export { Drawer as default };
//# sourceMappingURL=Drawer-DKfNBKoQ.mjs.map
