import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_4 } from './LayoutWrap-DfSfpu8X.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { _ as __nuxt_component_6 } from './LayoutColumn-C8WaSB81.mjs';
import { defineComponent, ref, computed, resolveComponent, withCtx, createVNode, unref, isRef, createBlock, openBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, b as useNuxtApp, n as navigateTo } from './server.mjs';
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

const useNotebookStore = defineStore("notebook", () => {
  const notes = ref([]);
  const activeNote = ref(null);
  const tags = ref([]);
  const searchQuery = ref("");
  const sortBy = ref("updated");
  const filterTag = ref("");
  const filteredNotes = computed(() => {
    let filtered = notes.value;
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      );
    }
    if (filterTag.value) {
      filtered = filtered.filter(
        (note) => {
          var _a;
          return (_a = note.tags) == null ? void 0 : _a.includes(filterTag.value);
        }
      );
    }
    return filtered.sort((a, b) => {
      if (sortBy.value === "updated") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (sortBy.value === "created") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy.value === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });
  const fetchNotes = async () => {
  };
  const createNote = async (note) => {
  };
  const updateNote = async (id, updates) => {
  };
  const deleteNote = async (id) => {
  };
  const searchNotes = (query) => {
    searchQuery.value = query;
  };
  const setSortBy = (sort) => {
    sortBy.value = sort;
  };
  const setFilterTag = (tag) => {
    filterTag.value = tag;
  };
  return {
    notes,
    activeNote,
    tags,
    searchQuery,
    sortBy,
    filterTag,
    filteredNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    setSortBy,
    setFilterTag
  };
});
const itemsPerPage = 16;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "My Notebook - Skooledin AI",
      meta: [
        {
          name: "description",
          content: "Create and manage your study notes with AI assistance"
        }
      ]
    });
    const { match } = useResponsive();
    const notebookStore = useNotebookStore();
    const { $toast } = useNuxtApp();
    const searchQuery = ref("");
    const sortBy = ref("modified");
    const viewMode = ref("grid");
    const showFilters = ref(false);
    const showDeleteConfirm = ref(false);
    const showShare = ref(false);
    const showExport = ref(false);
    const showTemplates = ref(false);
    const selectedNote = ref(null);
    const selectedTypes = ref([]);
    const currentPage = ref(1);
    const loading = ref(false);
    const activeFilters = ref({});
    const gridCols = computed(() => match({
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4
    }));
    const activeFilterCount = computed(
      () => Object.values(activeFilters.value).filter((v) => v !== null && v !== void 0).length
    );
    const filteredNotes = computed(() => {
      let notes = [...notebookStore.notes];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        notes = notes.filter(
          (note) => {
            var _a, _b;
            return note.title.toLowerCase().includes(query) || ((_a = note.content) == null ? void 0 : _a.toLowerCase().includes(query)) || ((_b = note.tags) == null ? void 0 : _b.some((tag) => tag.toLowerCase().includes(query)));
          }
        );
      }
      if (selectedTypes.value.length > 0) {
        notes = notes.filter((note) => selectedTypes.value.includes(note.type));
      }
      Object.entries(activeFilters.value).forEach(([key, value]) => {
        if (value === null || value === void 0) return;
        switch (key) {
          case "subject":
            notes = notes.filter((n) => n.subject === value);
            break;
          case "dateRange":
            const [start, end] = value;
            notes = notes.filter((n) => {
              const date = new Date(n.modifiedAt);
              return date >= start && date <= end;
            });
            break;
          case "hasAttachments":
            notes = notes.filter((n) => {
              var _a, _b;
              return value ? ((_a = n.attachments) == null ? void 0 : _a.length) > 0 : !((_b = n.attachments) == null ? void 0 : _b.length);
            });
            break;
        }
      });
      notes.sort((a, b) => {
        switch (sortBy.value) {
          case "modified":
            return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime();
          case "created":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "title":
            return a.title.localeCompare(b.title);
          case "type":
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
      return notes;
    });
    const totalPages = computed(
      () => Math.ceil(filteredNotes.value.length / itemsPerPage)
    );
    const paginatedNotes = computed(() => {
      if (viewMode.value === "board") return filteredNotes.value;
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredNotes.value.slice(start, end);
    });
    const noteTypes = [
      { value: "note", label: "Notes", icon: "heroicons:document-text" },
      { value: "summary", label: "Summaries", icon: "heroicons:document-duplicate" },
      { value: "flashcard", label: "Flashcards", icon: "heroicons:squares-2x2" },
      { value: "mindmap", label: "Mind Maps", icon: "heroicons:cpu-chip" },
      { value: "quiz", label: "Quizzes", icon: "heroicons:clipboard-document-check" }
    ];
    const noteCategories = [
      { id: "recent", name: "Recent" },
      { id: "important", name: "Important" },
      { id: "shared", name: "Shared" },
      { id: "archived", name: "Archived" }
    ];
    const sortOptions = [
      { value: "modified", label: "Last Modified" },
      { value: "created", label: "Date Created" },
      { value: "title", label: "Title" },
      { value: "type", label: "Type" }
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
      dateRange: {
        type: "dateRange",
        label: "Date Range"
      },
      hasAttachments: {
        type: "toggle",
        label: "Has Attachments"
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
      currentPage.value = 1;
    };
    const toggleType = (type) => {
      const index2 = selectedTypes.value.indexOf(type);
      if (index2 > -1) {
        selectedTypes.value.splice(index2, 1);
      } else {
        selectedTypes.value.push(type);
      }
      currentPage.value = 1;
    };
    const applyFilters = (filters) => {
      activeFilters.value = filters;
      currentPage.value = 1;
    };
    const getCategoryNotes = (categoryId) => {
      switch (categoryId) {
        case "recent":
          return filteredNotes.value.slice(0, 5);
        case "important":
          return filteredNotes.value.filter((n) => n.starred);
        case "shared":
          return filteredNotes.value.filter((n) => n.shared);
        case "archived":
          return filteredNotes.value.filter((n) => n.archived);
        default:
          return [];
      }
    };
    const createNewNote = () => {
      navigateTo("/app/student/notebook/new");
    };
    const createFromTemplate = (template) => {
      navigateTo(`/app/student/notebook/new?template=${template.id}`);
    };
    const openNote = (note) => {
      navigateTo(`/app/student/notebook/${note.id}`);
    };
    const editNote = (note) => {
      navigateTo(`/app/student/notebook/${note.id}/edit`);
    };
    const confirmDelete = (note) => {
      selectedNote.value = note;
      showDeleteConfirm.value = true;
    };
    const deleteNote = async () => {
      if (!selectedNote.value) return;
      try {
        await notebookStore.deleteNote(selectedNote.value.id);
        $toast.success("Note deleted successfully");
        showDeleteConfirm.value = false;
        selectedNote.value = null;
      } catch (error) {
        $toast.error("Failed to delete note");
      }
    };
    const shareNote = (note) => {
      selectedNote.value = note;
      showShare.value = true;
    };
    const handleShare = async (shareData) => {
      try {
        await notebookStore.shareNote(selectedNote.value.id, shareData);
        $toast.success("Note shared successfully");
        showShare.value = false;
      } catch (error) {
        $toast.error("Failed to share note");
      }
    };
    const exportNote = (note) => {
      selectedNote.value = note;
      showExport.value = true;
    };
    const handleExport = async (exportData) => {
      try {
        await notebookStore.exportNote(selectedNote.value.id, exportData);
        $toast.success("Note exported successfully");
        showExport.value = false;
      } catch (error) {
        $toast.error("Failed to export note");
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
      const _component_FilterButton = resolveComponent("FilterButton");
      const _component_SortDropdown = resolveComponent("SortDropdown");
      const _component_ViewToggle = resolveComponent("ViewToggle");
      const _component_LayoutWrap = __nuxt_component_4;
      const _component_Chip = resolveComponent("Chip");
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_Skeleton = resolveComponent("Skeleton");
      const _component_EmptyState = resolveComponent("EmptyState");
      const _component_NoteCard = resolveComponent("NoteCard");
      const _component_LayoutColumn = __nuxt_component_6;
      const _component_NoteListItem = resolveComponent("NoteListItem");
      const _component_Badge = resolveComponent("Badge");
      const _component_ContentFilter = resolveComponent("ContentFilter");
      const _component_ConfirmDialog = resolveComponent("ConfirmDialog");
      const _component_ShareModal = resolveComponent("ShareModal");
      const _component_ExportModal = resolveComponent("ExportModal");
      const _component_TemplateModal = resolveComponent("TemplateModal");
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
                              _push5(`<div data-v-31d446e5${_scopeId4}><h1 class="page-title" data-v-31d446e5${_scopeId4}>My Notebook</h1><p class="page-subtitle" data-v-31d446e5${_scopeId4}>Create, organize, and manage your study notes</p></div>`);
                              _push5(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Button, {
                                      variant: "secondary",
                                      size: "sm",
                                      onClick: ($event) => showTemplates.value = true
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:document-duplicate" }, null, _parent7, _scopeId6));
                                          _push7(`<span data-v-31d446e5${_scopeId6}>Templates</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                            createVNode("span", null, "Templates")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_Button, {
                                      size: "sm",
                                      onClick: createNewNote
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent7, _scopeId6));
                                          _push7(`<span data-v-31d446e5${_scopeId6}>New Note</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, { name: "heroicons:plus" }),
                                            createVNode("span", null, "New Note")
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
                                        onClick: ($event) => showTemplates.value = true
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                          createVNode("span", null, "Templates")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(_component_Button, {
                                        size: "sm",
                                        onClick: createNewNote
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, { name: "heroicons:plus" }),
                                          createVNode("span", null, "New Note")
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
                                createVNode("div", null, [
                                  createVNode("h1", { class: "page-title" }, "My Notebook"),
                                  createVNode("p", { class: "page-subtitle" }, "Create, organize, and manage your study notes")
                                ]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: "secondary",
                                      size: "sm",
                                      onClick: ($event) => showTemplates.value = true
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                        createVNode("span", null, "Templates")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(_component_Button, {
                                      size: "sm",
                                      onClick: createNewNote
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, { name: "heroicons:plus" }),
                                        createVNode("span", null, "New Note")
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
                                placeholder: "Search notes...",
                                onSearch: handleSearch
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_FilterButton, {
                                      count: unref(activeFilterCount),
                                      onClick: ($event) => showFilters.value = true
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_SortDropdown, {
                                      modelValue: unref(sortBy),
                                      "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                      options: sortOptions,
                                      onChange: handleSort
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_ViewToggle, {
                                      modelValue: unref(viewMode),
                                      "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                      options: ["grid", "list", "board"],
                                      onChange: handleViewChange
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_FilterButton, {
                                        count: unref(activeFilterCount),
                                        onClick: ($event) => showFilters.value = true
                                      }, null, 8, ["count", "onClick"]),
                                      createVNode(_component_SortDropdown, {
                                        modelValue: unref(sortBy),
                                        "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                        options: sortOptions,
                                        onChange: handleSort
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(_component_ViewToggle, {
                                        modelValue: unref(viewMode),
                                        "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                        options: ["grid", "list", "board"],
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
                                  placeholder: "Search notes...",
                                  onSearch: handleSearch
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_LayoutRow, { gap: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_FilterButton, {
                                      count: unref(activeFilterCount),
                                      onClick: ($event) => showFilters.value = true
                                    }, null, 8, ["count", "onClick"]),
                                    createVNode(_component_SortDropdown, {
                                      modelValue: unref(sortBy),
                                      "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                      options: sortOptions,
                                      onChange: handleSort
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(_component_ViewToggle, {
                                      modelValue: unref(viewMode),
                                      "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                      options: ["grid", "list", "board"],
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
                        _push4(ssrRenderComponent(_component_LayoutWrap, { gap: "sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(noteTypes, (type) => {
                                _push5(ssrRenderComponent(_component_Chip, {
                                  key: type.value,
                                  label: type.label,
                                  selected: unref(selectedTypes).includes(type.value),
                                  onClick: ($event) => toggleType(type.value)
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(noteTypes, (type) => {
                                  return createVNode(_component_Chip, {
                                    key: type.value,
                                    label: type.label,
                                    selected: unref(selectedTypes).includes(type.value),
                                    onClick: ($event) => toggleType(type.value)
                                  }, null, 8, ["label", "selected", "onClick"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(loading)) {
                          _push4(`<div class="loading-container" data-v-31d446e5${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LayoutGrid, {
                            cols: unref(gridCols),
                            gap: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(8, (i) => {
                                  _push5(ssrRenderComponent(_component_Skeleton, {
                                    key: `skeleton-${i}`,
                                    variant: "rectangular",
                                    height: "200"
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                    return createVNode(_component_Skeleton, {
                                      key: `skeleton-${i}`,
                                      variant: "rectangular",
                                      height: "200"
                                    });
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else if (unref(filteredNotes).length === 0) {
                          _push4(`<div class="empty-state-container" data-v-31d446e5${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            icon: "heroicons:document-text",
                            title: "No notes found",
                            description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start creating notes to build your knowledge base"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Button, { onClick: createNewNote }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Icon, { name: "heroicons:plus" }, null, _parent6, _scopeId5));
                                      _push6(` Create Your First Note `);
                                    } else {
                                      return [
                                        createVNode(_component_Icon, { name: "heroicons:plus" }),
                                        createTextVNode(" Create Your First Note ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Button, { onClick: createNewNote }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:plus" }),
                                      createTextVNode(" Create Your First Note ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else if (unref(viewMode) === "grid") {
                          _push4(ssrRenderComponent(_component_LayoutGrid, {
                            cols: unref(gridCols),
                            gap: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(paginatedNotes), (note) => {
                                  _push5(ssrRenderComponent(_component_NoteCard, {
                                    key: note.id,
                                    note,
                                    onClick: ($event) => openNote(note),
                                    onEdit: ($event) => editNote(note),
                                    onDelete: ($event) => confirmDelete(note),
                                    onShare: ($event) => shareNote(note),
                                    onExport: ($event) => exportNote(note)
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                                    return openBlock(), createBlock(_component_NoteCard, {
                                      key: note.id,
                                      note,
                                      onClick: ($event) => openNote(note),
                                      onEdit: ($event) => editNote(note),
                                      onDelete: ($event) => confirmDelete(note),
                                      onShare: ($event) => shareNote(note),
                                      onExport: ($event) => exportNote(note)
                                    }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else if (unref(viewMode) === "list") {
                          _push4(ssrRenderComponent(_component_LayoutColumn, { gap: "md" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(paginatedNotes), (note) => {
                                  _push5(ssrRenderComponent(_component_NoteListItem, {
                                    key: note.id,
                                    note,
                                    onClick: ($event) => openNote(note),
                                    onEdit: ($event) => editNote(note),
                                    onDelete: ($event) => confirmDelete(note),
                                    onShare: ($event) => shareNote(note),
                                    onExport: ($event) => exportNote(note)
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                                    return openBlock(), createBlock(_component_NoteListItem, {
                                      key: note.id,
                                      note,
                                      onClick: ($event) => openNote(note),
                                      onEdit: ($event) => editNote(note),
                                      onDelete: ($event) => confirmDelete(note),
                                      onShare: ($event) => shareNote(note),
                                      onExport: ($event) => exportNote(note)
                                    }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else if (unref(viewMode) === "board") {
                          _push4(`<div class="board-view" data-v-31d446e5${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LayoutRow, {
                            gap: "lg",
                            class: "board-columns"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(noteCategories, (category) => {
                                  _push5(ssrRenderComponent(_component_LayoutColumn, {
                                    key: category.id,
                                    class: "board-column",
                                    gap: "md"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="board-header" data-v-31d446e5${_scopeId5}><h3 class="board-title" data-v-31d446e5${_scopeId5}>${ssrInterpolate(category.name)}</h3>`);
                                        _push6(ssrRenderComponent(_component_Badge, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(getCategoryNotes(category.id).length)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div><div class="board-notes" data-v-31d446e5${_scopeId5}><!--[-->`);
                                        ssrRenderList(getCategoryNotes(category.id), (note) => {
                                          _push6(ssrRenderComponent(_component_NoteCard, {
                                            key: note.id,
                                            note,
                                            compact: "",
                                            onClick: ($event) => openNote(note),
                                            onEdit: ($event) => editNote(note),
                                            onDelete: ($event) => confirmDelete(note)
                                          }, null, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]--></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "board-header" }, [
                                            createVNode("h3", { class: "board-title" }, toDisplayString(category.name), 1),
                                            createVNode(_component_Badge, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          createVNode("div", { class: "board-notes" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(getCategoryNotes(category.id), (note) => {
                                              return openBlock(), createBlock(_component_NoteCard, {
                                                key: note.id,
                                                note,
                                                compact: "",
                                                onClick: ($event) => openNote(note),
                                                onEdit: ($event) => editNote(note),
                                                onDelete: ($event) => confirmDelete(note)
                                              }, null, 8, ["note", "onClick", "onEdit", "onDelete"]);
                                            }), 128))
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(noteCategories, (category) => {
                                    return createVNode(_component_LayoutColumn, {
                                      key: category.id,
                                      class: "board-column",
                                      gap: "md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "board-header" }, [
                                          createVNode("h3", { class: "board-title" }, toDisplayString(category.name), 1),
                                          createVNode(_component_Badge, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        createVNode("div", { class: "board-notes" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(getCategoryNotes(category.id), (note) => {
                                            return openBlock(), createBlock(_component_NoteCard, {
                                              key: note.id,
                                              note,
                                              compact: "",
                                              onClick: ($event) => openNote(note),
                                              onEdit: ($event) => editNote(note),
                                              onDelete: ($event) => confirmDelete(note)
                                            }, null, 8, ["note", "onClick", "onEdit", "onDelete"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(totalPages) > 1 && unref(viewMode) !== "board") {
                          _push4(`<div class="pagination-container" data-v-31d446e5${_scopeId3}>`);
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
                                _push5(`<span class="pagination-info" data-v-31d446e5${_scopeId4}> Page ${ssrInterpolate(unref(currentPage))} of ${ssrInterpolate(unref(totalPages))}</span>`);
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
                                createVNode("h1", { class: "page-title" }, "My Notebook"),
                                createVNode("p", { class: "page-subtitle" }, "Create, organize, and manage your study notes")
                              ]),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: ($event) => showTemplates.value = true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                      createVNode("span", null, "Templates")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(_component_Button, {
                                    size: "sm",
                                    onClick: createNewNote
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, { name: "heroicons:plus" }),
                                      createVNode("span", null, "New Note")
                                    ]),
                                    _: 1
                                  })
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
                                placeholder: "Search notes...",
                                onSearch: handleSearch
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_LayoutRow, { gap: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(_component_FilterButton, {
                                    count: unref(activeFilterCount),
                                    onClick: ($event) => showFilters.value = true
                                  }, null, 8, ["count", "onClick"]),
                                  createVNode(_component_SortDropdown, {
                                    modelValue: unref(sortBy),
                                    "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                    options: sortOptions,
                                    onChange: handleSort
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_ViewToggle, {
                                    modelValue: unref(viewMode),
                                    "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                    options: ["grid", "list", "board"],
                                    onChange: handleViewChange
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutWrap, { gap: "sm" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(noteTypes, (type) => {
                                return createVNode(_component_Chip, {
                                  key: type.value,
                                  label: type.label,
                                  selected: unref(selectedTypes).includes(type.value),
                                  onClick: ($event) => toggleType(type.value)
                                }, null, 8, ["label", "selected", "onClick"]);
                              }), 64))
                            ]),
                            _: 1
                          }),
                          unref(loading) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "loading-container"
                          }, [
                            createVNode(_component_LayoutGrid, {
                              cols: unref(gridCols),
                              gap: "lg"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                  return createVNode(_component_Skeleton, {
                                    key: `skeleton-${i}`,
                                    variant: "rectangular",
                                    height: "200"
                                  });
                                }), 64))
                              ]),
                              _: 1
                            }, 8, ["cols"])
                          ])) : unref(filteredNotes).length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "empty-state-container"
                          }, [
                            createVNode(_component_EmptyState, {
                              icon: "heroicons:document-text",
                              title: "No notes found",
                              description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start creating notes to build your knowledge base"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, { onClick: createNewNote }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:plus" }),
                                    createTextVNode(" Create Your First Note ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["description"])
                          ])) : unref(viewMode) === "grid" ? (openBlock(), createBlock(_component_LayoutGrid, {
                            key: 2,
                            cols: unref(gridCols),
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                                return openBlock(), createBlock(_component_NoteCard, {
                                  key: note.id,
                                  note,
                                  onClick: ($event) => openNote(note),
                                  onEdit: ($event) => editNote(note),
                                  onDelete: ($event) => confirmDelete(note),
                                  onShare: ($event) => shareNote(note),
                                  onExport: ($event) => exportNote(note)
                                }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["cols"])) : unref(viewMode) === "list" ? (openBlock(), createBlock(_component_LayoutColumn, {
                            key: 3,
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                                return openBlock(), createBlock(_component_NoteListItem, {
                                  key: note.id,
                                  note,
                                  onClick: ($event) => openNote(note),
                                  onEdit: ($event) => editNote(note),
                                  onDelete: ($event) => confirmDelete(note),
                                  onShare: ($event) => shareNote(note),
                                  onExport: ($event) => exportNote(note)
                                }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                              }), 128))
                            ]),
                            _: 1
                          })) : unref(viewMode) === "board" ? (openBlock(), createBlock("div", {
                            key: 4,
                            class: "board-view"
                          }, [
                            createVNode(_component_LayoutRow, {
                              gap: "lg",
                              class: "board-columns"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(noteCategories, (category) => {
                                  return createVNode(_component_LayoutColumn, {
                                    key: category.id,
                                    class: "board-column",
                                    gap: "md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "board-header" }, [
                                        createVNode("h3", { class: "board-title" }, toDisplayString(category.name), 1),
                                        createVNode(_component_Badge, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      createVNode("div", { class: "board-notes" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(getCategoryNotes(category.id), (note) => {
                                          return openBlock(), createBlock(_component_NoteCard, {
                                            key: note.id,
                                            note,
                                            compact: "",
                                            onClick: ($event) => openNote(note),
                                            onEdit: ($event) => editNote(note),
                                            onDelete: ($event) => confirmDelete(note)
                                          }, null, 8, ["note", "onClick", "onEdit", "onDelete"]);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true),
                          unref(totalPages) > 1 && unref(viewMode) !== "board" ? (openBlock(), createBlock("div", {
                            key: 5,
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
                              createVNode("h1", { class: "page-title" }, "My Notebook"),
                              createVNode("p", { class: "page-subtitle" }, "Create, organize, and manage your study notes")
                            ]),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: ($event) => showTemplates.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                    createVNode("span", null, "Templates")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_Button, {
                                  size: "sm",
                                  onClick: createNewNote
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "heroicons:plus" }),
                                    createVNode("span", null, "New Note")
                                  ]),
                                  _: 1
                                })
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
                              placeholder: "Search notes...",
                              onSearch: handleSearch
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_LayoutRow, { gap: "sm" }, {
                              default: withCtx(() => [
                                createVNode(_component_FilterButton, {
                                  count: unref(activeFilterCount),
                                  onClick: ($event) => showFilters.value = true
                                }, null, 8, ["count", "onClick"]),
                                createVNode(_component_SortDropdown, {
                                  modelValue: unref(sortBy),
                                  "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                  options: sortOptions,
                                  onChange: handleSort
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_ViewToggle, {
                                  modelValue: unref(viewMode),
                                  "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                  options: ["grid", "list", "board"],
                                  onChange: handleViewChange
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LayoutWrap, { gap: "sm" }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(noteTypes, (type) => {
                              return createVNode(_component_Chip, {
                                key: type.value,
                                label: type.label,
                                selected: unref(selectedTypes).includes(type.value),
                                onClick: ($event) => toggleType(type.value)
                              }, null, 8, ["label", "selected", "onClick"]);
                            }), 64))
                          ]),
                          _: 1
                        }),
                        unref(loading) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "loading-container"
                        }, [
                          createVNode(_component_LayoutGrid, {
                            cols: unref(gridCols),
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                return createVNode(_component_Skeleton, {
                                  key: `skeleton-${i}`,
                                  variant: "rectangular",
                                  height: "200"
                                });
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["cols"])
                        ])) : unref(filteredNotes).length === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "empty-state-container"
                        }, [
                          createVNode(_component_EmptyState, {
                            icon: "heroicons:document-text",
                            title: "No notes found",
                            description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start creating notes to build your knowledge base"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, { onClick: createNewNote }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:plus" }),
                                  createTextVNode(" Create Your First Note ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["description"])
                        ])) : unref(viewMode) === "grid" ? (openBlock(), createBlock(_component_LayoutGrid, {
                          key: 2,
                          cols: unref(gridCols),
                          gap: "lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                              return openBlock(), createBlock(_component_NoteCard, {
                                key: note.id,
                                note,
                                onClick: ($event) => openNote(note),
                                onEdit: ($event) => editNote(note),
                                onDelete: ($event) => confirmDelete(note),
                                onShare: ($event) => shareNote(note),
                                onExport: ($event) => exportNote(note)
                              }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["cols"])) : unref(viewMode) === "list" ? (openBlock(), createBlock(_component_LayoutColumn, {
                          key: 3,
                          gap: "md"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                              return openBlock(), createBlock(_component_NoteListItem, {
                                key: note.id,
                                note,
                                onClick: ($event) => openNote(note),
                                onEdit: ($event) => editNote(note),
                                onDelete: ($event) => confirmDelete(note),
                                onShare: ($event) => shareNote(note),
                                onExport: ($event) => exportNote(note)
                              }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                            }), 128))
                          ]),
                          _: 1
                        })) : unref(viewMode) === "board" ? (openBlock(), createBlock("div", {
                          key: 4,
                          class: "board-view"
                        }, [
                          createVNode(_component_LayoutRow, {
                            gap: "lg",
                            class: "board-columns"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(noteCategories, (category) => {
                                return createVNode(_component_LayoutColumn, {
                                  key: category.id,
                                  class: "board-column",
                                  gap: "md"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "board-header" }, [
                                      createVNode("h3", { class: "board-title" }, toDisplayString(category.name), 1),
                                      createVNode(_component_Badge, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    createVNode("div", { class: "board-notes" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(getCategoryNotes(category.id), (note) => {
                                        return openBlock(), createBlock(_component_NoteCard, {
                                          key: note.id,
                                          note,
                                          compact: "",
                                          onClick: ($event) => openNote(note),
                                          onEdit: ($event) => editNote(note),
                                          onDelete: ($event) => confirmDelete(note)
                                        }, null, 8, ["note", "onClick", "onEdit", "onDelete"]);
                                      }), 128))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        unref(totalPages) > 1 && unref(viewMode) !== "board" ? (openBlock(), createBlock("div", {
                          key: 5,
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
                            createVNode("h1", { class: "page-title" }, "My Notebook"),
                            createVNode("p", { class: "page-subtitle" }, "Create, organize, and manage your study notes")
                          ]),
                          createVNode(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "secondary",
                                size: "sm",
                                onClick: ($event) => showTemplates.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:document-duplicate" }),
                                  createVNode("span", null, "Templates")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(_component_Button, {
                                size: "sm",
                                onClick: createNewNote
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "heroicons:plus" }),
                                  createVNode("span", null, "New Note")
                                ]),
                                _: 1
                              })
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
                            placeholder: "Search notes...",
                            onSearch: handleSearch
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_LayoutRow, { gap: "sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_FilterButton, {
                                count: unref(activeFilterCount),
                                onClick: ($event) => showFilters.value = true
                              }, null, 8, ["count", "onClick"]),
                              createVNode(_component_SortDropdown, {
                                modelValue: unref(sortBy),
                                "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
                                options: sortOptions,
                                onChange: handleSort
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_ViewToggle, {
                                modelValue: unref(viewMode),
                                "onUpdate:modelValue": ($event) => isRef(viewMode) ? viewMode.value = $event : null,
                                options: ["grid", "list", "board"],
                                onChange: handleViewChange
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LayoutWrap, { gap: "sm" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(noteTypes, (type) => {
                            return createVNode(_component_Chip, {
                              key: type.value,
                              label: type.label,
                              selected: unref(selectedTypes).includes(type.value),
                              onClick: ($event) => toggleType(type.value)
                            }, null, 8, ["label", "selected", "onClick"]);
                          }), 64))
                        ]),
                        _: 1
                      }),
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "loading-container"
                      }, [
                        createVNode(_component_LayoutGrid, {
                          cols: unref(gridCols),
                          gap: "lg"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                              return createVNode(_component_Skeleton, {
                                key: `skeleton-${i}`,
                                variant: "rectangular",
                                height: "200"
                              });
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["cols"])
                      ])) : unref(filteredNotes).length === 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "empty-state-container"
                      }, [
                        createVNode(_component_EmptyState, {
                          icon: "heroicons:document-text",
                          title: "No notes found",
                          description: unref(searchQuery) ? "Try adjusting your search or filters" : "Start creating notes to build your knowledge base"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, { onClick: createNewNote }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, { name: "heroicons:plus" }),
                                createTextVNode(" Create Your First Note ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["description"])
                      ])) : unref(viewMode) === "grid" ? (openBlock(), createBlock(_component_LayoutGrid, {
                        key: 2,
                        cols: unref(gridCols),
                        gap: "lg"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                            return openBlock(), createBlock(_component_NoteCard, {
                              key: note.id,
                              note,
                              onClick: ($event) => openNote(note),
                              onEdit: ($event) => editNote(note),
                              onDelete: ($event) => confirmDelete(note),
                              onShare: ($event) => shareNote(note),
                              onExport: ($event) => exportNote(note)
                            }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["cols"])) : unref(viewMode) === "list" ? (openBlock(), createBlock(_component_LayoutColumn, {
                        key: 3,
                        gap: "md"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedNotes), (note) => {
                            return openBlock(), createBlock(_component_NoteListItem, {
                              key: note.id,
                              note,
                              onClick: ($event) => openNote(note),
                              onEdit: ($event) => editNote(note),
                              onDelete: ($event) => confirmDelete(note),
                              onShare: ($event) => shareNote(note),
                              onExport: ($event) => exportNote(note)
                            }, null, 8, ["note", "onClick", "onEdit", "onDelete", "onShare", "onExport"]);
                          }), 128))
                        ]),
                        _: 1
                      })) : unref(viewMode) === "board" ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "board-view"
                      }, [
                        createVNode(_component_LayoutRow, {
                          gap: "lg",
                          class: "board-columns"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(noteCategories, (category) => {
                              return createVNode(_component_LayoutColumn, {
                                key: category.id,
                                class: "board-column",
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "board-header" }, [
                                    createVNode("h3", { class: "board-title" }, toDisplayString(category.name), 1),
                                    createVNode(_component_Badge, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(getCategoryNotes(category.id).length), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  createVNode("div", { class: "board-notes" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(getCategoryNotes(category.id), (note) => {
                                      return openBlock(), createBlock(_component_NoteCard, {
                                        key: note.id,
                                        note,
                                        compact: "",
                                        onClick: ($event) => openNote(note),
                                        onEdit: ($event) => editNote(note),
                                        onDelete: ($event) => confirmDelete(note)
                                      }, null, 8, ["note", "onClick", "onEdit", "onDelete"]);
                                    }), 128))
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      unref(totalPages) > 1 && unref(viewMode) !== "board" ? (openBlock(), createBlock("div", {
                        key: 5,
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
        title: "Delete Note?",
        message: `Are you sure you want to delete '${(_a = unref(selectedNote)) == null ? void 0 : _a.title}'? This action cannot be undone.`,
        "confirm-text": "Delete",
        onConfirm: deleteNote
      }, null, _parent));
      _push(ssrRenderComponent(_component_ShareModal, {
        visible: unref(showShare),
        "onUpdate:visible": ($event) => isRef(showShare) ? showShare.value = $event : null,
        item: unref(selectedNote),
        "item-type": "note",
        onShare: handleShare
      }, null, _parent));
      _push(ssrRenderComponent(_component_ExportModal, {
        visible: unref(showExport),
        "onUpdate:visible": ($event) => isRef(showExport) ? showExport.value = $event : null,
        item: unref(selectedNote),
        "item-type": "note",
        onExport: handleExport
      }, null, _parent));
      _push(ssrRenderComponent(_component_TemplateModal, {
        visible: unref(showTemplates),
        "onUpdate:visible": ($event) => isRef(showTemplates) ? showTemplates.value = $event : null,
        onSelect: createFromTemplate
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/student/notebook/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31d446e5"]]);

export { index as default };
//# sourceMappingURL=index-BPxosNYu.mjs.map
