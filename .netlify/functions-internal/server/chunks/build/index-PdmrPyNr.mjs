import { _ as __nuxt_component_0 } from './LayoutContainer-BlRRBH76.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Cuu2hVOT.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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
      title: "Component Demos - Mobile-First Nuxt",
      meta: [
        { name: "description", content: "Explore all components in the mobile-first design system" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-index" }, _attrs))} data-v-14bca3df>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="demo-header" data-v-14bca3df${_scopeId}><h1 data-v-14bca3df${_scopeId}>Component Demonstrations</h1><p data-v-14bca3df${_scopeId}>Explore the complete mobile-first design system</p></div><div class="demo-grid" data-v-14bca3df${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/navigation",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F9ED}</div><h3 data-v-14bca3df${_scopeId2}>Navigation Components</h3><p data-v-14bca3df${_scopeId2}>NavBar, SideBar, BottomNav, TabBar</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F9ED}"),
                      createVNode("h3", null, "Navigation Components"),
                      createVNode("p", null, "NavBar, SideBar, BottomNav, TabBar")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/overlays",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F4CB}</div><h3 data-v-14bca3df${_scopeId2}>Overlay Components</h3><p data-v-14bca3df${_scopeId2}>Modal, BottomSheet, Drawer, Toast</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4CB}"),
                      createVNode("h3", null, "Overlay Components"),
                      createVNode("p", null, "Modal, BottomSheet, Drawer, Toast")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/layouts",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F4D0}</div><h3 data-v-14bca3df${_scopeId2}>Layout Primitives</h3><p data-v-14bca3df${_scopeId2}>Container, Row, Column, Grid, Stack</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4D0}"),
                      createVNode("h3", null, "Layout Primitives"),
                      createVNode("p", null, "Container, Row, Column, Grid, Stack")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/content",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F3B4}</div><h3 data-v-14bca3df${_scopeId2}>Content Components</h3><p data-v-14bca3df${_scopeId2}>Cards, Grids, and Content Layouts</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F3B4}"),
                      createVNode("h3", null, "Content Components"),
                      createVNode("p", null, "Cards, Grids, and Content Layouts")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/carousel",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F3A0}</div><h3 data-v-14bca3df${_scopeId2}>Carousel &amp; Swipe</h3><p data-v-14bca3df${_scopeId2}>Carousel, PageView, MasonryGrid</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F3A0}"),
                      createVNode("h3", null, "Carousel & Swipe"),
                      createVNode("p", null, "Carousel, PageView, MasonryGrid")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/forms",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F4DD}</div><h3 data-v-14bca3df${_scopeId2}>Form Components</h3><p data-v-14bca3df${_scopeId2}>ChatInput, BottomSheetSelect, ChoiceButtons</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4DD}"),
                      createVNode("h3", null, "Form Components"),
                      createVNode("p", null, "ChatInput, BottomSheetSelect, ChoiceButtons")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/lazy-loading",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u26A1</div><h3 data-v-14bca3df${_scopeId2}>Lazy Loading</h3><p data-v-14bca3df${_scopeId2}>Dynamic imports, code splitting, performance</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u26A1"),
                      createVNode("h3", null, "Lazy Loading"),
                      createVNode("p", null, "Dynamic imports, code splitting, performance")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/demo/images",
              class: "demo-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="demo-card" data-v-14bca3df${_scopeId2}><div class="demo-icon" data-v-14bca3df${_scopeId2}>\u{1F5BC}\uFE0F</div><h3 data-v-14bca3df${_scopeId2}>Image Optimization</h3><p data-v-14bca3df${_scopeId2}>Responsive images, lazy loading, galleries</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F5BC}\uFE0F"),
                      createVNode("h3", null, "Image Optimization"),
                      createVNode("p", null, "Responsive images, lazy loading, galleries")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="coming-soon" data-v-14bca3df${_scopeId}><h2 data-v-14bca3df${_scopeId}>More Features</h2><div class="coming-soon-grid" data-v-14bca3df${_scopeId}><div class="coming-soon-card" data-v-14bca3df${_scopeId}><h4 data-v-14bca3df${_scopeId}>Theme System</h4><p data-v-14bca3df${_scopeId}>Dynamic theming with persistence</p></div><div class="coming-soon-card" data-v-14bca3df${_scopeId}><h4 data-v-14bca3df${_scopeId}>Gesture Support</h4><p data-v-14bca3df${_scopeId}>Swipe, pinch, and custom gestures</p></div><div class="coming-soon-card" data-v-14bca3df${_scopeId}><h4 data-v-14bca3df${_scopeId}>Performance Tools</h4><p data-v-14bca3df${_scopeId}>Optimization and monitoring</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "demo-header" }, [
                createVNode("h1", null, "Component Demonstrations"),
                createVNode("p", null, "Explore the complete mobile-first design system")
              ]),
              createVNode("div", { class: "demo-grid" }, [
                createVNode(_component_NuxtLink, {
                  to: "/demo/navigation",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F9ED}"),
                      createVNode("h3", null, "Navigation Components"),
                      createVNode("p", null, "NavBar, SideBar, BottomNav, TabBar")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/overlays",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4CB}"),
                      createVNode("h3", null, "Overlay Components"),
                      createVNode("p", null, "Modal, BottomSheet, Drawer, Toast")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/layouts",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4D0}"),
                      createVNode("h3", null, "Layout Primitives"),
                      createVNode("p", null, "Container, Row, Column, Grid, Stack")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/content",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F3B4}"),
                      createVNode("h3", null, "Content Components"),
                      createVNode("p", null, "Cards, Grids, and Content Layouts")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/carousel",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F3A0}"),
                      createVNode("h3", null, "Carousel & Swipe"),
                      createVNode("p", null, "Carousel, PageView, MasonryGrid")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/forms",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F4DD}"),
                      createVNode("h3", null, "Form Components"),
                      createVNode("p", null, "ChatInput, BottomSheetSelect, ChoiceButtons")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/lazy-loading",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u26A1"),
                      createVNode("h3", null, "Lazy Loading"),
                      createVNode("p", null, "Dynamic imports, code splitting, performance")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/demo/images",
                  class: "demo-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "demo-icon" }, "\u{1F5BC}\uFE0F"),
                      createVNode("h3", null, "Image Optimization"),
                      createVNode("p", null, "Responsive images, lazy loading, galleries")
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "coming-soon" }, [
                createVNode("h2", null, "More Features"),
                createVNode("div", { class: "coming-soon-grid" }, [
                  createVNode("div", { class: "coming-soon-card" }, [
                    createVNode("h4", null, "Theme System"),
                    createVNode("p", null, "Dynamic theming with persistence")
                  ]),
                  createVNode("div", { class: "coming-soon-card" }, [
                    createVNode("h4", null, "Gesture Support"),
                    createVNode("p", null, "Swipe, pinch, and custom gestures")
                  ]),
                  createVNode("div", { class: "coming-soon-card" }, [
                    createVNode("h4", null, "Performance Tools"),
                    createVNode("p", null, "Optimization and monitoring")
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-14bca3df"]]);

export { index as default };
//# sourceMappingURL=index-PdmrPyNr.mjs.map
