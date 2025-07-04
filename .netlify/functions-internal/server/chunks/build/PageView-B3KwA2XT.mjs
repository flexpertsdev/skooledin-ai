import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { u as useThrottleFn } from './index-C7HDIHE6.mjs';
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
  __name: "PageView",
  __ssrInlineRender: true,
  props: {
    pages: {},
    modelValue: { default: 0 },
    orientation: { default: "horizontal" },
    showIndicators: { type: Boolean, default: true },
    showArrows: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    threshold: { default: 50 },
    transitionDuration: { default: 300 },
    parallaxEffect: { type: Boolean, default: false },
    scaleEffect: { type: Boolean, default: false },
    fadeEffect: { type: Boolean, default: false },
    keyboard: { type: Boolean, default: true },
    mouseWheel: { type: Boolean, default: true },
    autoHeight: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change", "transitionStart", "transitionEnd"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pageViewRef = ref();
    ref();
    const currentIndex = ref(props.modelValue);
    const offset = ref(0);
    ref(false);
    const isTransitioning = ref(false);
    ref({ x: 0, y: 0 });
    ref({ x: 0, y: 0 });
    ref(0);
    ref(0);
    const isHorizontal = computed(() => props.orientation === "horizontal");
    const totalPages = computed(() => props.pages.length);
    const canGoPrevious = computed(() => props.loop || currentIndex.value > 0);
    const canGoNext = computed(() => props.loop || currentIndex.value < totalPages.value - 1);
    const containerStyle = computed(() => {
      const translate = isHorizontal.value ? `translateX(${-currentIndex.value * 100 + offset.value}%)` : `translateY(${-currentIndex.value * 100 + offset.value}%)`;
      return {
        transform: translate,
        transition: isTransitioning.value ? `transform ${props.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : "none",
        height: props.autoHeight && !isHorizontal.value ? "auto" : "100%"
      };
    });
    const getPageStyle = (index) => {
      const style = {};
      if (props.parallaxEffect && index !== currentIndex.value) {
        const diff = index - currentIndex.value;
        const parallaxOffset = diff * 20;
        style.transform = isHorizontal.value ? `translateX(${parallaxOffset}%)` : `translateY(${parallaxOffset}%)`;
      }
      if (props.scaleEffect && index !== currentIndex.value) {
        const scale = 0.9;
        style.transform = (style.transform || "") + ` scale(${scale})`;
      }
      if (props.fadeEffect) {
        style.opacity = index === currentIndex.value ? 1 : 0.3;
      }
      return style;
    };
    const goToPage = (index, animate = true) => {
      if (index === currentIndex.value) return;
      let targetIndex = index;
      if (props.loop) {
        if (index < 0) targetIndex = totalPages.value - 1;
        else if (index >= totalPages.value) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(totalPages.value - 1, index));
      }
      if (animate) {
        isTransitioning.value = true;
        emit("transitionStart", currentIndex.value, targetIndex);
      }
      currentIndex.value = targetIndex;
      offset.value = 0;
      emit("update:modelValue", targetIndex);
      emit("change", targetIndex);
      if (animate) {
        setTimeout(() => {
          isTransitioning.value = false;
          emit("transitionEnd", targetIndex);
        }, props.transitionDuration);
      }
    };
    const previousPage = () => goToPage(currentIndex.value - 1);
    const nextPage = () => goToPage(currentIndex.value + 1);
    useThrottleFn((e) => {
      if (!props.mouseWheel || isTransitioning.value) return;
      e.preventDefault();
      const delta = isHorizontal.value ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 30) {
        if (delta > 0) {
          nextPage();
        } else {
          previousPage();
        }
      }
    }, 100);
    watch(() => props.modelValue, (newValue) => {
      if (newValue !== currentIndex.value) {
        goToPage(newValue);
      }
    });
    __expose({
      nextPage,
      previousPage,
      goToPage,
      currentIndex: computed(() => currentIndex.value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "pageViewRef",
        ref: pageViewRef,
        class: ["page-view", [
          `page-view--${_ctx.orientation}`,
          isTransitioning.value && "page-view--transitioning"
        ]]
      }, _attrs))} data-v-62f8d7f1><div class="page-view__container" style="${ssrRenderStyle(containerStyle.value)}" data-v-62f8d7f1><!--[-->`);
      ssrRenderList(_ctx.pages, (page, index) => {
        _push(`<div class="${ssrRenderClass([{
          "page-view__page--active": index === currentIndex.value,
          "page-view__page--prev": index === currentIndex.value - 1,
          "page-view__page--next": index === currentIndex.value + 1
        }, "page-view__page"])}" style="${ssrRenderStyle(getPageStyle(index))}"${ssrRenderAttr("aria-hidden", index !== currentIndex.value)} data-v-62f8d7f1>`);
        ssrRenderSlot(_ctx.$slots, "page", {
          page,
          index,
          isActive: index === currentIndex.value
        }, () => {
          _push(`<div class="page-view__content" data-v-62f8d7f1>${ssrInterpolate(page)}</div>`);
        }, _push, _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (_ctx.showIndicators) {
        _push(`<div class="page-view__indicators" data-v-62f8d7f1><!--[-->`);
        ssrRenderList(_ctx.pages, (_, index) => {
          _push(`<span class="${ssrRenderClass([{ "page-view__indicator--active": index === currentIndex.value }, "page-view__indicator"])}" data-v-62f8d7f1></span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.showArrows) {
        _push(`<!--[-->`);
        if (canGoPrevious.value) {
          _push(`<button class="page-view__arrow page-view__arrow--prev"${ssrRenderAttr("aria-label", _ctx.orientation === "horizontal" ? "Previous page" : "Previous section")} data-v-62f8d7f1>`);
          ssrRenderSlot(_ctx.$slots, "prevArrow", {}, () => {
            _push(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-62f8d7f1><path d="M15 18l-6-6 6-6" data-v-62f8d7f1></path></svg>`);
          }, _push, _parent);
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        if (canGoNext.value) {
          _push(`<button class="page-view__arrow page-view__arrow--next"${ssrRenderAttr("aria-label", _ctx.orientation === "horizontal" ? "Next page" : "Next section")} data-v-62f8d7f1>`);
          ssrRenderSlot(_ctx.$slots, "nextArrow", {}, () => {
            _push(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-62f8d7f1><path d="M9 18l6-6-6-6" data-v-62f8d7f1></path></svg>`);
          }, _push, _parent);
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/PageView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PageView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62f8d7f1"]]);

export { PageView as default };
//# sourceMappingURL=PageView-B3KwA2XT.mjs.map
