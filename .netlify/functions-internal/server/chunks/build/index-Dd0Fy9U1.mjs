import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_4 } from './LayoutWrap-DfSfpu8X.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as _export_sfc, u as useHead, b as useNuxtApp, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, withCtx, createVNode, unref, isRef, createTextVNode, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { defineStore } from 'pinia';
import { u as useResponsive } from './useResponsive-DKjduhWV.mjs';
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
import 'vue-router';
import './index-Bun7oj4a.mjs';
import './index-C7HDIHE6.mjs';

const useCourseStore = defineStore("course", () => {
  const courses = ref([]);
  const enrolledCourses = ref([]);
  const activeCourse = ref(null);
  const courseProgress = ref({});
  const fetchCourses = async () => {
  };
  const fetchEnrolledCourses = async () => {
  };
  const enrollInCourse = async (courseId) => {
  };
  const updateProgress = async (courseId, lessonId, progress) => {
  };
  const getCourseById = (courseId) => {
    return courses.value.find((c) => c.id === courseId);
  };
  return {
    courses,
    enrolledCourses,
    activeCourse,
    courseProgress,
    fetchCourses,
    fetchEnrolledCourses,
    enrollInCourse,
    updateProgress,
    getCourseById
  };
});
const itemsPerPage = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "My Courses - Skooledin AI",
      meta: [
        {
          name: "description",
          content: "Manage your enrolled courses and track learning progress"
        }
      ]
    });
    const { match } = useResponsive();
    const courseStore = useCourseStore();
    const { $toast } = useNuxtApp();
    const searchQuery = ref("");
    const sortBy = ref("recent");
    const viewMode = ref("grid");
    const showFilters = ref(false);
    const showDeleteConfirm = ref(false);
    const selectedCourse = ref(null);
    const currentPage = ref(1);
    const loading = ref(false);
    const activeFilters = ref([]);
    const gridCols = computed(() => match({
      mobile: 1,
      tablet: 2,
      laptop: 3,
      default: 4
    }));
    const filteredCourses = computed(() => {
      let courses = [...courseStore.enrolledCourses];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        courses = courses.filter(
          (course) => {
            var _a, _b;
            return course.title.toLowerCase().includes(query) || ((_a = course.description) == null ? void 0 : _a.toLowerCase().includes(query)) || ((_b = course.instructor) == null ? void 0 : _b.toLowerCase().includes(query));
          }
        );
      }
      activeFilters.value.forEach((filter) => {
        switch (filter.id) {
          case "subject":
            courses = courses.filter((c) => c.subject === filter.value);
            break;
          case "difficulty":
            courses = courses.filter((c) => c.difficulty === filter.value);
            break;
          case "status":
            courses = courses.filter((c) => c.status === filter.value);
            break;
          case "progress":
            const [min, max] = filter.value;
            courses = courses.filter((c) => c.progress >= min && c.progress <= max);
            break;
        }
      });
      courses.sort((a, b) => {
        switch (sortBy.value) {
          case "recent":
            return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
          case "title":
            return a.title.localeCompare(b.title);
          case "progress":
            return b.progress - a.progress;
          case "started":
            return new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime();
          default:
            return 0;
        }
      });
      return courses;
    });
    const totalPages = computed(
      () => Math.ceil(filteredCourses.value.length / itemsPerPage)
    );
    const paginatedCourses = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredCourses.value.slice(start, end);
    });
    const sortOptions = [
      { value: "recent", label: "Recently Accessed" },
      { value: "title", label: "Title" },
      { value: "progress", label: "Progress" },
      { value: "started", label: "Date Started" }
    ];
    const filterConfig = {
      subject: {
        type: "select",
        label: "Subject",
        options: [
          { value: "mathematics", label: "Mathematics" },
          { value: "science", label: "Science" },
          { value: "english", label: "English" },
          { value: "history", label: "History" },
          { value: "geography", label: "Geography" },
          { value: "computer-science", label: "Computer Science" }
        ]
      },
      difficulty: {
        type: "select",
        label: "Difficulty",
        options: [
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" }
        ]
      },
      status: {
        type: "select",
        label: "Status",
        options: [
          { value: "active", label: "In Progress" },
          { value: "completed", label: "Completed" },
          { value: "paused", label: "Paused" }
        ]
      },
      progress: {
        type: "range",
        label: "Progress",
        min: 0,
        max: 100,
        step: 10
      }
    };
    const handleSearch = (query) => {
      searchQuery.value = query;
      currentPage.value = 1;
    };
    const handleSort = (value) => {
      sortBy.value = value;
    };
    const handleViewChange = (mode) => {
      viewMode.value = mode;
    };
    const applyFilters = (filters) => {
      activeFilters.value = Object.entries(filters).filter(([_, value]) => value !== null && value !== void 0).map(([key, value]) => ({
        id: key,
        label: `${filterConfig[key].label}: ${formatFilterValue(key, value)}`,
        value
      }));
      currentPage.value = 1;
    };
    const formatFilterValue = (key, value) => {
      var _a;
      if (key === "progress") {
        return `${value[0]}% - ${value[1]}%`;
      }
      const option = (_a = filterConfig[key].options) == null ? void 0 : _a.find((o) => o.value === value);
      return (option == null ? void 0 : option.label) || value;
    };
    const removeFilter = (filterId) => {
      activeFilters.value = activeFilters.value.filter((f) => f.id !== filterId);
    };
    const clearAllFilters = () => {
      activeFilters.value = [];
    };
    const editCourse = (course) => {
      navigateTo(`/app/student/courses/${course.id}/edit`);
    };
    const confirmDelete = (course) => {
      selectedCourse.value = course;
      showDeleteConfirm.value = true;
    };
    const deleteCourse = async () => {
      if (!selectedCourse.value) return;
      try {
        await courseStore.unenrollFromCourse(selectedCourse.value.id);
        $toast.success("Course removed successfully");
        showDeleteConfirm.value = false;
        selectedCourse.value = null;
      } catch (error) {
        $toast.error("Failed to remove course");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_Button = resolveComponent("Button");
      const _component_Icon = resolveComponent("Icon");
      const _component_SearchBar = resolveComponent("SearchBar");
      const _component_SortDropdown = resolveComponent("SortDropdown");
      const _component_ViewToggle = resolveComponent("ViewToggle");
      const _component_LayoutWrap = __nuxt_component_4;
      const _component_Chip = resolveComponent("Chip");
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_Skeleton = resolveComponent("Skeleton");
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_ContentFilter = resolveComponent("ContentFilter");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { gap: "lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div data-v-d588d834${_scopeId4}><h1 class="page-title" data-v-d588d834${_scopeId4}>My Courses</h1><p class="page-subtitle" data-v-d588d834${_scopeId4}>Manage your enrolled courses and track progress</p></div>`);
                              _push5(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Button, {
                                      variant: "secondary",
                                      size: "sm",
                                      onClick: ($event) => showFilters.value = true
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:funnel" }, null, _parent7, _scopeId6));
                                          _push7(`<span data-v-d588d834${_scopeId6}>Filter</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                            createVNode("span", null, "Filter")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_Button, {
                                      size: "sm",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent7, _scopeId6));
                                          _push7(`<span data-v-d588d834${_scopeId6}>Explore Courses</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:plus" }),
                                            createVNode("span", null, "Explore Courses")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Button, {
                                        variant: "secondary",
                                        size: "sm",
                                        onClick: ($event) => showFilters.value = true
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                          createVNode("span", null, "Filter")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(_component_Button, {
                                        size: "sm",
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:plus" }),
                                          createVNode("span", null, "Explore Courses")
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
                                  createVNode("h1", { class: "page-title" }, "My Courses"),
                                  createVNode("p", { class: "page-subtitle" }, "Manage your enrolled courses and track progress")
                                ]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: "secondary",
                                      size: "sm",
                                      onClick: ($event) => showFilters.value = true
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                        createVNode("span", null, "Filter")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(_component_Button, {
                                      size: "sm",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:plus" }),
                                        createVNode("span", null, "Explore Courses")
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
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SearchBar, {
                                modelValue: unref(searchQuery),
                                "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                placeholder: "Search courses...",
                                onSearch: handleSearch
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_SortDropdown, {
                                      modelValue: unref(sortBy),
                                      "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                      options: sortOptions,
                                      onChange: handleSort
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_ViewToggle, {
                                      modelValue: unref(viewMode),
                                      "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                      options: ["grid", "list"],
                                      onChange: handleViewChange
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_SortDropdown, {
                                        modelValue: unref(sortBy),
                                        "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                        options: sortOptions,
                                        onChange: handleSort
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_ViewToggle, {
                                        modelValue: unref(viewMode),
                                        "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                        options: ["grid", "list"],
                                        onChange: handleViewChange
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SearchBar, {
                                  modelValue: unref(searchQuery),
                                  "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                  placeholder: "Search courses...",
                                  onSearch: handleSearch
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SortDropdown, {
                                      modelValue: unref(sortBy),
                                      "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                      options: sortOptions,
                                      onChange: handleSort
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(_component_ViewToggle, {
                                      modelValue: unref(viewMode),
                                      "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                      options: ["grid", "list"],
                                      onChange: handleViewChange
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(activeFilters).length > 0) {
                          _push4(`<div class="active-filters" data-v-d588d834${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LayoutWrap, { gap: "sm" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(activeFilters), (filter) => {
                                  _push5(ssrRenderComponent(_component_Chip, {
                                    key: filter.id,
                                    label: filter.label,
                                    removable: "",
                                    onRemove: ($event) => removeFilter(filter.id)
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "text",
                                  size: "sm",
                                  onClick: clearAllFilters
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Clear all `);
                                    } else {
                                      return [
                                        createTextVNode(" Clear all ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                                    return openBlock(), createBlock(_component_Chip, {
                                      key: filter.id,
                                      label: filter.label,
                                      removable: "",
                                      onRemove: ($event) => removeFilter(filter.id)
                                    }, null, 8, ["label", "onRemove"]);
                                  }), 128)),
                                  createVNode(_component_Button, {
                                    variant: "text",
                                    size: "sm",
                                    onClick: clearAllFilters
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Clear all ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(loading)) {
                          _push4(`<div class="loading-container" data-v-d588d834${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LayoutGrid, {
                            cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                            gap: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(6, (i) => {
                                  _push5(ssrRenderComponent(_component_Skeleton, {
                                    key: `skeleton-${i}`,
                                    variant: "rectangular",
                                    height: unref(viewMode) === "grid" ? 280 : 120
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                    return createVNode(_component_Skeleton, {
                                      key: `skeleton-${i}`,
                                      variant: "rectangular",
                                      height: unref(viewMode) === "grid" ? 280 : 120
                                    }, null, 8, ["height"]);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else if (unref(filteredCourses).length === 0) {
                          _push4(`<div class="empty-state-container" data-v-d588d834${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            icon: "heroicons:academic-cap",
                            title: "No courses found",
                            description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start exploring courses to begin learning"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Explore Courses `);
                                    } else {
                                      return [
                                        createTextVNode(" Explore Courses ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, {
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Explore Courses ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(ssrRenderComponent(_component_LayoutGrid, {
                            cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                            gap: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(paginatedCourses), (course) => {
                                  ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(unref(viewMode) === "grid" ? _ctx.CourseCard : _ctx.CourseListItem), {
                                    key: course.id,
                                    course,
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`),
                                    onEdit: ($event) => editCourse(course),
                                    onDelete: ($event) => confirmDelete(course)
                                  }, null), _parent5, _scopeId4);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedCourses), (course) => {
                                    return openBlock(), createBlock(resolveDynamicComponent(unref(viewMode) === "grid" ? _ctx.CourseCard : _ctx.CourseListItem), {
                                      key: course.id,
                                      course,
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`),
                                      onEdit: ($event) => editCourse(course),
                                      onDelete: ($event) => confirmDelete(course)
                                    }, null, 40, ["course", "onClick", "onEdit", "onDelete"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        if (unref(totalPages) > 1) {
                          _push4(`<div class="pagination-container" data-v-d588d834${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LayoutRow, {
                            justify: "center",
                            align: "center",
                            gap: "sm"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  disabled: unref(currentPage) === 1,
                                  onClick: ($event) => currentPage.value--
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:chevron-left" }, null, _parent6, _scopeId5));
                                      _push6(` Previous `);
                                    } else {
                                      return [
                                        createVNode(_component_Icon, { name: "heroicons:chevron-left" }),
                                        createTextVNode(" Previous ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`<span class="pagination-info" data-v-d588d834${_scopeId4}> Page ${ssrInterpolate(unref(currentPage))} of ${ssrInterpolate(unref(totalPages))}</span>`);
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  disabled: unref(currentPage) === unref(totalPages),
                                  onClick: ($event) => currentPage.value++
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Next `);
                                      _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:chevron-right" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createTextVNode(" Next "),
                                        createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    disabled: unref(currentPage) === 1,
                                    onClick: ($event) => currentPage.value--
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:chevron-left" }),
                                      createTextVNode(" Previous ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled", "onClick"]),
                                  createVNode("span", { class: "pagination-info" }, " Page " + toDisplayString(unref(currentPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    disabled: unref(currentPage) === unref(totalPages),
                                    onClick: ($event) => currentPage.value++
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Next "),
                                      createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                    ]),
                                    _: 1
                                  }, 8, ["disabled", "onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center",
                            responsive: ""
                          }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("h1", { class: "page-title" }, "My Courses"),
                                createVNode("p", { class: "page-subtitle" }, "Manage your enrolled courses and track progress")
                              ]),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: ($event) => showFilters.value = true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                      createVNode("span", null, "Filter")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(_component_Button, {
                                    size: "sm",
                                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:plus" }),
                                      createVNode("span", null, "Explore Courses")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center",
                            responsive: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_SearchBar, {
                                modelValue: unref(searchQuery),
                                "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                placeholder: "Search courses...",
                                onSearch: handleSearch
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_SortDropdown, {
                                    modelValue: unref(sortBy),
                                    "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                    options: sortOptions,
                                    onChange: handleSort
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_ViewToggle, {
                                    modelValue: unref(viewMode),
                                    "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                    options: ["grid", "list"],
                                    onChange: handleViewChange
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          unref(activeFilters).length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "active-filters"
                          }, [
                            createVNode(_component_LayoutWrap, { gap: "sm" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                                  return openBlock(), createBlock(_component_Chip, {
                                    key: filter.id,
                                    label: filter.label,
                                    removable: "",
                                    onRemove: ($event) => removeFilter(filter.id)
                                  }, null, 8, ["label", "onRemove"]);
                                }), 128)),
                                createVNode(_component_Button, {
                                  variant: "text",
                                  size: "sm",
                                  onClick: clearAllFilters
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Clear all ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          unref(loading) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "loading-container"
                          }, [
                            createVNode(_component_LayoutGrid, {
                              cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                              gap: "lg"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                  return createVNode(_component_Skeleton, {
                                    key: `skeleton-${i}`,
                                    variant: "rectangular",
                                    height: unref(viewMode) === "grid" ? 280 : 120
                                  }, null, 8, ["height"]);
                                }), 64))
                              ]),
                              _: 1
                            }, 8, ["cols"])
                          ])) : unref(filteredCourses).length === 0 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "empty-state-container"
                          }, [
                            createVNode(_component_EmptyState, {
                              icon: "heroicons:academic-cap",
                              title: "No courses found",
                              description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start exploring courses to begin learning"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Explore Courses ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }, 8, ["description"])
                          ])) : (openBlock(), createBlock(_component_LayoutGrid, {
                            key: 3,
                            cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedCourses), (course) => {
                                return openBlock(), createBlock(resolveDynamicComponent(unref(viewMode) === "grid" ? _ctx.CourseCard : _ctx.CourseListItem), {
                                  key: course.id,
                                  course,
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`),
                                  onEdit: ($event) => editCourse(course),
                                  onDelete: ($event) => confirmDelete(course)
                                }, null, 40, ["course", "onClick", "onEdit", "onDelete"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["cols"])),
                          unref(totalPages) > 1 ? (openBlock(), createBlock("div", {
                            key: 4,
                            class: "pagination-container"
                          }, [
                            createVNode(_component_LayoutRow, {
                              justify: "center",
                              align: "center",
                              gap: "sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  disabled: unref(currentPage) === 1,
                                  onClick: ($event) => currentPage.value--
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:chevron-left" }),
                                    createTextVNode(" Previous ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "onClick"]),
                                createVNode("span", { class: "pagination-info" }, " Page " + toDisplayString(unref(currentPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  disabled: unref(currentPage) === unref(totalPages),
                                  onClick: ($event) => currentPage.value++
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Next "),
                                    createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "onClick"])
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutStack, { gap: "lg" }, {
                      default: withCtx(() => [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("h1", { class: "page-title" }, "My Courses"),
                              createVNode("p", { class: "page-subtitle" }, "Manage your enrolled courses and track progress")
                            ]),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: ($event) => showFilters.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                    createVNode("span", null, "Filter")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_Button, {
                                  size: "sm",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:plus" }),
                                    createVNode("span", null, "Explore Courses")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center",
                          responsive: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_SearchBar, {
                              modelValue: unref(searchQuery),
                              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                              placeholder: "Search courses...",
                              onSearch: handleSearch
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_SortDropdown, {
                                  modelValue: unref(sortBy),
                                  "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                  options: sortOptions,
                                  onChange: handleSort
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_ViewToggle, {
                                  modelValue: unref(viewMode),
                                  "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                  options: ["grid", "list"],
                                  onChange: handleViewChange
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        unref(activeFilters).length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "active-filters"
                        }, [
                          createVNode(_component_LayoutWrap, { gap: "sm" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                                return openBlock(), createBlock(_component_Chip, {
                                  key: filter.id,
                                  label: filter.label,
                                  removable: "",
                                  onRemove: ($event) => removeFilter(filter.id)
                                }, null, 8, ["label", "onRemove"]);
                              }), 128)),
                              createVNode(_component_Button, {
                                variant: "text",
                                size: "sm",
                                onClick: clearAllFilters
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Clear all ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        unref(loading) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "loading-container"
                        }, [
                          createVNode(_component_LayoutGrid, {
                            cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                return createVNode(_component_Skeleton, {
                                  key: `skeleton-${i}`,
                                  variant: "rectangular",
                                  height: unref(viewMode) === "grid" ? 280 : 120
                                }, null, 8, ["height"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["cols"])
                        ])) : unref(filteredCourses).length === 0 ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "empty-state-container"
                        }, [
                          createVNode(_component_EmptyState, {
                            icon: "heroicons:academic-cap",
                            title: "No courses found",
                            description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start exploring courses to begin learning"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Explore Courses ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["description"])
                        ])) : (openBlock(), createBlock(_component_LayoutGrid, {
                          key: 3,
                          cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                          gap: "lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedCourses), (course) => {
                              return openBlock(), createBlock(resolveDynamicComponent(unref(viewMode) === "grid" ? _ctx.CourseCard : _ctx.CourseListItem), {
                                key: course.id,
                                course,
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`),
                                onEdit: ($event) => editCourse(course),
                                onDelete: ($event) => confirmDelete(course)
                              }, null, 40, ["course", "onClick", "onEdit", "onDelete"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["cols"])),
                        unref(totalPages) > 1 ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "pagination-container"
                        }, [
                          createVNode(_component_LayoutRow, {
                            justify: "center",
                            align: "center",
                            gap: "sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "secondary",
                                size: "sm",
                                disabled: unref(currentPage) === 1,
                                onClick: ($event) => currentPage.value--
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:chevron-left" }),
                                  createTextVNode(" Previous ")
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode("span", { class: "pagination-info" }, " Page " + toDisplayString(unref(currentPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                              createVNode(_component_Button, {
                                variant: "secondary",
                                size: "sm",
                                disabled: unref(currentPage) === unref(totalPages),
                                onClick: ($event) => currentPage.value++
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Next "),
                                  createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
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
                  createVNode(_component_LayoutStack, { gap: "lg" }, {
                    default: withCtx(() => [
                      createVNode(_component_LayoutRow, {
                        justify: "between",
                        align: "center",
                        responsive: ""
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("h1", { class: "page-title" }, "My Courses"),
                            createVNode("p", { class: "page-subtitle" }, "Manage your enrolled courses and track progress")
                          ]),
                          createVNode(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "secondary",
                                size: "sm",
                                onClick: ($event) => showFilters.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:funnel" }),
                                  createVNode("span", null, "Filter")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_Button, {
                                size: "sm",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:plus" }),
                                  createVNode("span", null, "Explore Courses")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LayoutRow, {
                        justify: "between",
                        align: "center",
                        responsive: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_SearchBar, {
                            modelValue: unref(searchQuery),
                            "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                            placeholder: "Search courses...",
                            onSearch: handleSearch
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_SortDropdown, {
                                modelValue: unref(sortBy),
                                "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                options: sortOptions,
                                onChange: handleSort
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_ViewToggle, {
                                modelValue: unref(viewMode),
                                "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                options: ["grid", "list"],
                                onChange: handleViewChange
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      unref(activeFilters).length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "active-filters"
                      }, [
                        createVNode(_component_LayoutWrap, { gap: "sm" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                              return openBlock(), createBlock(_component_Chip, {
                                key: filter.id,
                                label: filter.label,
                                removable: "",
                                onRemove: ($event) => removeFilter(filter.id)
                              }, null, 8, ["label", "onRemove"]);
                            }), 128)),
                            createVNode(_component_Button, {
                              variant: "text",
                              size: "sm",
                              onClick: clearAllFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Clear all ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "loading-container"
                      }, [
                        createVNode(_component_LayoutGrid, {
                          cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                          gap: "lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                              return createVNode(_component_Skeleton, {
                                key: `skeleton-${i}`,
                                variant: "rectangular",
                                height: unref(viewMode) === "grid" ? 280 : 120
                              }, null, 8, ["height"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["cols"])
                      ])) : unref(filteredCourses).length === 0 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "empty-state-container"
                      }, [
                        createVNode(_component_EmptyState, {
                          icon: "heroicons:academic-cap",
                          title: "No courses found",
                          description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start exploring courses to begin learning"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/app/student/courses/explore")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Explore Courses ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["description"])
                      ])) : (openBlock(), createBlock(_component_LayoutGrid, {
                        key: 3,
                        cols: unref(viewMode) === "grid" ? unref(gridCols) : 1,
                        gap: "lg"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedCourses), (course) => {
                            return openBlock(), createBlock(resolveDynamicComponent(unref(viewMode) === "grid" ? _ctx.CourseCard : _ctx.CourseListItem), {
                              key: course.id,
                              course,
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/app/student/courses/${course.id}`),
                              onEdit: ($event) => editCourse(course),
                              onDelete: ($event) => confirmDelete(course)
                            }, null, 40, ["course", "onClick", "onEdit", "onDelete"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["cols"])),
                      unref(totalPages) > 1 ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "pagination-container"
                      }, [
                        createVNode(_component_LayoutRow, {
                          justify: "center",
                          align: "center",
                          gap: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "secondary",
                              size: "sm",
                              disabled: unref(currentPage) === 1,
                              onClick: ($event) => currentPage.value--
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, { name: "heroicons:chevron-left" }),
                                createTextVNode(" Previous ")
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode("span", { class: "pagination-info" }, " Page " + toDisplayString(unref(currentPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                            createVNode(_component_Button, {
                              variant: "secondary",
                              size: "sm",
                              disabled: unref(currentPage) === unref(totalPages),
                              onClick: ($event) => currentPage.value++
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Next "),
                                createVNode(_component_Icon, { name: "heroicons:chevron-right" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true)
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
      _push(ssrRenderComponent(_component_ContentFilter, {
        visible: unref(showFilters),
        "onUpdate:visible": ($event) => isRef(showFilters) ? showFilters.value = $event : null,
        filters: filterConfig,
        onApply: applyFilters
      }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        visible: unref(showDeleteConfirm),
        "onUpdate:visible": ($event) => isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
        variant: "error",
        title: "Remove Course?",
        message: `Are you sure you want to remove '${(_a = unref(selectedCourse)) == null ? void 0 : _a.title}' from your courses?`,
        "confirm-text": "Remove",
        onConfirm: deleteCourse
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/student/courses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d588d834"]]);

export { index as default };
//# sourceMappingURL=index-Dd0Fy9U1.mjs.map
