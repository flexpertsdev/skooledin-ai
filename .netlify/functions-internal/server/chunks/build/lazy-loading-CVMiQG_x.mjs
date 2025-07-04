import { defineComponent, ref, shallowRef, resolveComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { l as lazyComponent, E as ErrorBoundary, L as LoadingSpinner, p as preloadRouteComponentsAsync, c as createComponentLoader } from './ErrorBoundary-IjTInuof.mjs';
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
  __name: "lazy-loading",
  __ssrInlineRender: true,
  setup(__props) {
    const LazyCarousel = lazyComponent(() => import('./Carousel-kJ8dnrbn.mjs'), {
      loadingComponent: LoadingSpinner,
      errorComponent: ErrorBoundary,
      delay: 200
    });
    const LazyVisibleModal = lazyComponent(() => import('./Modal-CbNOylpf.mjs'), {
      loadingComponent: LoadingSpinner,
      errorComponent: ErrorBoundary
    });
    const showBasic = ref(false);
    const selectedComponent = ref("");
    const dynamicComponent = shallowRef();
    const componentProps = ref({});
    const preloadStatus = ref("");
    const carouselItems = [
      {
        id: 1,
        title: "Lazy Loaded Image 1",
        image: "https://picsum.photos/400/300?random=1"
      },
      {
        id: 2,
        title: "Lazy Loaded Image 2",
        image: "https://picsum.photos/400/300?random=2"
      },
      {
        id: 3,
        title: "Lazy Loaded Image 3",
        image: "https://picsum.photos/400/300?random=3"
      }
    ];
    const routes = [
      { name: "demo-overlays", label: "Overlays" },
      { name: "demo-carousel", label: "Carousel" },
      { name: "demo-forms", label: "Forms" }
    ];
    const dynamicComponents = [
      {
        name: "BottomSheet",
        label: "Bottom Sheet",
        loader: () => import('./BottomSheet-BLSmqtqP.mjs'),
        props: { modelValue: true, title: "Dynamic Bottom Sheet" }
      },
      {
        name: "ActionSheet",
        label: "Action Sheet",
        loader: () => import('./ActionSheet-Cx9K7HXY.mjs'),
        props: {
          modelValue: true,
          title: "Dynamic Actions",
          actions: [
            { label: "Edit", icon: "\u270F\uFE0F" },
            { label: "Share", icon: "\u{1F4E4}" },
            { label: "Delete", icon: "\u{1F5D1}\uFE0F", variant: "danger" }
          ]
        }
      },
      {
        name: "Toast",
        label: "Toast",
        loader: () => import('./Toast-BUr59jFK.mjs'),
        props: {
          show: true,
          message: "Dynamic toast loaded!",
          type: "success"
        }
      }
    ];
    const metrics = ref({
      initialBundle: "245KB",
      firstPaint: "0.8s",
      interactive: "1.2s",
      componentsLoaded: 4,
      totalComponents: 20
    });
    const preloadRoute = async (routeName) => {
      preloadStatus.value = `Preloading ${routeName} components...`;
      try {
        await preloadRouteComponentsAsync("demo-overlays");
        preloadStatus.value = `\u2713 ${routeName} components preloaded!`;
        metrics.value.componentsLoaded += 3;
        setTimeout(() => {
          preloadStatus.value = "";
        }, 2e3);
      } catch (error) {
        preloadStatus.value = `\u2717 Failed to preload ${routeName}`;
      }
    };
    const loadDynamicComponent = async (comp) => {
      selectedComponent.value = comp.name;
      componentProps.value = comp.props || {};
      try {
        const loader = createComponentLoader(comp.loader, 3, 500);
        const module = await loader();
        dynamicComponent.value = module.default;
        metrics.value.componentsLoaded += 1;
      } catch (error) {
        console.error("Failed to load component:", error);
        dynamicComponent.value = ErrorBoundary;
        componentProps.value = {
          error,
          title: "Failed to load component",
          onRetry: () => loadDynamicComponent(comp)
        };
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Container = resolveComponent("Container");
      const _component_Stack = resolveComponent("Stack");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lazy-loading-demo" }, _attrs))} data-v-7b93e9bb><header class="demo-header" data-v-7b93e9bb>`);
      _push(ssrRenderComponent(_component_Container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="demo-title" data-v-7b93e9bb${_scopeId}>Lazy Loading</h1><p class="demo-description" data-v-7b93e9bb${_scopeId}> Optimize performance with dynamic component loading, code splitting, and intersection observer-based lazy loading. </p>`);
          } else {
            return [
              createVNode("h1", { class: "demo-title" }, "Lazy Loading"),
              createVNode("p", { class: "demo-description" }, " Optimize performance with dynamic component loading, code splitting, and intersection observer-based lazy loading. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
      _push(ssrRenderComponent(_component_Container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Stack, { gap: 32 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<section class="demo-section" data-v-7b93e9bb${_scopeId2}><h2 class="section-title" data-v-7b93e9bb${_scopeId2}>Basic Lazy Loading</h2><p class="section-description" data-v-7b93e9bb${_scopeId2}> Components are loaded only when needed, reducing initial bundle size. </p><div class="demo-card" data-v-7b93e9bb${_scopeId2}><button class="toggle-button" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(showBasic.value ? "Hide" : "Show")} Lazy Component </button>`);
                  if (showBasic.value) {
                    _push3(ssrRenderComponent(unref(LazyCarousel), {
                      items: carouselItems,
                      "show-indicators": true,
                      "show-controls": true,
                      class: "lazy-carousel"
                    }, {
                      slide: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="carousel-slide" data-v-7b93e9bb${_scopeId3}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} data-v-7b93e9bb${_scopeId3}><h3 data-v-7b93e9bb${_scopeId3}>${ssrInterpolate(item.title)}</h3></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "carousel-slide" }, [
                              createVNode("img", {
                                src: item.image,
                                alt: item.title
                              }, null, 8, ["src", "alt"]),
                              createVNode("h3", null, toDisplayString(item.title), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></section><section class="demo-section" data-v-7b93e9bb${_scopeId2}><h2 class="section-title" data-v-7b93e9bb${_scopeId2}>Visible-Based Loading</h2><p class="section-description" data-v-7b93e9bb${_scopeId2}> Components load automatically when they enter the viewport. </p>`);
                  _push3(ssrRenderComponent(_component_Stack, { gap: 24 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(3, (i) => {
                          _push4(`<div class="demo-card" data-v-7b93e9bb${_scopeId3}><h3 data-v-7b93e9bb${_scopeId3}>Scroll to load component ${ssrInterpolate(i)}</h3>`);
                          _push4(ssrRenderComponent(unref(LazyVisibleModal), {
                            title: `Lazy Modal ${i}`,
                            "show-trigger": true
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<p data-v-7b93e9bb${_scopeId4}>This modal was loaded when it became visible in the viewport!</p><p data-v-7b93e9bb${_scopeId4}>Check the network tab to see the lazy loading in action.</p>`);
                              } else {
                                return [
                                  createVNode("p", null, "This modal was loaded when it became visible in the viewport!"),
                                  createVNode("p", null, "Check the network tab to see the lazy loading in action.")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode("div", {
                              key: i,
                              class: "demo-card"
                            }, [
                              createVNode("h3", null, "Scroll to load component " + toDisplayString(i), 1),
                              createVNode(unref(LazyVisibleModal), {
                                title: `Lazy Modal ${i}`,
                                "show-trigger": true
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", null, "This modal was loaded when it became visible in the viewport!"),
                                  createVNode("p", null, "Check the network tab to see the lazy loading in action.")
                                ]),
                                _: 2
                              }, 1032, ["title"])
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</section><section class="demo-section" data-v-7b93e9bb${_scopeId2}><h2 class="section-title" data-v-7b93e9bb${_scopeId2}>Route Preloading</h2><p class="section-description" data-v-7b93e9bb${_scopeId2}> Preload components for specific routes to improve navigation speed. </p><div class="demo-card" data-v-7b93e9bb${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Stack, { gap: 16 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(routes, (route) => {
                          _push4(`<button class="route-button" data-v-7b93e9bb${_scopeId3}> Preload ${ssrInterpolate(route.label)} Components </button>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(routes, (route) => {
                            return createVNode("button", {
                              key: route.name,
                              class: "route-button",
                              onClick: ($event) => preloadRoute(route.name),
                              onMouseenter: ($event) => preloadRoute(route.name)
                            }, " Preload " + toDisplayString(route.label) + " Components ", 41, ["onClick", "onMouseenter"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (preloadStatus.value) {
                    _push3(`<div class="preload-status" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(preloadStatus.value)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></section><section class="demo-section" data-v-7b93e9bb${_scopeId2}><h2 class="section-title" data-v-7b93e9bb${_scopeId2}>Dynamic Components</h2><p class="section-description" data-v-7b93e9bb${_scopeId2}> Load different components dynamically based on user interaction. </p><div class="demo-card" data-v-7b93e9bb${_scopeId2}><div class="component-selector" data-v-7b93e9bb${_scopeId2}><!--[-->`);
                  ssrRenderList(dynamicComponents, (comp) => {
                    _push3(`<button class="${ssrRenderClass(["selector-button", { active: selectedComponent.value === comp.name }])}" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(comp.label)}</button>`);
                  });
                  _push3(`<!--]--></div><div class="dynamic-content" data-v-7b93e9bb${_scopeId2}>`);
                  if (dynamicComponent.value) {
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(dynamicComponent.value), componentProps.value, null), _parent3, _scopeId2);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></section><section class="demo-section" data-v-7b93e9bb${_scopeId2}><h2 class="section-title" data-v-7b93e9bb${_scopeId2}>Performance Impact</h2><p class="section-description" data-v-7b93e9bb${_scopeId2}> See the performance benefits of lazy loading in real-time. </p><div class="demo-card" data-v-7b93e9bb${_scopeId2}><div class="metrics-grid" data-v-7b93e9bb${_scopeId2}><div class="metric" data-v-7b93e9bb${_scopeId2}><span class="metric-label" data-v-7b93e9bb${_scopeId2}>Initial Bundle</span><span class="metric-value" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(metrics.value.initialBundle)}</span><span class="metric-change" data-v-7b93e9bb${_scopeId2}>-45%</span></div><div class="metric" data-v-7b93e9bb${_scopeId2}><span class="metric-label" data-v-7b93e9bb${_scopeId2}>First Paint</span><span class="metric-value" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(metrics.value.firstPaint)}</span><span class="metric-change" data-v-7b93e9bb${_scopeId2}>-60%</span></div><div class="metric" data-v-7b93e9bb${_scopeId2}><span class="metric-label" data-v-7b93e9bb${_scopeId2}>Interactive Time</span><span class="metric-value" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(metrics.value.interactive)}</span><span class="metric-change" data-v-7b93e9bb${_scopeId2}>-50%</span></div><div class="metric" data-v-7b93e9bb${_scopeId2}><span class="metric-label" data-v-7b93e9bb${_scopeId2}>Components Loaded</span><span class="metric-value" data-v-7b93e9bb${_scopeId2}>${ssrInterpolate(metrics.value.componentsLoaded)}</span><span class="metric-detail" data-v-7b93e9bb${_scopeId2}>of ${ssrInterpolate(metrics.value.totalComponents)}</span></div></div></div></section>`);
                } else {
                  return [
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Basic Lazy Loading"),
                      createVNode("p", { class: "section-description" }, " Components are loaded only when needed, reducing initial bundle size. "),
                      createVNode("div", { class: "demo-card" }, [
                        createVNode("button", {
                          class: "toggle-button",
                          onClick: ($event) => showBasic.value = !showBasic.value
                        }, toDisplayString(showBasic.value ? "Hide" : "Show") + " Lazy Component ", 9, ["onClick"]),
                        showBasic.value ? (openBlock(), createBlock(unref(LazyCarousel), {
                          key: 0,
                          items: carouselItems,
                          "show-indicators": true,
                          "show-controls": true,
                          class: "lazy-carousel"
                        }, {
                          slide: withCtx(({ item }) => [
                            createVNode("div", { class: "carousel-slide" }, [
                              createVNode("img", {
                                src: item.image,
                                alt: item.title
                              }, null, 8, ["src", "alt"]),
                              createVNode("h3", null, toDisplayString(item.title), 1)
                            ])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Visible-Based Loading"),
                      createVNode("p", { class: "section-description" }, " Components load automatically when they enter the viewport. "),
                      createVNode(_component_Stack, { gap: 24 }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode("div", {
                              key: i,
                              class: "demo-card"
                            }, [
                              createVNode("h3", null, "Scroll to load component " + toDisplayString(i), 1),
                              createVNode(unref(LazyVisibleModal), {
                                title: `Lazy Modal ${i}`,
                                "show-trigger": true
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", null, "This modal was loaded when it became visible in the viewport!"),
                                  createVNode("p", null, "Check the network tab to see the lazy loading in action.")
                                ]),
                                _: 2
                              }, 1032, ["title"])
                            ]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Route Preloading"),
                      createVNode("p", { class: "section-description" }, " Preload components for specific routes to improve navigation speed. "),
                      createVNode("div", { class: "demo-card" }, [
                        createVNode(_component_Stack, { gap: 16 }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(routes, (route) => {
                              return createVNode("button", {
                                key: route.name,
                                class: "route-button",
                                onClick: ($event) => preloadRoute(route.name),
                                onMouseenter: ($event) => preloadRoute(route.name)
                              }, " Preload " + toDisplayString(route.label) + " Components ", 41, ["onClick", "onMouseenter"]);
                            }), 64))
                          ]),
                          _: 1
                        }),
                        preloadStatus.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "preload-status"
                        }, toDisplayString(preloadStatus.value), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Dynamic Components"),
                      createVNode("p", { class: "section-description" }, " Load different components dynamically based on user interaction. "),
                      createVNode("div", { class: "demo-card" }, [
                        createVNode("div", { class: "component-selector" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(dynamicComponents, (comp) => {
                            return createVNode("button", {
                              key: comp.name,
                              class: ["selector-button", { active: selectedComponent.value === comp.name }],
                              onClick: ($event) => loadDynamicComponent(comp)
                            }, toDisplayString(comp.label), 11, ["onClick"]);
                          }), 64))
                        ]),
                        createVNode("div", { class: "dynamic-content" }, [
                          dynamicComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(dynamicComponent.value), mergeProps({ key: 0 }, componentProps.value), null, 16)) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Performance Impact"),
                      createVNode("p", { class: "section-description" }, " See the performance benefits of lazy loading in real-time. "),
                      createVNode("div", { class: "demo-card" }, [
                        createVNode("div", { class: "metrics-grid" }, [
                          createVNode("div", { class: "metric" }, [
                            createVNode("span", { class: "metric-label" }, "Initial Bundle"),
                            createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.initialBundle), 1),
                            createVNode("span", { class: "metric-change" }, "-45%")
                          ]),
                          createVNode("div", { class: "metric" }, [
                            createVNode("span", { class: "metric-label" }, "First Paint"),
                            createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.firstPaint), 1),
                            createVNode("span", { class: "metric-change" }, "-60%")
                          ]),
                          createVNode("div", { class: "metric" }, [
                            createVNode("span", { class: "metric-label" }, "Interactive Time"),
                            createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.interactive), 1),
                            createVNode("span", { class: "metric-change" }, "-50%")
                          ]),
                          createVNode("div", { class: "metric" }, [
                            createVNode("span", { class: "metric-label" }, "Components Loaded"),
                            createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.componentsLoaded), 1),
                            createVNode("span", { class: "metric-detail" }, "of " + toDisplayString(metrics.value.totalComponents), 1)
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Stack, { gap: 32 }, {
                default: withCtx(() => [
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Basic Lazy Loading"),
                    createVNode("p", { class: "section-description" }, " Components are loaded only when needed, reducing initial bundle size. "),
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("button", {
                        class: "toggle-button",
                        onClick: ($event) => showBasic.value = !showBasic.value
                      }, toDisplayString(showBasic.value ? "Hide" : "Show") + " Lazy Component ", 9, ["onClick"]),
                      showBasic.value ? (openBlock(), createBlock(unref(LazyCarousel), {
                        key: 0,
                        items: carouselItems,
                        "show-indicators": true,
                        "show-controls": true,
                        class: "lazy-carousel"
                      }, {
                        slide: withCtx(({ item }) => [
                          createVNode("div", { class: "carousel-slide" }, [
                            createVNode("img", {
                              src: item.image,
                              alt: item.title
                            }, null, 8, ["src", "alt"]),
                            createVNode("h3", null, toDisplayString(item.title), 1)
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Visible-Based Loading"),
                    createVNode("p", { class: "section-description" }, " Components load automatically when they enter the viewport. "),
                    createVNode(_component_Stack, { gap: 24 }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode("div", {
                            key: i,
                            class: "demo-card"
                          }, [
                            createVNode("h3", null, "Scroll to load component " + toDisplayString(i), 1),
                            createVNode(unref(LazyVisibleModal), {
                              title: `Lazy Modal ${i}`,
                              "show-trigger": true
                            }, {
                              default: withCtx(() => [
                                createVNode("p", null, "This modal was loaded when it became visible in the viewport!"),
                                createVNode("p", null, "Check the network tab to see the lazy loading in action.")
                              ]),
                              _: 2
                            }, 1032, ["title"])
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Route Preloading"),
                    createVNode("p", { class: "section-description" }, " Preload components for specific routes to improve navigation speed. "),
                    createVNode("div", { class: "demo-card" }, [
                      createVNode(_component_Stack, { gap: 16 }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(routes, (route) => {
                            return createVNode("button", {
                              key: route.name,
                              class: "route-button",
                              onClick: ($event) => preloadRoute(route.name),
                              onMouseenter: ($event) => preloadRoute(route.name)
                            }, " Preload " + toDisplayString(route.label) + " Components ", 41, ["onClick", "onMouseenter"]);
                          }), 64))
                        ]),
                        _: 1
                      }),
                      preloadStatus.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "preload-status"
                      }, toDisplayString(preloadStatus.value), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Dynamic Components"),
                    createVNode("p", { class: "section-description" }, " Load different components dynamically based on user interaction. "),
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "component-selector" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(dynamicComponents, (comp) => {
                          return createVNode("button", {
                            key: comp.name,
                            class: ["selector-button", { active: selectedComponent.value === comp.name }],
                            onClick: ($event) => loadDynamicComponent(comp)
                          }, toDisplayString(comp.label), 11, ["onClick"]);
                        }), 64))
                      ]),
                      createVNode("div", { class: "dynamic-content" }, [
                        dynamicComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(dynamicComponent.value), mergeProps({ key: 0 }, componentProps.value), null, 16)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Performance Impact"),
                    createVNode("p", { class: "section-description" }, " See the performance benefits of lazy loading in real-time. "),
                    createVNode("div", { class: "demo-card" }, [
                      createVNode("div", { class: "metrics-grid" }, [
                        createVNode("div", { class: "metric" }, [
                          createVNode("span", { class: "metric-label" }, "Initial Bundle"),
                          createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.initialBundle), 1),
                          createVNode("span", { class: "metric-change" }, "-45%")
                        ]),
                        createVNode("div", { class: "metric" }, [
                          createVNode("span", { class: "metric-label" }, "First Paint"),
                          createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.firstPaint), 1),
                          createVNode("span", { class: "metric-change" }, "-60%")
                        ]),
                        createVNode("div", { class: "metric" }, [
                          createVNode("span", { class: "metric-label" }, "Interactive Time"),
                          createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.interactive), 1),
                          createVNode("span", { class: "metric-change" }, "-50%")
                        ]),
                        createVNode("div", { class: "metric" }, [
                          createVNode("span", { class: "metric-label" }, "Components Loaded"),
                          createVNode("span", { class: "metric-value" }, toDisplayString(metrics.value.componentsLoaded), 1),
                          createVNode("span", { class: "metric-detail" }, "of " + toDisplayString(metrics.value.totalComponents), 1)
                        ])
                      ])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/lazy-loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lazyLoading = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b93e9bb"]]);

export { lazyLoading as default };
//# sourceMappingURL=lazy-loading-CVMiQG_x.mjs.map
