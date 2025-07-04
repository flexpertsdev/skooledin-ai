import { defineComponent, computed, watch, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderVNode } from 'vue/server-renderer';
import { d as useVModel } from './index-Bun7oj4a.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "ChoiceButtons",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: void 0 },
    options: { default: () => [] },
    label: {},
    helperText: {},
    error: {},
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    min: {},
    max: {},
    variant: { default: "default" },
    size: { default: "md" },
    layout: { default: "horizontal" },
    columns: { default: 2 },
    fullWidth: { type: Boolean, default: false },
    showCheck: { type: Boolean, default: true },
    color: { default: "primary" },
    labelKey: { default: "label" },
    valueKey: { default: "value" },
    descriptionKey: { default: "description" },
    iconKey: { default: "icon" },
    disabledKey: { default: "disabled" },
    colorKey: { default: "color" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const modelValue = useVModel(props, "modelValue", emit);
    const normalizedOptions = computed(() => {
      return props.options.map((option) => {
        if (typeof option === "string" || typeof option === "number") {
          return {
            [props.labelKey]: String(option),
            [props.valueKey]: option
          };
        }
        return option;
      });
    });
    const selectedValues = computed(() => {
      if (!modelValue.value) return [];
      return props.multiple ? Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value] : [modelValue.value];
    });
    const classes = computed(() => [
      "choice-buttons",
      `choice-buttons--${props.variant}`,
      `choice-buttons--${props.size}`,
      `choice-buttons--${props.layout}`,
      {
        "is-disabled": props.disabled,
        "is-full-width": props.fullWidth,
        "has-error": props.error
      }
    ]);
    const cssVars = computed(() => ({
      "--choice-columns": props.layout === "grid" ? props.columns : "auto",
      "--choice-color": `var(--color-${props.color})`
    }));
    const getOptionLabel = (option) => {
      return option[props.labelKey] || String(option);
    };
    const getOptionValue = (option) => {
      var _a;
      return (_a = option[props.valueKey]) != null ? _a : option;
    };
    const getOptionDescription = (option) => {
      return option[props.descriptionKey];
    };
    const getOptionIcon = (option) => {
      return option[props.iconKey];
    };
    const isDisabled = (option) => {
      return option[props.disabledKey] || false;
    };
    const getOptionColor = (option) => {
      return option[props.colorKey];
    };
    const isSelected = (option) => {
      const value = getOptionValue(option);
      return selectedValues.value.includes(value);
    };
    const getButtonClasses = (option) => {
      const color = getOptionColor(option) || props.color;
      return {
        "is-selected": isSelected(option),
        "is-disabled": isDisabled(option),
        [`color-${color}`]: true
      };
    };
    watch(modelValue, (value) => {
      if (props.multiple && Array.isArray(value)) {
        if (props.min && value.length < props.min) {
          console.warn(`Minimum ${props.min} selections required`);
        }
        if (props.max && value.length > props.max) {
          console.warn(`Maximum ${props.max} selections allowed`);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: classes.value,
        style: cssVars.value,
        role: "group",
        "aria-label": _ctx.label
      }, _attrs))} data-v-9094c360>`);
      if (_ctx.label) {
        _push(`<div class="choice-label" data-v-9094c360>${ssrInterpolate(_ctx.label)} `);
        if (_ctx.required) {
          _push(`<span class="choice-required" data-v-9094c360>*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="choice-buttons-container" data-v-9094c360><!--[-->`);
      ssrRenderList(normalizedOptions.value, (option, index) => {
        _push(`<button type="button" class="${ssrRenderClass([getButtonClasses(option), "choice-button"])}"${ssrIncludeBooleanAttr(isDisabled(option) || _ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("aria-pressed", isSelected(option))} data-v-9094c360>`);
        if (getOptionIcon(option)) {
          _push(`<span class="button-icon" data-v-9094c360>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getOptionIcon(option)), null, null), _parent);
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="button-content" data-v-9094c360><span class="button-label" data-v-9094c360>${ssrInterpolate(getOptionLabel(option))}</span>`);
        if (getOptionDescription(option)) {
          _push(`<span class="button-description" data-v-9094c360>${ssrInterpolate(getOptionDescription(option))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
        if (_ctx.showCheck && isSelected(option)) {
          _push(`<svg class="button-check" viewBox="0 0 24 24" fill="currentColor" data-v-9094c360><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" data-v-9094c360></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
      if (_ctx.helperText || _ctx.error) {
        _push(`<div class="choice-helper" data-v-9094c360><span class="${ssrRenderClass({ "is-error": _ctx.error })}" data-v-9094c360>${ssrInterpolate(_ctx.error || _ctx.helperText)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/ChoiceButtons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ChoiceButtons = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9094c360"]]);

export { ChoiceButtons as default };
//# sourceMappingURL=ChoiceButtons-CU6lBIeQ.mjs.map
