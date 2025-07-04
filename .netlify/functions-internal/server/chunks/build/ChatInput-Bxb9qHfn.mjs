import { defineComponent, ref, computed, mergeProps, unref, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { d as useVModel, e as useTextareaAutosize } from './index-Bun7oj4a.mjs';
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
  __name: "ChatInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    placeholder: { default: "Type a message..." },
    minRows: { default: 1 },
    maxRows: { default: 5 },
    maxLength: {},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autoResize: { type: Boolean, default: true },
    showCounter: { type: Boolean, default: false },
    showTypingIndicator: { type: Boolean, default: false },
    enableVoice: { type: Boolean, default: false },
    suggestions: { default: () => [] },
    showSuggestions: { type: Boolean, default: false },
    sendOnEnter: { type: Boolean, default: true },
    variant: { default: "default" },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "send", "focus", "blur", "voice-start", "voice-end", "typing"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const textareaRef = ref();
    const modelValue = useVModel(props, "modelValue", emit);
    const isFocused = ref(false);
    const isTyping = ref(false);
    const isRecording = ref(false);
    ref();
    const { textarea } = useTextareaAutosize({
      element: textareaRef,
      input: modelValue,
      styleProp: "minHeight"
    });
    const characterCount = computed(() => modelValue.value.length);
    const canSend = computed(() => {
      return modelValue.value.trim().length > 0;
    });
    const textareaHeight = computed(() => {
      var _a;
      if (!props.autoResize) return "auto";
      const lineHeight = 24;
      const padding = 16;
      const minHeight = props.minRows * lineHeight + padding;
      const maxHeight = props.maxRows * lineHeight + padding;
      return `${Math.min(Math.max(minHeight, ((_a = textarea.value) == null ? void 0 : _a.scrollHeight) || minHeight), maxHeight)}px`;
    });
    const classes = computed(() => [
      "chat-input",
      `chat-input--${props.variant}`,
      `chat-input--${props.size}`,
      {
        "is-focused": isFocused.value,
        "is-disabled": props.disabled,
        "is-readonly": props.readonly,
        "has-value": modelValue.value.length > 0,
        "is-recording": isRecording.value
      }
    ]);
    const cssVars = computed(() => ({
      "--chat-input-min-rows": props.minRows,
      "--chat-input-max-rows": props.maxRows
    }));
    const focus = () => {
      var _a;
      (_a = textareaRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = textareaRef.value) == null ? void 0 : _a.blur();
    };
    __expose({
      focus,
      blur
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: classes.value,
        style: cssVars.value
      }, _attrs))} data-v-daddf1e7><div class="chat-input-container" data-v-daddf1e7>`);
      if (_ctx.$slots.left) {
        _push(`<div class="chat-input-left" data-v-daddf1e7>`);
        ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="chat-input-wrapper" data-v-daddf1e7><textarea${ssrRenderAttr("placeholder", _ctx.placeholder)}${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr("readonly" in _ctx ? _ctx.readonly : unref(readonly)) ? " readonly" : ""}${ssrRenderAttr("maxlength", _ctx.maxLength)}${ssrRenderAttr("rows", _ctx.minRows)} style="${ssrRenderStyle({ height: textareaHeight.value })}" class="chat-input-textarea" data-v-daddf1e7>${ssrInterpolate(unref(modelValue))}</textarea>`);
      if (_ctx.showCounter && _ctx.maxLength) {
        _push(`<div class="${ssrRenderClass([{ "is-exceeded": characterCount.value > _ctx.maxLength }, "chat-input-counter"])}" data-v-daddf1e7>${ssrInterpolate(characterCount.value)}/${ssrInterpolate(_ctx.maxLength)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.showTypingIndicator && isTyping.value) {
        _push(`<div class="chat-input-typing" data-v-daddf1e7><span class="typing-dot" data-v-daddf1e7></span><span class="typing-dot" data-v-daddf1e7></span><span class="typing-dot" data-v-daddf1e7></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="chat-input-actions" data-v-daddf1e7>`);
      if (_ctx.enableVoice) {
        _push(`<button type="button" class="${ssrRenderClass([{ "is-recording": isRecording.value }, "chat-input-btn voice-btn"])}"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} data-v-daddf1e7>`);
        if (!isRecording.value) {
          _push(`<svg viewBox="0 0 24 24" fill="currentColor" data-v-daddf1e7><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" data-v-daddf1e7></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" data-v-daddf1e7></path></svg>`);
        } else {
          _push(`<svg viewBox="0 0 24 24" fill="currentColor" data-v-daddf1e7><path d="M6 6h12v12H6z" data-v-daddf1e7></path></svg>`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="${ssrRenderClass([{ "can-send": canSend.value }, "chat-input-btn send-btn"])}"${ssrIncludeBooleanAttr(!canSend.value || _ctx.disabled) ? " disabled" : ""} data-v-daddf1e7><svg viewBox="0 0 24 24" fill="currentColor" data-v-daddf1e7><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" data-v-daddf1e7></path></svg></button>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div></div>`);
      if (_ctx.$slots.toolbar) {
        _push(`<div class="chat-input-toolbar" data-v-daddf1e7>`);
        ssrRenderSlot(_ctx.$slots, "toolbar", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.showSuggestions && _ctx.suggestions.length > 0) {
        _push(`<div class="chat-input-suggestions" data-v-daddf1e7><!--[-->`);
        ssrRenderList(_ctx.suggestions, (suggestion, index) => {
          _push(`<button type="button" class="suggestion-chip" data-v-daddf1e7>${ssrInterpolate(suggestion)}</button>`);
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/ChatInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ChatInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-daddf1e7"]]);

export { ChatInput as default };
//# sourceMappingURL=ChatInput-Bxb9qHfn.mjs.map
