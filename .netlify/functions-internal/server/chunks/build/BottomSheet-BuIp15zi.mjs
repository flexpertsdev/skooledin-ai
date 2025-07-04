import { defineComponent, ref, computed, watch, nextTick, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "BottomSheet",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    snapPoints: { default: () => ["25%", "50%", "90%"] },
    defaultSnapPoint: { default: 1 },
    backdrop: { type: Boolean, default: true },
    persistent: { type: Boolean, default: false },
    showHandle: { type: Boolean, default: true },
    showCloseButton: { type: Boolean, default: true },
    swipeToClose: { type: Boolean, default: true },
    preventExpand: { type: Boolean, default: false },
    title: {},
    ariaLabel: { default: "Bottom sheet" },
    maxHeight: {}
  },
  emits: ["update:modelValue", "snap-point-change", "open", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sheetRef = ref();
    ref();
    const isDragging = ref(false);
    const isAnimating = ref(false);
    const currentSnapIndex = ref(props.defaultSnapPoint);
    ref(0);
    const currentY = ref(0);
    const sheetHeight = ref(0);
    const windowHeight = ref(0);
    ref(0);
    ref(0);
    ref(0);
    ref(0);
    const normalizedSnapPoints = computed(() => {
      return props.snapPoints.map((point) => {
        if (typeof point === "object") {
          return point;
        }
        return { height: point };
      });
    });
    const snapPointHeights = computed(() => {
      return normalizedSnapPoints.value.map((point) => {
        const height = point.height;
        if (typeof height === "string" && height.endsWith("%")) {
          return parseInt(height) / 100 * windowHeight.value;
        }
        return typeof height === "string" ? parseInt(height) : height;
      });
    });
    const currentSnapHeight = computed(() => {
      return snapPointHeights.value[currentSnapIndex.value] || snapPointHeights.value[0];
    });
    const sheetStyles = computed(() => {
      const translateY = isDragging.value ? windowHeight.value - sheetHeight.value + currentY.value : windowHeight.value - currentSnapHeight.value;
      return {
        transform: `translateY(${Math.max(0, translateY)}px)`,
        transition: isDragging.value ? "none" : "transform 0.3s var(--easing-decelerate)",
        maxHeight: props.maxHeight || "95vh"
      };
    });
    const backdropOpacity = computed(() => {
      if (!props.backdrop) return 0;
      const progress = currentSnapHeight.value / windowHeight.value;
      return Math.min(0.5, progress * 0.6);
    });
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        isAnimating.value = true;
        (void 0).body.style.overflow = "hidden";
        currentSnapIndex.value = props.defaultSnapPoint;
        emit("open");
        nextTick(() => {
          var _a;
          sheetHeight.value = ((_a = sheetRef.value) == null ? void 0 : _a.offsetHeight) || 0;
        });
      } else {
        (void 0).body.style.overflow = "";
        emit("close");
        setTimeout(() => {
          isAnimating.value = false;
        }, 300);
      }
    });
    const { activate, deactivate } = useFocusTrap(sheetRef, {
      immediate: false
    });
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        nextTick(() => activate());
      } else {
        deactivate();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.modelValue || unref(isAnimating)) {
          _push2(`<div class="bottom-sheet-wrapper" data-v-419512b9>`);
          if (_ctx.modelValue && _ctx.backdrop) {
            _push2(`<div class="bottom-sheet-backdrop" style="${ssrRenderStyle({ opacity: unref(backdropOpacity) })}" data-v-419512b9></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([{
            "bottom-sheet-dragging": unref(isDragging),
            "bottom-sheet-open": _ctx.modelValue
          }, "bottom-sheet"])}" style="${ssrRenderStyle(unref(sheetStyles))}" role="dialog"${ssrRenderAttr("aria-modal", true)}${ssrRenderAttr("aria-label", _ctx.ariaLabel)} data-v-419512b9>`);
          if (_ctx.showHandle) {
            _push2(`<div class="bottom-sheet-handle-container" data-v-419512b9><div class="bottom-sheet-handle" data-v-419512b9></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (_ctx.$slots.header || _ctx.title) {
            _push2(`<div class="bottom-sheet-header" data-v-419512b9>`);
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(`<h2 class="bottom-sheet-title" data-v-419512b9>${ssrInterpolate(_ctx.title)}</h2>`);
            }, _push2, _parent);
            if (_ctx.showCloseButton) {
              _push2(`<button class="bottom-sheet-close" aria-label="Close bottom sheet" data-v-419512b9><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-419512b9><path d="M18 6L6 18M6 6l12 12" data-v-419512b9></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="bottom-sheet-content" data-v-419512b9>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overlay/BottomSheet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BottomSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-419512b9"]]);

export { BottomSheet as default };
//# sourceMappingURL=BottomSheet-BuIp15zi.mjs.map
