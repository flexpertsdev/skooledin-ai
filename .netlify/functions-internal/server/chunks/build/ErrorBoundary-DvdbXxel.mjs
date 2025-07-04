import { defineAsyncComponent, defineComponent, mergeProps, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const lazyComponent = (loader, options) => {
  var _a, _b, _c;
  return defineAsyncComponent({
    loader,
    loadingComponent: options == null ? void 0 : options.loadingComponent,
    errorComponent: options == null ? void 0 : options.errorComponent,
    delay: (_a = options == null ? void 0 : options.delay) != null ? _a : 200,
    timeout: (_b = options == null ? void 0 : options.timeout) != null ? _b : 3e4,
    suspensible: (_c = options == null ? void 0 : options.suspensible) != null ? _c : false,
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        retry();
      } else {
        console.error("Failed to load component:", error);
        fail();
      }
    }
  });
};
const lazyLoadOnVisible = (loader, options) => {
  {
    return defineAsyncComponent(loader);
  }
};
const createComponentLoader = (importFn, retries = 3, retryDelay = 1e3) => {
  return async () => {
    let lastError = null;
    for (let i = 0; i < retries; i++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error;
        console.warn(`Failed to load component (attempt ${i + 1}/${retries}):`, error);
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
    throw lastError;
  };
};
const preloadComponentsAsync = (components) => {
  return Promise.all(components.map((component) => component()));
};
const preloadRouteComponentsAsync = (routeName) => {
  const componentsMap = {
    "demo-overlays": [
      () => import('./Modal-3vaVA3fi.mjs'),
      () => import('./BottomSheet-BuIp15zi.mjs'),
      () => import('./Drawer-Du3uazel.mjs'),
      () => import('./ActionSheet-DhkTpjnR.mjs')
    ],
    "demo-carousel": [
      () => import('./Carousel-bP-UXiRo.mjs'),
      () => import('./PageView-B3KwA2XT.mjs'),
      () => import('./MasonryGrid-CD4pQcMp.mjs')
    ],
    "demo-forms": [
      () => import('./ChatInput-0aNE0c_S.mjs'),
      () => import('./BottomSheetSelect-DpuWeVAD.mjs'),
      () => import('./ChoiceButtons-CU6lBIeQ.mjs')
    ]
  };
  const components = componentsMap[routeName];
  if (components) {
    preloadComponentsAsync(components);
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LoadingSpinner",
  __ssrInlineRender: true,
  props: {
    size: { default: "md" },
    variant: { default: "primary" },
    text: {},
    progress: {}
  },
  setup(__props) {
    const props = __props;
    const spinnerSize = computed(() => {
      const sizes = {
        xs: "16px",
        sm: "24px",
        md: "32px",
        lg: "48px",
        xl: "64px"
      };
      return sizes[props.size];
    });
    const dashArray = computed(() => {
      const circumference = 2 * Math.PI * 20;
      return circumference;
    });
    const dashOffset = computed(() => {
      if (props.progress !== void 0) {
        const circumference = 2 * Math.PI * 20;
        return circumference - props.progress / 100 * circumference;
      }
      return 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["loading-spinner", [`loading-spinner--${_ctx.size}`, `loading-spinner--${_ctx.variant}`]]
      }, _attrs))} data-v-516129ae><div class="spinner" style="${ssrRenderStyle({ width: spinnerSize.value, height: spinnerSize.value })}" data-v-516129ae><svg viewBox="0 0 50 50" class="spinner-svg" data-v-516129ae><circle class="spinner-track" cx="25" cy="25" r="20" fill="none" stroke-width="5" data-v-516129ae></circle><circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="5"${ssrRenderAttr("stroke-dasharray", dashArray.value)}${ssrRenderAttr("stroke-dashoffset", dashOffset.value)} data-v-516129ae></circle></svg></div>`);
      if (_ctx.text) {
        _push(`<p class="loading-text" data-v-516129ae>${ssrInterpolate(_ctx.text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/LoadingSpinner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LoadingSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-516129ae"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ErrorBoundary",
  __ssrInlineRender: true,
  props: {
    error: {},
    title: {},
    message: {},
    variant: { default: "inline" },
    showDetails: { type: Boolean, default: false },
    onRetry: {},
    onReset: {},
    retryText: {},
    resetText: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["error-boundary", `error-boundary--${_ctx.variant}`]
      }, _attrs))} data-v-e9381861><div class="error-icon" data-v-e9381861><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e9381861><circle cx="12" cy="12" r="10" data-v-e9381861></circle><line x1="12" y1="8" x2="12" y2="12" data-v-e9381861></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-e9381861></line></svg></div><h3 class="error-title" data-v-e9381861>${ssrInterpolate(_ctx.title || "Oops! Something went wrong")}</h3><p class="error-message" data-v-e9381861>${ssrInterpolate(_ctx.message || ((_a = _ctx.error) == null ? void 0 : _a.message) || "An unexpected error occurred")}</p>`);
      if (_ctx.showDetails && _ctx.error) {
        _push(`<div class="error-details" data-v-e9381861><details data-v-e9381861><summary data-v-e9381861>Error details</summary><pre data-v-e9381861>${ssrInterpolate(_ctx.error.stack || _ctx.error)}</pre></details></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="error-actions" data-v-e9381861>`);
      if (_ctx.onRetry) {
        _push(`<button class="error-button error-button--primary" data-v-e9381861>${ssrInterpolate(_ctx.retryText || "Try Again")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.onReset) {
        _push(`<button class="error-button error-button--secondary" data-v-e9381861>${ssrInterpolate(_ctx.resetText || "Reset")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ErrorBoundary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ErrorBoundary = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9381861"]]);

export { ErrorBoundary as E, LoadingSpinner as L, lazyLoadOnVisible as a, createComponentLoader as c, lazyComponent as l, preloadRouteComponentsAsync as p };
//# sourceMappingURL=ErrorBoundary-DvdbXxel.mjs.map
