import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './LayoutStack-2FRHhzw9.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-BlRRBH76.mjs';
import { _ as __nuxt_component_6 } from './LayoutAligned-okf6Pek7.mjs';
import { _ as __nuxt_component_4 } from './LayoutGrid-D8uUXe5h.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-Cuu2hVOT.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-BNm3pCym.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Mobile-First Nuxt Project",
      meta: [
        { name: "description", content: "A comprehensive mobile-first design system for Nuxt 3" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutAligned = __nuxt_component_6;
      const _component_LayoutGrid = __nuxt_component_4;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LayoutRow = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-7e31861a>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<section class="hero-section" data-v-7e31861a${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="hero-content" data-v-7e31861a${_scopeId4}><h1 data-v-7e31861a${_scopeId4}>Mobile-First Nuxt Project</h1><p class="hero-subtitle" data-v-7e31861a${_scopeId4}> A comprehensive design system built with Vue 3, TypeScript, and modern CSS </p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "hero-content" }, [
                                  createVNode("h1", null, "Mobile-First Nuxt Project"),
                                  createVNode("p", { class: "hero-subtitle" }, " A comprehensive design system built with Vue 3, TypeScript, and modern CSS ")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-7e31861a${_scopeId3}><h2 data-v-7e31861a${_scopeId3}>Core Features</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: { mobile: 1, tablet: 2, laptop: 3 },
                          gap: "lg",
                          class: "features-grid"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u{1F3A8} Design Tokens</h3><p data-v-7e31861a${_scopeId4}>Comprehensive token system for colors, spacing, typography, and more</p></div><div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u{1F4F1} Mobile-First</h3><p data-v-7e31861a${_scopeId4}>Responsive system with smooth breakpoints and container queries</p></div><div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u{1F9E9} Layout Primitives</h3><p data-v-7e31861a${_scopeId4}>Flutter-like layout components for predictable UI composition</p></div><div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u{1F313} Dark Mode</h3><p data-v-7e31861a${_scopeId4}>Built-in light/dark theme support with CSS custom properties</p></div><div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u26A1 Performance</h3><p data-v-7e31861a${_scopeId4}>Optimized for speed with auto-imports and lazy loading</p></div><div class="feature-card" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>\u267F Accessible</h3><p data-v-7e31861a${_scopeId4}>WCAG 2.1 compliant with keyboard navigation and screen reader support</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F3A8} Design Tokens"),
                                  createVNode("p", null, "Comprehensive token system for colors, spacing, typography, and more")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4F1} Mobile-First"),
                                  createVNode("p", null, "Responsive system with smooth breakpoints and container queries")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F9E9} Layout Primitives"),
                                  createVNode("p", null, "Flutter-like layout components for predictable UI composition")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F313} Dark Mode"),
                                  createVNode("p", null, "Built-in light/dark theme support with CSS custom properties")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u26A1 Performance"),
                                  createVNode("p", null, "Optimized for speed with auto-imports and lazy loading")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u267F Accessible"),
                                  createVNode("p", null, "WCAG 2.1 compliant with keyboard navigation and screen reader support")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section class="demos-link-section" data-v-7e31861a${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div data-v-7e31861a${_scopeId4}><h2 data-v-7e31861a${_scopeId4}>Explore Components</h2><p class="demos-description" data-v-7e31861a${_scopeId4}> Check out our comprehensive collection of mobile-first components </p>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, {
                                to: "/demo",
                                class: "demos-button"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` View All Demos \u2192 `);
                                  } else {
                                    return [
                                      createTextVNode(" View All Demos \u2192 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("h2", null, "Explore Components"),
                                  createVNode("p", { class: "demos-description" }, " Check out our comprehensive collection of mobile-first components "),
                                  createVNode(_component_NuxtLink, {
                                    to: "/demo",
                                    class: "demos-button"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" View All Demos \u2192 ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-7e31861a${_scopeId3}><h2 data-v-7e31861a${_scopeId3}>Layout Demonstrations</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutStack, { spacing: "lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="demo-section" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>Responsive Row</h3>`);
                              _push5(ssrRenderComponent(_component_LayoutRow, {
                                gap: "md",
                                wrap: true
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="demo-box" style="${ssrRenderStyle({ "flex": "1" })}" data-v-7e31861a${_scopeId5}>Item 1</div><div class="demo-box" style="${ssrRenderStyle({ "flex": "2" })}" data-v-7e31861a${_scopeId5}>Item 2 (2x)</div><div class="demo-box" style="${ssrRenderStyle({ "flex": "1" })}" data-v-7e31861a${_scopeId5}>Item 3</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 1"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "2" }
                                      }, "Item 2 (2x)"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 3")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="demo-section" data-v-7e31861a${_scopeId4}><h3 data-v-7e31861a${_scopeId4}>Auto-Fit Grid</h3>`);
                              _push5(ssrRenderComponent(_component_LayoutGrid, {
                                "auto-fit": true,
                                "min-child-width": "200px",
                                gap: "md"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(6, (i) => {
                                      _push6(`<div class="demo-box" data-v-7e31861a${_scopeId5}> Grid Item ${ssrInterpolate(i)}</div>`);
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                        return createVNode("div", {
                                          key: i,
                                          class: "demo-box"
                                        }, " Grid Item " + toDisplayString(i), 1);
                                      }), 64))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "demo-section" }, [
                                  createVNode("h3", null, "Responsive Row"),
                                  createVNode(_component_LayoutRow, {
                                    gap: "md",
                                    wrap: true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 1"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "2" }
                                      }, "Item 2 (2x)"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 3")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "demo-section" }, [
                                  createVNode("h3", null, "Auto-Fit Grid"),
                                  createVNode(_component_LayoutGrid, {
                                    "auto-fit": true,
                                    "min-child-width": "200px",
                                    gap: "md"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                        return createVNode("div", {
                                          key: i,
                                          class: "demo-box"
                                        }, " Grid Item " + toDisplayString(i), 1);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section>`);
                      } else {
                        return [
                          createVNode("section", { class: "hero-section" }, [
                            createVNode(_component_LayoutAligned, { alignment: "center" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "hero-content" }, [
                                  createVNode("h1", null, "Mobile-First Nuxt Project"),
                                  createVNode("p", { class: "hero-subtitle" }, " A comprehensive design system built with Vue 3, TypeScript, and modern CSS ")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Core Features"),
                            createVNode(_component_LayoutGrid, {
                              cols: { mobile: 1, tablet: 2, laptop: 3 },
                              gap: "lg",
                              class: "features-grid"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F3A8} Design Tokens"),
                                  createVNode("p", null, "Comprehensive token system for colors, spacing, typography, and more")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4F1} Mobile-First"),
                                  createVNode("p", null, "Responsive system with smooth breakpoints and container queries")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F9E9} Layout Primitives"),
                                  createVNode("p", null, "Flutter-like layout components for predictable UI composition")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F313} Dark Mode"),
                                  createVNode("p", null, "Built-in light/dark theme support with CSS custom properties")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u26A1 Performance"),
                                  createVNode("p", null, "Optimized for speed with auto-imports and lazy loading")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u267F Accessible"),
                                  createVNode("p", null, "WCAG 2.1 compliant with keyboard navigation and screen reader support")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", { class: "demos-link-section" }, [
                            createVNode(_component_LayoutAligned, { alignment: "center" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h2", null, "Explore Components"),
                                  createVNode("p", { class: "demos-description" }, " Check out our comprehensive collection of mobile-first components "),
                                  createVNode(_component_NuxtLink, {
                                    to: "/demo",
                                    class: "demos-button"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" View All Demos \u2192 ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Layout Demonstrations"),
                            createVNode(_component_LayoutStack, { spacing: "lg" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "demo-section" }, [
                                  createVNode("h3", null, "Responsive Row"),
                                  createVNode(_component_LayoutRow, {
                                    gap: "md",
                                    wrap: true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 1"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "2" }
                                      }, "Item 2 (2x)"),
                                      createVNode("div", {
                                        class: "demo-box",
                                        style: { "flex": "1" }
                                      }, "Item 3")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "demo-section" }, [
                                  createVNode("h3", null, "Auto-Fit Grid"),
                                  createVNode(_component_LayoutGrid, {
                                    "auto-fit": true,
                                    "min-child-width": "200px",
                                    gap: "md"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                        return createVNode("div", {
                                          key: i,
                                          class: "demo-box"
                                        }, " Grid Item " + toDisplayString(i), 1);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
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
                        createVNode("section", { class: "hero-section" }, [
                          createVNode(_component_LayoutAligned, { alignment: "center" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "hero-content" }, [
                                createVNode("h1", null, "Mobile-First Nuxt Project"),
                                createVNode("p", { class: "hero-subtitle" }, " A comprehensive design system built with Vue 3, TypeScript, and modern CSS ")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Core Features"),
                          createVNode(_component_LayoutGrid, {
                            cols: { mobile: 1, tablet: 2, laptop: 3 },
                            gap: "lg",
                            class: "features-grid"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F3A8} Design Tokens"),
                                createVNode("p", null, "Comprehensive token system for colors, spacing, typography, and more")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F4F1} Mobile-First"),
                                createVNode("p", null, "Responsive system with smooth breakpoints and container queries")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F9E9} Layout Primitives"),
                                createVNode("p", null, "Flutter-like layout components for predictable UI composition")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F313} Dark Mode"),
                                createVNode("p", null, "Built-in light/dark theme support with CSS custom properties")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u26A1 Performance"),
                                createVNode("p", null, "Optimized for speed with auto-imports and lazy loading")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u267F Accessible"),
                                createVNode("p", null, "WCAG 2.1 compliant with keyboard navigation and screen reader support")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", { class: "demos-link-section" }, [
                          createVNode(_component_LayoutAligned, { alignment: "center" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("h2", null, "Explore Components"),
                                createVNode("p", { class: "demos-description" }, " Check out our comprehensive collection of mobile-first components "),
                                createVNode(_component_NuxtLink, {
                                  to: "/demo",
                                  class: "demos-button"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View All Demos \u2192 ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Layout Demonstrations"),
                          createVNode(_component_LayoutStack, { spacing: "lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "demo-section" }, [
                                createVNode("h3", null, "Responsive Row"),
                                createVNode(_component_LayoutRow, {
                                  gap: "md",
                                  wrap: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "1" }
                                    }, "Item 1"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "2" }
                                    }, "Item 2 (2x)"),
                                    createVNode("div", {
                                      class: "demo-box",
                                      style: { "flex": "1" }
                                    }, "Item 3")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "demo-section" }, [
                                createVNode("h3", null, "Auto-Fit Grid"),
                                createVNode(_component_LayoutGrid, {
                                  "auto-fit": true,
                                  "min-child-width": "200px",
                                  gap: "md"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                      return createVNode("div", {
                                        key: i,
                                        class: "demo-box"
                                      }, " Grid Item " + toDisplayString(i), 1);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
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
                      createVNode("section", { class: "hero-section" }, [
                        createVNode(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "hero-content" }, [
                              createVNode("h1", null, "Mobile-First Nuxt Project"),
                              createVNode("p", { class: "hero-subtitle" }, " A comprehensive design system built with Vue 3, TypeScript, and modern CSS ")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Core Features"),
                        createVNode(_component_LayoutGrid, {
                          cols: { mobile: 1, tablet: 2, laptop: 3 },
                          gap: "lg",
                          class: "features-grid"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F3A8} Design Tokens"),
                              createVNode("p", null, "Comprehensive token system for colors, spacing, typography, and more")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F4F1} Mobile-First"),
                              createVNode("p", null, "Responsive system with smooth breakpoints and container queries")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F9E9} Layout Primitives"),
                              createVNode("p", null, "Flutter-like layout components for predictable UI composition")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F313} Dark Mode"),
                              createVNode("p", null, "Built-in light/dark theme support with CSS custom properties")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u26A1 Performance"),
                              createVNode("p", null, "Optimized for speed with auto-imports and lazy loading")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u267F Accessible"),
                              createVNode("p", null, "WCAG 2.1 compliant with keyboard navigation and screen reader support")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", { class: "demos-link-section" }, [
                        createVNode(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("h2", null, "Explore Components"),
                              createVNode("p", { class: "demos-description" }, " Check out our comprehensive collection of mobile-first components "),
                              createVNode(_component_NuxtLink, {
                                to: "/demo",
                                class: "demos-button"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" View All Demos \u2192 ")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Layout Demonstrations"),
                        createVNode(_component_LayoutStack, { spacing: "lg" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Responsive Row"),
                              createVNode(_component_LayoutRow, {
                                gap: "md",
                                wrap: true
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "1" }
                                  }, "Item 1"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "2" }
                                  }, "Item 2 (2x)"),
                                  createVNode("div", {
                                    class: "demo-box",
                                    style: { "flex": "1" }
                                  }, "Item 3")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Auto-Fit Grid"),
                              createVNode(_component_LayoutGrid, {
                                "auto-fit": true,
                                "min-child-width": "200px",
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                    return createVNode("div", {
                                      key: i,
                                      class: "demo-box"
                                    }, " Grid Item " + toDisplayString(i), 1);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e31861a"]]);

export { index as default };
//# sourceMappingURL=index-BJ1TzzS6.mjs.map
