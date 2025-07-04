import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as __nuxt_component_6 } from './LayoutColumn-C8WaSB81.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D4SBA0xZ.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-Bugpmb1I.mjs';
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
import 'firebase/auth';
import 'firebase/firestore';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const greeting = computed(() => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour < 12) return "Good morning";
      if (hour < 17) return "Good afternoon";
      return "Good evening";
    });
    const stats = ref({
      streak: 7,
      points: 1250
    });
    const quickActions = [
      {
        id: "chat",
        label: "AI Chat",
        icon: "heroicons:chat-bubble-bottom-center-text",
        route: "/app/chat",
        color: "purple"
      },
      {
        id: "notebook",
        label: "Notebook",
        icon: "heroicons:book-open",
        route: "/app/notebook",
        color: "blue"
      },
      {
        id: "flashcards",
        label: "Flashcards",
        icon: "heroicons:square-2-stack",
        route: "/app/study/flashcards",
        color: "green"
      },
      {
        id: "quiz",
        label: "Take Quiz",
        icon: "heroicons:clipboard-document-check",
        route: "/app/study/quiz",
        color: "orange"
      }
    ];
    const recentCourses = ref([
      {
        id: "1",
        title: "Advanced Mathematics",
        subject: "Mathematics",
        progress: 65,
        nextLesson: "Calculus: Derivatives",
        thumbnail: "/images/math-course.jpg"
      },
      {
        id: "2",
        title: "Physics Fundamentals",
        subject: "Science",
        progress: 45,
        nextLesson: "Newton's Laws of Motion",
        thumbnail: "/images/physics-course.jpg"
      }
    ]);
    const studyTools = [
      {
        id: "flashcards",
        title: "Flashcards",
        description: "Review and memorize key concepts",
        icon: "heroicons:square-2-stack",
        color: "purple",
        count: 156,
        lastUsed: "Used 2 hours ago",
        route: "/app/study/flashcards"
      },
      {
        id: "quizzes",
        title: "Quizzes",
        description: "Test your knowledge",
        icon: "heroicons:clipboard-document-check",
        color: "green",
        count: 23,
        lastUsed: "Used yesterday",
        route: "/app/study/quiz"
      },
      {
        id: "summaries",
        title: "Summaries",
        description: "Quick revision notes",
        icon: "heroicons:document-text",
        color: "blue",
        count: 48,
        lastUsed: "Used 3 days ago",
        route: "/app/notebook?filter=summary"
      }
    ];
    const showTaskFilter = ref(false);
    const activeFilters = ref(0);
    const upcomingTasks = ref([
      {
        id: "1",
        title: "Math Assignment: Chapter 5",
        subject: "Mathematics",
        dueDate: new Date(Date.now() + 864e5),
        // Tomorrow
        type: "assignment",
        priority: "high"
      },
      {
        id: "2",
        title: "Physics Lab Report",
        subject: "Physics",
        dueDate: new Date(Date.now() + 1728e5),
        // In 2 days
        type: "assignment",
        priority: "medium"
      },
      {
        id: "3",
        title: "History Essay: World War II",
        subject: "History",
        dueDate: new Date(Date.now() + 2592e5),
        // In 3 days
        type: "essay",
        priority: "medium"
      }
    ]);
    const recentActivity = ref([
      {
        id: "1",
        type: "achievement",
        title: "Completed Math Quiz",
        description: "Scored 95% on Algebra Quiz",
        time: new Date(Date.now() - 36e5),
        // 1 hour ago
        icon: "heroicons:trophy",
        color: "yellow"
      },
      {
        id: "2",
        type: "study",
        title: "Studied Physics",
        description: "Reviewed 25 flashcards",
        time: new Date(Date.now() - 72e5),
        // 2 hours ago
        icon: "heroicons:square-2-stack",
        color: "purple"
      },
      {
        id: "3",
        type: "submission",
        title: "Submitted Assignment",
        description: "English Essay submitted",
        time: new Date(Date.now() - 864e5),
        // Yesterday
        icon: "heroicons:document-check",
        color: "green"
      }
    ]);
    const completeTask = (taskId) => {
      upcomingTasks.value = upcomingTasks.value.filter((task) => task.id !== taskId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_Card = resolveComponent("Card");
      const _component_LayoutColumn = __nuxt_component_6;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CourseCard = resolveComponent("CourseCard");
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_Button = resolveComponent("Button");
      const _component_Badge = resolveComponent("Badge");
      const _component_FilterButton = resolveComponent("FilterButton");
      const _component_TaskItem = resolveComponent("TaskItem");
      const _component_ActivityItem = resolveComponent("ActivityItem");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "student-dashboard" }, _attrs))} data-v-3d50e21d>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<section class="dashboard-welcome" data-v-3d50e21d${_scopeId}><div class="welcome-content" data-v-3d50e21d${_scopeId}><h1 class="welcome-title" data-v-3d50e21d${_scopeId}> Welcome back, ${ssrInterpolate(((_b = (_a = unref(user)) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ")[0]) || "Student")}! \u{1F44B} </h1><p class="welcome-subtitle" data-v-3d50e21d${_scopeId}>${ssrInterpolate(unref(greeting))}. Ready to continue learning? </p></div><div class="welcome-stats" data-v-3d50e21d${_scopeId}><div class="stat-card" data-v-3d50e21d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:fire",
              class: "stat-icon stat-icon--streak"
            }, null, _parent2, _scopeId));
            _push2(`<div class="stat-info" data-v-3d50e21d${_scopeId}><p class="stat-value" data-v-3d50e21d${_scopeId}>${ssrInterpolate(unref(stats).streak)}</p><p class="stat-label" data-v-3d50e21d${_scopeId}>Day Streak</p></div></div><div class="stat-card" data-v-3d50e21d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:academic-cap",
              class: "stat-icon stat-icon--points"
            }, null, _parent2, _scopeId));
            _push2(`<div class="stat-info" data-v-3d50e21d${_scopeId}><p class="stat-value" data-v-3d50e21d${_scopeId}>${ssrInterpolate(unref(stats).points)}</p><p class="stat-label" data-v-3d50e21d${_scopeId}>Points</p></div></div></div></section>`);
            _push2(ssrRenderComponent(_component_LayoutStack, {
              gap: "md",
              class: "dashboard-section"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="section-title" data-v-3d50e21d${_scopeId2}>Quick Actions</h2>`);
                  _push3(ssrRenderComponent(_component_LayoutGrid, {
                    cols: "2",
                    md: "4",
                    gap: "md"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(quickActions, (action) => {
                          _push4(ssrRenderComponent(_component_Card, {
                            key: action.id,
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(action.route),
                            class: ["quick-action", `quick-action--${action.color}`],
                            hoverable: ""
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_LayoutColumn, {
                                  align: "center",
                                  gap: "sm"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Icon, {
                                        name: action.icon,
                                        class: "quick-action-icon"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<span class="quick-action-label" data-v-3d50e21d${_scopeId5}>${ssrInterpolate(action.label)}</span>`);
                                    } else {
                                      return [
                                        createVNode(_component_Icon, {
                                          name: action.icon,
                                          class: "quick-action-icon"
                                        }, null, 8, ["name"]),
                                        createVNode("span", { class: "quick-action-label" }, toDisplayString(action.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_LayoutColumn, {
                                    align: "center",
                                    gap: "sm"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: action.icon,
                                        class: "quick-action-icon"
                                      }, null, 8, ["name"]),
                                      createVNode("span", { class: "quick-action-label" }, toDisplayString(action.label), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(quickActions, (action) => {
                            return createVNode(_component_Card, {
                              key: action.id,
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(action.route),
                              class: ["quick-action", `quick-action--${action.color}`],
                              hoverable: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_LayoutColumn, {
                                  align: "center",
                                  gap: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: action.icon,
                                      class: "quick-action-icon"
                                    }, null, 8, ["name"]),
                                    createVNode("span", { class: "quick-action-label" }, toDisplayString(action.label), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick", "class"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h2", { class: "section-title" }, "Quick Actions"),
                    createVNode(_component_LayoutGrid, {
                      cols: "2",
                      md: "4",
                      gap: "md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(quickActions, (action) => {
                          return createVNode(_component_Card, {
                            key: action.id,
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(action.route),
                            class: ["quick-action", `quick-action--${action.color}`],
                            hoverable: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_LayoutColumn, {
                                align: "center",
                                gap: "sm"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: action.icon,
                                    class: "quick-action-icon"
                                  }, null, 8, ["name"]),
                                  createVNode("span", { class: "quick-action-label" }, toDisplayString(action.label), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "class"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutStack, {
              gap: "md",
              class: "dashboard-section"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="section-title" data-v-3d50e21d${_scopeId3}>Continue Learning</h2>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/app/student/courses",
                          class: "section-link"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_LayoutRow, {
                                gap: "xs",
                                align: "center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span data-v-3d50e21d${_scopeId5}>View all courses</span>`);
                                    _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:chevron-right" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", null, "View all courses"),
                                      createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_LayoutRow, {
                                  gap: "xs",
                                  align: "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, "View all courses"),
                                    createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h2", { class: "section-title" }, "Continue Learning"),
                          createVNode(_component_NuxtLink, {
                            to: "/app/student/courses",
                            class: "section-link"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_LayoutRow, {
                                gap: "xs",
                                align: "center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, "View all courses"),
                                  createVNode(_component_Icon, { name: "heroicons:chevron-right" })
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
                  }, _parent3, _scopeId2));
                  if (unref(recentCourses).length > 0) {
                    _push3(ssrRenderComponent(_component_LayoutGrid, {
                      cols: "1",
                      md: "2",
                      gap: "lg"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(recentCourses), (course) => {
                            _push4(ssrRenderComponent(_component_CourseCard, {
                              key: course.id,
                              course,
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`)
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCourses), (course) => {
                              return openBlock(), createBlock(_component_CourseCard, {
                                key: course.id,
                                course,
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`)
                              }, null, 8, ["course", "onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      icon: "heroicons:academic-cap",
                      title: "No courses yet",
                      description: "Start exploring courses to begin your learning journey"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Button, {
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Browse Courses `);
                              } else {
                                return [
                                  createTextVNode(" Browse Courses ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Button, {
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Browse Courses ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode(_component_LayoutRow, {
                      justify: "between",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "section-title" }, "Continue Learning"),
                        createVNode(_component_NuxtLink, {
                          to: "/app/student/courses",
                          class: "section-link"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LayoutRow, {
                              gap: "xs",
                              align: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, "View all courses"),
                                createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(recentCourses).length > 0 ? (openBlock(), createBlock(_component_LayoutGrid, {
                      key: 0,
                      cols: "1",
                      md: "2",
                      gap: "lg"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCourses), (course) => {
                          return openBlock(), createBlock(_component_CourseCard, {
                            key: course.id,
                            course,
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`)
                          }, null, 8, ["course", "onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      icon: "heroicons:academic-cap",
                      title: "No courses yet",
                      description: "Start exploring courses to begin your learning journey"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Browse Courses ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutStack, {
              gap: "md",
              class: "dashboard-section"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="section-title" data-v-3d50e21d${_scopeId2}>Study Tools</h2>`);
                  _push3(ssrRenderComponent(_component_LayoutGrid, {
                    cols: "1",
                    sm: "2",
                    md: "3",
                    gap: "lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(studyTools, (tool) => {
                          _push4(ssrRenderComponent(_component_Card, {
                            key: tool.id,
                            class: "tool-card",
                            hoverable: "",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(tool.route)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_LayoutStack, { gap: "md" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="${ssrRenderClass([`tool-icon--${tool.color}`, "tool-icon"])}" data-v-3d50e21d${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_Icon, {
                                        name: tool.icon
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(_component_LayoutStack, { gap: "sm" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<h3 class="tool-title" data-v-3d50e21d${_scopeId6}>${ssrInterpolate(tool.title)}</h3><p class="tool-description" data-v-3d50e21d${_scopeId6}>${ssrInterpolate(tool.description)}</p>`);
                                          } else {
                                            return [
                                              createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                              createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_LayoutRow, {
                                        justify: "between",
                                        align: "center"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_Badge, {
                                              label: `${tool.count} items`,
                                              variant: "secondary"
                                            }, null, _parent7, _scopeId6));
                                            _push7(`<span class="tool-updated" data-v-3d50e21d${_scopeId6}>${ssrInterpolate(tool.lastUsed)}</span>`);
                                          } else {
                                            return [
                                              createVNode(_component_Badge, {
                                                label: `${tool.count} items`,
                                                variant: "secondary"
                                              }, null, 8, ["label"]),
                                              createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: ["tool-icon", `tool-icon--${tool.color}`]
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: tool.icon
                                          }, null, 8, ["name"])
                                        ], 2),
                                        createVNode(_component_LayoutStack, { gap: "sm" }, {
                                          default: withCtx(() => [
                                            createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                            createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_LayoutRow, {
                                          justify: "between",
                                          align: "center"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_Badge, {
                                              label: `${tool.count} items`,
                                              variant: "secondary"
                                            }, null, 8, ["label"]),
                                            createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_LayoutStack, { gap: "md" }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: ["tool-icon", `tool-icon--${tool.color}`]
                                      }, [
                                        createVNode(_component_Icon, {
                                          name: tool.icon
                                        }, null, 8, ["name"])
                                      ], 2),
                                      createVNode(_component_LayoutStack, { gap: "sm" }, {
                                        default: withCtx(() => [
                                          createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                          createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_LayoutRow, {
                                        justify: "between",
                                        align: "center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Badge, {
                                            label: `${tool.count} items`,
                                            variant: "secondary"
                                          }, null, 8, ["label"]),
                                          createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(studyTools, (tool) => {
                            return createVNode(_component_Card, {
                              key: tool.id,
                              class: "tool-card",
                              hoverable: "",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(tool.route)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_LayoutStack, { gap: "md" }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: ["tool-icon", `tool-icon--${tool.color}`]
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: tool.icon
                                      }, null, 8, ["name"])
                                    ], 2),
                                    createVNode(_component_LayoutStack, { gap: "sm" }, {
                                      default: withCtx(() => [
                                        createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                        createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_LayoutRow, {
                                      justify: "between",
                                      align: "center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Badge, {
                                          label: `${tool.count} items`,
                                          variant: "secondary"
                                        }, null, 8, ["label"]),
                                        createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h2", { class: "section-title" }, "Study Tools"),
                    createVNode(_component_LayoutGrid, {
                      cols: "1",
                      sm: "2",
                      md: "3",
                      gap: "lg"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(studyTools, (tool) => {
                          return createVNode(_component_Card, {
                            key: tool.id,
                            class: "tool-card",
                            hoverable: "",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(tool.route)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_LayoutStack, { gap: "md" }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: ["tool-icon", `tool-icon--${tool.color}`]
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: tool.icon
                                    }, null, 8, ["name"])
                                  ], 2),
                                  createVNode(_component_LayoutStack, { gap: "sm" }, {
                                    default: withCtx(() => [
                                      createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                      createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_LayoutRow, {
                                    justify: "between",
                                    align: "center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Badge, {
                                        label: `${tool.count} items`,
                                        variant: "secondary"
                                      }, null, 8, ["label"]),
                                      createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutStack, {
              gap: "md",
              class: "dashboard-section"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="section-title" data-v-3d50e21d${_scopeId3}>Upcoming Tasks</h2>`);
                        _push4(ssrRenderComponent(_component_FilterButton, {
                          "active-count": unref(activeFilters),
                          onClick: ($event) => showTaskFilter.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h2", { class: "section-title" }, "Upcoming Tasks"),
                          createVNode(_component_FilterButton, {
                            "active-count": unref(activeFilters),
                            onClick: ($event) => showTaskFilter.value = true
                          }, null, 8, ["active-count", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(upcomingTasks).length > 0) {
                    _push3(ssrRenderComponent(_component_LayoutStack, { gap: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(upcomingTasks), (task) => {
                            _push4(ssrRenderComponent(_component_TaskItem, {
                              key: task.id,
                              task,
                              onComplete: ($event) => completeTask(task.id),
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/tasks/${task.id}`)
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(upcomingTasks), (task) => {
                              return openBlock(), createBlock(_component_TaskItem, {
                                key: task.id,
                                task,
                                onComplete: ($event) => completeTask(task.id),
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/tasks/${task.id}`)
                              }, null, 8, ["task", "onComplete", "onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      icon: "heroicons:clipboard-document-check",
                      title: "All caught up!",
                      description: "You have no pending tasks"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode(_component_LayoutRow, {
                      justify: "between",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "section-title" }, "Upcoming Tasks"),
                        createVNode(_component_FilterButton, {
                          "active-count": unref(activeFilters),
                          onClick: ($event) => showTaskFilter.value = true
                        }, null, 8, ["active-count", "onClick"])
                      ]),
                      _: 1
                    }),
                    unref(upcomingTasks).length > 0 ? (openBlock(), createBlock(_component_LayoutStack, {
                      key: 0,
                      gap: "sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(upcomingTasks), (task) => {
                          return openBlock(), createBlock(_component_TaskItem, {
                            key: task.id,
                            task,
                            onComplete: ($event) => completeTask(task.id),
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/tasks/${task.id}`)
                          }, null, 8, ["task", "onComplete", "onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      icon: "heroicons:clipboard-document-check",
                      title: "All caught up!",
                      description: "You have no pending tasks"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutStack, {
              gap: "md",
              class: "dashboard-section"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="section-title" data-v-3d50e21d${_scopeId3}>Recent Activity</h2>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/app/student/activity",
                          class: "section-link"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_LayoutRow, {
                                gap: "xs",
                                align: "center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span data-v-3d50e21d${_scopeId5}>View all</span>`);
                                    _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:chevron-right" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", null, "View all"),
                                      createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_LayoutRow, {
                                  gap: "xs",
                                  align: "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, "View all"),
                                    createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h2", { class: "section-title" }, "Recent Activity"),
                          createVNode(_component_NuxtLink, {
                            to: "/app/student/activity",
                            class: "section-link"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_LayoutRow, {
                                gap: "xs",
                                align: "center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, "View all"),
                                  createVNode(_component_Icon, { name: "heroicons:chevron-right" })
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutStack, { gap: "md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(recentActivity), (activity) => {
                          _push4(ssrRenderComponent(_component_ActivityItem, {
                            key: activity.id,
                            activity
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                            return openBlock(), createBlock(_component_ActivityItem, {
                              key: activity.id,
                              activity
                            }, null, 8, ["activity"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutRow, {
                      justify: "between",
                      align: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "section-title" }, "Recent Activity"),
                        createVNode(_component_NuxtLink, {
                          to: "/app/student/activity",
                          class: "section-link"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LayoutRow, {
                              gap: "xs",
                              align: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, "View all"),
                                createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LayoutStack, { gap: "md" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                          return openBlock(), createBlock(_component_ActivityItem, {
                            key: activity.id,
                            activity
                          }, null, 8, ["activity"]);
                        }), 128))
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
              createVNode("section", { class: "dashboard-welcome" }, [
                createVNode("div", { class: "welcome-content" }, [
                  createVNode("h1", { class: "welcome-title" }, " Welcome back, " + toDisplayString(((_d = (_c = unref(user)) == null ? void 0 : _c.name) == null ? void 0 : _d.split(" ")[0]) || "Student") + "! \u{1F44B} ", 1),
                  createVNode("p", { class: "welcome-subtitle" }, toDisplayString(unref(greeting)) + ". Ready to continue learning? ", 1)
                ]),
                createVNode("div", { class: "welcome-stats" }, [
                  createVNode("div", { class: "stat-card" }, [
                    createVNode(_component_Icon, {
                      name: "heroicons:fire",
                      class: "stat-icon stat-icon--streak"
                    }),
                    createVNode("div", { class: "stat-info" }, [
                      createVNode("p", { class: "stat-value" }, toDisplayString(unref(stats).streak), 1),
                      createVNode("p", { class: "stat-label" }, "Day Streak")
                    ])
                  ]),
                  createVNode("div", { class: "stat-card" }, [
                    createVNode(_component_Icon, {
                      name: "heroicons:academic-cap",
                      class: "stat-icon stat-icon--points"
                    }),
                    createVNode("div", { class: "stat-info" }, [
                      createVNode("p", { class: "stat-value" }, toDisplayString(unref(stats).points), 1),
                      createVNode("p", { class: "stat-label" }, "Points")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_LayoutStack, {
                gap: "md",
                class: "dashboard-section"
              }, {
                default: withCtx(() => [
                  createVNode("h2", { class: "section-title" }, "Quick Actions"),
                  createVNode(_component_LayoutGrid, {
                    cols: "2",
                    md: "4",
                    gap: "md"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(quickActions, (action) => {
                        return createVNode(_component_Card, {
                          key: action.id,
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(action.route),
                          class: ["quick-action", `quick-action--${action.color}`],
                          hoverable: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LayoutColumn, {
                              align: "center",
                              gap: "sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: action.icon,
                                  class: "quick-action-icon"
                                }, null, 8, ["name"]),
                                createVNode("span", { class: "quick-action-label" }, toDisplayString(action.label), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "class"]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_LayoutStack, {
                gap: "md",
                class: "dashboard-section"
              }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "section-title" }, "Continue Learning"),
                      createVNode(_component_NuxtLink, {
                        to: "/app/student/courses",
                        class: "section-link"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_LayoutRow, {
                            gap: "xs",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "View all courses"),
                              createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  unref(recentCourses).length > 0 ? (openBlock(), createBlock(_component_LayoutGrid, {
                    key: 0,
                    cols: "1",
                    md: "2",
                    gap: "lg"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCourses), (course) => {
                        return openBlock(), createBlock(_component_CourseCard, {
                          key: course.id,
                          course,
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`)
                        }, null, 8, ["course", "onClick"]);
                      }), 128))
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    icon: "heroicons:academic-cap",
                    title: "No courses yet",
                    description: "Start exploring courses to begin your learning journey"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Browse Courses ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_LayoutStack, {
                gap: "md",
                class: "dashboard-section"
              }, {
                default: withCtx(() => [
                  createVNode("h2", { class: "section-title" }, "Study Tools"),
                  createVNode(_component_LayoutGrid, {
                    cols: "1",
                    sm: "2",
                    md: "3",
                    gap: "lg"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(studyTools, (tool) => {
                        return createVNode(_component_Card, {
                          key: tool.id,
                          class: "tool-card",
                          hoverable: "",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(tool.route)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LayoutStack, { gap: "md" }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: ["tool-icon", `tool-icon--${tool.color}`]
                                }, [
                                  createVNode(_component_Icon, {
                                    name: tool.icon
                                  }, null, 8, ["name"])
                                ], 2),
                                createVNode(_component_LayoutStack, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode("h3", { class: "tool-title" }, toDisplayString(tool.title), 1),
                                    createVNode("p", { class: "tool-description" }, toDisplayString(tool.description), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_LayoutRow, {
                                  justify: "between",
                                  align: "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Badge, {
                                      label: `${tool.count} items`,
                                      variant: "secondary"
                                    }, null, 8, ["label"]),
                                    createVNode("span", { class: "tool-updated" }, toDisplayString(tool.lastUsed), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_LayoutStack, {
                gap: "md",
                class: "dashboard-section"
              }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "section-title" }, "Upcoming Tasks"),
                      createVNode(_component_FilterButton, {
                        "active-count": unref(activeFilters),
                        onClick: ($event) => showTaskFilter.value = true
                      }, null, 8, ["active-count", "onClick"])
                    ]),
                    _: 1
                  }),
                  unref(upcomingTasks).length > 0 ? (openBlock(), createBlock(_component_LayoutStack, {
                    key: 0,
                    gap: "sm"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(upcomingTasks), (task) => {
                        return openBlock(), createBlock(_component_TaskItem, {
                          key: task.id,
                          task,
                          onComplete: ($event) => completeTask(task.id),
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/tasks/${task.id}`)
                        }, null, 8, ["task", "onComplete", "onClick"]);
                      }), 128))
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    icon: "heroicons:clipboard-document-check",
                    title: "All caught up!",
                    description: "You have no pending tasks"
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_LayoutStack, {
                gap: "md",
                class: "dashboard-section"
              }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutRow, {
                    justify: "between",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "section-title" }, "Recent Activity"),
                      createVNode(_component_NuxtLink, {
                        to: "/app/student/activity",
                        class: "section-link"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_LayoutRow, {
                            gap: "xs",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "View all"),
                              createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LayoutStack, { gap: "md" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                        return openBlock(), createBlock(_component_ActivityItem, {
                          key: activity.id,
                          activity
                        }, null, 8, ["activity"]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/student/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d50e21d"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-DLS0b5AT.mjs.map
