import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as __nuxt_component_4 } from './LayoutExpanded-B2m_FVss.mjs';
import { defineComponent, ref, computed, resolveComponent, withCtx, createTextVNode, createVNode, unref, createBlock, openBlock, Fragment, renderList, isRef, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useTeacherStore } from './teacher-CeEGmGYr.mjs';
import { u as useToast } from './useToast-BD9RVwOt.mjs';
import { _ as _export_sfc, a as useRouter } from './server.mjs';
import './useResponsive-DKjduhWV.mjs';
import './index-Bun7oj4a.mjs';
import './index-C7HDIHE6.mjs';
import 'pinia';
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

const itemsPerPage = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useTeacherStore();
    const { showToast } = useToast();
    const loading = ref(false);
    const searchQuery = ref("");
    const sortBy = ref("name");
    const viewMode = ref("grid");
    const currentPage = ref(1);
    const showFilters = ref(false);
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteDialog = ref(false);
    const editingClass = ref(null);
    const deletingClass = ref(null);
    const deleteLoading = ref(false);
    const filters = ref({
      subjects: [],
      grades: [],
      status: "all",
      schedule: []
    });
    const classes = ref([
      {
        id: "1",
        name: "Mathematics 101",
        subject: "Mathematics",
        grade: "Grade 10",
        schedule: "Mon, Wed, Fri - 9:00 AM",
        studentCount: 28,
        activeStudents: 26,
        averageGrade: 82,
        nextClass: new Date(Date.now() + 864e5),
        coverImage: "/images/math-class.jpg",
        status: "active",
        createdAt: /* @__PURE__ */ new Date("2024-01-01")
      },
      {
        id: "2",
        name: "Advanced Physics",
        subject: "Physics",
        grade: "Grade 12",
        schedule: "Tue, Thu - 2:00 PM",
        studentCount: 22,
        activeStudents: 20,
        averageGrade: 78,
        nextClass: new Date(Date.now() + 1728e5),
        coverImage: "/images/physics-class.jpg",
        status: "active",
        createdAt: /* @__PURE__ */ new Date("2024-01-15")
      }
    ]);
    const stats = computed(() => [
      {
        icon: "heroicons:academic-cap",
        label: "Total Classes",
        value: classes.value.filter((c) => c.status === "active").length,
        change: "+2",
        trend: "up"
      },
      {
        icon: "heroicons:users",
        label: "Total Students",
        value: classes.value.reduce((sum, c) => sum + c.studentCount, 0),
        change: "+12",
        trend: "up"
      },
      {
        icon: "heroicons:chart-bar",
        label: "Average Grade",
        value: Math.round(classes.value.reduce((sum, c) => sum + c.averageGrade, 0) / classes.value.length) + "%",
        change: "+3%",
        trend: "up"
      },
      {
        icon: "heroicons:clock",
        label: "Classes Today",
        value: 3,
        change: "0",
        trend: "neutral"
      }
    ]);
    const sortOptions = [
      { value: "name", label: "Name" },
      { value: "students", label: "Student Count" },
      { value: "grade", label: "Average Grade" },
      { value: "recent", label: "Recently Created" }
    ];
    const activeFilterCount = computed(() => {
      let count = 0;
      if (filters.value.subjects.length > 0) count += filters.value.subjects.length;
      if (filters.value.grades.length > 0) count += filters.value.grades.length;
      if (filters.value.status !== "all") count++;
      if (filters.value.schedule.length > 0) count += filters.value.schedule.length;
      return count;
    });
    const activeFilters = computed(() => {
      const active = [];
      filters.value.subjects.forEach((subject) => {
        active.push({ id: `subject-${subject}`, label: subject });
      });
      filters.value.grades.forEach((grade) => {
        active.push({ id: `grade-${grade}`, label: grade });
      });
      if (filters.value.status !== "all") {
        active.push({ id: "status", label: filters.value.status });
      }
      filters.value.schedule.forEach((schedule) => {
        active.push({ id: `schedule-${schedule}`, label: schedule });
      });
      return active;
    });
    const filteredClasses = computed(() => {
      let result = classes.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
          (cls) => cls.name.toLowerCase().includes(query) || cls.subject.toLowerCase().includes(query) || cls.grade.toLowerCase().includes(query)
        );
      }
      if (filters.value.subjects.length > 0) {
        result = result.filter((cls) => filters.value.subjects.includes(cls.subject));
      }
      if (filters.value.grades.length > 0) {
        result = result.filter((cls) => filters.value.grades.includes(cls.grade));
      }
      if (filters.value.status !== "all") {
        result = result.filter((cls) => cls.status === filters.value.status);
      }
      result = [...result].sort((a, b) => {
        switch (sortBy.value) {
          case "name":
            return a.name.localeCompare(b.name);
          case "students":
            return b.studentCount - a.studentCount;
          case "grade":
            return b.averageGrade - a.averageGrade;
          case "recent":
            return b.createdAt.getTime() - a.createdAt.getTime();
          default:
            return 0;
        }
      });
      return result;
    });
    const totalPages = computed(
      () => Math.ceil(filteredClasses.value.length / itemsPerPage)
    );
    const paginatedClasses = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredClasses.value.slice(start, end);
    });
    const handleSearch = (query) => {
      searchQuery.value = query;
      currentPage.value = 1;
    };
    const handleSort = (value) => {
      sortBy.value = value;
    };
    const applyFilters = () => {
      showFilters.value = false;
      currentPage.value = 1;
    };
    const clearFilters = () => {
      filters.value = {
        subjects: [],
        grades: [],
        status: "all",
        schedule: []
      };
      currentPage.value = 1;
    };
    const removeFilter = (filterId) => {
      if (filterId.startsWith("subject-")) {
        const subject = filterId.replace("subject-", "");
        filters.value.subjects = filters.value.subjects.filter((s) => s !== subject);
      } else if (filterId.startsWith("grade-")) {
        const grade = filterId.replace("grade-", "");
        filters.value.grades = filters.value.grades.filter((g) => g !== grade);
      } else if (filterId === "status") {
        filters.value.status = "all";
      } else if (filterId.startsWith("schedule-")) {
        const schedule = filterId.replace("schedule-", "");
        filters.value.schedule = filters.value.schedule.filter((s) => s !== schedule);
      }
    };
    const handleEdit = (cls) => {
      editingClass.value = cls;
      showEditModal.value = true;
    };
    const handleArchive = async (cls) => {
      try {
        cls.status = cls.status === "active" ? "archived" : "active";
        showToast(`Class ${cls.status === "archived" ? "archived" : "restored"} successfully`, "success");
      } catch (error) {
        showToast("Failed to update class status", "error");
      }
    };
    const handleDelete = (cls) => {
      deletingClass.value = cls;
      showDeleteDialog.value = true;
    };
    const confirmDelete = async () => {
      if (!deletingClass.value) return;
      deleteLoading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        classes.value = classes.value.filter((c) => c.id !== deletingClass.value.id);
        showToast("Class deleted successfully", "success");
        showDeleteDialog.value = false;
      } catch (error) {
        showToast("Failed to delete class", "error");
      } finally {
        deleteLoading.value = false;
        deletingClass.value = null;
      }
    };
    const handleSubmit = async (data) => {
      try {
        if (editingClass.value) {
          const index2 = classes.value.findIndex((c) => c.id === editingClass.value.id);
          if (index2 !== -1) {
            classes.value[index2] = { ...classes.value[index2], ...data };
          }
          showToast("Class updated successfully", "success");
        } else {
          const newClass = {
            id: Date.now().toString(),
            name: data.name || "",
            subject: data.subject || "",
            grade: data.grade || "",
            schedule: data.schedule || "",
            studentCount: 0,
            activeStudents: 0,
            averageGrade: 0,
            status: "active",
            createdAt: /* @__PURE__ */ new Date(),
            ...data
          };
          classes.value.unshift(newClass);
          showToast("Class created successfully", "success");
        }
        closeModals();
      } catch (error) {
        showToast("Failed to save class", "error");
      }
    };
    const closeModals = () => {
      showCreateModal.value = false;
      showEditModal.value = false;
      editingClass.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_Button = resolveComponent("Button");
      const _component_Icon = resolveComponent("Icon");
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_StatCard = resolveComponent("StatCard");
      const _component_LayoutExpanded = __nuxt_component_4;
      const _component_SearchBar = resolveComponent("SearchBar");
      const _component_FilterButton = resolveComponent("FilterButton");
      const _component_SortDropdown = resolveComponent("SortDropdown");
      const _component_ViewToggle = resolveComponent("ViewToggle");
      const _component_Chip = resolveComponent("Chip");
      const _component_Skeleton = resolveComponent("Skeleton");
      const _component_ClassCard = resolveComponent("ClassCard");
      const _component_ClassListItem = resolveComponent("ClassListItem");
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_Pagination = resolveComponent("Pagination");
      const _component_Drawer = resolveComponent("Drawer");
      const _component_ClassFilters = resolveComponent("ClassFilters");
      const _component_ClassFormModal = resolveComponent("ClassFormModal");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      _push(ssrRenderComponent(_component_LayoutContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { gap: "lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutRow, {
                    justify: "between",
                    align: "center",
                    wrap: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-7cb26dc8${_scopeId3}><h1 class="page-title" data-v-7cb26dc8${_scopeId3}>My Classes</h1><p class="page-subtitle" data-v-7cb26dc8${_scopeId3}>Manage your classes and students</p></div>`);
                        _push4(ssrRenderComponent(_component_Button, {
                          onClick: ($event) => showCreateModal.value = true
                        }, {
                          icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Icon, { name: "heroicons:plus" })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Create Class `);
                            } else {
                              return [
                                createTextVNode(" Create Class ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("h1", { class: "page-title" }, "My Classes"),
                            createVNode("p", { class: "page-subtitle" }, "Manage your classes and students")
                          ]),
                          createVNode(_component_Button, {
                            onClick: ($event) => showCreateModal.value = true
                          }, {
                            icon: withCtx(() => [
                              createVNode(_component_Icon, { name: "heroicons:plus" })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Create Class ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutGrid, {
                    cols: { base: 1, sm: 2, lg: 4 },
                    gap: "md"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(stats), (stat) => {
                          _push4(ssrRenderComponent(_component_StatCard, {
                            key: stat.label,
                            icon: stat.icon,
                            label: stat.label,
                            value: stat.value,
                            change: stat.change,
                            trend: stat.trend
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(stats), (stat) => {
                            return openBlock(), createBlock(_component_StatCard, {
                              key: stat.label,
                              icon: stat.icon,
                              label: stat.label,
                              value: stat.value,
                              change: stat.change,
                              trend: stat.trend
                            }, null, 8, ["icon", "label", "value", "change", "trend"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutRow, {
                    gap: "md",
                    align: "center",
                    wrap: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_LayoutExpanded, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SearchBar, {
                                modelValue: unref(searchQuery),
                                "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                placeholder: "Search classes...",
                                onSearch: handleSearch
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SearchBar, {
                                  modelValue: unref(searchQuery),
                                  "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                  placeholder: "Search classes...",
                                  onSearch: handleSearch
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_FilterButton, {
                          activeCount: unref(activeFilterCount),
                          onClick: ($event) => showFilters.value = !unref(showFilters)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SortDropdown, {
                          modelValue: unref(sortBy),
                          "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                          options: sortOptions,
                          onChange: handleSort
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ViewToggle, {
                          modelValue: unref(viewMode),
                          "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                          options: ["grid", "list"]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_LayoutExpanded, null, {
                            default: withCtx(() => [
                              createVNode(_component_SearchBar, {
                                modelValue: unref(searchQuery),
                                "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                placeholder: "Search classes...",
                                onSearch: handleSearch
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_FilterButton, {
                            activeCount: unref(activeFilterCount),
                            onClick: ($event) => showFilters.value = !unref(showFilters)
                          }, null, 8, ["activeCount", "onClick"]),
                          createVNode(_component_SortDropdown, {
                            modelValue: unref(sortBy),
                            "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                            options: sortOptions,
                            onChange: handleSort
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_ViewToggle, {
                            modelValue: unref(viewMode),
                            "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                            options: ["grid", "list"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(activeFilters).length > 0) {
                    _push3(ssrRenderComponent(_component_LayoutRow, {
                      gap: "sm",
                      wrap: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(activeFilters), (filter) => {
                            _push4(ssrRenderComponent(_component_Chip, {
                              key: filter.id,
                              removable: "",
                              onRemove: ($event) => removeFilter(filter.id)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(filter.label)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(filter.label), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                          _push4(ssrRenderComponent(_component_Button, {
                            variant: "text",
                            size: "sm",
                            onClick: clearFilters
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Clear all `);
                              } else {
                                return [
                                  createTextVNode(" Clear all ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                              return openBlock(), createBlock(_component_Chip, {
                                key: filter.id,
                                removable: "",
                                onRemove: ($event) => removeFilter(filter.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(filter.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["onRemove"]);
                            }), 128)),
                            createVNode(_component_Button, {
                              variant: "text",
                              size: "sm",
                              onClick: clearFilters
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
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(loading)) {
                    _push3(`<div class="loading-container" data-v-7cb26dc8${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LayoutGrid, {
                      cols: { base: 1, md: 2, lg: 3 },
                      gap: "md"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(6, (i) => {
                            _push4(ssrRenderComponent(_component_Skeleton, {
                              key: i,
                              height: "200px"
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                              return createVNode(_component_Skeleton, {
                                key: i,
                                height: "200px"
                              });
                            }), 64))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(filteredClasses).length > 0) {
                    _push3(`<!--[-->`);
                    if (unref(viewMode) === "grid") {
                      _push3(ssrRenderComponent(_component_LayoutGrid, {
                        cols: { base: 1, md: 2, lg: 3 },
                        gap: "md"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(paginatedClasses), (cls) => {
                              _push4(ssrRenderComponent(_component_ClassCard, {
                                key: cls.id,
                                "class-data": cls,
                                onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                                onEdit: ($event) => handleEdit(cls),
                                onArchive: ($event) => handleArchive(cls),
                                onDelete: ($event) => handleDelete(cls)
                              }, null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                                return openBlock(), createBlock(_component_ClassCard, {
                                  key: cls.id,
                                  "class-data": cls,
                                  onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                                  onEdit: ($event) => handleEdit(cls),
                                  onArchive: ($event) => handleArchive(cls),
                                  onDelete: ($event) => handleDelete(cls)
                                }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_LayoutStack, { gap: "sm" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(paginatedClasses), (cls) => {
                              _push4(ssrRenderComponent(_component_ClassListItem, {
                                key: cls.id,
                                "class-data": cls,
                                onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                                onEdit: ($event) => handleEdit(cls),
                                onArchive: ($event) => handleArchive(cls),
                                onDelete: ($event) => handleDelete(cls)
                              }, null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                                return openBlock(), createBlock(_component_ClassListItem, {
                                  key: cls.id,
                                  "class-data": cls,
                                  onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                                  onEdit: ($event) => handleEdit(cls),
                                  onArchive: ($event) => handleArchive(cls),
                                  onDelete: ($event) => handleDelete(cls)
                                }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      icon: "heroicons:academic-cap",
                      title: "No classes found",
                      description: unref(searchQuery) ? "Try adjusting your search or filters" : "Create your first class to get started"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Button, {
                            onClick: ($event) => showCreateModal.value = true
                          }, {
                            icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Icon, { name: "heroicons:plus" })
                                ];
                              }
                            }),
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Create Class `);
                              } else {
                                return [
                                  createTextVNode(" Create Class ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Button, {
                              onClick: ($event) => showCreateModal.value = true
                            }, {
                              icon: withCtx(() => [
                                createVNode(_component_Icon, { name: "heroicons:plus" })
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Create Class ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  if (unref(totalPages) > 1) {
                    _push3(ssrRenderComponent(_component_LayoutRow, { justify: "center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Pagination, {
                            modelValue: unref(currentPage),
                            "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                            total: unref(totalPages),
                            "sibling-count": 1
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Pagination, {
                              modelValue: unref(currentPage),
                              "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                              total: unref(totalPages),
                              "sibling-count": 1
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "total"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_LayoutRow, {
                      justify: "between",
                      align: "center",
                      wrap: ""
                    }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("h1", { class: "page-title" }, "My Classes"),
                          createVNode("p", { class: "page-subtitle" }, "Manage your classes and students")
                        ]),
                        createVNode(_component_Button, {
                          onClick: ($event) => showCreateModal.value = true
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_Icon, { name: "heroicons:plus" })
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Create Class ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LayoutGrid, {
                      cols: { base: 1, sm: 2, lg: 4 },
                      gap: "md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(stats), (stat) => {
                          return openBlock(), createBlock(_component_StatCard, {
                            key: stat.label,
                            icon: stat.icon,
                            label: stat.label,
                            value: stat.value,
                            change: stat.change,
                            trend: stat.trend
                          }, null, 8, ["icon", "label", "value", "change", "trend"]);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LayoutRow, {
                      gap: "md",
                      align: "center",
                      wrap: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_LayoutExpanded, null, {
                          default: withCtx(() => [
                            createVNode(_component_SearchBar, {
                              modelValue: unref(searchQuery),
                              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                              placeholder: "Search classes...",
                              onSearch: handleSearch
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_FilterButton, {
                          activeCount: unref(activeFilterCount),
                          onClick: ($event) => showFilters.value = !unref(showFilters)
                        }, null, 8, ["activeCount", "onClick"]),
                        createVNode(_component_SortDropdown, {
                          modelValue: unref(sortBy),
                          "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                          options: sortOptions,
                          onChange: handleSort
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_ViewToggle, {
                          modelValue: unref(viewMode),
                          "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                          options: ["grid", "list"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(activeFilters).length > 0 ? (openBlock(), createBlock(_component_LayoutRow, {
                      key: 0,
                      gap: "sm",
                      wrap: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                          return openBlock(), createBlock(_component_Chip, {
                            key: filter.id,
                            removable: "",
                            onRemove: ($event) => removeFilter(filter.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(filter.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["onRemove"]);
                        }), 128)),
                        createVNode(_component_Button, {
                          variant: "text",
                          size: "sm",
                          onClick: clearFilters
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Clear all ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "loading-container"
                    }, [
                      createVNode(_component_LayoutGrid, {
                        cols: { base: 1, md: 2, lg: 3 },
                        gap: "md"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                            return createVNode(_component_Skeleton, {
                              key: i,
                              height: "200px"
                            });
                          }), 64))
                        ]),
                        _: 1
                      })
                    ])) : unref(filteredClasses).length > 0 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                      unref(viewMode) === "grid" ? (openBlock(), createBlock(_component_LayoutGrid, {
                        key: 0,
                        cols: { base: 1, md: 2, lg: 3 },
                        gap: "md"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                            return openBlock(), createBlock(_component_ClassCard, {
                              key: cls.id,
                              "class-data": cls,
                              onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                              onEdit: ($event) => handleEdit(cls),
                              onArchive: ($event) => handleArchive(cls),
                              onDelete: ($event) => handleDelete(cls)
                            }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                          }), 128))
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(_component_LayoutStack, {
                        key: 1,
                        gap: "sm"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                            return openBlock(), createBlock(_component_ClassListItem, {
                              key: cls.id,
                              "class-data": cls,
                              onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                              onEdit: ($event) => handleEdit(cls),
                              onArchive: ($event) => handleArchive(cls),
                              onDelete: ($event) => handleDelete(cls)
                            }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                          }), 128))
                        ]),
                        _: 1
                      }))
                    ], 64)) : (openBlock(), createBlock(_component_EmptyState, {
                      key: 3,
                      icon: "heroicons:academic-cap",
                      title: "No classes found",
                      description: unref(searchQuery) ? "Try adjusting your search or filters" : "Create your first class to get started"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, {
                          onClick: ($event) => showCreateModal.value = true
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_Icon, { name: "heroicons:plus" })
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Create Class ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["description"])),
                    unref(totalPages) > 1 ? (openBlock(), createBlock(_component_LayoutRow, {
                      key: 4,
                      justify: "center"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Pagination, {
                          modelValue: unref(currentPage),
                          "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                          total: unref(totalPages),
                          "sibling-count": 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "total"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Drawer, {
              open: unref(showFilters),
              onClose: ($event) => showFilters.value = false,
              title: "Filter Classes",
              position: "right"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ClassFilters, {
                    modelValue: unref(filters),
                    "onUpdate:modelValue": ($event) => isRef(filters) ? filters.value = $event : null,
                    onApply: applyFilters,
                    onClear: clearFilters
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ClassFilters, {
                      modelValue: unref(filters),
                      "onUpdate:modelValue": ($event) => isRef(filters) ? filters.value = $event : null,
                      onApply: applyFilters,
                      onClear: clearFilters
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClassFormModal, {
              open: unref(showCreateModal) || unref(showEditModal),
              "class-data": unref(editingClass),
              onClose: closeModals,
              onSubmit: handleSubmit
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ConfirmDialog, {
              open: unref(showDeleteDialog),
              onClose: ($event) => showDeleteDialog.value = false,
              onConfirm: confirmDelete,
              title: "Delete Class",
              message: "Are you sure you want to delete this class? This action cannot be undone.",
              variant: "error",
              confirmText: "Delete",
              loading: unref(deleteLoading)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { gap: "lg" }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutRow, {
                    justify: "between",
                    align: "center",
                    wrap: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("h1", { class: "page-title" }, "My Classes"),
                        createVNode("p", { class: "page-subtitle" }, "Manage your classes and students")
                      ]),
                      createVNode(_component_Button, {
                        onClick: ($event) => showCreateModal.value = true
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:plus" })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" Create Class ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LayoutGrid, {
                    cols: { base: 1, sm: 2, lg: 4 },
                    gap: "md"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(stats), (stat) => {
                        return openBlock(), createBlock(_component_StatCard, {
                          key: stat.label,
                          icon: stat.icon,
                          label: stat.label,
                          value: stat.value,
                          change: stat.change,
                          trend: stat.trend
                        }, null, 8, ["icon", "label", "value", "change", "trend"]);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LayoutRow, {
                    gap: "md",
                    align: "center",
                    wrap: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_LayoutExpanded, null, {
                        default: withCtx(() => [
                          createVNode(_component_SearchBar, {
                            modelValue: unref(searchQuery),
                            "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                            placeholder: "Search classes...",
                            onSearch: handleSearch
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FilterButton, {
                        activeCount: unref(activeFilterCount),
                        onClick: ($event) => showFilters.value = !unref(showFilters)
                      }, null, 8, ["activeCount", "onClick"]),
                      createVNode(_component_SortDropdown, {
                        modelValue: unref(sortBy),
                        "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                        options: sortOptions,
                        onChange: handleSort
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_ViewToggle, {
                        modelValue: unref(viewMode),
                        "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                        options: ["grid", "list"]
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  unref(activeFilters).length > 0 ? (openBlock(), createBlock(_component_LayoutRow, {
                    key: 0,
                    gap: "sm",
                    wrap: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(activeFilters), (filter) => {
                        return openBlock(), createBlock(_component_Chip, {
                          key: filter.id,
                          removable: "",
                          onRemove: ($event) => removeFilter(filter.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(filter.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["onRemove"]);
                      }), 128)),
                      createVNode(_component_Button, {
                        variant: "text",
                        size: "sm",
                        onClick: clearFilters
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Clear all ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "loading-container"
                  }, [
                    createVNode(_component_LayoutGrid, {
                      cols: { base: 1, md: 2, lg: 3 },
                      gap: "md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                          return createVNode(_component_Skeleton, {
                            key: i,
                            height: "200px"
                          });
                        }), 64))
                      ]),
                      _: 1
                    })
                  ])) : unref(filteredClasses).length > 0 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                    unref(viewMode) === "grid" ? (openBlock(), createBlock(_component_LayoutGrid, {
                      key: 0,
                      cols: { base: 1, md: 2, lg: 3 },
                      gap: "md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                          return openBlock(), createBlock(_component_ClassCard, {
                            key: cls.id,
                            "class-data": cls,
                            onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                            onEdit: ($event) => handleEdit(cls),
                            onArchive: ($event) => handleArchive(cls),
                            onDelete: ($event) => handleDelete(cls)
                          }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                        }), 128))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_LayoutStack, {
                      key: 1,
                      gap: "sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedClasses), (cls) => {
                          return openBlock(), createBlock(_component_ClassListItem, {
                            key: cls.id,
                            "class-data": cls,
                            onClick: ($event) => unref(router).push(`/app/teacher/classes/${cls.id}`),
                            onEdit: ($event) => handleEdit(cls),
                            onArchive: ($event) => handleArchive(cls),
                            onDelete: ($event) => handleDelete(cls)
                          }, null, 8, ["class-data", "onClick", "onEdit", "onArchive", "onDelete"]);
                        }), 128))
                      ]),
                      _: 1
                    }))
                  ], 64)) : (openBlock(), createBlock(_component_EmptyState, {
                    key: 3,
                    icon: "heroicons:academic-cap",
                    title: "No classes found",
                    description: unref(searchQuery) ? "Try adjusting your search or filters" : "Create your first class to get started"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        onClick: ($event) => showCreateModal.value = true
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_Icon, { name: "heroicons:plus" })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" Create Class ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["description"])),
                  unref(totalPages) > 1 ? (openBlock(), createBlock(_component_LayoutRow, {
                    key: 4,
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Pagination, {
                        modelValue: unref(currentPage),
                        "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                        total: unref(totalPages),
                        "sibling-count": 1
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "total"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_Drawer, {
                open: unref(showFilters),
                onClose: ($event) => showFilters.value = false,
                title: "Filter Classes",
                position: "right"
              }, {
                default: withCtx(() => [
                  createVNode(_component_ClassFilters, {
                    modelValue: unref(filters),
                    "onUpdate:modelValue": ($event) => isRef(filters) ? filters.value = $event : null,
                    onApply: applyFilters,
                    onClear: clearFilters
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["open", "onClose"]),
              createVNode(_component_ClassFormModal, {
                open: unref(showCreateModal) || unref(showEditModal),
                "class-data": unref(editingClass),
                onClose: closeModals,
                onSubmit: handleSubmit
              }, null, 8, ["open", "class-data"]),
              createVNode(_component_ConfirmDialog, {
                open: unref(showDeleteDialog),
                onClose: ($event) => showDeleteDialog.value = false,
                onConfirm: confirmDelete,
                title: "Delete Class",
                message: "Are you sure you want to delete this class? This action cannot be undone.",
                variant: "error",
                confirmText: "Delete",
                loading: unref(deleteLoading)
              }, null, 8, ["open", "onClose", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/teacher/classes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7cb26dc8"]]);

export { index as default };
//# sourceMappingURL=index-CWgtJS_O.mjs.map
