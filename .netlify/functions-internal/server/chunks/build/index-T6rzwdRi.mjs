import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_6 } from './LayoutAligned-BniTJagZ.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import './useResponsive-DKjduhWV.mjs';
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
      title: "Skooledin AI - Learn Smarter with AI-Powered Education",
      meta: [{ name: "description", content: "Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations, smart notebooks, and personalized study tools." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutAligned = __nuxt_component_6;
      const _component_Button = resolveComponent("Button");
      const _component_LayoutGrid = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-7e2cb971>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<section class="hero-section" data-v-7e2cb971${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="hero-content" data-v-7e2cb971${_scopeId4}><h1 data-v-7e2cb971${_scopeId4}>Learn Smarter with AI-Powered Education</h1><p class="hero-subtitle" data-v-7e2cb971${_scopeId4}> Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations. </p><div class="hero-actions" data-v-7e2cb971${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Button, {
                                to: "/auth/signup",
                                size: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Start Learning Free`);
                                  } else {
                                    return [
                                      createTextVNode("Start Learning Free")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Button, {
                                to: "/features",
                                variant: "secondary",
                                size: "lg"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Explore Features`);
                                  } else {
                                    return [
                                      createTextVNode("Explore Features")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "hero-content" }, [
                                  createVNode("h1", null, "Learn Smarter with AI-Powered Education"),
                                  createVNode("p", { class: "hero-subtitle" }, " Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations. "),
                                  createVNode("div", { class: "hero-actions" }, [
                                    createVNode(_component_Button, {
                                      to: "/auth/signup",
                                      size: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Start Learning Free")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Button, {
                                      to: "/features",
                                      variant: "secondary",
                                      size: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Explore Features")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-7e2cb971${_scopeId3}><h2 data-v-7e2cb971${_scopeId3}>Why Choose Skooledin AI?</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          "auto-fit": true,
                          "min-child-width": "300px",
                          gap: "lg",
                          class: "features-grid"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F916} AI-Powered Tutor</h3><p data-v-7e2cb971${_scopeId4}>Conversational AI that understands your learning style and adapts to your pace</p></div><div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F4DA} Smart Notebook</h3><p data-v-7e2cb971${_scopeId4}>AI-enhanced notes with automatic summaries, flashcards, and concept extraction</p></div><div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F3AF} Personalized Learning</h3><p data-v-7e2cb971${_scopeId4}>Dynamic context switching between subjects with tailored recommendations</p></div><div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F4F1} Works Offline</h3><p data-v-7e2cb971${_scopeId4}>Full functionality even without internet - learn anywhere, anytime</p></div><div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F9E0} Study Tools</h3><p data-v-7e2cb971${_scopeId4}>Flashcards, quizzes, mind maps, and practice problems with spaced repetition</p></div><div class="feature-card" data-v-7e2cb971${_scopeId4}><h3 data-v-7e2cb971${_scopeId4}>\u{1F4CA} Track Progress</h3><p data-v-7e2cb971${_scopeId4}>Visual analytics to monitor learning progress and identify areas for improvement</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F916} AI-Powered Tutor"),
                                  createVNode("p", null, "Conversational AI that understands your learning style and adapts to your pace")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4DA} Smart Notebook"),
                                  createVNode("p", null, "AI-enhanced notes with automatic summaries, flashcards, and concept extraction")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F3AF} Personalized Learning"),
                                  createVNode("p", null, "Dynamic context switching between subjects with tailored recommendations")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4F1} Works Offline"),
                                  createVNode("p", null, "Full functionality even without internet - learn anywhere, anytime")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F9E0} Study Tools"),
                                  createVNode("p", null, "Flashcards, quizzes, mind maps, and practice problems with spaced repetition")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4CA} Track Progress"),
                                  createVNode("p", null, "Visual analytics to monitor learning progress and identify areas for improvement")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section class="cta-section" data-v-7e2cb971${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div data-v-7e2cb971${_scopeId4}><h2 data-v-7e2cb971${_scopeId4}>Ready to Transform Your Learning?</h2><p class="cta-description" data-v-7e2cb971${_scopeId4}> Join thousands of students already learning smarter with AI </p>`);
                              _push5(ssrRenderComponent(_component_Button, {
                                to: "/auth/signup",
                                size: "lg",
                                class: "cta-button"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Get Started Free `);
                                  } else {
                                    return [
                                      createTextVNode(" Get Started Free ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("h2", null, "Ready to Transform Your Learning?"),
                                  createVNode("p", { class: "cta-description" }, " Join thousands of students already learning smarter with AI "),
                                  createVNode(_component_Button, {
                                    to: "/auth/signup",
                                    size: "lg",
                                    class: "cta-button"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Get Started Free ")
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
                                  createVNode("h1", null, "Learn Smarter with AI-Powered Education"),
                                  createVNode("p", { class: "hero-subtitle" }, " Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations. "),
                                  createVNode("div", { class: "hero-actions" }, [
                                    createVNode(_component_Button, {
                                      to: "/auth/signup",
                                      size: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Start Learning Free")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Button, {
                                      to: "/features",
                                      variant: "secondary",
                                      size: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Explore Features")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Why Choose Skooledin AI?"),
                            createVNode(_component_LayoutGrid, {
                              "auto-fit": true,
                              "min-child-width": "300px",
                              gap: "lg",
                              class: "features-grid"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F916} AI-Powered Tutor"),
                                  createVNode("p", null, "Conversational AI that understands your learning style and adapts to your pace")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4DA} Smart Notebook"),
                                  createVNode("p", null, "AI-enhanced notes with automatic summaries, flashcards, and concept extraction")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F3AF} Personalized Learning"),
                                  createVNode("p", null, "Dynamic context switching between subjects with tailored recommendations")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4F1} Works Offline"),
                                  createVNode("p", null, "Full functionality even without internet - learn anywhere, anytime")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F9E0} Study Tools"),
                                  createVNode("p", null, "Flashcards, quizzes, mind maps, and practice problems with spaced repetition")
                                ]),
                                createVNode("div", { class: "feature-card" }, [
                                  createVNode("h3", null, "\u{1F4CA} Track Progress"),
                                  createVNode("p", null, "Visual analytics to monitor learning progress and identify areas for improvement")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", { class: "cta-section" }, [
                            createVNode(_component_LayoutAligned, { alignment: "center" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h2", null, "Ready to Transform Your Learning?"),
                                  createVNode("p", { class: "cta-description" }, " Join thousands of students already learning smarter with AI "),
                                  createVNode(_component_Button, {
                                    to: "/auth/signup",
                                    size: "lg",
                                    class: "cta-button"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Get Started Free ")
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
                                createVNode("h1", null, "Learn Smarter with AI-Powered Education"),
                                createVNode("p", { class: "hero-subtitle" }, " Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations. "),
                                createVNode("div", { class: "hero-actions" }, [
                                  createVNode(_component_Button, {
                                    to: "/auth/signup",
                                    size: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Start Learning Free")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Button, {
                                    to: "/features",
                                    variant: "secondary",
                                    size: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Explore Features")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Why Choose Skooledin AI?"),
                          createVNode(_component_LayoutGrid, {
                            "auto-fit": true,
                            "min-child-width": "300px",
                            gap: "lg",
                            class: "features-grid"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F916} AI-Powered Tutor"),
                                createVNode("p", null, "Conversational AI that understands your learning style and adapts to your pace")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F4DA} Smart Notebook"),
                                createVNode("p", null, "AI-enhanced notes with automatic summaries, flashcards, and concept extraction")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F3AF} Personalized Learning"),
                                createVNode("p", null, "Dynamic context switching between subjects with tailored recommendations")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F4F1} Works Offline"),
                                createVNode("p", null, "Full functionality even without internet - learn anywhere, anytime")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F9E0} Study Tools"),
                                createVNode("p", null, "Flashcards, quizzes, mind maps, and practice problems with spaced repetition")
                              ]),
                              createVNode("div", { class: "feature-card" }, [
                                createVNode("h3", null, "\u{1F4CA} Track Progress"),
                                createVNode("p", null, "Visual analytics to monitor learning progress and identify areas for improvement")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", { class: "cta-section" }, [
                          createVNode(_component_LayoutAligned, { alignment: "center" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("h2", null, "Ready to Transform Your Learning?"),
                                createVNode("p", { class: "cta-description" }, " Join thousands of students already learning smarter with AI "),
                                createVNode(_component_Button, {
                                  to: "/auth/signup",
                                  size: "lg",
                                  class: "cta-button"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Get Started Free ")
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
                              createVNode("h1", null, "Learn Smarter with AI-Powered Education"),
                              createVNode("p", { class: "hero-subtitle" }, " Your personal AI tutor that adapts to your learning style. Master any subject with interactive conversations. "),
                              createVNode("div", { class: "hero-actions" }, [
                                createVNode(_component_Button, {
                                  to: "/auth/signup",
                                  size: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Start Learning Free")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Button, {
                                  to: "/features",
                                  variant: "secondary",
                                  size: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Explore Features")
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Why Choose Skooledin AI?"),
                        createVNode(_component_LayoutGrid, {
                          "auto-fit": true,
                          "min-child-width": "300px",
                          gap: "lg",
                          class: "features-grid"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F916} AI-Powered Tutor"),
                              createVNode("p", null, "Conversational AI that understands your learning style and adapts to your pace")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F4DA} Smart Notebook"),
                              createVNode("p", null, "AI-enhanced notes with automatic summaries, flashcards, and concept extraction")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F3AF} Personalized Learning"),
                              createVNode("p", null, "Dynamic context switching between subjects with tailored recommendations")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F4F1} Works Offline"),
                              createVNode("p", null, "Full functionality even without internet - learn anywhere, anytime")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F9E0} Study Tools"),
                              createVNode("p", null, "Flashcards, quizzes, mind maps, and practice problems with spaced repetition")
                            ]),
                            createVNode("div", { class: "feature-card" }, [
                              createVNode("h3", null, "\u{1F4CA} Track Progress"),
                              createVNode("p", null, "Visual analytics to monitor learning progress and identify areas for improvement")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", { class: "cta-section" }, [
                        createVNode(_component_LayoutAligned, { alignment: "center" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("h2", null, "Ready to Transform Your Learning?"),
                              createVNode("p", { class: "cta-description" }, " Join thousands of students already learning smarter with AI "),
                              createVNode(_component_Button, {
                                to: "/auth/signup",
                                size: "lg",
                                class: "cta-button"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Get Started Free ")
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e2cb971"]]);

export { index as default };
//# sourceMappingURL=index-T6rzwdRi.mjs.map
