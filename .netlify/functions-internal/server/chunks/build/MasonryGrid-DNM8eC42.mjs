import { defineComponent, ref, computed, watch, mergeProps, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { a as useElementSize, b as useResizeObserver } from './index-Bun7oj4a.mjs';
import { u as useResponsive } from './useResponsive-DKjduhWV.mjs';
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
  __name: "MasonryGrid",
  __ssrInlineRender: true,
  props: {
    items: {},
    columns: { default: 3 },
    gap: { default: 16 },
    fillLastRow: { type: Boolean, default: false },
    animate: { type: Boolean, default: true },
    stagger: { default: 50 },
    observeImages: { type: Boolean, default: true }
  },
  emits: ["itemClick", "layoutComplete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const containerRef = ref();
    const itemHeights = ref(/* @__PURE__ */ new Map());
    const imagesLoaded = ref(/* @__PURE__ */ new Set());
    const { match } = useResponsive();
    const responsiveColumns = computed(() => {
      if (typeof props.columns === "number") {
        return props.columns;
      }
      return match(props.columns) || 3;
    });
    const { width: containerWidth } = useElementSize(containerRef);
    const columns = computed(() => {
      const cols = responsiveColumns.value;
      return Math.max(1, Math.min(cols, props.items.length));
    });
    const columnWidth = computed(() => {
      if (!containerWidth.value) return 0;
      const totalGap = props.gap * (columns.value - 1);
      return (containerWidth.value - totalGap) / columns.value;
    });
    const containerStyle = computed(() => ({
      "--masonry-columns": columns.value,
      "--masonry-gap": `${props.gap}px`,
      "--masonry-stagger": `${props.stagger}ms`
    }));
    const columnStyle = computed(() => ({
      width: `${columnWidth.value}px`,
      marginRight: `${props.gap}px`
    }));
    const columnItems = computed(() => {
      const cols = Array.from({ length: columns.value }, () => []);
      const heights = new Array(columns.value).fill(0);
      props.items.forEach((item, index) => {
        let shortestColumn = 0;
        let minHeight = heights[0];
        for (let i = 1; i < columns.value; i++) {
          if (heights[i] < minHeight) {
            minHeight = heights[i];
            shortestColumn = i;
          }
        }
        const itemWithIndex = { ...item, __originalIndex: index };
        cols[shortestColumn].push(itemWithIndex);
        const itemHeight = itemHeights.value.get(index) || 200;
        heights[shortestColumn] += itemHeight + props.gap;
      });
      if (props.fillLastRow) {
        const itemsInLastRow = props.items.length % columns.value;
        if (itemsInLastRow > 0 && itemsInLastRow < columns.value) {
          const lastRowStart = props.items.length - itemsInLastRow;
          const emptyColumns = columns.value - itemsInLastRow;
          for (let i = 0; i < emptyColumns; i++) {
            const columnIndex = itemsInLastRow + i;
            if (cols[columnIndex]) {
              cols[columnIndex].push({
                __placeholder: true,
                __originalIndex: lastRowStart + columnIndex
              });
            }
          }
        }
      }
      return cols;
    });
    const observeImages = () => {
      if (!props.observeImages || !containerRef.value) return;
      const images = containerRef.value.querySelectorAll("img");
      images.forEach((img, index) => {
        if (img.complete) {
          handleImageLoad(index);
        } else {
          img.addEventListener("load", () => handleImageLoad(index));
          img.addEventListener("error", () => handleImageLoad(index));
        }
      });
    };
    const handleImageLoad = (index) => {
      imagesLoaded.value.add(index);
      updateLayout();
    };
    const measureItems = async () => {
      await nextTick();
      if (!containerRef.value) return;
      const items = containerRef.value.querySelectorAll(".masonry-grid__item");
      items.forEach((item, index) => {
        const height = item.getBoundingClientRect().height;
        itemHeights.value.set(index, height);
      });
    };
    const updateLayout = async () => {
      await measureItems();
      emit("layoutComplete");
    };
    useResizeObserver(containerRef, () => {
      updateLayout();
    });
    watch(
      () => props.items,
      () => {
        itemHeights.value.clear();
        imagesLoaded.value.clear();
        updateLayout();
        observeImages();
      },
      { deep: true }
    );
    __expose({
      updateLayout,
      columns: computed(() => columns.value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: ["masonry-grid", [`masonry-grid--cols-${columns.value}`, _ctx.fillLastRow && "masonry-grid--fill-last"]],
        style: containerStyle.value
      }, _attrs))} data-v-773d2143><!--[-->`);
      ssrRenderList(columnItems.value, (column, columnIndex) => {
        _push(`<div class="masonry-grid__column" style="${ssrRenderStyle(columnStyle.value)}" data-v-773d2143><!--[-->`);
        ssrRenderList(column, (item, itemIndex) => {
          _push(`<div class="masonry-grid__item" style="${ssrRenderStyle({ marginBottom: `${_ctx.gap}px` })}" data-v-773d2143>`);
          ssrRenderSlot(_ctx.$slots, "default", {
            item,
            index: item.__originalIndex
          }, () => {
            _push(`${ssrInterpolate(item)}`);
          }, _push, _parent);
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/MasonryGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MasonryGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-773d2143"]]);

export { MasonryGrid as default };
//# sourceMappingURL=MasonryGrid-DNM8eC42.mjs.map
