import { _ as __nuxt_component_0 } from './LayoutContainer-BlRRBH76.mjs';
import { defineComponent, ref, watch, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './useToast-BD9RVwOt.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "forms",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const chatMessage = ref("");
    const limitedMessage = ref("");
    const voiceMessage = ref("");
    const richMessage = ref("");
    const minimalMessage = ref("");
    const chatSuggestions = [
      "Hello!",
      "How are you?",
      "What can you help me with?",
      "Thanks for your help!"
    ];
    const selectedCountry = ref("");
    const selectedPlan = ref("");
    const selectedCity = ref("");
    const variantValue1 = ref("");
    const variantValue2 = ref("");
    const variantValue3 = ref("");
    const countries = [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" }
    ];
    const plans = [
      {
        label: "Free",
        value: "free",
        description: "Basic features for personal use"
      },
      {
        label: "Pro",
        value: "pro",
        description: "$9.99/month - Advanced features for professionals"
      },
      {
        label: "Team",
        value: "team",
        description: "$29.99/month - Collaboration features for teams"
      },
      {
        label: "Enterprise",
        value: "enterprise",
        description: "Custom pricing - Full features with priority support"
      }
    ];
    const cityGroups = [
      {
        label: "North America",
        options: [
          { label: "New York", value: "nyc" },
          { label: "Los Angeles", value: "la" },
          { label: "Toronto", value: "tor" },
          { label: "Vancouver", value: "van" }
        ]
      },
      {
        label: "Europe",
        options: [
          { label: "London", value: "lon" },
          { label: "Paris", value: "par" },
          { label: "Berlin", value: "ber" },
          { label: "Amsterdam", value: "ams" }
        ]
      },
      {
        label: "Asia",
        options: [
          { label: "Tokyo", value: "tok" },
          { label: "Singapore", value: "sin" },
          { label: "Hong Kong", value: "hk" },
          { label: "Seoul", value: "seo" }
        ]
      }
    ];
    const simpleOptions = ["Option 1", "Option 2", "Option 3"];
    const selectedSize = ref("medium");
    const selectedFeatures = ref([]);
    const selectedPayment = ref("");
    const selectedColor = ref("");
    const variantChoice1 = ref("");
    const variantChoice2 = ref("");
    const variantChoice3 = ref("");
    const variantChoice4 = ref("");
    const requiredChoice = ref("");
    const sizes = [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Extra Large", value: "xlarge" }
    ];
    const features = [
      "Dark Mode",
      "Notifications",
      "Auto-sync",
      "Offline Mode",
      "Analytics",
      "Cloud Backup"
    ];
    const paymentMethods = [
      {
        label: "Credit Card",
        value: "card",
        description: "Visa, Mastercard, Amex",
        icon: "\u{1F4B3}"
      },
      {
        label: "PayPal",
        value: "paypal",
        description: "Fast and secure",
        icon: "\u{1F17F}\uFE0F"
      },
      {
        label: "Bank Transfer",
        value: "bank",
        description: "3-5 business days",
        icon: "\u{1F3E6}"
      },
      {
        label: "Cryptocurrency",
        value: "crypto",
        description: "Bitcoin, Ethereum",
        icon: "\u20BF",
        disabled: true
      }
    ];
    const colorOptions = [
      { label: "Red", value: "red", color: "error" },
      { label: "Blue", value: "blue", color: "primary" },
      { label: "Green", value: "green", color: "success" },
      { label: "Orange", value: "orange", color: "warning" },
      { label: "Purple", value: "purple", color: "secondary" },
      { label: "Default", value: "default" }
    ];
    const agreements = [
      {
        label: "I accept the terms and conditions",
        value: "terms",
        description: "You agree to our Terms of Service and Privacy Policy"
      },
      {
        label: "I don't accept",
        value: "reject",
        description: "You cannot proceed without accepting"
      }
    ];
    const interestOptions = [
      "Technology",
      "Design",
      "Business",
      "Marketing",
      "Development",
      "Data Science"
    ];
    const formData = ref({
      type: "",
      country: "",
      interests: [],
      message: ""
    });
    const validationError = ref("");
    const handleSend = (message) => {
      toast.success(`Sent: ${message}`);
    };
    const handleVoiceStart = () => {
      toast.info("Recording started...");
    };
    const handleVoiceEnd = () => {
      toast.info("Recording ended");
    };
    const handleSelectChange = (value) => {
      console.log("Select changed:", value);
    };
    const handleChoiceChange = (value) => {
      console.log("Choice changed:", value);
    };
    const handleSubmit = () => {
      if (!formData.value.type) {
        toast.error("Please select an account type");
        return;
      }
      if (!formData.value.country) {
        toast.error("Please select a country");
        return;
      }
      if (formData.value.interests.length < 2) {
        toast.error("Please select at least 2 interests");
        return;
      }
      toast.success("Form submitted successfully!");
      console.log("Form data:", formData.value);
    };
    watch(requiredChoice, (value) => {
      if (value === "reject") {
        validationError.value = "You must accept the terms to continue";
      } else {
        validationError.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_ChatInput = resolveComponent("ChatInput");
      const _component_BottomSheetSelect = resolveComponent("BottomSheetSelect");
      const _component_ChoiceButtons = resolveComponent("ChoiceButtons");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-page" }, _attrs))} data-v-705a89a9>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<h1 data-v-705a89a9${_scopeId}>Form Components</h1><p class="subtitle" data-v-705a89a9${_scopeId}>Progressive form components designed for mobile-first experiences</p><section class="demo-section" data-v-705a89a9${_scopeId}><h2 data-v-705a89a9${_scopeId}>ChatInput</h2><p data-v-705a89a9${_scopeId}>A versatile chat input component with auto-resize, voice recording, and suggestions</p><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Basic Chat Input</h3>`);
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: chatMessage.value,
              "onUpdate:modelValue": ($event) => chatMessage.value = $event,
              placeholder: "Type your message...",
              onSend: handleSend
            }, null, _parent2, _scopeId));
            _push2(`<p class="demo-value" data-v-705a89a9${_scopeId}>Value: ${ssrInterpolate(chatMessage.value)}</p></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>With Character Counter</h3>`);
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: limitedMessage.value,
              "onUpdate:modelValue": ($event) => limitedMessage.value = $event,
              placeholder: "Limited to 100 characters...",
              "max-length": 100,
              "show-counter": true,
              onSend: handleSend
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>With Voice &amp; Suggestions</h3>`);
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: voiceMessage.value,
              "onUpdate:modelValue": ($event) => voiceMessage.value = $event,
              placeholder: "Try voice or suggestions...",
              "enable-voice": true,
              "show-suggestions": true,
              suggestions: chatSuggestions,
              onSend: handleSend,
              onVoiceStart: handleVoiceStart,
              onVoiceEnd: handleVoiceEnd
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>With Toolbar &amp; Actions</h3>`);
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: richMessage.value,
              "onUpdate:modelValue": ($event) => richMessage.value = $event,
              placeholder: "Rich chat input...",
              variant: "rounded",
              onSend: handleSend
            }, {
              left: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button class="icon-btn" data-v-705a89a9${_scopeId2}><svg viewBox="0 0 24 24" fill="currentColor" data-v-705a89a9${_scopeId2}><path d="M21.7 13.35L20.7 14.35L18.65 12.3L19.65 11.3C19.85 11.1 20.21 11.1 20.41 11.3L21.7 12.59C21.9 12.79 21.9 13.15 21.7 13.35M12 18.94L18.06 12.88L20.11 14.93L14.05 21H12V18.94M12 14C7.58 14 4 15.79 4 18V20H10V18.89L14 14.89C13.35 14.63 12.68 14.5 12 14M12 4C9.79 4 8 5.79 8 8S9.79 12 12 12 16 10.21 16 8 14.21 4 12 4Z" data-v-705a89a9${_scopeId2}></path></svg></button>`);
                } else {
                  return [
                    createVNode("button", { class: "icon-btn" }, [
                      (openBlock(), createBlock("svg", {
                        viewBox: "0 0 24 24",
                        fill: "currentColor"
                      }, [
                        createVNode("path", { d: "M21.7 13.35L20.7 14.35L18.65 12.3L19.65 11.3C19.85 11.1 20.21 11.1 20.41 11.3L21.7 12.59C21.9 12.79 21.9 13.15 21.7 13.35M12 18.94L18.06 12.88L20.11 14.93L14.05 21H12V18.94M12 14C7.58 14 4 15.79 4 18V20H10V18.89L14 14.89C13.35 14.63 12.68 14.5 12 14M12 4C9.79 4 8 5.79 8 8S9.79 12 12 12 16 10.21 16 8 14.21 4 12 4Z" })
                      ]))
                    ])
                  ];
                }
              }),
              toolbar: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="toolbar-actions" data-v-705a89a9${_scopeId2}><button class="toolbar-btn" data-v-705a89a9${_scopeId2}>Bold</button><button class="toolbar-btn" data-v-705a89a9${_scopeId2}>Italic</button><button class="toolbar-btn" data-v-705a89a9${_scopeId2}>Link</button><button class="toolbar-btn" data-v-705a89a9${_scopeId2}>Code</button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "toolbar-actions" }, [
                      createVNode("button", { class: "toolbar-btn" }, "Bold"),
                      createVNode("button", { class: "toolbar-btn" }, "Italic"),
                      createVNode("button", { class: "toolbar-btn" }, "Link"),
                      createVNode("button", { class: "toolbar-btn" }, "Code")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Minimal Variant</h3>`);
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: minimalMessage.value,
              "onUpdate:modelValue": ($event) => minimalMessage.value = $event,
              placeholder: "Minimal style...",
              variant: "minimal",
              size: "sm",
              onSend: handleSend
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="demo-section" data-v-705a89a9${_scopeId}><h2 data-v-705a89a9${_scopeId}>BottomSheetSelect</h2><p data-v-705a89a9${_scopeId}>A mobile-friendly select component that opens in a bottom sheet</p><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Basic Select</h3>`);
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: selectedCountry.value,
              "onUpdate:modelValue": ($event) => selectedCountry.value = $event,
              options: countries,
              label: "Country",
              placeholder: "Select your country",
              onChange: handleSelectChange
            }, null, _parent2, _scopeId));
            _push2(`<p class="demo-value" data-v-705a89a9${_scopeId}>Selected: ${ssrInterpolate(selectedCountry.value)}</p></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Searchable with Descriptions</h3>`);
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: selectedPlan.value,
              "onUpdate:modelValue": ($event) => selectedPlan.value = $event,
              options: plans,
              label: "Subscription Plan",
              placeholder: "Choose a plan",
              searchable: true,
              "search-placeholder": "Search plans...",
              "sheet-title": "Select Your Plan"
            }, null, _parent2, _scopeId));
            _push2(`<p class="demo-value" data-v-705a89a9${_scopeId}>Selected: ${ssrInterpolate(selectedPlan.value)}</p></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Grouped Options</h3>`);
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: selectedCity.value,
              "onUpdate:modelValue": ($event) => selectedCity.value = $event,
              groups: cityGroups,
              label: "City",
              placeholder: "Select a city",
              searchable: true,
              clearable: true,
              variant: "filled"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Different Variants</h3><div class="demo-grid" data-v-705a89a9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: variantValue1.value,
              "onUpdate:modelValue": ($event) => variantValue1.value = $event,
              options: simpleOptions,
              label: "Default",
              variant: "default"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: variantValue2.value,
              "onUpdate:modelValue": ($event) => variantValue2.value = $event,
              options: simpleOptions,
              label: "Filled",
              variant: "filled"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: variantValue3.value,
              "onUpdate:modelValue": ($event) => variantValue3.value = $event,
              options: simpleOptions,
              label: "Outlined",
              variant: "outlined"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></section><section class="demo-section" data-v-705a89a9${_scopeId}><h2 data-v-705a89a9${_scopeId}>ChoiceButtons</h2><p data-v-705a89a9${_scopeId}>Touch-friendly choice buttons for single or multiple selection</p><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Single Selection</h3>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: selectedSize.value,
              "onUpdate:modelValue": ($event) => selectedSize.value = $event,
              options: sizes,
              label: "Select Size",
              onChange: handleChoiceChange
            }, null, _parent2, _scopeId));
            _push2(`<p class="demo-value" data-v-705a89a9${_scopeId}>Selected: ${ssrInterpolate(selectedSize.value)}</p></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Multiple Selection</h3>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: selectedFeatures.value,
              "onUpdate:modelValue": ($event) => selectedFeatures.value = $event,
              options: features,
              label: "Select Features",
              "helper-text": "Choose up to 3 features",
              multiple: true,
              max: 3,
              color: "success"
            }, null, _parent2, _scopeId));
            _push2(`<p class="demo-value" data-v-705a89a9${_scopeId}>Selected: ${ssrInterpolate((_a = selectedFeatures.value) == null ? void 0 : _a.join(", "))}</p></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>With Icons &amp; Descriptions</h3>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: selectedPayment.value,
              "onUpdate:modelValue": ($event) => selectedPayment.value = $event,
              options: paymentMethods,
              label: "Payment Method",
              layout: "vertical",
              variant: "outlined",
              size: "lg"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Grid Layout</h3>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: selectedColor.value,
              "onUpdate:modelValue": ($event) => selectedColor.value = $event,
              options: colorOptions,
              label: "Choose Color",
              layout: "grid",
              columns: 3,
              "show-check": false
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>Different Variants</h3><div class="demo-stack" data-v-705a89a9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: variantChoice1.value,
              "onUpdate:modelValue": ($event) => variantChoice1.value = $event,
              options: ["Option A", "Option B", "Option C"],
              label: "Default Variant",
              variant: "default"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: variantChoice2.value,
              "onUpdate:modelValue": ($event) => variantChoice2.value = $event,
              options: ["Option A", "Option B", "Option C"],
              label: "Outlined Variant",
              variant: "outlined"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: variantChoice3.value,
              "onUpdate:modelValue": ($event) => variantChoice3.value = $event,
              options: ["Option A", "Option B", "Option C"],
              label: "Filled Variant",
              variant: "filled"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: variantChoice4.value,
              "onUpdate:modelValue": ($event) => variantChoice4.value = $event,
              options: ["Option A", "Option B", "Option C"],
              label: "Ghost Variant",
              variant: "ghost"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="demo-group" data-v-705a89a9${_scopeId}><h3 data-v-705a89a9${_scopeId}>With Validation</h3>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: requiredChoice.value,
              "onUpdate:modelValue": ($event) => requiredChoice.value = $event,
              options: agreements,
              label: "Terms & Conditions",
              required: true,
              error: validationError.value,
              "helper-text": "You must accept to continue",
              layout: "vertical",
              "full-width": ""
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="demo-section" data-v-705a89a9${_scopeId}><h2 data-v-705a89a9${_scopeId}>Complete Form Example</h2><p data-v-705a89a9${_scopeId}>A complete form combining all components</p><div class="demo-form" data-v-705a89a9${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: formData.value.type,
              "onUpdate:modelValue": ($event) => formData.value.type = $event,
              options: ["Personal", "Business"],
              label: "Account Type",
              required: true,
              "full-width": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_BottomSheetSelect, {
              modelValue: formData.value.country,
              "onUpdate:modelValue": ($event) => formData.value.country = $event,
              options: countries,
              label: "Country",
              placeholder: "Select your country",
              required: true,
              variant: "filled"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ChoiceButtons, {
              modelValue: formData.value.interests,
              "onUpdate:modelValue": ($event) => formData.value.interests = $event,
              options: interestOptions,
              label: "Interests",
              "helper-text": "Select at least 2 interests",
              multiple: true,
              min: 2,
              layout: "grid",
              columns: 2
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ChatInput, {
              modelValue: formData.value.message,
              "onUpdate:modelValue": ($event) => formData.value.message = $event,
              placeholder: "Tell us about yourself...",
              "max-length": 500,
              "show-counter": true,
              "min-rows": 3,
              variant: "rounded"
            }, null, _parent2, _scopeId));
            _push2(`<button class="submit-btn" data-v-705a89a9${_scopeId}> Submit Form </button></div></section>`);
          } else {
            return [
              createVNode("h1", null, "Form Components"),
              createVNode("p", { class: "subtitle" }, "Progressive form components designed for mobile-first experiences"),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "ChatInput"),
                createVNode("p", null, "A versatile chat input component with auto-resize, voice recording, and suggestions"),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Basic Chat Input"),
                  createVNode(_component_ChatInput, {
                    modelValue: chatMessage.value,
                    "onUpdate:modelValue": ($event) => chatMessage.value = $event,
                    placeholder: "Type your message...",
                    onSend: handleSend
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("p", { class: "demo-value" }, "Value: " + toDisplayString(chatMessage.value), 1)
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "With Character Counter"),
                  createVNode(_component_ChatInput, {
                    modelValue: limitedMessage.value,
                    "onUpdate:modelValue": ($event) => limitedMessage.value = $event,
                    placeholder: "Limited to 100 characters...",
                    "max-length": 100,
                    "show-counter": true,
                    onSend: handleSend
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "With Voice & Suggestions"),
                  createVNode(_component_ChatInput, {
                    modelValue: voiceMessage.value,
                    "onUpdate:modelValue": ($event) => voiceMessage.value = $event,
                    placeholder: "Try voice or suggestions...",
                    "enable-voice": true,
                    "show-suggestions": true,
                    suggestions: chatSuggestions,
                    onSend: handleSend,
                    onVoiceStart: handleVoiceStart,
                    onVoiceEnd: handleVoiceEnd
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "With Toolbar & Actions"),
                  createVNode(_component_ChatInput, {
                    modelValue: richMessage.value,
                    "onUpdate:modelValue": ($event) => richMessage.value = $event,
                    placeholder: "Rich chat input...",
                    variant: "rounded",
                    onSend: handleSend
                  }, {
                    left: withCtx(() => [
                      createVNode("button", { class: "icon-btn" }, [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          createVNode("path", { d: "M21.7 13.35L20.7 14.35L18.65 12.3L19.65 11.3C19.85 11.1 20.21 11.1 20.41 11.3L21.7 12.59C21.9 12.79 21.9 13.15 21.7 13.35M12 18.94L18.06 12.88L20.11 14.93L14.05 21H12V18.94M12 14C7.58 14 4 15.79 4 18V20H10V18.89L14 14.89C13.35 14.63 12.68 14.5 12 14M12 4C9.79 4 8 5.79 8 8S9.79 12 12 12 16 10.21 16 8 14.21 4 12 4Z" })
                        ]))
                      ])
                    ]),
                    toolbar: withCtx(() => [
                      createVNode("div", { class: "toolbar-actions" }, [
                        createVNode("button", { class: "toolbar-btn" }, "Bold"),
                        createVNode("button", { class: "toolbar-btn" }, "Italic"),
                        createVNode("button", { class: "toolbar-btn" }, "Link"),
                        createVNode("button", { class: "toolbar-btn" }, "Code")
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Minimal Variant"),
                  createVNode(_component_ChatInput, {
                    modelValue: minimalMessage.value,
                    "onUpdate:modelValue": ($event) => minimalMessage.value = $event,
                    placeholder: "Minimal style...",
                    variant: "minimal",
                    size: "sm",
                    onSend: handleSend
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "BottomSheetSelect"),
                createVNode("p", null, "A mobile-friendly select component that opens in a bottom sheet"),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Basic Select"),
                  createVNode(_component_BottomSheetSelect, {
                    modelValue: selectedCountry.value,
                    "onUpdate:modelValue": ($event) => selectedCountry.value = $event,
                    options: countries,
                    label: "Country",
                    placeholder: "Select your country",
                    onChange: handleSelectChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("p", { class: "demo-value" }, "Selected: " + toDisplayString(selectedCountry.value), 1)
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Searchable with Descriptions"),
                  createVNode(_component_BottomSheetSelect, {
                    modelValue: selectedPlan.value,
                    "onUpdate:modelValue": ($event) => selectedPlan.value = $event,
                    options: plans,
                    label: "Subscription Plan",
                    placeholder: "Choose a plan",
                    searchable: true,
                    "search-placeholder": "Search plans...",
                    "sheet-title": "Select Your Plan"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("p", { class: "demo-value" }, "Selected: " + toDisplayString(selectedPlan.value), 1)
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Grouped Options"),
                  createVNode(_component_BottomSheetSelect, {
                    modelValue: selectedCity.value,
                    "onUpdate:modelValue": ($event) => selectedCity.value = $event,
                    groups: cityGroups,
                    label: "City",
                    placeholder: "Select a city",
                    searchable: true,
                    clearable: true,
                    variant: "filled"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Different Variants"),
                  createVNode("div", { class: "demo-grid" }, [
                    createVNode(_component_BottomSheetSelect, {
                      modelValue: variantValue1.value,
                      "onUpdate:modelValue": ($event) => variantValue1.value = $event,
                      options: simpleOptions,
                      label: "Default",
                      variant: "default"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_BottomSheetSelect, {
                      modelValue: variantValue2.value,
                      "onUpdate:modelValue": ($event) => variantValue2.value = $event,
                      options: simpleOptions,
                      label: "Filled",
                      variant: "filled"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_BottomSheetSelect, {
                      modelValue: variantValue3.value,
                      "onUpdate:modelValue": ($event) => variantValue3.value = $event,
                      options: simpleOptions,
                      label: "Outlined",
                      variant: "outlined"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "ChoiceButtons"),
                createVNode("p", null, "Touch-friendly choice buttons for single or multiple selection"),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Single Selection"),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: selectedSize.value,
                    "onUpdate:modelValue": ($event) => selectedSize.value = $event,
                    options: sizes,
                    label: "Select Size",
                    onChange: handleChoiceChange
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("p", { class: "demo-value" }, "Selected: " + toDisplayString(selectedSize.value), 1)
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Multiple Selection"),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: selectedFeatures.value,
                    "onUpdate:modelValue": ($event) => selectedFeatures.value = $event,
                    options: features,
                    label: "Select Features",
                    "helper-text": "Choose up to 3 features",
                    multiple: true,
                    max: 3,
                    color: "success"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("p", { class: "demo-value" }, "Selected: " + toDisplayString((_b = selectedFeatures.value) == null ? void 0 : _b.join(", ")), 1)
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "With Icons & Descriptions"),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: selectedPayment.value,
                    "onUpdate:modelValue": ($event) => selectedPayment.value = $event,
                    options: paymentMethods,
                    label: "Payment Method",
                    layout: "vertical",
                    variant: "outlined",
                    size: "lg"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Grid Layout"),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: selectedColor.value,
                    "onUpdate:modelValue": ($event) => selectedColor.value = $event,
                    options: colorOptions,
                    label: "Choose Color",
                    layout: "grid",
                    columns: 3,
                    "show-check": false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "Different Variants"),
                  createVNode("div", { class: "demo-stack" }, [
                    createVNode(_component_ChoiceButtons, {
                      modelValue: variantChoice1.value,
                      "onUpdate:modelValue": ($event) => variantChoice1.value = $event,
                      options: ["Option A", "Option B", "Option C"],
                      label: "Default Variant",
                      variant: "default"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_ChoiceButtons, {
                      modelValue: variantChoice2.value,
                      "onUpdate:modelValue": ($event) => variantChoice2.value = $event,
                      options: ["Option A", "Option B", "Option C"],
                      label: "Outlined Variant",
                      variant: "outlined"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_ChoiceButtons, {
                      modelValue: variantChoice3.value,
                      "onUpdate:modelValue": ($event) => variantChoice3.value = $event,
                      options: ["Option A", "Option B", "Option C"],
                      label: "Filled Variant",
                      variant: "filled"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_ChoiceButtons, {
                      modelValue: variantChoice4.value,
                      "onUpdate:modelValue": ($event) => variantChoice4.value = $event,
                      options: ["Option A", "Option B", "Option C"],
                      label: "Ghost Variant",
                      variant: "ghost"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "demo-group" }, [
                  createVNode("h3", null, "With Validation"),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: requiredChoice.value,
                    "onUpdate:modelValue": ($event) => requiredChoice.value = $event,
                    options: agreements,
                    label: "Terms & Conditions",
                    required: true,
                    error: validationError.value,
                    "helper-text": "You must accept to continue",
                    layout: "vertical",
                    "full-width": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                ])
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "Complete Form Example"),
                createVNode("p", null, "A complete form combining all components"),
                createVNode("div", { class: "demo-form" }, [
                  createVNode(_component_ChoiceButtons, {
                    modelValue: formData.value.type,
                    "onUpdate:modelValue": ($event) => formData.value.type = $event,
                    options: ["Personal", "Business"],
                    label: "Account Type",
                    required: true,
                    "full-width": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_BottomSheetSelect, {
                    modelValue: formData.value.country,
                    "onUpdate:modelValue": ($event) => formData.value.country = $event,
                    options: countries,
                    label: "Country",
                    placeholder: "Select your country",
                    required: true,
                    variant: "filled"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_ChoiceButtons, {
                    modelValue: formData.value.interests,
                    "onUpdate:modelValue": ($event) => formData.value.interests = $event,
                    options: interestOptions,
                    label: "Interests",
                    "helper-text": "Select at least 2 interests",
                    multiple: true,
                    min: 2,
                    layout: "grid",
                    columns: 2
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_ChatInput, {
                    modelValue: formData.value.message,
                    "onUpdate:modelValue": ($event) => formData.value.message = $event,
                    placeholder: "Tell us about yourself...",
                    "max-length": 500,
                    "show-counter": true,
                    "min-rows": 3,
                    variant: "rounded"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("button", {
                    class: "submit-btn",
                    onClick: handleSubmit
                  }, " Submit Form ")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/forms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-705a89a9"]]);

export { forms as default };
//# sourceMappingURL=forms-COfZUQGJ.mjs.map
