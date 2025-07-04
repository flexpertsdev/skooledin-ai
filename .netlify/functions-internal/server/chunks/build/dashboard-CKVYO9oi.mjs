import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-D4SBA0xZ.mjs';
import { _ as _export_sfc, u as useHead, b as useNuxtApp, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-Bugpmb1I.mjs';
import { u as useTeacherStore } from './teacher-CeEGmGYr.mjs';
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
    useHead({
      title: "Teacher Dashboard - Skooledin AI",
      meta: [
        {
          name: "description",
          content: "Manage your classes, students, and assignments"
        }
      ]
    });
    const authStore = useAuthStore();
    const teacherStore = useTeacherStore();
    const { $toast } = useNuxtApp();
    const activitySort = ref("recent");
    const performanceView = ref("chart");
    const showAnnouncementModal = ref(false);
    const user = computed(() => authStore.user);
    const currentGreeting = computed(() => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour < 12) return "Good morning! Here's your teaching overview for today";
      if (hour < 17) return "Good afternoon! Here's what's happening in your classes";
      return "Good evening! Here's a summary of your teaching activities";
    });
    const stats = computed(() => teacherStore.dashboardStats);
    const todaySchedule = computed(() => teacherStore.todaySchedule);
    const recentActivity = computed(() => teacherStore.recentActivity);
    const performanceData = computed(() => teacherStore.classPerformance);
    const activitySortOptions = [
      { value: "recent", label: "Most Recent" },
      { value: "priority", label: "Priority" },
      { value: "type", label: "Activity Type" }
    ];
    const handleActivityAction = async (activity, action) => {
      try {
        await teacherStore.handleActivityAction(activity.id, action);
        $toast.success("Action completed successfully");
      } catch (error) {
        $toast.error("Failed to complete action");
      }
    };
    const viewClassDetails = (classId) => {
      navigateTo(`/app/teacher/classes/${classId}/analytics`);
    };
    const sendAnnouncement = async (data) => {
      try {
        await teacherStore.sendAnnouncement(data);
        $toast.success("Announcement sent successfully");
        showAnnouncementModal.value = false;
      } catch (error) {
        $toast.error("Failed to send announcement");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_Button = resolveComponent("Button");
      const _component_Icon = resolveComponent("Icon");
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_ScheduleItem = resolveComponent("ScheduleItem");
      const _component_SortDropdown = resolveComponent("SortDropdown");
      const _component_ActivityItem = resolveComponent("ActivityItem");
      const _component_QuickActionCard = resolveComponent("QuickActionCard");
      const _component_ViewToggle = resolveComponent("ViewToggle");
      const _component_ClassPerformanceChart = resolveComponent("ClassPerformanceChart");
      const _component_ClassPerformanceTable = resolveComponent("ClassPerformanceTable");
      const _component_AnnouncementModal = resolveComponent("AnnouncementModal");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { gap: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="welcome-section" data-v-98846b17${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b, _c, _d;
                            if (_push5) {
                              _push5(`<div data-v-98846b17${_scopeId4}><h1 class="welcome-title" data-v-98846b17${_scopeId4}>Welcome back, ${ssrInterpolate((_b = (_a = unref(user)) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ")[0])}</h1><p class="welcome-subtitle" data-v-98846b17${_scopeId4}>${ssrInterpolate(unref(currentGreeting))}</p></div>`);
                              _push5(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Button, {
                                      variant: "secondary",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:calendar" }, null, _parent7, _scopeId6));
                                          _push7(` View Schedule `);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                            createTextVNode(" View Schedule ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_Button, {
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent7, _scopeId6));
                                          _push7(` Create Class `);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:plus" }),
                                            createTextVNode(" Create Class ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Button, {
                                        variant: "secondary",
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                          createTextVNode(" View Schedule ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(_component_Button, {
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:plus" }),
                                          createTextVNode(" Create Class ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("h1", { class: "welcome-title" }, "Welcome back, " + toDisplayString((_d = (_c = unref(user)) == null ? void 0 : _c.name) == null ? void 0 : _d.split(" ")[0]), 1),
                                  createVNode("p", { class: "welcome-subtitle" }, toDisplayString(unref(currentGreeting)), 1)
                                ]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: "secondary",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                        createTextVNode(" View Schedule ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(_component_Button, {
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:plus" }),
                                        createTextVNode(" Create Class ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: "1",
                          sm: "2",
                          lg: "4",
                          gap: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="stat-card" data-v-98846b17${_scopeId4}><div class="stat-icon stat-icon-classes" data-v-98846b17${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:user-group" }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="stat-content" data-v-98846b17${_scopeId4}><h3 class="stat-value" data-v-98846b17${_scopeId4}>${ssrInterpolate(unref(stats).totalClasses)}</h3><p class="stat-label" data-v-98846b17${_scopeId4}>Active Classes</p></div></div><div class="stat-card" data-v-98846b17${_scopeId4}><div class="stat-icon stat-icon-students" data-v-98846b17${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:academic-cap" }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="stat-content" data-v-98846b17${_scopeId4}><h3 class="stat-value" data-v-98846b17${_scopeId4}>${ssrInterpolate(unref(stats).totalStudents)}</h3><p class="stat-label" data-v-98846b17${_scopeId4}>Total Students</p></div></div><div class="stat-card" data-v-98846b17${_scopeId4}><div class="stat-icon stat-icon-assignments" data-v-98846b17${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:clipboard-document-list" }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="stat-content" data-v-98846b17${_scopeId4}><h3 class="stat-value" data-v-98846b17${_scopeId4}>${ssrInterpolate(unref(stats).pendingAssignments)}</h3><p class="stat-label" data-v-98846b17${_scopeId4}>Pending Reviews</p></div></div><div class="stat-card" data-v-98846b17${_scopeId4}><div class="stat-icon stat-icon-messages" data-v-98846b17${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:chat-bubble-bottom-center-text" }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="stat-content" data-v-98846b17${_scopeId4}><h3 class="stat-value" data-v-98846b17${_scopeId4}>${ssrInterpolate(unref(stats).unreadMessages)}</h3><p class="stat-label" data-v-98846b17${_scopeId4}>Unread Messages</p></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "stat-card" }, [
                                  createVNode("div", { class: "stat-icon stat-icon-classes" }, [
                                    createVNode(_component_Icon, { name: "heroicons:user-group" })
                                  ]),
                                  createVNode("div", { class: "stat-content" }, [
                                    createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalClasses), 1),
                                    createVNode("p", { class: "stat-label" }, "Active Classes")
                                  ])
                                ]),
                                createVNode("div", { class: "stat-card" }, [
                                  createVNode("div", { class: "stat-icon stat-icon-students" }, [
                                    createVNode(_component_Icon, { name: "heroicons:academic-cap" })
                                  ]),
                                  createVNode("div", { class: "stat-content" }, [
                                    createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalStudents), 1),
                                    createVNode("p", { class: "stat-label" }, "Total Students")
                                  ])
                                ]),
                                createVNode("div", { class: "stat-card" }, [
                                  createVNode("div", { class: "stat-icon stat-icon-assignments" }, [
                                    createVNode(_component_Icon, { name: "heroicons:clipboard-document-list" })
                                  ]),
                                  createVNode("div", { class: "stat-content" }, [
                                    createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).pendingAssignments), 1),
                                    createVNode("p", { class: "stat-label" }, "Pending Reviews")
                                  ])
                                ]),
                                createVNode("div", { class: "stat-card" }, [
                                  createVNode("div", { class: "stat-icon stat-icon-messages" }, [
                                    createVNode(_component_Icon, { name: "heroicons:chat-bubble-bottom-center-text" })
                                  ]),
                                  createVNode("div", { class: "stat-content" }, [
                                    createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).unreadMessages), 1),
                                    createVNode("p", { class: "stat-label" }, "Unread Messages")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<section class="dashboard-section" data-v-98846b17${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h2 class="section-title" data-v-98846b17${_scopeId4}>Today&#39;s Schedule</h2>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, {
                                to: "/app/teacher/schedule",
                                class: "section-link"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_LayoutRow, {
                                      gap: "xs",
                                      align: "center"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span data-v-98846b17${_scopeId6}>View full schedule</span>`);
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:chevron-right" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("span", null, "View full schedule"),
                                            createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_LayoutRow, {
                                        gap: "xs",
                                        align: "center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("span", null, "View full schedule"),
                                          createVNode(_component_Icon, { name: "heroicons:chevron-right" })
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
                                createVNode("h2", { class: "section-title" }, "Today's Schedule"),
                                createVNode(_component_NuxtLink, {
                                  to: "/app/teacher/schedule",
                                  class: "section-link"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_LayoutRow, {
                                      gap: "xs",
                                      align: "center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, "View full schedule"),
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutStack, {
                          gap: "md",
                          class: "schedule-list"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(todaySchedule).length === 0) {
                                _push5(`<div class="empty-schedule" data-v-98846b17${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "heroicons:calendar-days",
                                  size: "24"
                                }, null, _parent5, _scopeId4));
                                _push5(`<p data-v-98846b17${_scopeId4}>No classes scheduled for today</p></div>`);
                              } else {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(todaySchedule), (item) => {
                                  _push5(ssrRenderComponent(_component_ScheduleItem, {
                                    key: item.id,
                                    schedule: item,
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/teacher/classes/${item.classId}`)
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              }
                            } else {
                              return [
                                unref(todaySchedule).length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "empty-schedule"
                                }, [
                                  createVNode(_component_Icon, {
                                    name: "heroicons:calendar-days",
                                    size: "24"
                                  }),
                                  createVNode("p", null, "No classes scheduled for today")
                                ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(todaySchedule), (item) => {
                                  return openBlock(), createBlock(_component_ScheduleItem, {
                                    key: item.id,
                                    schedule: item,
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/teacher/classes/${item.classId}`)
                                  }, null, 8, ["schedule", "onClick"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section class="dashboard-section" data-v-98846b17${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h2 class="section-title" data-v-98846b17${_scopeId4}>Recent Activity</h2>`);
                              _push5(ssrRenderComponent(_component_SortDropdown, {
                                modelValue: unref(activitySort),
                                "onUpdate:modelValue": ($event) => isRef(activitySort) ? activitySort.value = $event : null,
                                options: activitySortOptions,
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("h2", { class: "section-title" }, "Recent Activity"),
                                createVNode(_component_SortDropdown, {
                                  modelValue: unref(activitySort),
                                  "onUpdate:modelValue": ($event) => isRef(activitySort) ? activitySort.value = $event : null,
                                  options: activitySortOptions,
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutStack, {
                          gap: "md",
                          class: "activity-list"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(recentActivity), (activity) => {
                                _push5(ssrRenderComponent(_component_ActivityItem, {
                                  key: activity.id,
                                  activity,
                                  onAction: handleActivityAction
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                                  return openBlock(), createBlock(_component_ActivityItem, {
                                    key: activity.id,
                                    activity,
                                    onAction: handleActivityAction
                                  }, null, 8, ["activity"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section class="dashboard-section" data-v-98846b17${_scopeId3}><h2 class="section-title" data-v-98846b17${_scopeId3}>Quick Actions</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: "1",
                          sm: "2",
                          lg: "3",
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:document-plus",
                                title: "Create Assignment",
                                description: "Design new assignments for your classes",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/assignments/new")
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:clipboard-document-check",
                                title: "Grade Submissions",
                                description: "Review and grade student submissions",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/grading")
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:chart-bar",
                                title: "View Analytics",
                                description: "Track student progress and performance",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/analytics")
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:users",
                                title: "Manage Students",
                                description: "Add or remove students from classes",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/students")
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:megaphone",
                                title: "Send Announcement",
                                description: "Broadcast messages to your classes",
                                onClick: ($event) => showAnnouncementModal.value = true
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_QuickActionCard, {
                                icon: "heroicons:video-camera",
                                title: "Schedule Meeting",
                                description: "Set up virtual classroom sessions",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/meetings/new")
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:document-plus",
                                  title: "Create Assignment",
                                  description: "Design new assignments for your classes",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/assignments/new")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:clipboard-document-check",
                                  title: "Grade Submissions",
                                  description: "Review and grade student submissions",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/grading")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:chart-bar",
                                  title: "View Analytics",
                                  description: "Track student progress and performance",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/analytics")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:users",
                                  title: "Manage Students",
                                  description: "Add or remove students from classes",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/students")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:megaphone",
                                  title: "Send Announcement",
                                  description: "Broadcast messages to your classes",
                                  onClick: ($event) => showAnnouncementModal.value = true
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:video-camera",
                                  title: "Schedule Meeting",
                                  description: "Set up virtual classroom sessions",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/meetings/new")
                                }, null, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section class="dashboard-section" data-v-98846b17${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h2 class="section-title" data-v-98846b17${_scopeId4}>Class Performance</h2>`);
                              _push5(ssrRenderComponent(_component_ViewToggle, {
                                modelValue: unref(performanceView),
                                "onUpdate:modelValue": ($event) => isRef(performanceView) ? performanceView.value = $event : null,
                                options: ["chart", "table"],
                                size: "sm"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("h2", { class: "section-title" }, "Class Performance"),
                                createVNode(_component_ViewToggle, {
                                  modelValue: unref(performanceView),
                                  "onUpdate:modelValue": ($event) => isRef(performanceView) ? performanceView.value = $event : null,
                                  options: ["chart", "table"],
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="performance-container" data-v-98846b17${_scopeId3}>`);
                        if (unref(performanceView) === "chart") {
                          _push4(ssrRenderComponent(_component_ClassPerformanceChart, { data: unref(performanceData) }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_component_ClassPerformanceTable, {
                            data: unref(performanceData),
                            onViewDetails: viewClassDetails
                          }, null, _parent4, _scopeId3));
                        }
                        _push4(`</div></section>`);
                      } else {
                        return [
                          createVNode("div", { class: "welcome-section" }, [
                            createVNode(_component_LayoutRow, {
                              justify: "between",
                              align: "center",
                              responsive: ""
                            }, {
                              default: withCtx(() => {
                                var _a, _b;
                                return [
                                  createVNode("div", null, [
                                    createVNode("h1", { class: "welcome-title" }, "Welcome back, " + toDisplayString((_b = (_a = unref(user)) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ")[0]), 1),
                                    createVNode("p", { class: "welcome-subtitle" }, toDisplayString(unref(currentGreeting)), 1)
                                  ]),
                                  createVNode(_component_LayoutRow, { gap: "sm" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, {
                                        variant: "secondary",
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                          createTextVNode(" View Schedule ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(_component_Button, {
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:plus" }),
                                          createTextVNode(" Create Class ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }),
                              _: 1
                            })
                          ]),
                          createVNode(_component_LayoutGrid, {
                            cols: "1",
                            sm: "2",
                            lg: "4",
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "stat-card" }, [
                                createVNode("div", { class: "stat-icon stat-icon-classes" }, [
                                  createVNode(_component_Icon, { name: "heroicons:user-group" })
                                ]),
                                createVNode("div", { class: "stat-content" }, [
                                  createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalClasses), 1),
                                  createVNode("p", { class: "stat-label" }, "Active Classes")
                                ])
                              ]),
                              createVNode("div", { class: "stat-card" }, [
                                createVNode("div", { class: "stat-icon stat-icon-students" }, [
                                  createVNode(_component_Icon, { name: "heroicons:academic-cap" })
                                ]),
                                createVNode("div", { class: "stat-content" }, [
                                  createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalStudents), 1),
                                  createVNode("p", { class: "stat-label" }, "Total Students")
                                ])
                              ]),
                              createVNode("div", { class: "stat-card" }, [
                                createVNode("div", { class: "stat-icon stat-icon-assignments" }, [
                                  createVNode(_component_Icon, { name: "heroicons:clipboard-document-list" })
                                ]),
                                createVNode("div", { class: "stat-content" }, [
                                  createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).pendingAssignments), 1),
                                  createVNode("p", { class: "stat-label" }, "Pending Reviews")
                                ])
                              ]),
                              createVNode("div", { class: "stat-card" }, [
                                createVNode("div", { class: "stat-icon stat-icon-messages" }, [
                                  createVNode(_component_Icon, { name: "heroicons:chat-bubble-bottom-center-text" })
                                ]),
                                createVNode("div", { class: "stat-content" }, [
                                  createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).unreadMessages), 1),
                                  createVNode("p", { class: "stat-label" }, "Unread Messages")
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("section", { class: "dashboard-section" }, [
                            createVNode(_component_LayoutRow, {
                              justify: "between",
                              align: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "section-title" }, "Today's Schedule"),
                                createVNode(_component_NuxtLink, {
                                  to: "/app/teacher/schedule",
                                  class: "section-link"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_LayoutRow, {
                                      gap: "xs",
                                      align: "center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, "View full schedule"),
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
                            createVNode(_component_LayoutStack, {
                              gap: "md",
                              class: "schedule-list"
                            }, {
                              default: withCtx(() => [
                                unref(todaySchedule).length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "empty-schedule"
                                }, [
                                  createVNode(_component_Icon, {
                                    name: "heroicons:calendar-days",
                                    size: "24"
                                  }),
                                  createVNode("p", null, "No classes scheduled for today")
                                ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(todaySchedule), (item) => {
                                  return openBlock(), createBlock(_component_ScheduleItem, {
                                    key: item.id,
                                    schedule: item,
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/teacher/classes/${item.classId}`)
                                  }, null, 8, ["schedule", "onClick"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", { class: "dashboard-section" }, [
                            createVNode(_component_LayoutRow, {
                              justify: "between",
                              align: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "section-title" }, "Recent Activity"),
                                createVNode(_component_SortDropdown, {
                                  modelValue: unref(activitySort),
                                  "onUpdate:modelValue": ($event) => isRef(activitySort) ? activitySort.value = $event : null,
                                  options: activitySortOptions,
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutStack, {
                              gap: "md",
                              class: "activity-list"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                                  return openBlock(), createBlock(_component_ActivityItem, {
                                    key: activity.id,
                                    activity,
                                    onAction: handleActivityAction
                                  }, null, 8, ["activity"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", { class: "dashboard-section" }, [
                            createVNode("h2", { class: "section-title" }, "Quick Actions"),
                            createVNode(_component_LayoutGrid, {
                              cols: "1",
                              sm: "2",
                              lg: "3",
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:document-plus",
                                  title: "Create Assignment",
                                  description: "Design new assignments for your classes",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/assignments/new")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:clipboard-document-check",
                                  title: "Grade Submissions",
                                  description: "Review and grade student submissions",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/grading")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:chart-bar",
                                  title: "View Analytics",
                                  description: "Track student progress and performance",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/analytics")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:users",
                                  title: "Manage Students",
                                  description: "Add or remove students from classes",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/students")
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:megaphone",
                                  title: "Send Announcement",
                                  description: "Broadcast messages to your classes",
                                  onClick: ($event) => showAnnouncementModal.value = true
                                }, null, 8, ["onClick"]),
                                createVNode(_component_QuickActionCard, {
                                  icon: "heroicons:video-camera",
                                  title: "Schedule Meeting",
                                  description: "Set up virtual classroom sessions",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/meetings/new")
                                }, null, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", { class: "dashboard-section" }, [
                            createVNode(_component_LayoutRow, {
                              justify: "between",
                              align: "center"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "section-title" }, "Class Performance"),
                                createVNode(_component_ViewToggle, {
                                  modelValue: unref(performanceView),
                                  "onUpdate:modelValue": ($event) => isRef(performanceView) ? performanceView.value = $event : null,
                                  options: ["chart", "table"],
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "performance-container" }, [
                              unref(performanceView) === "chart" ? (openBlock(), createBlock(_component_ClassPerformanceChart, {
                                key: 0,
                                data: unref(performanceData)
                              }, null, 8, ["data"])) : (openBlock(), createBlock(_component_ClassPerformanceTable, {
                                key: 1,
                                data: unref(performanceData),
                                onViewDetails: viewClassDetails
                              }, null, 8, ["data"]))
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutStack, { gap: "xl" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "welcome-section" }, [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center",
                            responsive: ""
                          }, {
                            default: withCtx(() => {
                              var _a, _b;
                              return [
                                createVNode("div", null, [
                                  createVNode("h1", { class: "welcome-title" }, "Welcome back, " + toDisplayString((_b = (_a = unref(user)) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ")[0]), 1),
                                  createVNode("p", { class: "welcome-subtitle" }, toDisplayString(unref(currentGreeting)), 1)
                                ]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: "secondary",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                        createTextVNode(" View Schedule ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(_component_Button, {
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:plus" }),
                                        createTextVNode(" Create Class ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        createVNode(_component_LayoutGrid, {
                          cols: "1",
                          sm: "2",
                          lg: "4",
                          gap: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "stat-card" }, [
                              createVNode("div", { class: "stat-icon stat-icon-classes" }, [
                                createVNode(_component_Icon, { name: "heroicons:user-group" })
                              ]),
                              createVNode("div", { class: "stat-content" }, [
                                createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalClasses), 1),
                                createVNode("p", { class: "stat-label" }, "Active Classes")
                              ])
                            ]),
                            createVNode("div", { class: "stat-card" }, [
                              createVNode("div", { class: "stat-icon stat-icon-students" }, [
                                createVNode(_component_Icon, { name: "heroicons:academic-cap" })
                              ]),
                              createVNode("div", { class: "stat-content" }, [
                                createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalStudents), 1),
                                createVNode("p", { class: "stat-label" }, "Total Students")
                              ])
                            ]),
                            createVNode("div", { class: "stat-card" }, [
                              createVNode("div", { class: "stat-icon stat-icon-assignments" }, [
                                createVNode(_component_Icon, { name: "heroicons:clipboard-document-list" })
                              ]),
                              createVNode("div", { class: "stat-content" }, [
                                createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).pendingAssignments), 1),
                                createVNode("p", { class: "stat-label" }, "Pending Reviews")
                              ])
                            ]),
                            createVNode("div", { class: "stat-card" }, [
                              createVNode("div", { class: "stat-icon stat-icon-messages" }, [
                                createVNode(_component_Icon, { name: "heroicons:chat-bubble-bottom-center-text" })
                              ]),
                              createVNode("div", { class: "stat-content" }, [
                                createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).unreadMessages), 1),
                                createVNode("p", { class: "stat-label" }, "Unread Messages")
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("section", { class: "dashboard-section" }, [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "section-title" }, "Today's Schedule"),
                              createVNode(_component_NuxtLink, {
                                to: "/app/teacher/schedule",
                                class: "section-link"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_LayoutRow, {
                                    gap: "xs",
                                    align: "center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, "View full schedule"),
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
                          createVNode(_component_LayoutStack, {
                            gap: "md",
                            class: "schedule-list"
                          }, {
                            default: withCtx(() => [
                              unref(todaySchedule).length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "empty-schedule"
                              }, [
                                createVNode(_component_Icon, {
                                  name: "heroicons:calendar-days",
                                  size: "24"
                                }),
                                createVNode("p", null, "No classes scheduled for today")
                              ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(todaySchedule), (item) => {
                                return openBlock(), createBlock(_component_ScheduleItem, {
                                  key: item.id,
                                  schedule: item,
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/teacher/classes/${item.classId}`)
                                }, null, 8, ["schedule", "onClick"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", { class: "dashboard-section" }, [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "section-title" }, "Recent Activity"),
                              createVNode(_component_SortDropdown, {
                                modelValue: unref(activitySort),
                                "onUpdate:modelValue": ($event) => isRef(activitySort) ? activitySort.value = $event : null,
                                options: activitySortOptions,
                                size: "sm"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutStack, {
                            gap: "md",
                            class: "activity-list"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                                return openBlock(), createBlock(_component_ActivityItem, {
                                  key: activity.id,
                                  activity,
                                  onAction: handleActivityAction
                                }, null, 8, ["activity"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", { class: "dashboard-section" }, [
                          createVNode("h2", { class: "section-title" }, "Quick Actions"),
                          createVNode(_component_LayoutGrid, {
                            cols: "1",
                            sm: "2",
                            lg: "3",
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:document-plus",
                                title: "Create Assignment",
                                description: "Design new assignments for your classes",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/assignments/new")
                              }, null, 8, ["onClick"]),
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:clipboard-document-check",
                                title: "Grade Submissions",
                                description: "Review and grade student submissions",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/grading")
                              }, null, 8, ["onClick"]),
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:chart-bar",
                                title: "View Analytics",
                                description: "Track student progress and performance",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/analytics")
                              }, null, 8, ["onClick"]),
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:users",
                                title: "Manage Students",
                                description: "Add or remove students from classes",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/students")
                              }, null, 8, ["onClick"]),
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:megaphone",
                                title: "Send Announcement",
                                description: "Broadcast messages to your classes",
                                onClick: ($event) => showAnnouncementModal.value = true
                              }, null, 8, ["onClick"]),
                              createVNode(_component_QuickActionCard, {
                                icon: "heroicons:video-camera",
                                title: "Schedule Meeting",
                                description: "Set up virtual classroom sessions",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/meetings/new")
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", { class: "dashboard-section" }, [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("h2", { class: "section-title" }, "Class Performance"),
                              createVNode(_component_ViewToggle, {
                                modelValue: unref(performanceView),
                                "onUpdate:modelValue": ($event) => isRef(performanceView) ? performanceView.value = $event : null,
                                options: ["chart", "table"],
                                size: "sm"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "performance-container" }, [
                            unref(performanceView) === "chart" ? (openBlock(), createBlock(_component_ClassPerformanceChart, {
                              key: 0,
                              data: unref(performanceData)
                            }, null, 8, ["data"])) : (openBlock(), createBlock(_component_ClassPerformanceTable, {
                              key: 1,
                              data: unref(performanceData),
                              onViewDetails: viewClassDetails
                            }, null, 8, ["data"]))
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
                  createVNode(_component_LayoutStack, { gap: "xl" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "welcome-section" }, [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx(() => {
                            var _a, _b;
                            return [
                              createVNode("div", null, [
                                createVNode("h1", { class: "welcome-title" }, "Welcome back, " + toDisplayString((_b = (_a = unref(user)) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ")[0]), 1),
                                createVNode("p", { class: "welcome-subtitle" }, toDisplayString(unref(currentGreeting)), 1)
                              ]),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/schedule")
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:calendar" }),
                                      createTextVNode(" View Schedule ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(_component_Button, {
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/classes/new")
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:plus" }),
                                      createTextVNode(" Create Class ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      createVNode(_component_LayoutGrid, {
                        cols: "1",
                        sm: "2",
                        lg: "4",
                        gap: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "stat-card" }, [
                            createVNode("div", { class: "stat-icon stat-icon-classes" }, [
                              createVNode(_component_Icon, { name: "heroicons:user-group" })
                            ]),
                            createVNode("div", { class: "stat-content" }, [
                              createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalClasses), 1),
                              createVNode("p", { class: "stat-label" }, "Active Classes")
                            ])
                          ]),
                          createVNode("div", { class: "stat-card" }, [
                            createVNode("div", { class: "stat-icon stat-icon-students" }, [
                              createVNode(_component_Icon, { name: "heroicons:academic-cap" })
                            ]),
                            createVNode("div", { class: "stat-content" }, [
                              createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).totalStudents), 1),
                              createVNode("p", { class: "stat-label" }, "Total Students")
                            ])
                          ]),
                          createVNode("div", { class: "stat-card" }, [
                            createVNode("div", { class: "stat-icon stat-icon-assignments" }, [
                              createVNode(_component_Icon, { name: "heroicons:clipboard-document-list" })
                            ]),
                            createVNode("div", { class: "stat-content" }, [
                              createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).pendingAssignments), 1),
                              createVNode("p", { class: "stat-label" }, "Pending Reviews")
                            ])
                          ]),
                          createVNode("div", { class: "stat-card" }, [
                            createVNode("div", { class: "stat-icon stat-icon-messages" }, [
                              createVNode(_component_Icon, { name: "heroicons:chat-bubble-bottom-center-text" })
                            ]),
                            createVNode("div", { class: "stat-content" }, [
                              createVNode("h3", { class: "stat-value" }, toDisplayString(unref(stats).unreadMessages), 1),
                              createVNode("p", { class: "stat-label" }, "Unread Messages")
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("section", { class: "dashboard-section" }, [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx(() => [
                            createVNode("h2", { class: "section-title" }, "Today's Schedule"),
                            createVNode(_component_NuxtLink, {
                              to: "/app/teacher/schedule",
                              class: "section-link"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_LayoutRow, {
                                  gap: "xs",
                                  align: "center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, "View full schedule"),
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
                        createVNode(_component_LayoutStack, {
                          gap: "md",
                          class: "schedule-list"
                        }, {
                          default: withCtx(() => [
                            unref(todaySchedule).length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "empty-schedule"
                            }, [
                              createVNode(_component_Icon, {
                                name: "heroicons:calendar-days",
                                size: "24"
                              }),
                              createVNode("p", null, "No classes scheduled for today")
                            ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(todaySchedule), (item) => {
                              return openBlock(), createBlock(_component_ScheduleItem, {
                                key: item.id,
                                schedule: item,
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/teacher/classes/${item.classId}`)
                              }, null, 8, ["schedule", "onClick"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", { class: "dashboard-section" }, [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx(() => [
                            createVNode("h2", { class: "section-title" }, "Recent Activity"),
                            createVNode(_component_SortDropdown, {
                              modelValue: unref(activitySort),
                              "onUpdate:modelValue": ($event) => isRef(activitySort) ? activitySort.value = $event : null,
                              options: activitySortOptions,
                              size: "sm"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LayoutStack, {
                          gap: "md",
                          class: "activity-list"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(recentActivity), (activity) => {
                              return openBlock(), createBlock(_component_ActivityItem, {
                                key: activity.id,
                                activity,
                                onAction: handleActivityAction
                              }, null, 8, ["activity"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", { class: "dashboard-section" }, [
                        createVNode("h2", { class: "section-title" }, "Quick Actions"),
                        createVNode(_component_LayoutGrid, {
                          cols: "1",
                          sm: "2",
                          lg: "3",
                          gap: "md"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:document-plus",
                              title: "Create Assignment",
                              description: "Design new assignments for your classes",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/assignments/new")
                            }, null, 8, ["onClick"]),
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:clipboard-document-check",
                              title: "Grade Submissions",
                              description: "Review and grade student submissions",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/grading")
                            }, null, 8, ["onClick"]),
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:chart-bar",
                              title: "View Analytics",
                              description: "Track student progress and performance",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/analytics")
                            }, null, 8, ["onClick"]),
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:users",
                              title: "Manage Students",
                              description: "Add or remove students from classes",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/students")
                            }, null, 8, ["onClick"]),
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:megaphone",
                              title: "Send Announcement",
                              description: "Broadcast messages to your classes",
                              onClick: ($event) => showAnnouncementModal.value = true
                            }, null, 8, ["onClick"]),
                            createVNode(_component_QuickActionCard, {
                              icon: "heroicons:video-camera",
                              title: "Schedule Meeting",
                              description: "Set up virtual classroom sessions",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/teacher/meetings/new")
                            }, null, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", { class: "dashboard-section" }, [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx(() => [
                            createVNode("h2", { class: "section-title" }, "Class Performance"),
                            createVNode(_component_ViewToggle, {
                              modelValue: unref(performanceView),
                              "onUpdate:modelValue": ($event) => isRef(performanceView) ? performanceView.value = $event : null,
                              options: ["chart", "table"],
                              size: "sm"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "performance-container" }, [
                          unref(performanceView) === "chart" ? (openBlock(), createBlock(_component_ClassPerformanceChart, {
                            key: 0,
                            data: unref(performanceData)
                          }, null, 8, ["data"])) : (openBlock(), createBlock(_component_ClassPerformanceTable, {
                            key: 1,
                            data: unref(performanceData),
                            onViewDetails: viewClassDetails
                          }, null, 8, ["data"]))
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
      _push(ssrRenderComponent(_component_AnnouncementModal, {
        visible: unref(showAnnouncementModal),
        "onUpdate:visible": ($event) => isRef(showAnnouncementModal) ? showAnnouncementModal.value = $event : null,
        onSend: sendAnnouncement
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/teacher/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98846b17"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-CKVYO9oi.mjs.map
