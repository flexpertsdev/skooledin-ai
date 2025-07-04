import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useResponsive } from './useResponsive-DKjduhWV.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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
  __name: "navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { isMobile } = useResponsive();
    const navTransparent = ref(false);
    const leftSidebarOpen = ref(false);
    const rightSidebarOpen = ref(false);
    const persistentSidebarOpen = ref(false);
    const showBottomNavLabels = ref(true);
    const activeNavId = ref("home");
    const bottomNavItems = [
      {
        id: "home",
        label: "Home",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        to: "/"
      },
      {
        id: "search",
        label: "Search",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
        action: () => console.log("Search clicked")
      },
      {
        id: "notifications",
        label: "Alerts",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        badge: "3",
        action: () => console.log("Notifications clicked")
      },
      {
        id: "profile",
        label: "Profile",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        to: "/demo/navigation"
      }
    ];
    const toggleNavTransparency = () => {
      navTransparent.value = !navTransparent.value;
      console.log("NavBar transparency:", navTransparent.value);
    };
    const toggleBottomNavLabels = () => {
      showBottomNavLabels.value = !showBottomNavLabels.value;
    };
    useHead({
      title: "Navigation Components - Mobile-First Nuxt",
      meta: [{ name: "description", content: "Demo of mobile-first navigation components" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_SideBar = resolveComponent("SideBar");
      const _component_BottomNav = resolveComponent("BottomNav");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "navigation-demo" }, _attrs))} data-v-6ccee60d>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-header" data-v-6ccee60d${_scopeId3}><h1 data-v-6ccee60d${_scopeId3}>Navigation Components Demo</h1><p data-v-6ccee60d${_scopeId3}>Mobile-first navigation patterns with responsive behavior</p></div><section data-v-6ccee60d${_scopeId3}><h2 data-v-6ccee60d${_scopeId3}>NavBar Component</h2><p data-v-6ccee60d${_scopeId3}>The NavBar is shown at the top of this page with scroll-aware behavior.</p><div class="demo-controls" data-v-6ccee60d${_scopeId3}><button class="demo-button" data-v-6ccee60d${_scopeId3}> Toggle Transparency: ${ssrInterpolate(unref(navTransparent) ? "ON" : "OFF")}</button></div></section><section data-v-6ccee60d${_scopeId3}><h2 data-v-6ccee60d${_scopeId3}>SideBar Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-6ccee60d${_scopeId4}>Open Left Sidebar</button><button class="demo-button" data-v-6ccee60d${_scopeId4}> Open Right Sidebar </button><button class="demo-button" data-v-6ccee60d${_scopeId4}> Open Persistent Sidebar </button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => leftSidebarOpen.value = true
                                }, "Open Left Sidebar", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => rightSidebarOpen.value = true
                                }, " Open Right Sidebar ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => persistentSidebarOpen.value = true
                                }, " Open Persistent Sidebar ", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-6ccee60d${_scopeId3}><h2 data-v-6ccee60d${_scopeId3}>BottomNav Component</h2><p data-v-6ccee60d${_scopeId3}>${ssrInterpolate(unref(isMobile) ? "Check the bottom of your screen" : "Resize to mobile view to see the bottom navigation")}</p><div class="demo-controls" data-v-6ccee60d${_scopeId3}><button class="demo-button" data-v-6ccee60d${_scopeId3}> Toggle Labels: ${ssrInterpolate(unref(showBottomNavLabels) ? "ON" : "OFF")}</button></div></section><section data-v-6ccee60d${_scopeId3}><h2 data-v-6ccee60d${_scopeId3}>Scroll Behavior</h2><p data-v-6ccee60d${_scopeId3}>Scroll down to see how navigation components react:</p><!--[-->`);
                        ssrRenderList(20, (i) => {
                          _push4(`<div class="scroll-content" data-v-6ccee60d${_scopeId3}><p data-v-6ccee60d${_scopeId3}>Content block ${ssrInterpolate(i)} - Keep scrolling to see navigation behavior</p></div>`);
                        });
                        _push4(`<!--]--></section>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-header" }, [
                            createVNode("h1", null, "Navigation Components Demo"),
                            createVNode("p", null, "Mobile-first navigation patterns with responsive behavior")
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "NavBar Component"),
                            createVNode("p", null, "The NavBar is shown at the top of this page with scroll-aware behavior."),
                            createVNode("div", { class: "demo-controls" }, [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: toggleNavTransparency
                              }, " Toggle Transparency: " + toDisplayString(unref(navTransparent) ? "ON" : "OFF"), 1)
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "SideBar Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => leftSidebarOpen.value = true
                                }, "Open Left Sidebar", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => rightSidebarOpen.value = true
                                }, " Open Right Sidebar ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => persistentSidebarOpen.value = true
                                }, " Open Persistent Sidebar ", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "BottomNav Component"),
                            createVNode("p", null, toDisplayString(unref(isMobile) ? "Check the bottom of your screen" : "Resize to mobile view to see the bottom navigation"), 1),
                            createVNode("div", { class: "demo-controls" }, [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: toggleBottomNavLabels
                              }, " Toggle Labels: " + toDisplayString(unref(showBottomNavLabels) ? "ON" : "OFF"), 1)
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Scroll Behavior"),
                            createVNode("p", null, "Scroll down to see how navigation components react:"),
                            (openBlock(), createBlock(Fragment, null, renderList(20, (i) => {
                              return createVNode("div", {
                                key: i,
                                class: "scroll-content"
                              }, [
                                createVNode("p", null, "Content block " + toDisplayString(i) + " - Keep scrolling to see navigation behavior", 1)
                              ]);
                            }), 64))
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
                          createVNode("h1", null, "Navigation Components Demo"),
                          createVNode("p", null, "Mobile-first navigation patterns with responsive behavior")
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "NavBar Component"),
                          createVNode("p", null, "The NavBar is shown at the top of this page with scroll-aware behavior."),
                          createVNode("div", { class: "demo-controls" }, [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: toggleNavTransparency
                            }, " Toggle Transparency: " + toDisplayString(unref(navTransparent) ? "ON" : "OFF"), 1)
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "SideBar Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => leftSidebarOpen.value = true
                              }, "Open Left Sidebar", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => rightSidebarOpen.value = true
                              }, " Open Right Sidebar ", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => persistentSidebarOpen.value = true
                              }, " Open Persistent Sidebar ", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "BottomNav Component"),
                          createVNode("p", null, toDisplayString(unref(isMobile) ? "Check the bottom of your screen" : "Resize to mobile view to see the bottom navigation"), 1),
                          createVNode("div", { class: "demo-controls" }, [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: toggleBottomNavLabels
                            }, " Toggle Labels: " + toDisplayString(unref(showBottomNavLabels) ? "ON" : "OFF"), 1)
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Scroll Behavior"),
                          createVNode("p", null, "Scroll down to see how navigation components react:"),
                          (openBlock(), createBlock(Fragment, null, renderList(20, (i) => {
                            return createVNode("div", {
                              key: i,
                              class: "scroll-content"
                            }, [
                              createVNode("p", null, "Content block " + toDisplayString(i) + " - Keep scrolling to see navigation behavior", 1)
                            ]);
                          }), 64))
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
                        createVNode("h1", null, "Navigation Components Demo"),
                        createVNode("p", null, "Mobile-first navigation patterns with responsive behavior")
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "NavBar Component"),
                        createVNode("p", null, "The NavBar is shown at the top of this page with scroll-aware behavior."),
                        createVNode("div", { class: "demo-controls" }, [
                          createVNode("button", {
                            class: "demo-button",
                            onClick: toggleNavTransparency
                          }, " Toggle Transparency: " + toDisplayString(unref(navTransparent) ? "ON" : "OFF"), 1)
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "SideBar Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => leftSidebarOpen.value = true
                            }, "Open Left Sidebar", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => rightSidebarOpen.value = true
                            }, " Open Right Sidebar ", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => persistentSidebarOpen.value = true
                            }, " Open Persistent Sidebar ", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "BottomNav Component"),
                        createVNode("p", null, toDisplayString(unref(isMobile) ? "Check the bottom of your screen" : "Resize to mobile view to see the bottom navigation"), 1),
                        createVNode("div", { class: "demo-controls" }, [
                          createVNode("button", {
                            class: "demo-button",
                            onClick: toggleBottomNavLabels
                          }, " Toggle Labels: " + toDisplayString(unref(showBottomNavLabels) ? "ON" : "OFF"), 1)
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Scroll Behavior"),
                        createVNode("p", null, "Scroll down to see how navigation components react:"),
                        (openBlock(), createBlock(Fragment, null, renderList(20, (i) => {
                          return createVNode("div", {
                            key: i,
                            class: "scroll-content"
                          }, [
                            createVNode("p", null, "Content block " + toDisplayString(i) + " - Keep scrolling to see navigation behavior", 1)
                          ]);
                        }), 64))
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
      _push(ssrRenderComponent(_component_SideBar, {
        modelValue: unref(leftSidebarOpen),
        "onUpdate:modelValue": ($event) => isRef(leftSidebarOpen) ? leftSidebarOpen.value = $event : null,
        position: "left",
        title: "Left Sidebar",
        size: "md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-6ccee60d${_scopeId2}>This is a left-aligned sidebar with default settings.</p><nav data-v-6ccee60d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a href="#" class="sidebar-link" data-v-6ccee60d${_scopeId3}>Dashboard</a><a href="#" class="sidebar-link" data-v-6ccee60d${_scopeId3}>Profile</a><a href="#" class="sidebar-link" data-v-6ccee60d${_scopeId3}>Settings</a><a href="#" class="sidebar-link" data-v-6ccee60d${_scopeId3}>Help</a>`);
                      } else {
                        return [
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Dashboard"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Profile"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Settings"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Help")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</nav>`);
                } else {
                  return [
                    createVNode("p", null, "This is a left-aligned sidebar with default settings."),
                    createVNode("nav", null, [
                      createVNode(_component_LayoutStack, { spacing: "sm" }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Dashboard"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Profile"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Settings"),
                          createVNode("a", {
                            href: "#",
                            class: "sidebar-link"
                          }, "Help")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This is a left-aligned sidebar with default settings."),
                  createVNode("nav", null, [
                    createVNode(_component_LayoutStack, { spacing: "sm" }, {
                      default: withCtx(() => [
                        createVNode("a", {
                          href: "#",
                          class: "sidebar-link"
                        }, "Dashboard"),
                        createVNode("a", {
                          href: "#",
                          class: "sidebar-link"
                        }, "Profile"),
                        createVNode("a", {
                          href: "#",
                          class: "sidebar-link"
                        }, "Settings"),
                        createVNode("a", {
                          href: "#",
                          class: "sidebar-link"
                        }, "Help")
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
      }, _parent));
      _push(ssrRenderComponent(_component_SideBar, {
        modelValue: unref(rightSidebarOpen),
        "onUpdate:modelValue": ($event) => isRef(rightSidebarOpen) ? rightSidebarOpen.value = $event : null,
        position: "right",
        title: "Right Sidebar",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-6ccee60d${_scopeId2}>This is a right-aligned sidebar with a larger size.</p><div class="sidebar-content-demo" data-v-6ccee60d${_scopeId2}><h3 data-v-6ccee60d${_scopeId2}>Features:</h3><ul data-v-6ccee60d${_scopeId2}><li data-v-6ccee60d${_scopeId2}>Swipe to close on mobile</li><li data-v-6ccee60d${_scopeId2}>Focus trap for accessibility</li><li data-v-6ccee60d${_scopeId2}>Backdrop click to close</li><li data-v-6ccee60d${_scopeId2}>ESC key support</li></ul></div>`);
                } else {
                  return [
                    createVNode("p", null, "This is a right-aligned sidebar with a larger size."),
                    createVNode("div", { class: "sidebar-content-demo" }, [
                      createVNode("h3", null, "Features:"),
                      createVNode("ul", null, [
                        createVNode("li", null, "Swipe to close on mobile"),
                        createVNode("li", null, "Focus trap for accessibility"),
                        createVNode("li", null, "Backdrop click to close"),
                        createVNode("li", null, "ESC key support")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This is a right-aligned sidebar with a larger size."),
                  createVNode("div", { class: "sidebar-content-demo" }, [
                    createVNode("h3", null, "Features:"),
                    createVNode("ul", null, [
                      createVNode("li", null, "Swipe to close on mobile"),
                      createVNode("li", null, "Focus trap for accessibility"),
                      createVNode("li", null, "Backdrop click to close"),
                      createVNode("li", null, "ESC key support")
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_SideBar, {
        modelValue: unref(persistentSidebarOpen),
        "onUpdate:modelValue": ($event) => isRef(persistentSidebarOpen) ? persistentSidebarOpen.value = $event : null,
        position: "left",
        title: "Persistent Sidebar",
        persistent: true,
        "show-close-button": true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-6ccee60d${_scopeId2}>This sidebar is persistent - it can only be closed via the close button.</p><p data-v-6ccee60d${_scopeId2}>Clicking the backdrop won&#39;t close it.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This sidebar is persistent - it can only be closed via the close button."),
                    createVNode("p", null, "Clicking the backdrop won't close it.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This sidebar is persistent - it can only be closed via the close button."),
                  createVNode("p", null, "Clicking the backdrop won't close it.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isMobile)) {
        _push(ssrRenderComponent(_component_BottomNav, {
          "active-id": unref(activeNavId),
          "onUpdate:activeId": ($event) => isRef(activeNavId) ? activeNavId.value = $event : null,
          "nav-items": bottomNavItems,
          "show-labels": unref(showBottomNavLabels),
          "hide-on-scroll": true
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/navigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const navigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6ccee60d"]]);

export { navigation as default };
//# sourceMappingURL=navigation-KHekuHTf.mjs.map
