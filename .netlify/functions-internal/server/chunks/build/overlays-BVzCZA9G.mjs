import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { _ as __nuxt_component_3 } from './LayoutRow-LeLejZeC.mjs';
import { _ as __nuxt_component_5 } from './LayoutGrid-BrkUCmmW.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, isRef, createSlots, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useToast } from './useToast-BD9RVwOt.mjs';
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
  __name: "overlays",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const modalSmall = ref(false);
    const modalLarge = ref(false);
    const modalFullscreen = ref(false);
    const modalPersistent = ref(false);
    const bottomSheetBasic = ref(false);
    const bottomSheetSnapPoints = ref(false);
    const bottomSheetNoSwipe = ref(false);
    const actionSheetBasic = ref(false);
    const actionSheetDestructive = ref(false);
    const actionSheetIcons = ref(false);
    const drawerLeft = ref(false);
    const drawerRight = ref(false);
    const drawerTop = ref(false);
    const drawerBottom = ref(false);
    const activeTab = ref(0);
    const tabs = [
      { id: "tab1", label: "Dashboard" },
      { id: "tab2", label: "Analytics" },
      { id: "tab3", label: "Reports" },
      { id: "tab4", label: "Settings" }
    ];
    const basicActions = [
      { label: "Share", action: () => console.log("Share clicked") },
      { label: "Copy Link", action: () => console.log("Copy clicked") },
      { label: "Edit", action: () => console.log("Edit clicked") }
    ];
    const destructiveActions = [
      { label: "Delete Item", destructive: true, action: () => console.log("Delete clicked") },
      { label: "Archive", action: () => console.log("Archive clicked") }
    ];
    const iconActions = [
      {
        label: "Camera",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
        action: () => console.log("Camera clicked")
      },
      {
        label: "Photo Library",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        action: () => console.log("Photo library clicked")
      },
      {
        label: "Documents",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
        action: () => console.log("Documents clicked")
      }
    ];
    const showInfoToast = () => {
      toast.info({
        title: "Information",
        description: "This is an informational message."
      });
    };
    const showSuccessToast = () => {
      toast.success({
        title: "Success!",
        description: "Your changes have been saved."
      });
    };
    const showWarningToast = () => {
      toast.warning({
        title: "Warning",
        description: "Please review your input before continuing."
      });
    };
    const showErrorToast = () => {
      toast.error({
        title: "Error",
        description: "Something went wrong. Please try again."
      });
    };
    const showActionToast = () => {
      toast.show({
        type: "info",
        title: "New Message",
        description: "You have a new message from John Doe.",
        action: {
          label: "View",
          action: () => console.log("View clicked")
        }
      });
    };
    const showClickableToast = () => {
      toast.show({
        type: "success",
        title: "File Uploaded",
        description: "Click to view your uploaded file.",
        onClick: () => console.log("Toast clicked")
      });
    };
    const showPersistentToast = () => {
      toast.show({
        type: "warning",
        title: "Persistent Notification",
        description: "This notification will stay until manually dismissed.",
        duration: 0,
        closable: true
      });
    };
    useHead({
      title: "Overlay Components - Mobile-First Nuxt",
      meta: [
        {
          name: "description",
          content: "Demo of overlay components including modals, sheets, and toasts"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_LayoutRow = __nuxt_component_3;
      const _component_LayoutGrid = __nuxt_component_5;
      const _component_TabBar = resolveComponent("TabBar");
      const _component_Popover = resolveComponent("Popover");
      const _component_Tooltip = resolveComponent("Tooltip");
      const _component_Modal = resolveComponent("Modal");
      const _component_BottomSheet = resolveComponent("BottomSheet");
      const _component_ActionSheet = resolveComponent("ActionSheet");
      const _component_Drawer = resolveComponent("Drawer");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlays-demo" }, _attrs))} data-v-0236812f>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-header" data-v-0236812f${_scopeId3}><h1 data-v-0236812f${_scopeId3}>Overlay Components Demo</h1><p data-v-0236812f${_scopeId3}>Modals, sheets, drawers, and notifications for mobile-first experiences</p></div><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>Modal Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}>Small Modal</button><button class="demo-button" data-v-0236812f${_scopeId4}>Large Modal</button><button class="demo-button" data-v-0236812f${_scopeId4}>Fullscreen Modal</button><button class="demo-button" data-v-0236812f${_scopeId4}>Persistent Modal</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalSmall.value = true
                                }, "Small Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalLarge.value = true
                                }, "Large Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalFullscreen.value = true
                                }, "Fullscreen Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalPersistent.value = true
                                }, "Persistent Modal", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>BottomSheet Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}> Basic Bottom Sheet </button><button class="demo-button" data-v-0236812f${_scopeId4}> With Snap Points </button><button class="demo-button" data-v-0236812f${_scopeId4}> No Swipe to Close </button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetBasic.value = true
                                }, " Basic Bottom Sheet ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetSnapPoints.value = true
                                }, " With Snap Points ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetNoSwipe.value = true
                                }, " No Swipe to Close ", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>ActionSheet Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}>Basic Actions</button><button class="demo-button" data-v-0236812f${_scopeId4}> With Destructive Action </button><button class="demo-button" data-v-0236812f${_scopeId4}>With Icons</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetBasic.value = true
                                }, "Basic Actions", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetDestructive.value = true
                                }, " With Destructive Action ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetIcons.value = true
                                }, "With Icons", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>Drawer Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: { mobile: 2, tablet: 4 },
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}>Left Drawer</button><button class="demo-button" data-v-0236812f${_scopeId4}>Right Drawer</button><button class="demo-button" data-v-0236812f${_scopeId4}>Top Drawer</button><button class="demo-button" data-v-0236812f${_scopeId4}>Bottom Drawer</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerLeft.value = true
                                }, "Left Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerRight.value = true
                                }, "Right Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerTop.value = true
                                }, "Top Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerBottom.value = true
                                }, "Bottom Drawer", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>Toast Notifications</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutGrid, {
                          cols: { mobile: 2, tablet: 4 },
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}>Info Toast</button><button class="demo-button" data-v-0236812f${_scopeId4}>Success Toast</button><button class="demo-button" data-v-0236812f${_scopeId4}>Warning Toast</button><button class="demo-button" data-v-0236812f${_scopeId4}>Error Toast</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showInfoToast
                                }, "Info Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showSuccessToast
                                }, "Success Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showWarningToast
                                }, "Warning Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showErrorToast
                                }, "Error Toast")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true,
                          style: { "margin-top": "var(--spacing-md)" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="demo-button" data-v-0236812f${_scopeId4}>With Action</button><button class="demo-button" data-v-0236812f${_scopeId4}>Clickable Toast</button><button class="demo-button" data-v-0236812f${_scopeId4}>Persistent Toast</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showActionToast
                                }, "With Action"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showClickableToast
                                }, "Clickable Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showPersistentToast
                                }, "Persistent Toast")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>TabBar Component</h2>`);
                        _push4(ssrRenderComponent(_component_TabBar, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                          tabs,
                          swipeable: true
                        }, {
                          "panel-tab1": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="tab-content" data-v-0236812f${_scopeId4}><h3 data-v-0236812f${_scopeId4}>Dashboard Content</h3><p data-v-0236812f${_scopeId4}>This is the dashboard tab content. You can swipe between tabs on mobile!</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Dashboard Content"),
                                  createVNode("p", null, "This is the dashboard tab content. You can swipe between tabs on mobile!")
                                ])
                              ];
                            }
                          }),
                          "panel-tab2": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="tab-content" data-v-0236812f${_scopeId4}><h3 data-v-0236812f${_scopeId4}>Analytics Content</h3><p data-v-0236812f${_scopeId4}>Analytics and charts would go here.</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Analytics Content"),
                                  createVNode("p", null, "Analytics and charts would go here.")
                                ])
                              ];
                            }
                          }),
                          "panel-tab3": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="tab-content" data-v-0236812f${_scopeId4}><h3 data-v-0236812f${_scopeId4}>Reports Content</h3><p data-v-0236812f${_scopeId4}>Various reports and data exports.</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Reports Content"),
                                  createVNode("p", null, "Various reports and data exports.")
                                ])
                              ];
                            }
                          }),
                          "panel-tab4": withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="tab-content" data-v-0236812f${_scopeId4}><h3 data-v-0236812f${_scopeId4}>Settings Content</h3><p data-v-0236812f${_scopeId4}>Application settings and configuration.</p></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Settings Content"),
                                  createVNode("p", null, "Application settings and configuration.")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>Popover Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Popover, { placement: "top" }, {
                                trigger: withCtx(({ toggle }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Click Popover</button>`);
                                  } else {
                                    return [
                                      createVNode("button", {
                                        class: "demo-button",
                                        onClick: toggle
                                      }, "Click Popover", 8, ["onClick"])
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div data-v-0236812f${_scopeId5}><h4 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-0236812f${_scopeId5}>Click Triggered</h4><p data-v-0236812f${_scopeId5}>This popover appears on click. Click outside or press ESC to close.</p></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { style: { "margin-top": "0" } }, "Click Triggered"),
                                        createVNode("p", null, "This popover appears on click. Click outside or press ESC to close.")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Popover, {
                                triggers: ["hover"],
                                placement: "right"
                              }, {
                                trigger: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Hover Popover</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "demo-button" }, "Hover Popover")
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div data-v-0236812f${_scopeId5}><h4 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-0236812f${_scopeId5}>Hover Triggered</h4><p data-v-0236812f${_scopeId5}>This popover appears on hover with smooth transitions.</p></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { style: { "margin-top": "0" } }, "Hover Triggered"),
                                        createVNode("p", null, "This popover appears on hover with smooth transitions.")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Popover, {
                                placement: "bottom",
                                "show-arrow": false
                              }, {
                                trigger: withCtx(({ toggle }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>No Arrow</button>`);
                                  } else {
                                    return [
                                      createVNode("button", {
                                        class: "demo-button",
                                        onClick: toggle
                                      }, "No Arrow", 8, ["onClick"])
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div data-v-0236812f${_scopeId5}><p data-v-0236812f${_scopeId5}>This popover has no arrow pointer.</p></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("p", null, "This popover has no arrow pointer.")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Popover, { placement: "left" }, createSlots({
                                trigger: withCtx(({ toggle, isOpen }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="${ssrRenderClass([{ active: isOpen }, "demo-button"])}" data-v-0236812f${_scopeId5}>${ssrInterpolate(isOpen ? "Close" : "Open")} Menu </button>`);
                                  } else {
                                    return [
                                      createVNode("button", {
                                        class: ["demo-button", { active: isOpen }],
                                        onClick: toggle
                                      }, toDisplayString(isOpen ? "Close" : "Open") + " Menu ", 11, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, [
                                _ctx.$slots.default ? {
                                  name: "default",
                                  fn: withCtx((slotProps, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="popover-menu" data-v-0236812f${_scopeId5}><button class="menu-item" data-v-0236812f${_scopeId5}>Profile</button><button class="menu-item" data-v-0236812f${_scopeId5}>Settings</button><button class="menu-item" data-v-0236812f${_scopeId5}>Help</button><hr data-v-0236812f${_scopeId5}><button class="menu-item" data-v-0236812f${_scopeId5}>Logout</button></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "popover-menu" }, [
                                          createVNode("button", {
                                            class: "menu-item",
                                            onClick: ($event) => {
                                              var _a;
                                              return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                            }
                                          }, "Profile", 8, ["onClick"]),
                                          createVNode("button", {
                                            class: "menu-item",
                                            onClick: ($event) => {
                                              var _a;
                                              return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                            }
                                          }, "Settings", 8, ["onClick"]),
                                          createVNode("button", {
                                            class: "menu-item",
                                            onClick: ($event) => {
                                              var _a;
                                              return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                            }
                                          }, "Help", 8, ["onClick"]),
                                          createVNode("hr"),
                                          createVNode("button", {
                                            class: "menu-item",
                                            onClick: ($event) => {
                                              var _a;
                                              return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                            }
                                          }, "Logout", 8, ["onClick"])
                                        ])
                                      ];
                                    }
                                  }),
                                  key: "0"
                                } : void 0
                              ]), _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Popover, { placement: "top" }, {
                                  trigger: withCtx(({ toggle }) => [
                                    createVNode("button", {
                                      class: "demo-button",
                                      onClick: toggle
                                    }, "Click Popover", 8, ["onClick"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { style: { "margin-top": "0" } }, "Click Triggered"),
                                      createVNode("p", null, "This popover appears on click. Click outside or press ESC to close.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, {
                                  triggers: ["hover"],
                                  placement: "right"
                                }, {
                                  trigger: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Hover Popover")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { style: { "margin-top": "0" } }, "Hover Triggered"),
                                      createVNode("p", null, "This popover appears on hover with smooth transitions.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, {
                                  placement: "bottom",
                                  "show-arrow": false
                                }, {
                                  trigger: withCtx(({ toggle }) => [
                                    createVNode("button", {
                                      class: "demo-button",
                                      onClick: toggle
                                    }, "No Arrow", 8, ["onClick"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("p", null, "This popover has no arrow pointer.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, { placement: "left" }, createSlots({
                                  trigger: withCtx(({ toggle, isOpen }) => [
                                    createVNode("button", {
                                      class: ["demo-button", { active: isOpen }],
                                      onClick: toggle
                                    }, toDisplayString(isOpen ? "Close" : "Open") + " Menu ", 11, ["onClick"])
                                  ]),
                                  _: 2
                                }, [
                                  _ctx.$slots.default ? {
                                    name: "default",
                                    fn: withCtx((slotProps) => [
                                      createVNode("div", { class: "popover-menu" }, [
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Profile", 8, ["onClick"]),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Settings", 8, ["onClick"]),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Help", 8, ["onClick"]),
                                        createVNode("hr"),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Logout", 8, ["onClick"])
                                      ])
                                    ]),
                                    key: "0"
                                  } : void 0
                                ]), 1024)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section><section data-v-0236812f${_scopeId3}><h2 data-v-0236812f${_scopeId3}>Tooltip Component</h2>`);
                        _push4(ssrRenderComponent(_component_LayoutRow, {
                          gap: "lg",
                          wrap: true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Tooltip, {
                                content: "This is a helpful tooltip",
                                placement: "top"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Top Tooltip</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "demo-button" }, "Top Tooltip")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Tooltip, {
                                content: "Appears on the right side",
                                placement: "right"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Right Tooltip</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "demo-button" }, "Right Tooltip")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Tooltip, {
                                content: "Bottom positioned tooltip",
                                placement: "bottom"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Bottom Tooltip</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "demo-button" }, "Bottom Tooltip")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Tooltip, { placement: "left" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="demo-button" data-v-0236812f${_scopeId5}>Custom Content</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "demo-button" }, "Custom Content")
                                    ];
                                  }
                                }),
                                content: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div data-v-0236812f${_scopeId5}><strong data-v-0236812f${_scopeId5}>Rich Content Tooltip</strong><p style="${ssrRenderStyle({ "margin": "4px 0 0" })}" data-v-0236812f${_scopeId5}>You can add any content here!</p></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("strong", null, "Rich Content Tooltip"),
                                        createVNode("p", { style: { "margin": "4px 0 0" } }, "You can add any content here!")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Tooltip, {
                                content: "This tooltip has no arrow",
                                "show-arrow": false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="demo-link" data-v-0236812f${_scopeId5}>Hover over this link</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "demo-link" }, "Hover over this link")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Tooltip, {
                                  content: "This is a helpful tooltip",
                                  placement: "top"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Top Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "Appears on the right side",
                                  placement: "right"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Right Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "Bottom positioned tooltip",
                                  placement: "bottom"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Bottom Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, { placement: "left" }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Custom Content")
                                  ]),
                                  content: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("strong", null, "Rich Content Tooltip"),
                                      createVNode("p", { style: { "margin": "4px 0 0" } }, "You can add any content here!")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "This tooltip has no arrow",
                                  "show-arrow": false
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "demo-link" }, "Hover over this link")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</section>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-header" }, [
                            createVNode("h1", null, "Overlay Components Demo"),
                            createVNode("p", null, "Modals, sheets, drawers, and notifications for mobile-first experiences")
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Modal Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalSmall.value = true
                                }, "Small Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalLarge.value = true
                                }, "Large Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalFullscreen.value = true
                                }, "Fullscreen Modal", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => modalPersistent.value = true
                                }, "Persistent Modal", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "BottomSheet Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetBasic.value = true
                                }, " Basic Bottom Sheet ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetSnapPoints.value = true
                                }, " With Snap Points ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => bottomSheetNoSwipe.value = true
                                }, " No Swipe to Close ", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "ActionSheet Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetBasic.value = true
                                }, "Basic Actions", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetDestructive.value = true
                                }, " With Destructive Action ", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => actionSheetIcons.value = true
                                }, "With Icons", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Drawer Component"),
                            createVNode(_component_LayoutGrid, {
                              cols: { mobile: 2, tablet: 4 },
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerLeft.value = true
                                }, "Left Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerRight.value = true
                                }, "Right Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerTop.value = true
                                }, "Top Drawer", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: ($event) => drawerBottom.value = true
                                }, "Bottom Drawer", 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Toast Notifications"),
                            createVNode(_component_LayoutGrid, {
                              cols: { mobile: 2, tablet: 4 },
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showInfoToast
                                }, "Info Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showSuccessToast
                                }, "Success Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showWarningToast
                                }, "Warning Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showErrorToast
                                }, "Error Toast")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true,
                              style: { "margin-top": "var(--spacing-md)" }
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showActionToast
                                }, "With Action"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showClickableToast
                                }, "Clickable Toast"),
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: showPersistentToast
                                }, "Persistent Toast")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "TabBar Component"),
                            createVNode(_component_TabBar, {
                              modelValue: unref(activeTab),
                              "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                              tabs,
                              swipeable: true
                            }, {
                              "panel-tab1": withCtx(() => [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Dashboard Content"),
                                  createVNode("p", null, "This is the dashboard tab content. You can swipe between tabs on mobile!")
                                ])
                              ]),
                              "panel-tab2": withCtx(() => [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Analytics Content"),
                                  createVNode("p", null, "Analytics and charts would go here.")
                                ])
                              ]),
                              "panel-tab3": withCtx(() => [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Reports Content"),
                                  createVNode("p", null, "Various reports and data exports.")
                                ])
                              ]),
                              "panel-tab4": withCtx(() => [
                                createVNode("div", { class: "tab-content" }, [
                                  createVNode("h3", null, "Settings Content"),
                                  createVNode("p", null, "Application settings and configuration.")
                                ])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Popover Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "md",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Popover, { placement: "top" }, {
                                  trigger: withCtx(({ toggle }) => [
                                    createVNode("button", {
                                      class: "demo-button",
                                      onClick: toggle
                                    }, "Click Popover", 8, ["onClick"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { style: { "margin-top": "0" } }, "Click Triggered"),
                                      createVNode("p", null, "This popover appears on click. Click outside or press ESC to close.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, {
                                  triggers: ["hover"],
                                  placement: "right"
                                }, {
                                  trigger: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Hover Popover")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { style: { "margin-top": "0" } }, "Hover Triggered"),
                                      createVNode("p", null, "This popover appears on hover with smooth transitions.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, {
                                  placement: "bottom",
                                  "show-arrow": false
                                }, {
                                  trigger: withCtx(({ toggle }) => [
                                    createVNode("button", {
                                      class: "demo-button",
                                      onClick: toggle
                                    }, "No Arrow", 8, ["onClick"])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("p", null, "This popover has no arrow pointer.")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Popover, { placement: "left" }, createSlots({
                                  trigger: withCtx(({ toggle, isOpen }) => [
                                    createVNode("button", {
                                      class: ["demo-button", { active: isOpen }],
                                      onClick: toggle
                                    }, toDisplayString(isOpen ? "Close" : "Open") + " Menu ", 11, ["onClick"])
                                  ]),
                                  _: 2
                                }, [
                                  _ctx.$slots.default ? {
                                    name: "default",
                                    fn: withCtx((slotProps) => [
                                      createVNode("div", { class: "popover-menu" }, [
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Profile", 8, ["onClick"]),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Settings", 8, ["onClick"]),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Help", 8, ["onClick"]),
                                        createVNode("hr"),
                                        createVNode("button", {
                                          class: "menu-item",
                                          onClick: ($event) => {
                                            var _a;
                                            return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                          }
                                        }, "Logout", 8, ["onClick"])
                                      ])
                                    ]),
                                    key: "0"
                                  } : void 0
                                ]), 1024)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Tooltip Component"),
                            createVNode(_component_LayoutRow, {
                              gap: "lg",
                              wrap: true
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Tooltip, {
                                  content: "This is a helpful tooltip",
                                  placement: "top"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Top Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "Appears on the right side",
                                  placement: "right"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Right Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "Bottom positioned tooltip",
                                  placement: "bottom"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Bottom Tooltip")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, { placement: "left" }, {
                                  default: withCtx(() => [
                                    createVNode("button", { class: "demo-button" }, "Custom Content")
                                  ]),
                                  content: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("strong", null, "Rich Content Tooltip"),
                                      createVNode("p", { style: { "margin": "4px 0 0" } }, "You can add any content here!")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Tooltip, {
                                  content: "This tooltip has no arrow",
                                  "show-arrow": false
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "demo-link" }, "Hover over this link")
                                  ]),
                                  _: 1
                                })
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
                        createVNode("div", { class: "demo-header" }, [
                          createVNode("h1", null, "Overlay Components Demo"),
                          createVNode("p", null, "Modals, sheets, drawers, and notifications for mobile-first experiences")
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Modal Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => modalSmall.value = true
                              }, "Small Modal", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => modalLarge.value = true
                              }, "Large Modal", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => modalFullscreen.value = true
                              }, "Fullscreen Modal", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => modalPersistent.value = true
                              }, "Persistent Modal", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "BottomSheet Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => bottomSheetBasic.value = true
                              }, " Basic Bottom Sheet ", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => bottomSheetSnapPoints.value = true
                              }, " With Snap Points ", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => bottomSheetNoSwipe.value = true
                              }, " No Swipe to Close ", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "ActionSheet Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => actionSheetBasic.value = true
                              }, "Basic Actions", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => actionSheetDestructive.value = true
                              }, " With Destructive Action ", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => actionSheetIcons.value = true
                              }, "With Icons", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Drawer Component"),
                          createVNode(_component_LayoutGrid, {
                            cols: { mobile: 2, tablet: 4 },
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => drawerLeft.value = true
                              }, "Left Drawer", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => drawerRight.value = true
                              }, "Right Drawer", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => drawerTop.value = true
                              }, "Top Drawer", 8, ["onClick"]),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: ($event) => drawerBottom.value = true
                              }, "Bottom Drawer", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Toast Notifications"),
                          createVNode(_component_LayoutGrid, {
                            cols: { mobile: 2, tablet: 4 },
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showInfoToast
                              }, "Info Toast"),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showSuccessToast
                              }, "Success Toast"),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showWarningToast
                              }, "Warning Toast"),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showErrorToast
                              }, "Error Toast")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true,
                            style: { "margin-top": "var(--spacing-md)" }
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showActionToast
                              }, "With Action"),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showClickableToast
                              }, "Clickable Toast"),
                              createVNode("button", {
                                class: "demo-button",
                                onClick: showPersistentToast
                              }, "Persistent Toast")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "TabBar Component"),
                          createVNode(_component_TabBar, {
                            modelValue: unref(activeTab),
                            "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                            tabs,
                            swipeable: true
                          }, {
                            "panel-tab1": withCtx(() => [
                              createVNode("div", { class: "tab-content" }, [
                                createVNode("h3", null, "Dashboard Content"),
                                createVNode("p", null, "This is the dashboard tab content. You can swipe between tabs on mobile!")
                              ])
                            ]),
                            "panel-tab2": withCtx(() => [
                              createVNode("div", { class: "tab-content" }, [
                                createVNode("h3", null, "Analytics Content"),
                                createVNode("p", null, "Analytics and charts would go here.")
                              ])
                            ]),
                            "panel-tab3": withCtx(() => [
                              createVNode("div", { class: "tab-content" }, [
                                createVNode("h3", null, "Reports Content"),
                                createVNode("p", null, "Various reports and data exports.")
                              ])
                            ]),
                            "panel-tab4": withCtx(() => [
                              createVNode("div", { class: "tab-content" }, [
                                createVNode("h3", null, "Settings Content"),
                                createVNode("p", null, "Application settings and configuration.")
                              ])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Popover Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "md",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Popover, { placement: "top" }, {
                                trigger: withCtx(({ toggle }) => [
                                  createVNode("button", {
                                    class: "demo-button",
                                    onClick: toggle
                                  }, "Click Popover", 8, ["onClick"])
                                ]),
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { style: { "margin-top": "0" } }, "Click Triggered"),
                                    createVNode("p", null, "This popover appears on click. Click outside or press ESC to close.")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Popover, {
                                triggers: ["hover"],
                                placement: "right"
                              }, {
                                trigger: withCtx(() => [
                                  createVNode("button", { class: "demo-button" }, "Hover Popover")
                                ]),
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { style: { "margin-top": "0" } }, "Hover Triggered"),
                                    createVNode("p", null, "This popover appears on hover with smooth transitions.")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Popover, {
                                placement: "bottom",
                                "show-arrow": false
                              }, {
                                trigger: withCtx(({ toggle }) => [
                                  createVNode("button", {
                                    class: "demo-button",
                                    onClick: toggle
                                  }, "No Arrow", 8, ["onClick"])
                                ]),
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("p", null, "This popover has no arrow pointer.")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Popover, { placement: "left" }, createSlots({
                                trigger: withCtx(({ toggle, isOpen }) => [
                                  createVNode("button", {
                                    class: ["demo-button", { active: isOpen }],
                                    onClick: toggle
                                  }, toDisplayString(isOpen ? "Close" : "Open") + " Menu ", 11, ["onClick"])
                                ]),
                                _: 2
                              }, [
                                _ctx.$slots.default ? {
                                  name: "default",
                                  fn: withCtx((slotProps) => [
                                    createVNode("div", { class: "popover-menu" }, [
                                      createVNode("button", {
                                        class: "menu-item",
                                        onClick: ($event) => {
                                          var _a;
                                          return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                        }
                                      }, "Profile", 8, ["onClick"]),
                                      createVNode("button", {
                                        class: "menu-item",
                                        onClick: ($event) => {
                                          var _a;
                                          return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                        }
                                      }, "Settings", 8, ["onClick"]),
                                      createVNode("button", {
                                        class: "menu-item",
                                        onClick: ($event) => {
                                          var _a;
                                          return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                        }
                                      }, "Help", 8, ["onClick"]),
                                      createVNode("hr"),
                                      createVNode("button", {
                                        class: "menu-item",
                                        onClick: ($event) => {
                                          var _a;
                                          return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                        }
                                      }, "Logout", 8, ["onClick"])
                                    ])
                                  ]),
                                  key: "0"
                                } : void 0
                              ]), 1024)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Tooltip Component"),
                          createVNode(_component_LayoutRow, {
                            gap: "lg",
                            wrap: true
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Tooltip, {
                                content: "This is a helpful tooltip",
                                placement: "top"
                              }, {
                                default: withCtx(() => [
                                  createVNode("button", { class: "demo-button" }, "Top Tooltip")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Tooltip, {
                                content: "Appears on the right side",
                                placement: "right"
                              }, {
                                default: withCtx(() => [
                                  createVNode("button", { class: "demo-button" }, "Right Tooltip")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Tooltip, {
                                content: "Bottom positioned tooltip",
                                placement: "bottom"
                              }, {
                                default: withCtx(() => [
                                  createVNode("button", { class: "demo-button" }, "Bottom Tooltip")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Tooltip, { placement: "left" }, {
                                default: withCtx(() => [
                                  createVNode("button", { class: "demo-button" }, "Custom Content")
                                ]),
                                content: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("strong", null, "Rich Content Tooltip"),
                                    createVNode("p", { style: { "margin": "4px 0 0" } }, "You can add any content here!")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Tooltip, {
                                content: "This tooltip has no arrow",
                                "show-arrow": false
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "demo-link" }, "Hover over this link")
                                ]),
                                _: 1
                              })
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
                      createVNode("div", { class: "demo-header" }, [
                        createVNode("h1", null, "Overlay Components Demo"),
                        createVNode("p", null, "Modals, sheets, drawers, and notifications for mobile-first experiences")
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Modal Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => modalSmall.value = true
                            }, "Small Modal", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => modalLarge.value = true
                            }, "Large Modal", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => modalFullscreen.value = true
                            }, "Fullscreen Modal", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => modalPersistent.value = true
                            }, "Persistent Modal", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "BottomSheet Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => bottomSheetBasic.value = true
                            }, " Basic Bottom Sheet ", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => bottomSheetSnapPoints.value = true
                            }, " With Snap Points ", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => bottomSheetNoSwipe.value = true
                            }, " No Swipe to Close ", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "ActionSheet Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => actionSheetBasic.value = true
                            }, "Basic Actions", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => actionSheetDestructive.value = true
                            }, " With Destructive Action ", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => actionSheetIcons.value = true
                            }, "With Icons", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Drawer Component"),
                        createVNode(_component_LayoutGrid, {
                          cols: { mobile: 2, tablet: 4 },
                          gap: "md"
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => drawerLeft.value = true
                            }, "Left Drawer", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => drawerRight.value = true
                            }, "Right Drawer", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => drawerTop.value = true
                            }, "Top Drawer", 8, ["onClick"]),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: ($event) => drawerBottom.value = true
                            }, "Bottom Drawer", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Toast Notifications"),
                        createVNode(_component_LayoutGrid, {
                          cols: { mobile: 2, tablet: 4 },
                          gap: "md"
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showInfoToast
                            }, "Info Toast"),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showSuccessToast
                            }, "Success Toast"),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showWarningToast
                            }, "Warning Toast"),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showErrorToast
                            }, "Error Toast")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true,
                          style: { "margin-top": "var(--spacing-md)" }
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showActionToast
                            }, "With Action"),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showClickableToast
                            }, "Clickable Toast"),
                            createVNode("button", {
                              class: "demo-button",
                              onClick: showPersistentToast
                            }, "Persistent Toast")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "TabBar Component"),
                        createVNode(_component_TabBar, {
                          modelValue: unref(activeTab),
                          "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
                          tabs,
                          swipeable: true
                        }, {
                          "panel-tab1": withCtx(() => [
                            createVNode("div", { class: "tab-content" }, [
                              createVNode("h3", null, "Dashboard Content"),
                              createVNode("p", null, "This is the dashboard tab content. You can swipe between tabs on mobile!")
                            ])
                          ]),
                          "panel-tab2": withCtx(() => [
                            createVNode("div", { class: "tab-content" }, [
                              createVNode("h3", null, "Analytics Content"),
                              createVNode("p", null, "Analytics and charts would go here.")
                            ])
                          ]),
                          "panel-tab3": withCtx(() => [
                            createVNode("div", { class: "tab-content" }, [
                              createVNode("h3", null, "Reports Content"),
                              createVNode("p", null, "Various reports and data exports.")
                            ])
                          ]),
                          "panel-tab4": withCtx(() => [
                            createVNode("div", { class: "tab-content" }, [
                              createVNode("h3", null, "Settings Content"),
                              createVNode("p", null, "Application settings and configuration.")
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Popover Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "md",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Popover, { placement: "top" }, {
                              trigger: withCtx(({ toggle }) => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: toggle
                                }, "Click Popover", 8, ["onClick"])
                              ]),
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { style: { "margin-top": "0" } }, "Click Triggered"),
                                  createVNode("p", null, "This popover appears on click. Click outside or press ESC to close.")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Popover, {
                              triggers: ["hover"],
                              placement: "right"
                            }, {
                              trigger: withCtx(() => [
                                createVNode("button", { class: "demo-button" }, "Hover Popover")
                              ]),
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { style: { "margin-top": "0" } }, "Hover Triggered"),
                                  createVNode("p", null, "This popover appears on hover with smooth transitions.")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Popover, {
                              placement: "bottom",
                              "show-arrow": false
                            }, {
                              trigger: withCtx(({ toggle }) => [
                                createVNode("button", {
                                  class: "demo-button",
                                  onClick: toggle
                                }, "No Arrow", 8, ["onClick"])
                              ]),
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("p", null, "This popover has no arrow pointer.")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Popover, { placement: "left" }, createSlots({
                              trigger: withCtx(({ toggle, isOpen }) => [
                                createVNode("button", {
                                  class: ["demo-button", { active: isOpen }],
                                  onClick: toggle
                                }, toDisplayString(isOpen ? "Close" : "Open") + " Menu ", 11, ["onClick"])
                              ]),
                              _: 2
                            }, [
                              _ctx.$slots.default ? {
                                name: "default",
                                fn: withCtx((slotProps) => [
                                  createVNode("div", { class: "popover-menu" }, [
                                    createVNode("button", {
                                      class: "menu-item",
                                      onClick: ($event) => {
                                        var _a;
                                        return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                      }
                                    }, "Profile", 8, ["onClick"]),
                                    createVNode("button", {
                                      class: "menu-item",
                                      onClick: ($event) => {
                                        var _a;
                                        return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                      }
                                    }, "Settings", 8, ["onClick"]),
                                    createVNode("button", {
                                      class: "menu-item",
                                      onClick: ($event) => {
                                        var _a;
                                        return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                      }
                                    }, "Help", 8, ["onClick"]),
                                    createVNode("hr"),
                                    createVNode("button", {
                                      class: "menu-item",
                                      onClick: ($event) => {
                                        var _a;
                                        return (_a = slotProps == null ? void 0 : slotProps.close) == null ? void 0 : _a.call(slotProps);
                                      }
                                    }, "Logout", 8, ["onClick"])
                                  ])
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1024)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Tooltip Component"),
                        createVNode(_component_LayoutRow, {
                          gap: "lg",
                          wrap: true
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Tooltip, {
                              content: "This is a helpful tooltip",
                              placement: "top"
                            }, {
                              default: withCtx(() => [
                                createVNode("button", { class: "demo-button" }, "Top Tooltip")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Tooltip, {
                              content: "Appears on the right side",
                              placement: "right"
                            }, {
                              default: withCtx(() => [
                                createVNode("button", { class: "demo-button" }, "Right Tooltip")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Tooltip, {
                              content: "Bottom positioned tooltip",
                              placement: "bottom"
                            }, {
                              default: withCtx(() => [
                                createVNode("button", { class: "demo-button" }, "Bottom Tooltip")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Tooltip, { placement: "left" }, {
                              default: withCtx(() => [
                                createVNode("button", { class: "demo-button" }, "Custom Content")
                              ]),
                              content: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("strong", null, "Rich Content Tooltip"),
                                  createVNode("p", { style: { "margin": "4px 0 0" } }, "You can add any content here!")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_Tooltip, {
                              content: "This tooltip has no arrow",
                              "show-arrow": false
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "demo-link" }, "Hover over this link")
                              ]),
                              _: 1
                            })
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
      _push(ssrRenderComponent(_component_Modal, {
        modelValue: unref(modalSmall),
        "onUpdate:modelValue": ($event) => isRef(modalSmall) ? modalSmall.value = $event : null,
        title: "Small Modal",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-0236812f${_scopeId}>This is a small modal dialog. Perfect for confirmations and simple messages.</p>`);
          } else {
            return [
              createVNode("p", null, "This is a small modal dialog. Perfect for confirmations and simple messages.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Modal, {
        modelValue: unref(modalLarge),
        "onUpdate:modelValue": ($event) => isRef(modalLarge) ? modalLarge.value = $event : null,
        title: "Large Modal",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This is a large modal with more content space.</p><p data-v-0236812f${_scopeId2}>You can add forms, lists, or any other content here.</p><div class="demo-content-box" data-v-0236812f${_scopeId2}><p data-v-0236812f${_scopeId2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>`);
                } else {
                  return [
                    createVNode("p", null, "This is a large modal with more content space."),
                    createVNode("p", null, "You can add forms, lists, or any other content here."),
                    createVNode("div", { class: "demo-content-box" }, [
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
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
                  createVNode("p", null, "This is a large modal with more content space."),
                  createVNode("p", null, "You can add forms, lists, or any other content here."),
                  createVNode("div", { class: "demo-content-box" }, [
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Modal, {
        modelValue: unref(modalFullscreen),
        "onUpdate:modelValue": ($event) => isRef(modalFullscreen) ? modalFullscreen.value = $event : null,
        title: "Fullscreen Modal",
        fullscreen: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This modal takes up the full screen.</p><p data-v-0236812f${_scopeId2}>Great for immersive experiences or complex forms.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This modal takes up the full screen."),
                    createVNode("p", null, "Great for immersive experiences or complex forms.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "lg" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This modal takes up the full screen."),
                  createVNode("p", null, "Great for immersive experiences or complex forms.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Modal, {
        modelValue: unref(modalPersistent),
        "onUpdate:modelValue": ($event) => isRef(modalPersistent) ? modalPersistent.value = $event : null,
        title: "Persistent Modal",
        persistent: true,
        "close-on-escape": false,
        "close-on-backdrop": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-0236812f${_scopeId}>This modal can only be closed by clicking the close button.</p><p data-v-0236812f${_scopeId}>Clicking outside or pressing ESC won&#39;t close it.</p>`);
          } else {
            return [
              createVNode("p", null, "This modal can only be closed by clicking the close button."),
              createVNode("p", null, "Clicking outside or pressing ESC won't close it.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BottomSheet, {
        modelValue: unref(bottomSheetBasic),
        "onUpdate:modelValue": ($event) => isRef(bottomSheetBasic) ? bottomSheetBasic.value = $event : null,
        title: "Basic Bottom Sheet"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This is a basic bottom sheet. Drag down to close on mobile!</p><p data-v-0236812f${_scopeId2}>It automatically adjusts its height based on content.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This is a basic bottom sheet. Drag down to close on mobile!"),
                    createVNode("p", null, "It automatically adjusts its height based on content.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This is a basic bottom sheet. Drag down to close on mobile!"),
                  createVNode("p", null, "It automatically adjusts its height based on content.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BottomSheet, {
        modelValue: unref(bottomSheetSnapPoints),
        "onUpdate:modelValue": ($event) => isRef(bottomSheetSnapPoints) ? bottomSheetSnapPoints.value = $event : null,
        title: "Snap Points Demo",
        "snap-points": ["25%", "50%", "90%"],
        "default-snap-point": 1
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This sheet has multiple snap points: 25%, 50%, and 90% of screen height.</p><p data-v-0236812f${_scopeId2}>Drag up or down to snap between different heights!</p><!--[-->`);
                  ssrRenderList(10, (i) => {
                    _push3(`<div class="demo-content-box" data-v-0236812f${_scopeId2}><p data-v-0236812f${_scopeId2}>Content item ${ssrInterpolate(i)}</p></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("p", null, "This sheet has multiple snap points: 25%, 50%, and 90% of screen height."),
                    createVNode("p", null, "Drag up or down to snap between different heights!"),
                    (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "demo-content-box"
                      }, [
                        createVNode("p", null, "Content item " + toDisplayString(i), 1)
                      ]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This sheet has multiple snap points: 25%, 50%, and 90% of screen height."),
                  createVNode("p", null, "Drag up or down to snap between different heights!"),
                  (openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
                    return createVNode("div", {
                      key: i,
                      class: "demo-content-box"
                    }, [
                      createVNode("p", null, "Content item " + toDisplayString(i), 1)
                    ]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BottomSheet, {
        modelValue: unref(bottomSheetNoSwipe),
        "onUpdate:modelValue": ($event) => isRef(bottomSheetNoSwipe) ? bottomSheetNoSwipe.value = $event : null,
        title: "No Swipe Sheet",
        "swipe-to-close": false,
        "show-handle": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-0236812f${_scopeId}>This sheet cannot be dismissed by swiping. Use the close button instead.</p>`);
          } else {
            return [
              createVNode("p", null, "This sheet cannot be dismissed by swiping. Use the close button instead.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ActionSheet, {
        modelValue: unref(actionSheetBasic),
        "onUpdate:modelValue": ($event) => isRef(actionSheetBasic) ? actionSheetBasic.value = $event : null,
        title: "Choose an Option",
        actions: basicActions
      }, null, _parent));
      _push(ssrRenderComponent(_component_ActionSheet, {
        modelValue: unref(actionSheetDestructive),
        "onUpdate:modelValue": ($event) => isRef(actionSheetDestructive) ? actionSheetDestructive.value = $event : null,
        title: "Are you sure?",
        description: "This action cannot be undone.",
        actions: destructiveActions
      }, null, _parent));
      _push(ssrRenderComponent(_component_ActionSheet, {
        modelValue: unref(actionSheetIcons),
        "onUpdate:modelValue": ($event) => isRef(actionSheetIcons) ? actionSheetIcons.value = $event : null,
        actions: iconActions
      }, null, _parent));
      _push(ssrRenderComponent(_component_Drawer, {
        modelValue: unref(drawerLeft),
        "onUpdate:modelValue": ($event) => isRef(drawerLeft) ? drawerLeft.value = $event : null,
        position: "left",
        title: "Left Drawer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This drawer slides in from the left.</p><p data-v-0236812f${_scopeId2}>Swipe left to close on mobile devices.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This drawer slides in from the left."),
                    createVNode("p", null, "Swipe left to close on mobile devices.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This drawer slides in from the left."),
                  createVNode("p", null, "Swipe left to close on mobile devices.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Drawer, {
        modelValue: unref(drawerRight),
        "onUpdate:modelValue": ($event) => isRef(drawerRight) ? drawerRight.value = $event : null,
        position: "right",
        title: "Right Drawer",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutStack, { spacing: "md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0236812f${_scopeId2}>This drawer slides in from the right with a larger size.</p><p data-v-0236812f${_scopeId2}>Perfect for filters, settings, or additional navigation.</p>`);
                } else {
                  return [
                    createVNode("p", null, "This drawer slides in from the right with a larger size."),
                    createVNode("p", null, "Perfect for filters, settings, or additional navigation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutStack, { spacing: "md" }, {
                default: withCtx(() => [
                  createVNode("p", null, "This drawer slides in from the right with a larger size."),
                  createVNode("p", null, "Perfect for filters, settings, or additional navigation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Drawer, {
        modelValue: unref(drawerTop),
        "onUpdate:modelValue": ($event) => isRef(drawerTop) ? drawerTop.value = $event : null,
        position: "top",
        title: "Top Drawer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-0236812f${_scopeId}>This drawer slides down from the top. Great for notifications or alerts.</p>`);
          } else {
            return [
              createVNode("p", null, "This drawer slides down from the top. Great for notifications or alerts.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Drawer, {
        modelValue: unref(drawerBottom),
        "onUpdate:modelValue": ($event) => isRef(drawerBottom) ? drawerBottom.value = $event : null,
        position: "bottom",
        title: "Bottom Drawer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-0236812f${_scopeId}> This drawer slides up from the bottom. Similar to a bottom sheet but with different styling. </p>`);
          } else {
            return [
              createVNode("p", null, " This drawer slides up from the bottom. Similar to a bottom sheet but with different styling. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/overlays.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overlays = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0236812f"]]);

export { overlays as default };
//# sourceMappingURL=overlays-BVzCZA9G.mjs.map
