import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    items: {},
    modelValue: { default: 0 },
    orientation: { default: "horizontal" },
    itemsToShow: { default: 1 },
    itemsToScroll: { default: 1 },
    gap: { default: 16 },
    autoplay: { type: Boolean, default: false },
    autoplayInterval: { default: 5e3 },
    loop: { type: Boolean, default: false },
    showIndicators: { type: Boolean, default: true },
    showControls: { type: Boolean, default: true },
    snapAlign: { default: "start" },
    freeScroll: { type: Boolean, default: false },
    momentum: { type: Boolean, default: true },
    rubberband: { type: Boolean, default: true },
    threshold: { default: 50 }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const carouselRef = ref();
    ref();
    ref();
    const currentIndex = ref(props.modelValue);
    const trackPosition = ref(0);
    const isDragging = ref(false);
    ref(0);
    const currentTranslate = ref(0);
    ref(0);
    ref();
    const slideWidth = ref(0);
    const slideHeight = ref(0);
    ref(0);
    ref(0);
    ref(0);
    ref(0);
    const isHorizontal = computed(() => props.orientation === "horizontal");
    const totalSlides = computed(() => props.items.length);
    const maxIndex = computed(() => Math.max(0, totalSlides.value - props.itemsToShow));
    const canGoPrevious = computed(() => props.loop || currentIndex.value > 0);
    const canGoNext = computed(() => props.loop || currentIndex.value < maxIndex.value);
    const viewportStyle = computed(() => ({
      gap: `${props.gap}px`,
      cursor: isDragging.value ? "grabbing" : "grab"
    }));
    const trackStyle = computed(() => {
      const position = isDragging.value ? currentTranslate.value : trackPosition.value;
      const transform = isHorizontal.value ? `translateX(${position}px)` : `translateY(${position}px)`;
      return {
        transform,
        transition: isDragging.value ? "none" : "transform 0.3s ease-out"
      };
    });
    const slideStyle = computed(() => {
      const dimension = isHorizontal.value ? "width" : "height";
      isHorizontal.value ? slideWidth.value : slideHeight.value;
      return {
        [dimension]: props.itemsToShow > 1 ? `${100 / props.itemsToShow}%` : "100%",
        flexShrink: 0
      };
    });
    const calculateTrackPosition = (index) => {
      const slideSize = isHorizontal.value ? slideWidth.value : slideHeight.value;
      const gap = props.gap;
      return -(index * (slideSize + gap));
    };
    const goTo = (index) => {
      if (!props.items || props.items.length === 0) return;
      let targetIndex = index;
      if (props.loop) {
        if (index < 0) targetIndex = totalSlides.value - 1;
        else if (index >= totalSlides.value) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(maxIndex.value, index));
      }
      if (targetIndex !== currentIndex.value) {
        currentIndex.value = targetIndex;
        trackPosition.value = calculateTrackPosition(targetIndex);
        emit("update:modelValue", targetIndex);
        emit("change", targetIndex);
      }
    };
    const previous = () => {
      goTo(currentIndex.value - props.itemsToScroll);
    };
    const next = () => {
      goTo(currentIndex.value + props.itemsToScroll);
    };
    let autoplayTimer = null;
    const startAutoplay = () => {
      if (!props.autoplay) return;
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        next();
      }, props.autoplayInterval);
    };
    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== currentIndex.value && newValue >= 0 && newValue < props.items.length) {
          goTo(newValue);
        }
      }
    );
    watch(
      () => props.autoplay,
      (newValue) => {
        if (newValue) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      }
    );
    __expose({
      next,
      previous,
      goTo
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "carouselRef",
        ref: carouselRef,
        class: ["carousel", [
          _ctx.orientation === "vertical" && "carousel--vertical",
          _ctx.showIndicators && "carousel--with-indicators",
          _ctx.showControls && "carousel--with-controls"
        ]]
      }, _attrs))} data-v-f4ddb85f>`);
      if (_ctx.showControls && canGoPrevious.value) {
        _push(`<button class="carousel__control carousel__control--prev"${ssrRenderAttr("aria-label", _ctx.orientation === "horizontal" ? "Previous slide" : "Previous item")} data-v-f4ddb85f>`);
        if (!_ctx.$slots.prevIcon) {
          _push(`<span data-v-f4ddb85f>${ssrInterpolate(_ctx.orientation === "horizontal" ? "\u2039" : "\u2191")}</span>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "prevIcon", {}, null, _push, _parent);
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="carousel__viewport" style="${ssrRenderStyle(viewportStyle.value)}" data-v-f4ddb85f><div class="carousel__track" style="${ssrRenderStyle(trackStyle.value)}" data-v-f4ddb85f><!--[-->`);
      ssrRenderList(_ctx.items, (item, index) => {
        _push(`<div class="${ssrRenderClass([{ "carousel__slide--active": index === currentIndex.value }, "carousel__slide"])}" style="${ssrRenderStyle(slideStyle.value)}"${ssrRenderAttr("aria-hidden", index !== currentIndex.value)} data-v-f4ddb85f>`);
        ssrRenderSlot(_ctx.$slots, "slide", {
          item,
          index
        }, () => {
          _push(`${ssrInterpolate(item)}`);
        }, _push, _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
      if (_ctx.showControls && canGoNext.value) {
        _push(`<button class="carousel__control carousel__control--next"${ssrRenderAttr("aria-label", _ctx.orientation === "horizontal" ? "Next slide" : "Next item")} data-v-f4ddb85f>`);
        if (!_ctx.$slots.nextIcon) {
          _push(`<span data-v-f4ddb85f>${ssrInterpolate(_ctx.orientation === "horizontal" ? "\u203A" : "\u2193")}</span>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "nextIcon", {}, null, _push, _parent);
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.showIndicators) {
        _push(`<div class="carousel__indicators" data-v-f4ddb85f><!--[-->`);
        ssrRenderList(_ctx.items, (_, index) => {
          _push(`<button class="${ssrRenderClass([{ "carousel__indicator--active": index === currentIndex.value }, "carousel__indicator"])}"${ssrRenderAttr("aria-label", `Go to slide ${index + 1}`)} data-v-f4ddb85f></button>`);
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Carousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4ddb85f"]]);

export { Carousel as default };
//# sourceMappingURL=Carousel-kJ8dnrbn.mjs.map
