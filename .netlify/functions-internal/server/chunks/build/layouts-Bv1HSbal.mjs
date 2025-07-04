import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './LayoutStack-2FRHhzw9.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-BlRRBH76.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-BNm3pCym.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import { _ as __nuxt_component_4$1 } from './LayoutGrid-D8uUXe5h.mjs';
import { _ as __nuxt_component_6 } from './LayoutAligned-okf6Pek7.mjs';
import './useResponsive-se3uXWjp.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LayoutColumn",
  __ssrInlineRender: true,
  props: {
    gap: { default: "md" },
    align: { default: "stretch" },
    justify: { default: "start" },
    reverse: { type: Boolean, default: false },
    flex: {}
  },
  setup(__props) {
    const props = __props;
    const gapValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const columnClasses = computed(() => ({
      "column-reverse": props.reverse
    }));
    const columnStyles = computed(() => ({
      gap: gapValues[props.gap],
      alignItems: props.align,
      justifyContent: props.justify === "between" ? "space-between" : props.justify === "around" ? "space-around" : props.justify === "evenly" ? "space-evenly" : `flex-${props.justify}`,
      flex: props.flex !== void 0 ? props.flex : void 0
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["layout-column", unref(columnClasses)],
        style: unref(columnStyles)
      }, _attrs))} data-v-9d345eef>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutColumn.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-9d345eef"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LayoutWrap",
  __ssrInlineRender: true,
  props: {
    gap: { default: "md" },
    align: { default: "center" },
    justify: { default: "start" }
  },
  setup(__props) {
    const props = __props;
    const gapValues = {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
      "2xl": "var(--spacing-2xl)",
      "3xl": "var(--spacing-3xl)"
    };
    const wrapStyles = computed(() => ({
      gap: gapValues[props.gap],
      alignItems: props.align,
      justifyContent: props.justify === "between" ? "space-between" : props.justify === "around" ? "space-around" : props.justify === "evenly" ? "space-evenly" : `flex-${props.justify}`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-wrap",
        style: unref(wrapStyles)
      }, _attrs))} data-v-0e80b1a2>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutWrap.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0e80b1a2"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LayoutExpanded",
  __ssrInlineRender: true,
  props: {
    flex: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const expandedStyles = computed(() => ({
      flex: props.flex
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-expanded",
        style: unref(expandedStyles)
      }, _attrs))} data-v-c779944f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LayoutExpanded.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c779944f"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "layouts",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Layout Primitives - Mobile-First Nuxt",
      meta: [
        { name: "description", content: "Demo of Flutter-inspired layout components for predictable UI composition" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_LayoutColumn = __nuxt_component_4;
      const _component_LayoutGrid = __nuxt_component_4$1;
      const _component_LayoutAligned = __nuxt_component_6;
      const _component_LayoutWrap = __nuxt_component_7;
      const _component_LayoutExpanded = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layouts-demo" }, _attrs))} data-v-6905c99b>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-header" data-v-6905c99b${_scopeId3}><h1 data-v-6905c99b${_scopeId3}>Layout Primitives</h1><p data-v-6905c99b${_scopeId3}>Flutter-inspired layout components for predictable UI composition</p></div><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutContainer</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Constrains content width and centers it horizontally</p><div class="demo-section demo-container" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}><p data-v-6905c99b${_scopeId4}>This content is constrained to a maximum width and centered</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-box" }, [
                                  createVNode("p", null, "This content is constrained to a maximum width and centered")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutRow</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Horizontal layout with flexible spacing and alignment</p><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Basic Row</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, { gap: "md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>Item 1</div><div class="demo-box" data-v-6905c99b${_scopeId4}>Item 2</div><div class="demo-box" data-v-6905c99b${_scopeId4}>Item 3</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-box" }, "Item 1"),
                                createVNode("div", { class: "demo-box" }, "Item 2"),
                                createVNode("div", { class: "demo-box" }, "Item 3")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Flexible Items</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, { gap: "md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" style="${ssrRenderStyle({ "flex": "1" })}" data-v-6905c99b${_scopeId4}>Flex: 1</div><div class="demo-box" style="${ssrRenderStyle({ "flex": "2" })}" data-v-6905c99b${_scopeId4}>Flex: 2</div><div class="demo-box" style="${ssrRenderStyle({ "flex": "1" })}" data-v-6905c99b${_scopeId4}>Flex: 1</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "1" }
                                }, "Flex: 1"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "2" }
                                }, "Flex: 2"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "1" }
                                }, "Flex: 1")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Alignment Options</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          align: "center",
                          style: { "height": "100px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" style="${ssrRenderStyle({ "height": "40px" })}" data-v-6905c99b${_scopeId4}>Short</div><div class="demo-box" style="${ssrRenderStyle({ "height": "80px" })}" data-v-6905c99b${_scopeId4}>Tall</div><div class="demo-box" style="${ssrRenderStyle({ "height": "60px" })}" data-v-6905c99b${_scopeId4}>Medium</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "40px" }
                                }, "Short"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "80px" }
                                }, "Tall"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "60px" }
                                }, "Medium")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutColumn</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Vertical layout with consistent spacing</p><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutColumn, { gap: "md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>First Item</div><div class="demo-box" data-v-6905c99b${_scopeId4}>Second Item</div><div class="demo-box" data-v-6905c99b${_scopeId4}>Third Item</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-box" }, "First Item"),
                                createVNode("div", { class: "demo-box" }, "Second Item"),
                                createVNode("div", { class: "demo-box" }, "Third Item")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutGrid</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Responsive grid system with multiple layout options</p><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Fixed Columns</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: 3,
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(6, (i) => {
                                _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>${ssrInterpolate(i)}</div>`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                  return createVNode("div", {
                                    key: `fixed-${i}`,
                                    class: "demo-box"
                                  }, toDisplayString(i), 1);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Responsive Columns</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: { mobile: 1, tablet: 2, laptop: 3, desktop: 4 },
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(8, (i) => {
                                _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>${ssrInterpolate(i)}</div>`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                  return createVNode("div", {
                                    key: `responsive-${i}`,
                                    class: "demo-box"
                                  }, toDisplayString(i), 1);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div><div class="demo-subsection" data-v-6905c99b${_scopeId3}><h3 data-v-6905c99b${_scopeId3}>Auto-fit Grid</h3><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          "auto-fit": true,
                          "min-child-width": "200px",
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(5, (i) => {
                                _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}> Auto ${ssrInterpolate(i)}</div>`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("div", {
                                    key: `autofit-${i}`,
                                    class: "demo-box"
                                  }, " Auto " + toDisplayString(i), 1);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutStack</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Overlapping layout for creating depth and layered UIs</p><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutStack, { style: { "height": "200px" } }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="stack-layer stack-layer-1" data-v-6905c99b${_scopeId4}>Background Layer</div><div class="stack-layer stack-layer-2" data-v-6905c99b${_scopeId4}>Middle Layer</div><div class="stack-layer stack-layer-3" data-v-6905c99b${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_LayoutAligned, { alignment: "topRight" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="stack-badge" data-v-6905c99b${_scopeId5}>Top Layer</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "stack-badge" }, "Top Layer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "stack-layer stack-layer-1" }, "Background Layer"),
                                createVNode("div", { class: "stack-layer stack-layer-2" }, "Middle Layer"),
                                createVNode("div", { class: "stack-layer stack-layer-3" }, [
                                  createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "stack-badge" }, "Top Layer")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutWrap</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Wrapping layout that flows items to new rows</p><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutWrap, { gap: "md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(10, (i) => {
                                _push5(`<div class="demo-chip" data-v-6905c99b${_scopeId4}> Tag ${ssrInterpolate(i)}</div>`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                                  return createVNode("div", {
                                    key: `wrap-${i}`,
                                    class: "demo-chip"
                                  }, " Tag " + toDisplayString(i), 1);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutExpanded</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Expands child to fill available space</p><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          style: { "height": "100px" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>Fixed</div>`);
                              _push5(ssrRenderComponent(_component_LayoutExpanded, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="demo-box demo-expanded" data-v-6905c99b${_scopeId5}>Expanded to fill</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "demo-box demo-expanded" }, "Expanded to fill")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}>Fixed</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-box" }, "Fixed"),
                                createVNode(_component_LayoutExpanded, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "demo-box demo-expanded" }, "Expanded to fill")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "demo-box" }, "Fixed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutAligned</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Positions content within its parent</p><div class="demo-section" style="${ssrRenderStyle({ "height": "300px", "position": "relative" })}" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "topLeft" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Top Left</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Top Left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "topCenter" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Top Center</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Top Center")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "topRight" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Top Right</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Top Right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "centerLeft" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Center Left</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Center Left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box aligned-box-center" data-v-6905c99b${_scopeId4}>Center</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box aligned-box-center" }, "Center")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "centerRight" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Center Right</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Center Right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "bottomLeft" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Bottom Left</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Bottom Left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "bottomCenter" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Bottom Center</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Bottom Center")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "bottomRight" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="aligned-box" data-v-6905c99b${_scopeId4}>Bottom Right</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "aligned-box" }, "Bottom Right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>LayoutSafeArea</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Ensures content avoids device notches and system UI</p><div class="demo-section demo-safe-area" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutSafeArea, { all: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-box" data-v-6905c99b${_scopeId4}><p data-v-6905c99b${_scopeId4}>This content respects safe area insets on devices with notches or rounded corners</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-box" }, [
                                  createVNode("p", null, "This content respects safe area insets on devices with notches or rounded corners")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-6905c99b${_scopeId3}><h2 data-v-6905c99b${_scopeId3}>Complex Layout Example</h2><p class="section-description" data-v-6905c99b${_scopeId3}>Combining multiple layout primitives</p><div class="demo-section" data-v-6905c99b${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_LayoutColumn, { gap: "lg" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_LayoutRow, {
                                      gap: "md",
                                      wrap: true
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_LayoutExpanded, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="complex-card" data-v-6905c99b${_scopeId7}><h4 data-v-6905c99b${_scopeId7}>Main Content</h4><p data-v-6905c99b${_scopeId7}>This card expands to fill available space</p></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "complex-card" }, [
                                                    createVNode("h4", null, "Main Content"),
                                                    createVNode("p", null, "This card expands to fill available space")
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`<div class="complex-sidebar" data-v-6905c99b${_scopeId6}><h4 data-v-6905c99b${_scopeId6}>Sidebar</h4>`);
                                          _push7(ssrRenderComponent(_component_LayoutColumn, { gap: "sm" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="sidebar-item" data-v-6905c99b${_scopeId7}>Item 1</div><div class="sidebar-item" data-v-6905c99b${_scopeId7}>Item 2</div><div class="sidebar-item" data-v-6905c99b${_scopeId7}>Item 3</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                                  createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                                  createVNode("div", { class: "sidebar-item" }, "Item 3")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode(_component_LayoutExpanded, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "complex-card" }, [
                                                  createVNode("h4", null, "Main Content"),
                                                  createVNode("p", null, "This card expands to fill available space")
                                                ])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "complex-sidebar" }, [
                                              createVNode("h4", null, "Sidebar"),
                                              createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                                  createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                                  createVNode("div", { class: "sidebar-item" }, "Item 3")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_LayoutGrid, {
                                      cols: { mobile: 2, tablet: 4 },
                                      gap: "md"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(4, (i) => {
                                            _push7(`<div class="stat-card" data-v-6905c99b${_scopeId6}><div class="stat-value" data-v-6905c99b${_scopeId6}>${ssrInterpolate(25 * i)}%</div><div class="stat-label" data-v-6905c99b${_scopeId6}>Metric ${ssrInterpolate(i)}</div></div>`);
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                              return createVNode("div", {
                                                key: `stat-${i}`,
                                                class: "stat-card"
                                              }, [
                                                createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                                createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                              ]);
                                            }), 64))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_LayoutRow, {
                                        gap: "md",
                                        wrap: true
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_LayoutExpanded, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "complex-card" }, [
                                                createVNode("h4", null, "Main Content"),
                                                createVNode("p", null, "This card expands to fill available space")
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "complex-sidebar" }, [
                                            createVNode("h4", null, "Sidebar"),
                                            createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                                createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                                createVNode("div", { class: "sidebar-item" }, "Item 3")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_LayoutGrid, {
                                        cols: { mobile: 2, tablet: 4 },
                                        gap: "md"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                            return createVNode("div", {
                                              key: `stat-${i}`,
                                              class: "stat-card"
                                            }, [
                                              createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                              createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                            ]);
                                          }), 64))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_LayoutColumn, { gap: "lg" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_LayoutRow, {
                                      gap: "md",
                                      wrap: true
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_LayoutExpanded, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "complex-card" }, [
                                              createVNode("h4", null, "Main Content"),
                                              createVNode("p", null, "This card expands to fill available space")
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "complex-sidebar" }, [
                                          createVNode("h4", null, "Sidebar"),
                                          createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                              createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                              createVNode("div", { class: "sidebar-item" }, "Item 3")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_LayoutGrid, {
                                      cols: { mobile: 2, tablet: 4 },
                                      gap: "md"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                          return createVNode("div", {
                                            key: `stat-${i}`,
                                            class: "stat-card"
                                          }, [
                                            createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                            createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                          ]);
                                        }), 64))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-header" }, [
                            createVNode("h1", null, "Layout Primitives"),
                            createVNode("p", null, "Flutter-inspired layout components for predictable UI composition")
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutContainer"),
                            createVNode("p", { class: "section-description" }, "Constrains content width and centers it horizontally"),
                            createVNode("div", { class: "demo-section demo-container" }, [
                              createVNode(_component_LayoutContainer, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box" }, [
                                    createVNode("p", null, "This content is constrained to a maximum width and centered")
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutRow"),
                            createVNode("p", { class: "section-description" }, "Horizontal layout with flexible spacing and alignment"),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Basic Row"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutRow, { gap: "md" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "demo-box" }, "Item 1"),
                                    createVNode("div", { class: "demo-box" }, "Item 2"),
                                    createVNode("div", { class: "demo-box" }, "Item 3")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Flexible Items"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutRow, { gap: "md" }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "1" }
                                    }, "Flex: 1"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "2" }
                                    }, "Flex: 2"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "1" }
                                    }, "Flex: 1")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Alignment Options"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutRow, {
                                  gap: "md",
                                  align: "center",
                                  style: { "height": "100px" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "height": "40px" }
                                    }, "Short"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "height": "80px" }
                                    }, "Tall"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "height": "60px" }
                                    }, "Medium")
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutColumn"),
                            createVNode("p", { class: "section-description" }, "Vertical layout with consistent spacing"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutColumn, { gap: "md" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box" }, "First Item"),
                                  createVNode("div", { class: "demo-box" }, "Second Item"),
                                  createVNode("div", { class: "demo-box" }, "Third Item")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutGrid"),
                            createVNode("p", { class: "section-description" }, "Responsive grid system with multiple layout options"),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Fixed Columns"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutGrid, {
                                  cols: 3,
                                  gap: "md"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                      return createVNode("div", {
                                        key: `fixed-${i}`,
                                        class: "demo-box"
                                      }, toDisplayString(i), 1);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Responsive Columns"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutGrid, {
                                  cols: { mobile: 1, tablet: 2, laptop: 3, desktop: 4 },
                                  gap: "md"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                      return createVNode("div", {
                                        key: `responsive-${i}`,
                                        class: "demo-box"
                                      }, toDisplayString(i), 1);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            createVNode("div", { class: "demo-subsection" }, [
                              createVNode("h3", null, "Auto-fit Grid"),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode(_component_LayoutGrid, {
                                  "auto-fit": true,
                                  "min-child-width": "200px",
                                  gap: "md"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                      return createVNode("div", {
                                        key: `autofit-${i}`,
                                        class: "demo-box"
                                      }, " Auto " + toDisplayString(i), 1);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutStack"),
                            createVNode("p", { class: "section-description" }, "Overlapping layout for creating depth and layered UIs"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutStack, { style: { "height": "200px" } }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "stack-layer stack-layer-1" }, "Background Layer"),
                                  createVNode("div", { class: "stack-layer stack-layer-2" }, "Middle Layer"),
                                  createVNode("div", { class: "stack-layer stack-layer-3" }, [
                                    createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "stack-badge" }, "Top Layer")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutWrap"),
                            createVNode("p", { class: "section-description" }, "Wrapping layout that flows items to new rows"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutWrap, { gap: "md" }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                                    return createVNode("div", {
                                      key: `wrap-${i}`,
                                      class: "demo-chip"
                                    }, " Tag " + toDisplayString(i), 1);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutExpanded"),
                            createVNode("p", { class: "section-description" }, "Expands child to fill available space"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutRow, {
                                gap: "md",
                                style: { "height": "100px" }
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box" }, "Fixed"),
                                  createVNode(_component_LayoutExpanded, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "demo-box demo-expanded" }, "Expanded to fill")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "demo-box" }, "Fixed")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutAligned"),
                            createVNode("p", { class: "section-description" }, "Positions content within its parent"),
                            createVNode("div", {
                              class: "demo-section",
                              style: { "height": "300px", "position": "relative" }
                            }, [
                              createVNode(_component_LayoutAligned, { alignment: "topLeft" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Top Left")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "topCenter" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Top Center")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Top Right")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "centerLeft" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Center Left")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "center" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box aligned-box-center" }, "Center")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "centerRight" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Center Right")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "bottomLeft" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Bottom Left")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "bottomCenter" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Bottom Center")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_LayoutAligned, { alignment: "bottomRight" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "aligned-box" }, "Bottom Right")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "LayoutSafeArea"),
                            createVNode("p", { class: "section-description" }, "Ensures content avoids device notches and system UI"),
                            createVNode("div", { class: "demo-section demo-safe-area" }, [
                              createVNode(_component_LayoutSafeArea, { all: true }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box" }, [
                                    createVNode("p", null, "This content respects safe area insets on devices with notches or rounded corners")
                                  ])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Complex Layout Example"),
                            createVNode("p", { class: "section-description" }, "Combining multiple layout primitives"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutContainer, null, {
                                default: withCtx(() => [
                                  createVNode(_component_LayoutColumn, { gap: "lg" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_LayoutRow, {
                                        gap: "md",
                                        wrap: true
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_LayoutExpanded, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "complex-card" }, [
                                                createVNode("h4", null, "Main Content"),
                                                createVNode("p", null, "This card expands to fill available space")
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "complex-sidebar" }, [
                                            createVNode("h4", null, "Sidebar"),
                                            createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                                createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                                createVNode("div", { class: "sidebar-item" }, "Item 3")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_LayoutGrid, {
                                        cols: { mobile: 2, tablet: 4 },
                                        gap: "md"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                            return createVNode("div", {
                                              key: `stat-${i}`,
                                              class: "stat-card"
                                            }, [
                                              createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                              createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                            ]);
                                          }), 64))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutStack, { spacing: "xl" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "demo-header" }, [
                          createVNode("h1", null, "Layout Primitives"),
                          createVNode("p", null, "Flutter-inspired layout components for predictable UI composition")
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutContainer"),
                          createVNode("p", { class: "section-description" }, "Constrains content width and centers it horizontally"),
                          createVNode("div", { class: "demo-section demo-container" }, [
                            createVNode(_component_LayoutContainer, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-box" }, [
                                  createVNode("p", null, "This content is constrained to a maximum width and centered")
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutRow"),
                          createVNode("p", { class: "section-description" }, "Horizontal layout with flexible spacing and alignment"),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Basic Row"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutRow, { gap: "md" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box" }, "Item 1"),
                                  createVNode("div", { class: "demo-box" }, "Item 2"),
                                  createVNode("div", { class: "demo-box" }, "Item 3")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Flexible Items"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutRow, { gap: "md" }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "1" }
                                  }, "Flex: 1"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "2" }
                                  }, "Flex: 2"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "1" }
                                  }, "Flex: 1")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Alignment Options"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutRow, {
                                gap: "md",
                                align: "center",
                                style: { "height": "100px" }
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "height": "40px" }
                                  }, "Short"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "height": "80px" }
                                  }, "Tall"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "height": "60px" }
                                  }, "Medium")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutColumn"),
                          createVNode("p", { class: "section-description" }, "Vertical layout with consistent spacing"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutColumn, { gap: "md" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-box" }, "First Item"),
                                createVNode("div", { class: "demo-box" }, "Second Item"),
                                createVNode("div", { class: "demo-box" }, "Third Item")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutGrid"),
                          createVNode("p", { class: "section-description" }, "Responsive grid system with multiple layout options"),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Fixed Columns"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutGrid, {
                                cols: 3,
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                    return createVNode("div", {
                                      key: `fixed-${i}`,
                                      class: "demo-box"
                                    }, toDisplayString(i), 1);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Responsive Columns"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutGrid, {
                                cols: { mobile: 1, tablet: 2, laptop: 3, desktop: 4 },
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                    return createVNode("div", {
                                      key: `responsive-${i}`,
                                      class: "demo-box"
                                    }, toDisplayString(i), 1);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "demo-subsection" }, [
                            createVNode("h3", null, "Auto-fit Grid"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode(_component_LayoutGrid, {
                                "auto-fit": true,
                                "min-child-width": "200px",
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                    return createVNode("div", {
                                      key: `autofit-${i}`,
                                      class: "demo-box"
                                    }, " Auto " + toDisplayString(i), 1);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutStack"),
                          createVNode("p", { class: "section-description" }, "Overlapping layout for creating depth and layered UIs"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutStack, { style: { "height": "200px" } }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "stack-layer stack-layer-1" }, "Background Layer"),
                                createVNode("div", { class: "stack-layer stack-layer-2" }, "Middle Layer"),
                                createVNode("div", { class: "stack-layer stack-layer-3" }, [
                                  createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "stack-badge" }, "Top Layer")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutWrap"),
                          createVNode("p", { class: "section-description" }, "Wrapping layout that flows items to new rows"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutWrap, { gap: "md" }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                                  return createVNode("div", {
                                    key: `wrap-${i}`,
                                    class: "demo-chip"
                                  }, " Tag " + toDisplayString(i), 1);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutExpanded"),
                          createVNode("p", { class: "section-description" }, "Expands child to fill available space"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              style: { "height": "100px" }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-box" }, "Fixed"),
                                createVNode(_component_LayoutExpanded, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "demo-box demo-expanded" }, "Expanded to fill")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "demo-box" }, "Fixed")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutAligned"),
                          createVNode("p", { class: "section-description" }, "Positions content within its parent"),
                          createVNode("div", {
                            class: "demo-section",
                            style: { "height": "300px", "position": "relative" }
                          }, [
                            createVNode(_component_LayoutAligned, { alignment: "topLeft" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Top Left")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "topCenter" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Top Center")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Top Right")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "centerLeft" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Center Left")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "center" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box aligned-box-center" }, "Center")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "centerRight" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Center Right")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "bottomLeft" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Bottom Left")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "bottomCenter" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Bottom Center")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutAligned, { alignment: "bottomRight" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "aligned-box" }, "Bottom Right")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "LayoutSafeArea"),
                          createVNode("p", { class: "section-description" }, "Ensures content avoids device notches and system UI"),
                          createVNode("div", { class: "demo-section demo-safe-area" }, [
                            createVNode(_component_LayoutSafeArea, { all: true }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-box" }, [
                                  createVNode("p", null, "This content respects safe area insets on devices with notches or rounded corners")
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Complex Layout Example"),
                          createVNode("p", { class: "section-description" }, "Combining multiple layout primitives"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutContainer, null, {
                              default: withCtx(() => [
                                createVNode(_component_LayoutColumn, { gap: "lg" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_LayoutRow, {
                                      gap: "md",
                                      wrap: true
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_LayoutExpanded, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "complex-card" }, [
                                              createVNode("h4", null, "Main Content"),
                                              createVNode("p", null, "This card expands to fill available space")
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "complex-sidebar" }, [
                                          createVNode("h4", null, "Sidebar"),
                                          createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                              createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                              createVNode("div", { class: "sidebar-item" }, "Item 3")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_LayoutGrid, {
                                      cols: { mobile: 2, tablet: 4 },
                                      gap: "md"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                          return createVNode("div", {
                                            key: `stat-${i}`,
                                            class: "stat-card"
                                          }, [
                                            createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                            createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                          ]);
                                        }), 64))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutContainer, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "demo-header" }, [
                        createVNode("h1", null, "Layout Primitives"),
                        createVNode("p", null, "Flutter-inspired layout components for predictable UI composition")
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutContainer"),
                        createVNode("p", { class: "section-description" }, "Constrains content width and centers it horizontally"),
                        createVNode("div", { class: "demo-section demo-container" }, [
                          createVNode(_component_LayoutContainer, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "demo-box" }, [
                                createVNode("p", null, "This content is constrained to a maximum width and centered")
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutRow"),
                        createVNode("p", { class: "section-description" }, "Horizontal layout with flexible spacing and alignment"),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Basic Row"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutRow, { gap: "md" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-box" }, "Item 1"),
                                createVNode("div", { class: "demo-box" }, "Item 2"),
                                createVNode("div", { class: "demo-box" }, "Item 3")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Flexible Items"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutRow, { gap: "md" }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "1" }
                                }, "Flex: 1"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "2" }
                                }, "Flex: 2"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "flex": "1" }
                                }, "Flex: 1")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Alignment Options"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              align: "center",
                              style: { "height": "100px" }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "40px" }
                                }, "Short"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "80px" }
                                }, "Tall"),
                                createVNode("div", {
                                  class: "demo-box",
                                  style: { "height": "60px" }
                                }, "Medium")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutColumn"),
                        createVNode("p", { class: "section-description" }, "Vertical layout with consistent spacing"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode(_component_LayoutColumn, { gap: "md" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "demo-box" }, "First Item"),
                              createVNode("div", { class: "demo-box" }, "Second Item"),
                              createVNode("div", { class: "demo-box" }, "Third Item")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutGrid"),
                        createVNode("p", { class: "section-description" }, "Responsive grid system with multiple layout options"),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Fixed Columns"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutGrid, {
                              cols: 3,
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                  return createVNode("div", {
                                    key: `fixed-${i}`,
                                    class: "demo-box"
                                  }, toDisplayString(i), 1);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Responsive Columns"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutGrid, {
                              cols: { mobile: 1, tablet: 2, laptop: 3, desktop: 4 },
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                  return createVNode("div", {
                                    key: `responsive-${i}`,
                                    class: "demo-box"
                                  }, toDisplayString(i), 1);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "demo-subsection" }, [
                          createVNode("h3", null, "Auto-fit Grid"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode(_component_LayoutGrid, {
                              "auto-fit": true,
                              "min-child-width": "200px",
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("div", {
                                    key: `autofit-${i}`,
                                    class: "demo-box"
                                  }, " Auto " + toDisplayString(i), 1);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutStack"),
                        createVNode("p", { class: "section-description" }, "Overlapping layout for creating depth and layered UIs"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode(_component_LayoutStack, { style: { "height": "200px" } }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "stack-layer stack-layer-1" }, "Background Layer"),
                              createVNode("div", { class: "stack-layer stack-layer-2" }, "Middle Layer"),
                              createVNode("div", { class: "stack-layer stack-layer-3" }, [
                                createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "stack-badge" }, "Top Layer")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutWrap"),
                        createVNode("p", { class: "section-description" }, "Wrapping layout that flows items to new rows"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode(_component_LayoutWrap, { gap: "md" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                                return createVNode("div", {
                                  key: `wrap-${i}`,
                                  class: "demo-chip"
                                }, " Tag " + toDisplayString(i), 1);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutExpanded"),
                        createVNode("p", { class: "section-description" }, "Expands child to fill available space"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            style: { "height": "100px" }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "demo-box" }, "Fixed"),
                              createVNode(_component_LayoutExpanded, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "demo-box demo-expanded" }, "Expanded to fill")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "demo-box" }, "Fixed")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutAligned"),
                        createVNode("p", { class: "section-description" }, "Positions content within its parent"),
                        createVNode("div", {
                          class: "demo-section",
                          style: { "height": "300px", "position": "relative" }
                        }, [
                          createVNode(_component_LayoutAligned, { alignment: "topLeft" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Top Left")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "topCenter" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Top Center")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "topRight" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Top Right")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "centerLeft" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Center Left")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "center" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box aligned-box-center" }, "Center")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "centerRight" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Center Right")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "bottomLeft" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Bottom Left")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "bottomCenter" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Bottom Center")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutAligned, { alignment: "bottomRight" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aligned-box" }, "Bottom Right")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "LayoutSafeArea"),
                        createVNode("p", { class: "section-description" }, "Ensures content avoids device notches and system UI"),
                        createVNode("div", { class: "demo-section demo-safe-area" }, [
                          createVNode(_component_LayoutSafeArea, { all: true }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "demo-box" }, [
                                createVNode("p", null, "This content respects safe area insets on devices with notches or rounded corners")
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Complex Layout Example"),
                        createVNode("p", { class: "section-description" }, "Combining multiple layout primitives"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode(_component_LayoutContainer, null, {
                            default: withCtx(() => [
                              createVNode(_component_LayoutColumn, { gap: "lg" }, {
                                default: withCtx(() => [
                                  createVNode(_component_LayoutRow, {
                                    gap: "md",
                                    wrap: true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_LayoutExpanded, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "complex-card" }, [
                                            createVNode("h4", null, "Main Content"),
                                            createVNode("p", null, "This card expands to fill available space")
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "complex-sidebar" }, [
                                        createVNode("h4", null, "Sidebar"),
                                        createVNode(_component_LayoutColumn, { gap: "sm" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "sidebar-item" }, "Item 1"),
                                            createVNode("div", { class: "sidebar-item" }, "Item 2"),
                                            createVNode("div", { class: "sidebar-item" }, "Item 3")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_LayoutGrid, {
                                    cols: { mobile: 2, tablet: 4 },
                                    gap: "md"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                        return createVNode("div", {
                                          key: `stat-${i}`,
                                          class: "stat-card"
                                        }, [
                                          createVNode("div", { class: "stat-value" }, toDisplayString(25 * i) + "%", 1),
                                          createVNode("div", { class: "stat-label" }, "Metric " + toDisplayString(i), 1)
                                        ]);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/layouts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const layouts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6905c99b"]]);

export { layouts as default };
//# sourceMappingURL=layouts-Bv1HSbal.mjs.map
