import { defineComponent, ref, computed, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    position: { default: "bottom-right" },
    maxToasts: { default: 5 },
    duration: { default: 5e3 },
    closable: { type: Boolean, default: true },
    showProgress: { type: Boolean, default: true }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const toasts = ref([]);
    const timers = ref(/* @__PURE__ */ new Map());
    const progress = ref(/* @__PURE__ */ new Map());
    const visibleToasts = computed(() => {
      return toasts.value.slice(0, props.maxToasts);
    });
    const getDefaultIcon = (type) => {
      const icons = {
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
      };
      return type ? icons[type] : null;
    };
    const toastClasses = (toast) => ({
      [`toast-${toast.type || "info"}`]: true,
      "toast-clickable": !!toast.onClick
    });
    const getProgress = (id) => {
      return progress.value.get(id) || 0;
    };
    const addToast = (toast) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast = {
        id,
        type: "info",
        closable: props.closable,
        duration: props.duration,
        showProgress: props.showProgress,
        position: props.position,
        ...toast
      };
      toasts.value.unshift(newToast);
      if (newToast.duration && newToast.duration > 0) {
        startTimer(id, newToast.duration);
      }
      return id;
    };
    const removeToast = (id) => {
      const index = toasts.value.findIndex((t) => t.id === id);
      if (index > -1) {
        toasts.value.splice(index, 1);
        clearTimer(id);
      }
    };
    const startTimer = (id, duration) => {
      const timer = {
        startTime: Date.now(),
        remainingTime: duration
      };
      timer.intervalId = (void 0).setInterval(() => {
        const elapsed = Date.now() - timer.startTime;
        const remaining = Math.max(0, duration - elapsed);
        progress.value.set(id, (duration - remaining) / duration);
        if (remaining === 0) {
          removeToast(id);
        }
      }, 50);
      timers.value.set(id, timer);
    };
    const clearTimer = (id) => {
      const timer = timers.value.get(id);
      if (timer && timer.intervalId) {
        (void 0).clearInterval(timer.intervalId);
      }
      timers.value.delete(id);
      progress.value.delete(id);
    };
    __expose({
      show: addToast,
      remove: removeToast,
      clear: () => {
        toasts.value = [];
        timers.value.forEach((_, id) => clearTimer(id));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div${ssrRenderAttrs({
          name: "toast",
          class: ["toast-container", `toast-container-${_ctx.position}`]
        })} data-v-1b6a38bc>`);
        ssrRenderList(unref(visibleToasts), (toast) => {
          var _a, _b;
          _push2(`<div class="${ssrRenderClass([toastClasses(toast), "toast"])}" data-v-1b6a38bc>`);
          if (toast.icon || getDefaultIcon(toast.type)) {
            _push2(`<div class="toast-icon" data-v-1b6a38bc>`);
            if (toast.icon && typeof toast.icon !== "string") {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(toast.icon), null, null), _parent);
            } else if (toast.icon) {
              _push2(`<span data-v-1b6a38bc>${(_a = toast.icon) != null ? _a : ""}</span>`);
            } else {
              _push2(`<span data-v-1b6a38bc>${(_b = getDefaultIcon(toast.type)) != null ? _b : ""}</span>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="toast-content" data-v-1b6a38bc>`);
          if (toast.title) {
            _push2(`<h4 class="toast-title" data-v-1b6a38bc>${ssrInterpolate(toast.title)}</h4>`);
          } else {
            _push2(`<!---->`);
          }
          if (toast.description) {
            _push2(`<p class="toast-description" data-v-1b6a38bc>${ssrInterpolate(toast.description)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (toast.action || toast.closable) {
            _push2(`<div class="toast-actions" data-v-1b6a38bc>`);
            if (toast.action) {
              _push2(`<button class="toast-action" type="button" data-v-1b6a38bc>${ssrInterpolate(toast.action.label)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (toast.closable) {
              _push2(`<button class="toast-close" aria-label="Close notification" type="button" data-v-1b6a38bc><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-1b6a38bc><path d="M18 6L6 18M6 6l12 12" data-v-1b6a38bc></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (toast.duration && toast.showProgress) {
            _push2(`<div class="toast-progress" style="${ssrRenderStyle({ "--progress": getProgress(toast.id) })}" data-v-1b6a38bc></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        });
        _push2(`</div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Toast.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Toast = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b6a38bc"]]);

export { Toast as default };
//# sourceMappingURL=Toast-BUr59jFK.mjs.map
