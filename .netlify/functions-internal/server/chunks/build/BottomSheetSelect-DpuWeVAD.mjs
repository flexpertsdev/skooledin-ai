import { defineComponent, ref, computed, watch, mergeProps, withCtx, createBlock, createCommentVNode, createVNode, openBlock, withDirectives, vModelText, Fragment, renderList, toDisplayString, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { d as useVModel } from './index-Bun7oj4a.mjs';
import BottomSheet from './BottomSheet-BuIp15zi.mjs';
import { _ as _export_sfc } from './server.mjs';
import './index-C7HDIHE6.mjs';
import './useFocusTrap-D4TnBTVv.mjs';
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
  __name: "BottomSheetSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: void 0 },
    options: { default: () => [] },
    groups: { default: () => [] },
    label: {},
    placeholder: { default: "Select an option" },
    sheetTitle: {},
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    searchPlaceholder: { default: "Search..." },
    emptyText: { default: "No options found" },
    showActions: { type: Boolean, default: true },
    variant: { default: "default" },
    size: { default: "md" },
    labelKey: { default: "label" },
    valueKey: { default: "value" },
    descriptionKey: { default: "description" },
    disabledKey: { default: "disabled" }
  },
  emits: ["update:modelValue", "change", "open", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const modelValue = useVModel(props, "modelValue", emit);
    const isOpen = ref(false);
    const searchQuery = ref("");
    const grouped = computed(() => props.groups.length > 0);
    const hasValue = computed(() => {
      return modelValue.value !== void 0 && modelValue.value !== null && modelValue.value !== "";
    });
    const selectedOption = computed(() => {
      if (!hasValue.value) return null;
      if (grouped.value) {
        for (const group of props.groups) {
          const option = group.options.find((opt) => getOptionValue(opt) === modelValue.value);
          if (option) return option;
        }
      } else {
        return props.options.find((opt) => getOptionValue(opt) === modelValue.value);
      }
      return null;
    });
    const displayValue = computed(() => {
      if (selectedOption.value) {
        return getOptionLabel(selectedOption.value);
      }
      return props.placeholder;
    });
    const filteredOptions = computed(() => {
      if (!searchQuery.value) return props.options;
      const query = searchQuery.value.toLowerCase();
      return props.options.filter((option) => {
        var _a;
        const label = getOptionLabel(option).toLowerCase();
        const description = ((_a = getOptionDescription(option)) == null ? void 0 : _a.toLowerCase()) || "";
        return label.includes(query) || description.includes(query);
      });
    });
    const filteredGroups = computed(() => {
      if (!searchQuery.value) return props.groups;
      const query = searchQuery.value.toLowerCase();
      return props.groups.map((group) => ({
        ...group,
        options: group.options.filter((option) => {
          var _a;
          const label = getOptionLabel(option).toLowerCase();
          const description = ((_a = getOptionDescription(option)) == null ? void 0 : _a.toLowerCase()) || "";
          return label.includes(query) || description.includes(query);
        })
      })).filter((group) => group.options.length > 0);
    });
    const triggerClasses = computed(() => [
      "select-trigger",
      `select-trigger--${props.variant}`,
      `select-trigger--${props.size}`,
      {
        "is-disabled": props.disabled,
        "has-value": hasValue.value
      }
    ]);
    const getOptionLabel = (option) => {
      if (typeof option === "string") return option;
      return option[props.labelKey] || String(option);
    };
    const getOptionValue = (option) => {
      var _a;
      if (typeof option === "string") return option;
      return (_a = option[props.valueKey]) != null ? _a : option;
    };
    const getOptionDescription = (option) => {
      if (typeof option === "object" && option !== null) {
        return option[props.descriptionKey];
      }
      return void 0;
    };
    const isDisabled = (option) => {
      if (typeof option === "object" && option !== null) {
        return option[props.disabledKey] || false;
      }
      return false;
    };
    const isSelected = (option) => {
      return getOptionValue(option) === modelValue.value;
    };
    const selectOption = (option) => {
      if (isDisabled(option)) return;
      const value = getOptionValue(option);
      modelValue.value = value;
      emit("change", value);
      if (!props.showActions) {
        closeSheet();
      }
    };
    const clearSelection = () => {
      modelValue.value = void 0;
      emit("change", void 0);
    };
    const closeSheet = () => {
      isOpen.value = false;
      searchQuery.value = "";
      emit("close");
    };
    const handleSearch = () => {
    };
    watch(isOpen, (open) => {
      if (!open) {
        searchQuery.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bottom-sheet-select" }, _attrs))} data-v-e978a863><div class="${ssrRenderClass([triggerClasses.value, "select-trigger"])}" data-v-e978a863><div class="select-content" data-v-e978a863>`);
      if (_ctx.label) {
        _push(`<span class="select-label" data-v-e978a863>${ssrInterpolate(_ctx.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([{ "is-placeholder": !hasValue.value }, "select-value"])}" data-v-e978a863>${ssrInterpolate(displayValue.value)}</span></div><svg class="select-arrow" viewBox="0 0 24 24" fill="currentColor" data-v-e978a863><path d="M7 10l5 5 5-5H7z" data-v-e978a863></path></svg></div>`);
      _push(ssrRenderComponent(BottomSheet, {
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        title: _ctx.sheetTitle || _ctx.label,
        "snap-points": [0.7, 0.9],
        "initial-snap": 0.7,
        "backdrop-close": true,
        "swipe-to-close": true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.searchable) {
              _push2(`<div class="select-search" data-v-e978a863${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", _ctx.searchPlaceholder)} class="search-input" data-v-e978a863${_scopeId}><svg class="search-icon" viewBox="0 0 24 24" fill="currentColor" data-v-e978a863${_scopeId}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" data-v-e978a863${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass([{ "has-search": _ctx.searchable }, "select-options"])}" data-v-e978a863${_scopeId}>`);
            if (grouped.value) {
              _push2(`<!--[-->`);
              ssrRenderList(filteredGroups.value, (group) => {
                _push2(`<div class="option-group" data-v-e978a863${_scopeId}><div class="group-header" data-v-e978a863${_scopeId}>${ssrInterpolate(group.label)}</div><!--[-->`);
                ssrRenderList(group.options, (option) => {
                  _push2(`<div class="${ssrRenderClass([{
                    "is-selected": isSelected(option),
                    "is-disabled": isDisabled(option)
                  }, "select-option"])}" data-v-e978a863${_scopeId}><div class="option-content" data-v-e978a863${_scopeId}><span class="option-label" data-v-e978a863${_scopeId}>${ssrInterpolate(getOptionLabel(option))}</span>`);
                  if (getOptionDescription(option)) {
                    _push2(`<span class="option-description" data-v-e978a863${_scopeId}>${ssrInterpolate(getOptionDescription(option))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if (isSelected(option)) {
                    _push2(`<svg class="option-check" viewBox="0 0 24 24" fill="currentColor" data-v-e978a863${_scopeId}><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" data-v-e978a863${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(filteredOptions.value, (option) => {
                _push2(`<div class="${ssrRenderClass([{
                  "is-selected": isSelected(option),
                  "is-disabled": isDisabled(option)
                }, "select-option"])}" data-v-e978a863${_scopeId}><div class="option-content" data-v-e978a863${_scopeId}><span class="option-label" data-v-e978a863${_scopeId}>${ssrInterpolate(getOptionLabel(option))}</span>`);
                if (getOptionDescription(option)) {
                  _push2(`<span class="option-description" data-v-e978a863${_scopeId}>${ssrInterpolate(getOptionDescription(option))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (isSelected(option)) {
                  _push2(`<svg class="option-check" viewBox="0 0 24 24" fill="currentColor" data-v-e978a863${_scopeId}><path d="M9 16.2L4.8 12l-1.4-1.4L9 19 21 7l-1.4-1.4L9 16.2z" data-v-e978a863${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            }
            if (filteredOptions.value.length === 0) {
              _push2(`<div class="select-empty" data-v-e978a863${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
                _push2(`<p data-v-e978a863${_scopeId}>${ssrInterpolate(_ctx.emptyText)}</p>`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (_ctx.showActions) {
              _push2(`<div class="select-actions" data-v-e978a863${_scopeId}>`);
              if (_ctx.clearable && hasValue.value) {
                _push2(`<button type="button" class="action-btn clear-btn" data-v-e978a863${_scopeId}> Clear </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button type="button" class="action-btn done-btn" data-v-e978a863${_scopeId}> Done </button></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.searchable ? (openBlock(), createBlock("div", {
                key: 0,
                class: "select-search"
              }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                  type: "text",
                  placeholder: _ctx.searchPlaceholder,
                  class: "search-input",
                  onInput: handleSearch
                }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                  [vModelText, searchQuery.value]
                ]),
                (openBlock(), createBlock("svg", {
                  class: "search-icon",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })
                ]))
              ])) : createCommentVNode("", true),
              createVNode("div", {
                class: ["select-options", { "has-search": _ctx.searchable }]
              }, [
                grouped.value ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(filteredGroups.value, (group) => {
                  return openBlock(), createBlock("div", {
                    key: group.label,
                    class: "option-group"
                  }, [
                    createVNode("div", { class: "group-header" }, toDisplayString(group.label), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(group.options, (option) => {
                      return openBlock(), createBlock("div", {
                        key: getOptionValue(option),
                        class: ["select-option", {
                          "is-selected": isSelected(option),
                          "is-disabled": isDisabled(option)
                        }],
                        onClick: ($event) => selectOption(option)
                      }, [
                        createVNode("div", { class: "option-content" }, [
                          createVNode("span", { class: "option-label" }, toDisplayString(getOptionLabel(option)), 1),
                          getOptionDescription(option) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "option-description"
                          }, toDisplayString(getOptionDescription(option)), 1)) : createCommentVNode("", true)
                        ]),
                        isSelected(option) ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "option-check",
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          createVNode("path", { d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" })
                        ])) : createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]);
                }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredOptions.value, (option) => {
                  return openBlock(), createBlock("div", {
                    key: getOptionValue(option),
                    class: ["select-option", {
                      "is-selected": isSelected(option),
                      "is-disabled": isDisabled(option)
                    }],
                    onClick: ($event) => selectOption(option)
                  }, [
                    createVNode("div", { class: "option-content" }, [
                      createVNode("span", { class: "option-label" }, toDisplayString(getOptionLabel(option)), 1),
                      getOptionDescription(option) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "option-description"
                      }, toDisplayString(getOptionDescription(option)), 1)) : createCommentVNode("", true)
                    ]),
                    isSelected(option) ? (openBlock(), createBlock("svg", {
                      key: 0,
                      class: "option-check",
                      viewBox: "0 0 24 24",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M9 16.2L4.8 12l-1.4-1.4L9 19 21 7l-1.4-1.4L9 16.2z" })
                    ])) : createCommentVNode("", true)
                  ], 10, ["onClick"]);
                }), 128)),
                filteredOptions.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "select-empty"
                }, [
                  renderSlot(_ctx.$slots, "empty", {}, () => [
                    createVNode("p", null, toDisplayString(_ctx.emptyText), 1)
                  ], true)
                ])) : createCommentVNode("", true)
              ], 2),
              _ctx.showActions ? (openBlock(), createBlock("div", {
                key: 1,
                class: "select-actions"
              }, [
                _ctx.clearable && hasValue.value ? (openBlock(), createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "action-btn clear-btn",
                  onClick: clearSelection
                }, " Clear ")) : createCommentVNode("", true),
                createVNode("button", {
                  type: "button",
                  class: "action-btn done-btn",
                  onClick: closeSheet
                }, " Done ")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/BottomSheetSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BottomSheetSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e978a863"]]);

export { BottomSheetSelect as default };
//# sourceMappingURL=BottomSheetSelect-DpuWeVAD.mjs.map
