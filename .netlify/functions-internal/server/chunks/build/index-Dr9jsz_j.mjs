import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as __nuxt_component_4 } from './LayoutExpanded-B2m_FVss.mjs';
import { defineComponent, ref, computed, resolveComponent, withCtx, unref, createTextVNode, createVNode, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useTeacherStore } from './teacher-CeEGmGYr.mjs';
import { u as useToast } from './useToast-BD9RVwOt.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const itemsPerPage = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useTeacherStore();
    const { showToast } = useToast();
    const loading = ref(false);
    const searchQuery = ref("");
    const filterClass = ref("all");
    const filterStatus = ref("all");
    const sortBy = ref("due-date");
    const currentPage = ref(1);
    const showBulkActions = ref(false);
    const selectedItems = ref([]);
    const showGradingModal = ref(false);
    const selectedSubmission = ref(null);
    const showViewModal = ref(false);
    const viewingSubmission = ref(null);
    const submissions = ref([
      {
        id: "1",
        studentId: "s1",
        studentName: "John Doe",
        studentAvatar: "/avatars/john.jpg",
        assignmentId: "a1",
        assignmentTitle: "Chapter 5 Homework",
        classId: "c1",
        className: "Mathematics 101",
        subject: "Mathematics",
        submittedAt: new Date(Date.now() - 36e5),
        dueDate: new Date(Date.now() + 864e5),
        status: "pending",
        maxGrade: 100,
        attachments: [
          { name: "homework.pdf", type: "pdf", url: "/files/homework.pdf" }
        ]
      },
      {
        id: "2",
        studentId: "s2",
        studentName: "Jane Smith",
        assignmentId: "a2",
        assignmentTitle: "Lab Report 3",
        classId: "c2",
        className: "Advanced Physics",
        subject: "Physics",
        submittedAt: new Date(Date.now() - 72e5),
        dueDate: new Date(Date.now() - 36e5),
        status: "pending",
        maxGrade: 50,
        attachments: [
          { name: "lab_report.pdf", type: "pdf", url: "/files/lab_report.pdf" },
          { name: "data.xlsx", type: "excel", url: "/files/data.xlsx" }
        ]
      }
    ]);
    const stats = computed(() => ({
      toGrade: submissions.value.filter((s) => s.status === "pending").length,
      inProgress: submissions.value.filter((s) => s.status === "in-progress").length,
      gradedToday: 12,
      // Mock value
      overdue: submissions.value.filter(
        (s) => s.status === "pending" && s.dueDate < /* @__PURE__ */ new Date()
      ).length
    }));
    const classOptions = computed(() => [
      { value: "all", label: "All Classes" },
      ...Array.from(new Set(submissions.value.map((s) => s.classId))).map((id) => {
        const sub = submissions.value.find((s) => s.classId === id);
        return { value: id, label: (sub == null ? void 0 : sub.className) || id };
      })
    ]);
    const statusOptions = [
      { value: "all", label: "All Status" },
      { value: "pending", label: "To Grade" },
      { value: "in-progress", label: "In Progress" },
      { value: "graded", label: "Graded" },
      { value: "returned", label: "Returned" }
    ];
    const sortOptions = [
      { value: "due-date", label: "Due Date" },
      { value: "submitted", label: "Submission Date" },
      { value: "student", label: "Student Name" },
      { value: "assignment", label: "Assignment" }
    ];
    const filteredSubmissions = computed(() => {
      let result = submissions.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
          (sub) => sub.studentName.toLowerCase().includes(query) || sub.assignmentTitle.toLowerCase().includes(query)
        );
      }
      if (filterClass.value !== "all") {
        result = result.filter((sub) => sub.classId === filterClass.value);
      }
      if (filterStatus.value !== "all") {
        result = result.filter((sub) => sub.status === filterStatus.value);
      }
      result = [...result].sort((a, b) => {
        switch (sortBy.value) {
          case "due-date":
            return a.dueDate.getTime() - b.dueDate.getTime();
          case "submitted":
            return b.submittedAt.getTime() - a.submittedAt.getTime();
          case "student":
            return a.studentName.localeCompare(b.studentName);
          case "assignment":
            return a.assignmentTitle.localeCompare(b.assignmentTitle);
          default:
            return 0;
        }
      });
      return result;
    });
    const totalPages = computed(
      () => Math.ceil(filteredSubmissions.value.length / itemsPerPage)
    );
    const paginatedSubmissions = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredSubmissions.value.slice(start, end);
    });
    const handleSearch = (query) => {
      searchQuery.value = query;
      currentPage.value = 1;
    };
    const handleSort = (value) => {
      sortBy.value = value;
    };
    const toggleSelect = (id) => {
      if (selectedItems.value.includes(id)) {
        selectedItems.value = selectedItems.value.filter((item) => item !== id);
      } else {
        selectedItems.value.push(id);
      }
    };
    const clearSelection = () => {
      selectedItems.value = [];
    };
    const handleGrade = (submission) => {
      selectedSubmission.value = submission;
      showGradingModal.value = true;
    };
    const handleView = (submission) => {
      viewingSubmission.value = submission;
      showViewModal.value = true;
    };
    const handleReturn = async (submission) => {
      try {
        submission.status = "returned";
        showToast("Assignment returned to student", "success");
      } catch (error) {
        showToast("Failed to return assignment", "error");
      }
    };
    const submitGrade = async (data) => {
      if (!selectedSubmission.value) return;
      try {
        selectedSubmission.value.grade = data.grade;
        selectedSubmission.value.feedback = data.feedback;
        selectedSubmission.value.status = "graded";
        showToast("Grade submitted successfully", "success");
        closeGradingModal();
      } catch (error) {
        showToast("Failed to submit grade", "error");
      }
    };
    const closeGradingModal = () => {
      showGradingModal.value = false;
      selectedSubmission.value = null;
    };
    const bulkGrade = () => {
      showToast(`Grade ${selectedItems.value.length} submissions`, "info");
    };
    const bulkReturn = () => {
      showToast(`Return ${selectedItems.value.length} submissions`, "info");
    };
    const exportGrades = () => {
      showToast("Exporting grades...", "info");
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
      const _component_Select = resolveComponent("Select");
      const _component_SortDropdown = resolveComponent("SortDropdown");
      const _component_Skeleton = resolveComponent("Skeleton");
      const _component_GradingItem = resolveComponent("GradingItem");
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_Pagination = resolveComponent("Pagination");
      const _component_GradingModal = resolveComponent("GradingModal");
      const _component_SubmissionViewModal = resolveComponent("SubmissionViewModal");
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
                        _push4(`<div data-v-c03d7378${_scopeId3}><h1 class="page-title" data-v-c03d7378${_scopeId3}>Grading</h1><p class="page-subtitle" data-v-c03d7378${_scopeId3}>Review and grade student submissions</p></div>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "secondary",
                                onClick: ($event) => showBulkActions.value = !unref(showBulkActions)
                              }, {
                                icon: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:bars-3" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Icon, { name: "heroicons:bars-3" })
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Bulk Actions `);
                                  } else {
                                    return [
                                      createTextVNode(" Bulk Actions ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "secondary",
                                onClick: exportGrades
                              }, {
                                icon: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:arrow-down-tray" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Icon, { name: "heroicons:arrow-down-tray" })
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Export `);
                                  } else {
                                    return [
                                      createTextVNode(" Export ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  onClick: ($event) => showBulkActions.value = !unref(showBulkActions)
                                }, {
                                  icon: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:bars-3" })
                                  ]),
                                  default: withCtx(() => [
                                    createTextVNode(" Bulk Actions ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  onClick: exportGrades
                                }, {
                                  icon: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:arrow-down-tray" })
                                  ]),
                                  default: withCtx(() => [
                                    createTextVNode(" Export ")
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
                          createVNode("div", null, [
                            createVNode("h1", { class: "page-title" }, "Grading"),
                            createVNode("p", { class: "page-subtitle" }, "Review and grade student submissions")
                          ]),
                          createVNode(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "secondary",
                                onClick: ($event) => showBulkActions.value = !unref(showBulkActions)
                              }, {
                                icon: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:bars-3" })
                                ]),
                                default: withCtx(() => [
                                  createTextVNode(" Bulk Actions ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_Button, {
                                variant: "secondary",
                                onClick: exportGrades
                              }, {
                                icon: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:arrow-down-tray" })
                                ]),
                                default: withCtx(() => [
                                  createTextVNode(" Export ")
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
                  _push3(ssrRenderComponent(_component_LayoutGrid, {
                    cols: { base: 2, lg: 4 },
                    gap: "md"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_StatCard, {
                          icon: "heroicons:document-text",
                          label: "To Grade",
                          value: unref(stats).toGrade,
                          variant: "warning"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_StatCard, {
                          icon: "heroicons:clock",
                          label: "In Progress",
                          value: unref(stats).inProgress,
                          variant: "info"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_StatCard, {
                          icon: "heroicons:check-circle",
                          label: "Graded Today",
                          value: unref(stats).gradedToday,
                          variant: "success"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_StatCard, {
                          icon: "heroicons:exclamation-triangle",
                          label: "Overdue",
                          value: unref(stats).overdue,
                          variant: "error"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_StatCard, {
                            icon: "heroicons:document-text",
                            label: "To Grade",
                            value: unref(stats).toGrade,
                            variant: "warning"
                          }, null, 8, ["value"]),
                          createVNode(_component_StatCard, {
                            icon: "heroicons:clock",
                            label: "In Progress",
                            value: unref(stats).inProgress,
                            variant: "info"
                          }, null, 8, ["value"]),
                          createVNode(_component_StatCard, {
                            icon: "heroicons:check-circle",
                            label: "Graded Today",
                            value: unref(stats).gradedToday,
                            variant: "success"
                          }, null, 8, ["value"]),
                          createVNode(_component_StatCard, {
                            icon: "heroicons:exclamation-triangle",
                            label: "Overdue",
                            value: unref(stats).overdue,
                            variant: "error"
                          }, null, 8, ["value"])
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
                                placeholder: "Search by student or assignment...",
                                onSearch: handleSearch
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SearchBar, {
                                  modelValue: unref(searchQuery),
                                  "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                  placeholder: "Search by student or assignment...",
                                  onSearch: handleSearch
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Select, {
                          modelValue: unref(filterClass),
                          "onUpdate:modelValue": ($event) => isRef(filterClass) ? filterClass.value = $event : null,
                          options: unref(classOptions),
                          placeholder: "All Classes"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Select, {
                          modelValue: unref(filterStatus),
                          "onUpdate:modelValue": ($event) => isRef(filterStatus) ? filterStatus.value = $event : null,
                          options: statusOptions,
                          placeholder: "All Status"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_SortDropdown, {
                          modelValue: unref(sortBy),
                          "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                          options: sortOptions,
                          onChange: handleSort
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_LayoutExpanded, null, {
                            default: withCtx(() => [
                              createVNode(_component_SearchBar, {
                                modelValue: unref(searchQuery),
                                "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                                placeholder: "Search by student or assignment...",
                                onSearch: handleSearch
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Select, {
                            modelValue: unref(filterClass),
                            "onUpdate:modelValue": ($event) => isRef(filterClass) ? filterClass.value = $event : null,
                            options: unref(classOptions),
                            placeholder: "All Classes"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                          createVNode(_component_Select, {
                            modelValue: unref(filterStatus),
                            "onUpdate:modelValue": ($event) => isRef(filterStatus) ? filterStatus.value = $event : null,
                            options: statusOptions,
                            placeholder: "All Status"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_SortDropdown, {
                            modelValue: unref(sortBy),
                            "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                            options: sortOptions,
                            onChange: handleSort
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(``);
                  if (unref(showBulkActions) && unref(selectedItems).length > 0) {
                    _push3(`<div class="bulk-actions-bar" data-v-c03d7378${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LayoutRow, {
                      justify: "between",
                      align: "center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="bulk-count" data-v-c03d7378${_scopeId3}>${ssrInterpolate(unref(selectedItems).length)} items selected</span>`);
                          _push4(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkGrade
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Grade Selected `);
                                    } else {
                                      return [
                                        createTextVNode(" Grade Selected ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkReturn
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Return Selected `);
                                    } else {
                                      return [
                                        createTextVNode(" Return Selected ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: clearSelection
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Clear Selection `);
                                    } else {
                                      return [
                                        createTextVNode(" Clear Selection ")
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
                                    onClick: bulkGrade
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Grade Selected ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: bulkReturn
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Return Selected ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: clearSelection
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Clear Selection ")
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
                            createVNode("span", { class: "bulk-count" }, toDisplayString(unref(selectedItems).length) + " items selected", 1),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkGrade
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Grade Selected ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkReturn
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Return Selected ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: clearSelection
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Clear Selection ")
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
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(loading)) {
                    _push3(`<div class="loading-container" data-v-c03d7378${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LayoutStack, { gap: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(5, (i) => {
                            _push4(ssrRenderComponent(_component_Skeleton, {
                              key: i,
                              height: "120px"
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode(_component_Skeleton, {
                                key: i,
                                height: "120px"
                              });
                            }), 64))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(filteredSubmissions).length > 0) {
                    _push3(ssrRenderComponent(_component_LayoutStack, { gap: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(paginatedSubmissions), (submission) => {
                            _push4(ssrRenderComponent(_component_GradingItem, {
                              key: submission.id,
                              submission,
                              selected: unref(selectedItems).includes(submission.id),
                              "show-checkbox": unref(showBulkActions),
                              onToggleSelect: ($event) => toggleSelect(submission.id),
                              onGrade: ($event) => handleGrade(submission),
                              onView: ($event) => handleView(submission),
                              onReturn: ($event) => handleReturn(submission)
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedSubmissions), (submission) => {
                              return openBlock(), createBlock(_component_GradingItem, {
                                key: submission.id,
                                submission,
                                selected: unref(selectedItems).includes(submission.id),
                                "show-checkbox": unref(showBulkActions),
                                onToggleSelect: ($event) => toggleSelect(submission.id),
                                onGrade: ($event) => handleGrade(submission),
                                onView: ($event) => handleView(submission),
                                onReturn: ($event) => handleReturn(submission)
                              }, null, 8, ["submission", "selected", "show-checkbox", "onToggleSelect", "onGrade", "onView", "onReturn"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      icon: "heroicons:document-text",
                      title: "No submissions to grade",
                      description: unref(searchQuery) ? "Try adjusting your search or filters" : "You're all caught up!"
                    }, null, _parent3, _scopeId2));
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
                          createVNode("h1", { class: "page-title" }, "Grading"),
                          createVNode("p", { class: "page-subtitle" }, "Review and grade student submissions")
                        ]),
                        createVNode(_component_LayoutRow, { gap: "sm" }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "secondary",
                              onClick: ($event) => showBulkActions.value = !unref(showBulkActions)
                            }, {
                              icon: withCtx(() => [
                                createVNode(_component_Icon, { name: "heroicons:bars-3" })
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Bulk Actions ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_Button, {
                              variant: "secondary",
                              onClick: exportGrades
                            }, {
                              icon: withCtx(() => [
                                createVNode(_component_Icon, { name: "heroicons:arrow-down-tray" })
                              ]),
                              default: withCtx(() => [
                                createTextVNode(" Export ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LayoutGrid, {
                      cols: { base: 2, lg: 4 },
                      gap: "md"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_StatCard, {
                          icon: "heroicons:document-text",
                          label: "To Grade",
                          value: unref(stats).toGrade,
                          variant: "warning"
                        }, null, 8, ["value"]),
                        createVNode(_component_StatCard, {
                          icon: "heroicons:clock",
                          label: "In Progress",
                          value: unref(stats).inProgress,
                          variant: "info"
                        }, null, 8, ["value"]),
                        createVNode(_component_StatCard, {
                          icon: "heroicons:check-circle",
                          label: "Graded Today",
                          value: unref(stats).gradedToday,
                          variant: "success"
                        }, null, 8, ["value"]),
                        createVNode(_component_StatCard, {
                          icon: "heroicons:exclamation-triangle",
                          label: "Overdue",
                          value: unref(stats).overdue,
                          variant: "error"
                        }, null, 8, ["value"])
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
                              placeholder: "Search by student or assignment...",
                              onSearch: handleSearch
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Select, {
                          modelValue: unref(filterClass),
                          "onUpdate:modelValue": ($event) => isRef(filterClass) ? filterClass.value = $event : null,
                          options: unref(classOptions),
                          placeholder: "All Classes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                        createVNode(_component_Select, {
                          modelValue: unref(filterStatus),
                          "onUpdate:modelValue": ($event) => isRef(filterStatus) ? filterStatus.value = $event : null,
                          options: statusOptions,
                          placeholder: "All Status"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_SortDropdown, {
                          modelValue: unref(sortBy),
                          "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                          options: sortOptions,
                          onChange: handleSort
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(Transition, { name: "slide-down" }, {
                      default: withCtx(() => [
                        unref(showBulkActions) && unref(selectedItems).length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bulk-actions-bar"
                        }, [
                          createVNode(_component_LayoutRow, {
                            justify: "between",
                            align: "center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "bulk-count" }, toDisplayString(unref(selectedItems).length) + " items selected", 1),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: bulkGrade
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Grade Selected ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: bulkReturn
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Return Selected ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: clearSelection
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Clear Selection ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "loading-container"
                    }, [
                      createVNode(_component_LayoutStack, { gap: "sm" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                            return createVNode(_component_Skeleton, {
                              key: i,
                              height: "120px"
                            });
                          }), 64))
                        ]),
                        _: 1
                      })
                    ])) : unref(filteredSubmissions).length > 0 ? (openBlock(), createBlock(_component_LayoutStack, {
                      key: 1,
                      gap: "sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedSubmissions), (submission) => {
                          return openBlock(), createBlock(_component_GradingItem, {
                            key: submission.id,
                            submission,
                            selected: unref(selectedItems).includes(submission.id),
                            "show-checkbox": unref(showBulkActions),
                            onToggleSelect: ($event) => toggleSelect(submission.id),
                            onGrade: ($event) => handleGrade(submission),
                            onView: ($event) => handleView(submission),
                            onReturn: ($event) => handleReturn(submission)
                          }, null, 8, ["submission", "selected", "show-checkbox", "onToggleSelect", "onGrade", "onView", "onReturn"]);
                        }), 128))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_EmptyState, {
                      key: 2,
                      icon: "heroicons:document-text",
                      title: "No submissions to grade",
                      description: unref(searchQuery) ? "Try adjusting your search or filters" : "You're all caught up!"
                    }, null, 8, ["description"])),
                    unref(totalPages) > 1 ? (openBlock(), createBlock(_component_LayoutRow, {
                      key: 3,
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
            _push2(ssrRenderComponent(_component_GradingModal, {
              open: unref(showGradingModal),
              submission: unref(selectedSubmission),
              onClose: closeGradingModal,
              onSubmit: submitGrade
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SubmissionViewModal, {
              open: unref(showViewModal),
              submission: unref(viewingSubmission),
              onClose: ($event) => showViewModal.value = false,
              onGrade: handleGrade
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
                        createVNode("h1", { class: "page-title" }, "Grading"),
                        createVNode("p", { class: "page-subtitle" }, "Review and grade student submissions")
                      ]),
                      createVNode(_component_LayoutRow, { gap: "sm" }, {
                        default: withCtx(() => [
                          createVNode(_component_Button, {
                            variant: "secondary",
                            onClick: ($event) => showBulkActions.value = !unref(showBulkActions)
                          }, {
                            icon: withCtx(() => [
                              createVNode(_component_Icon, { name: "heroicons:bars-3" })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Bulk Actions ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_Button, {
                            variant: "secondary",
                            onClick: exportGrades
                          }, {
                            icon: withCtx(() => [
                              createVNode(_component_Icon, { name: "heroicons:arrow-down-tray" })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Export ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LayoutGrid, {
                    cols: { base: 2, lg: 4 },
                    gap: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_StatCard, {
                        icon: "heroicons:document-text",
                        label: "To Grade",
                        value: unref(stats).toGrade,
                        variant: "warning"
                      }, null, 8, ["value"]),
                      createVNode(_component_StatCard, {
                        icon: "heroicons:clock",
                        label: "In Progress",
                        value: unref(stats).inProgress,
                        variant: "info"
                      }, null, 8, ["value"]),
                      createVNode(_component_StatCard, {
                        icon: "heroicons:check-circle",
                        label: "Graded Today",
                        value: unref(stats).gradedToday,
                        variant: "success"
                      }, null, 8, ["value"]),
                      createVNode(_component_StatCard, {
                        icon: "heroicons:exclamation-triangle",
                        label: "Overdue",
                        value: unref(stats).overdue,
                        variant: "error"
                      }, null, 8, ["value"])
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
                            placeholder: "Search by student or assignment...",
                            onSearch: handleSearch
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Select, {
                        modelValue: unref(filterClass),
                        "onUpdate:modelValue": ($event) => isRef(filterClass) ? filterClass.value = $event : null,
                        options: unref(classOptions),
                        placeholder: "All Classes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                      createVNode(_component_Select, {
                        modelValue: unref(filterStatus),
                        "onUpdate:modelValue": ($event) => isRef(filterStatus) ? filterStatus.value = $event : null,
                        options: statusOptions,
                        placeholder: "All Status"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_SortDropdown, {
                        modelValue: unref(sortBy),
                        "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                        options: sortOptions,
                        onChange: handleSort
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(Transition, { name: "slide-down" }, {
                    default: withCtx(() => [
                      unref(showBulkActions) && unref(selectedItems).length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bulk-actions-bar"
                      }, [
                        createVNode(_component_LayoutRow, {
                          justify: "between",
                          align: "center"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "bulk-count" }, toDisplayString(unref(selectedItems).length) + " items selected", 1),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkGrade
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Grade Selected ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: bulkReturn
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Return Selected ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: clearSelection
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Clear Selection ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "loading-container"
                  }, [
                    createVNode(_component_LayoutStack, { gap: "sm" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                          return createVNode(_component_Skeleton, {
                            key: i,
                            height: "120px"
                          });
                        }), 64))
                      ]),
                      _: 1
                    })
                  ])) : unref(filteredSubmissions).length > 0 ? (openBlock(), createBlock(_component_LayoutStack, {
                    key: 1,
                    gap: "sm"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedSubmissions), (submission) => {
                        return openBlock(), createBlock(_component_GradingItem, {
                          key: submission.id,
                          submission,
                          selected: unref(selectedItems).includes(submission.id),
                          "show-checkbox": unref(showBulkActions),
                          onToggleSelect: ($event) => toggleSelect(submission.id),
                          onGrade: ($event) => handleGrade(submission),
                          onView: ($event) => handleView(submission),
                          onReturn: ($event) => handleReturn(submission)
                        }, null, 8, ["submission", "selected", "show-checkbox", "onToggleSelect", "onGrade", "onView", "onReturn"]);
                      }), 128))
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_EmptyState, {
                    key: 2,
                    icon: "heroicons:document-text",
                    title: "No submissions to grade",
                    description: unref(searchQuery) ? "Try adjusting your search or filters" : "You're all caught up!"
                  }, null, 8, ["description"])),
                  unref(totalPages) > 1 ? (openBlock(), createBlock(_component_LayoutRow, {
                    key: 3,
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
              createVNode(_component_GradingModal, {
                open: unref(showGradingModal),
                submission: unref(selectedSubmission),
                onClose: closeGradingModal,
                onSubmit: submitGrade
              }, null, 8, ["open", "submission"]),
              createVNode(_component_SubmissionViewModal, {
                open: unref(showViewModal),
                submission: unref(viewingSubmission),
                onClose: ($event) => showViewModal.value = false,
                onGrade: handleGrade
              }, null, 8, ["open", "submission", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/teacher/grading/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c03d7378"]]);

export { index as default };
//# sourceMappingURL=index-Dr9jsz_j.mjs.map
