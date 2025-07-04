import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "accessible-forms",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const basicForm = ref();
    const complexForm = ref();
    const currentFieldInfo = ref("");
    const selectedCountry = ref("");
    const selectedTheme = ref("system");
    const selectedNotifications = ref([]);
    const bio = ref("");
    const countries = [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "United Kingdom", value: "uk" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" }
    ];
    const themeOptions = [
      { label: "Light", value: "light", icon: "\u2600\uFE0F" },
      { label: "Dark", value: "dark", icon: "\u{1F319}" },
      { label: "System", value: "system", icon: "\u{1F4BB}" }
    ];
    const notificationOptions = [
      { label: "Product updates", value: "updates" },
      { label: "Security alerts", value: "security" },
      { label: "Newsletter", value: "newsletter" },
      { label: "Tips & tutorials", value: "tips" }
    ];
    const handleBasicSubmit = (formData) => {
      const data = Object.fromEntries(formData.entries());
      console.log("Basic form submitted:", data);
      toast.success("Form submitted successfully!");
      setTimeout(() => {
        var _a;
        (_a = basicForm.value) == null ? void 0 : _a.reset();
      }, 2e3);
    };
    const handleComplexSubmit = (formData) => {
      const data = Object.fromEntries(formData.entries());
      console.log("Complex form submitted:", data);
      toast.success({
        title: "Registration Complete!",
        description: "Welcome to our platform"
      });
    };
    const handleFieldChange = (name, value) => {
      console.log("Field changed:", name, value);
    };
    const handleNavigationChange = (fieldIndex) => {
      var _a, _b;
      const form = basicForm.value;
      if (!form) return;
      const fields = form.$el.querySelectorAll("input, textarea, select");
      const field = fields[fieldIndex];
      if (field) {
        const label = ((_b = (_a = field.labels) == null ? void 0 : _a[0]) == null ? void 0 : _b.textContent) || field.getAttribute("aria-label") || field.name;
        const type = field.type || field.tagName.toLowerCase();
        currentFieldInfo.value = `${label} (${type})`;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_AccessibleForm = resolveComponent("AccessibleForm");
      const _component_BottomSheetSelect = resolveComponent("BottomSheetSelect");
      const _component_ChoiceButtons = resolveComponent("ChoiceButtons");
      const _component_ChatInput = resolveComponent("ChatInput");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "demo-page" }, _attrs))} data-v-d8000c1e>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 data-v-d8000c1e${_scopeId}>Accessible Form Navigation</h1><p class="subtitle" data-v-d8000c1e${_scopeId}>Keyboard-friendly forms with screen reader support</p><section class="demo-section" data-v-d8000c1e${_scopeId}><h2 data-v-d8000c1e${_scopeId}>Basic Accessible Form</h2><p data-v-d8000c1e${_scopeId}>Navigate with Tab, Shift+Tab, or arrow keys. Press Enter to submit.</p>`);
            _push2(ssrRenderComponent(_component_AccessibleForm, {
              ref_key: "basicForm",
              ref: basicForm,
              "aria-label": "Basic contact form",
              onSubmit: handleBasicSubmit,
              onFieldChange: handleFieldChange,
              onNavigationChange: handleNavigationChange
            }, {
              default: withCtx(({ currentField }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="form-grid" data-v-d8000c1e${_scopeId2}><div class="form-field" data-v-d8000c1e${_scopeId2}><label for="name" data-v-d8000c1e${_scopeId2}>Name *</label><input id="name" name="name" type="text" required placeholder="Enter your name" class="${ssrRenderClass({ "is-current": (currentField == null ? void 0 : currentField.name) === "name" })}" data-v-d8000c1e${_scopeId2}><span id="name-error" role="alert" class="field-error" data-v-d8000c1e${_scopeId2}></span></div><div class="form-field" data-v-d8000c1e${_scopeId2}><label for="email" data-v-d8000c1e${_scopeId2}>Email *</label><input id="email" name="email" type="email" required placeholder="your@email.com" class="${ssrRenderClass({ "is-current": (currentField == null ? void 0 : currentField.name) === "email" })}" data-v-d8000c1e${_scopeId2}><span id="email-error" role="alert" class="field-error" data-v-d8000c1e${_scopeId2}></span></div><div class="form-field full-width" data-v-d8000c1e${_scopeId2}><label for="message" data-v-d8000c1e${_scopeId2}>Message</label><textarea id="message" name="message" rows="4" placeholder="Your message..." class="${ssrRenderClass({ "is-current": (currentField == null ? void 0 : currentField.name) === "message" })}" data-v-d8000c1e${_scopeId2}></textarea></div><div class="form-field full-width" data-v-d8000c1e${_scopeId2}><label data-v-d8000c1e${_scopeId2}><input type="checkbox" name="subscribe" value="yes" data-v-d8000c1e${_scopeId2}> Subscribe to newsletter </label></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "form-grid" }, [
                      createVNode("div", { class: "form-field" }, [
                        createVNode("label", { for: "name" }, "Name *"),
                        createVNode("input", {
                          id: "name",
                          name: "name",
                          type: "text",
                          required: "",
                          placeholder: "Enter your name",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "name" }
                        }, null, 2),
                        createVNode("span", {
                          id: "name-error",
                          role: "alert",
                          class: "field-error"
                        })
                      ]),
                      createVNode("div", { class: "form-field" }, [
                        createVNode("label", { for: "email" }, "Email *"),
                        createVNode("input", {
                          id: "email",
                          name: "email",
                          type: "email",
                          required: "",
                          placeholder: "your@email.com",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "email" }
                        }, null, 2),
                        createVNode("span", {
                          id: "email-error",
                          role: "alert",
                          class: "field-error"
                        })
                      ]),
                      createVNode("div", { class: "form-field full-width" }, [
                        createVNode("label", { for: "message" }, "Message"),
                        createVNode("textarea", {
                          id: "message",
                          name: "message",
                          rows: "4",
                          placeholder: "Your message...",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "message" }
                        }, null, 2)
                      ]),
                      createVNode("div", { class: "form-field full-width" }, [
                        createVNode("label", null, [
                          createVNode("input", {
                            type: "checkbox",
                            name: "subscribe",
                            value: "yes"
                          }),
                          createTextVNode(" Subscribe to newsletter ")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (currentFieldInfo.value) {
              _push2(`<div class="field-info" data-v-d8000c1e${_scopeId}><p data-v-d8000c1e${_scopeId}><strong data-v-d8000c1e${_scopeId}>Current field:</strong> ${ssrInterpolate(currentFieldInfo.value)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section><section class="demo-section" data-v-d8000c1e${_scopeId}><h2 data-v-d8000c1e${_scopeId}>Complex Form with Focus Management</h2><p data-v-d8000c1e${_scopeId}>Combines our progressive form components with accessible navigation</p>`);
            _push2(ssrRenderComponent(_component_AccessibleForm, {
              ref_key: "complexForm",
              ref: complexForm,
              "aria-label": "User registration form",
              "navigation-options": {
                trapFocus: true,
                scrollIntoView: true,
                submitOnEnter: false
              },
              "show-reset-button": true,
              onSubmit: handleComplexSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="form-sections" data-v-d8000c1e${_scopeId2}><fieldset data-v-d8000c1e${_scopeId2}><legend data-v-d8000c1e${_scopeId2}>Account Information</legend><div class="form-field" data-v-d8000c1e${_scopeId2}><label for="username" data-v-d8000c1e${_scopeId2}>Username *</label><input id="username" name="username" type="text" required pattern="[a-zA-Z0-9_]+" aria-describedby="username-hint" placeholder="Choose a username" data-v-d8000c1e${_scopeId2}><span id="username-hint" class="field-hint" data-v-d8000c1e${_scopeId2}> Letters, numbers, and underscores only </span></div><div class="form-field" data-v-d8000c1e${_scopeId2}><label for="password" data-v-d8000c1e${_scopeId2}>Password *</label><input id="password" name="password" type="password" required minlength="8" aria-describedby="password-hint" data-v-d8000c1e${_scopeId2}><span id="password-hint" class="field-hint" data-v-d8000c1e${_scopeId2}> Minimum 8 characters </span></div>`);
                  _push3(ssrRenderComponent(_component_BottomSheetSelect, {
                    modelValue: selectedCountry.value,
                    "onUpdate:modelValue": ($event) => selectedCountry.value = $event,
                    options: countries,
                    label: "Country *",
                    name: "country",
                    required: "",
                    "aria-describedby": "country-hint"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span id="country-hint" class="field-hint" data-v-d8000c1e${_scopeId2}> Select your country of residence </span></fieldset><fieldset data-v-d8000c1e${_scopeId2}><legend data-v-d8000c1e${_scopeId2}>Preferences</legend>`);
                  _push3(ssrRenderComponent(_component_ChoiceButtons, {
                    modelValue: selectedTheme.value,
                    "onUpdate:modelValue": ($event) => selectedTheme.value = $event,
                    options: themeOptions,
                    label: "Theme Preference",
                    name: "theme",
                    layout: "horizontal"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ChoiceButtons, {
                    modelValue: selectedNotifications.value,
                    "onUpdate:modelValue": ($event) => selectedNotifications.value = $event,
                    options: notificationOptions,
                    label: "Email Notifications",
                    name: "notifications",
                    multiple: true,
                    layout: "vertical",
                    "helper-text": "Select which notifications you'd like to receive"
                  }, null, _parent3, _scopeId2));
                  _push3(`</fieldset><fieldset data-v-d8000c1e${_scopeId2}><legend data-v-d8000c1e${_scopeId2}>Additional Information</legend>`);
                  _push3(ssrRenderComponent(_component_ChatInput, {
                    modelValue: bio.value,
                    "onUpdate:modelValue": ($event) => bio.value = $event,
                    placeholder: "Tell us about yourself...",
                    label: "Bio",
                    name: "bio",
                    "max-length": 200,
                    "show-counter": true
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-field" data-v-d8000c1e${_scopeId2}><label data-v-d8000c1e${_scopeId2}><input type="checkbox" name="terms" value="accepted" required data-v-d8000c1e${_scopeId2}> I accept the <a href="#" data-v-d8000c1e${_scopeId2}>terms and conditions</a> * </label></div></fieldset></div>`);
                } else {
                  return [
                    createVNode("div", { class: "form-sections" }, [
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Account Information"),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", { for: "username" }, "Username *"),
                          createVNode("input", {
                            id: "username",
                            name: "username",
                            type: "text",
                            required: "",
                            pattern: "[a-zA-Z0-9_]+",
                            "aria-describedby": "username-hint",
                            placeholder: "Choose a username"
                          }),
                          createVNode("span", {
                            id: "username-hint",
                            class: "field-hint"
                          }, " Letters, numbers, and underscores only ")
                        ]),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", { for: "password" }, "Password *"),
                          createVNode("input", {
                            id: "password",
                            name: "password",
                            type: "password",
                            required: "",
                            minlength: "8",
                            "aria-describedby": "password-hint"
                          }),
                          createVNode("span", {
                            id: "password-hint",
                            class: "field-hint"
                          }, " Minimum 8 characters ")
                        ]),
                        createVNode(_component_BottomSheetSelect, {
                          modelValue: selectedCountry.value,
                          "onUpdate:modelValue": ($event) => selectedCountry.value = $event,
                          options: countries,
                          label: "Country *",
                          name: "country",
                          required: "",
                          "aria-describedby": "country-hint"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", {
                          id: "country-hint",
                          class: "field-hint"
                        }, " Select your country of residence ")
                      ]),
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Preferences"),
                        createVNode(_component_ChoiceButtons, {
                          modelValue: selectedTheme.value,
                          "onUpdate:modelValue": ($event) => selectedTheme.value = $event,
                          options: themeOptions,
                          label: "Theme Preference",
                          name: "theme",
                          layout: "horizontal"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_ChoiceButtons, {
                          modelValue: selectedNotifications.value,
                          "onUpdate:modelValue": ($event) => selectedNotifications.value = $event,
                          options: notificationOptions,
                          label: "Email Notifications",
                          name: "notifications",
                          multiple: true,
                          layout: "vertical",
                          "helper-text": "Select which notifications you'd like to receive"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Additional Information"),
                        createVNode(_component_ChatInput, {
                          modelValue: bio.value,
                          "onUpdate:modelValue": ($event) => bio.value = $event,
                          placeholder: "Tell us about yourself...",
                          label: "Bio",
                          name: "bio",
                          "max-length": 200,
                          "show-counter": true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", null, [
                            createVNode("input", {
                              type: "checkbox",
                              name: "terms",
                              value: "accepted",
                              required: ""
                            }),
                            createTextVNode(" I accept the "),
                            createVNode("a", {
                              href: "#",
                              onClick: withModifiers(() => {
                              }, ["prevent"])
                            }, "terms and conditions", 8, ["onClick"]),
                            createTextVNode(" * ")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section><section class="demo-section" data-v-d8000c1e${_scopeId}><h2 data-v-d8000c1e${_scopeId}>Keyboard Navigation Guide</h2><div class="keyboard-guide" data-v-d8000c1e${_scopeId}><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>Tab</kbd><span data-v-d8000c1e${_scopeId}>Move to next field</span></div><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>Shift + Tab</kbd><span data-v-d8000c1e${_scopeId}>Move to previous field</span></div><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>Enter</kbd><span data-v-d8000c1e${_scopeId}>Submit form (when not in textarea)</span></div><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>Escape</kbd><span data-v-d8000c1e${_scopeId}>Reset form (when enabled)</span></div><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>Space</kbd><span data-v-d8000c1e${_scopeId}>Toggle checkbox/radio</span></div><div class="shortcut" data-v-d8000c1e${_scopeId}><kbd data-v-d8000c1e${_scopeId}>\u2191 \u2193</kbd><span data-v-d8000c1e${_scopeId}>Navigate radio group options</span></div></div></section><section class="demo-section" data-v-d8000c1e${_scopeId}><h2 data-v-d8000c1e${_scopeId}>Screen Reader Features</h2><ul class="feature-list" data-v-d8000c1e${_scopeId}><li data-v-d8000c1e${_scopeId}>\u2713 Proper labeling for all form controls</li><li data-v-d8000c1e${_scopeId}>\u2713 Live region announcements for form state</li><li data-v-d8000c1e${_scopeId}>\u2713 Error messages linked with aria-describedby</li><li data-v-d8000c1e${_scopeId}>\u2713 Required fields announced</li><li data-v-d8000c1e${_scopeId}>\u2713 Field type and current value announced on focus</li><li data-v-d8000c1e${_scopeId}>\u2713 Form submission status announced</li><li data-v-d8000c1e${_scopeId}>\u2713 Fieldset grouping for related fields</li></ul></section>`);
          } else {
            return [
              createVNode("h1", null, "Accessible Form Navigation"),
              createVNode("p", { class: "subtitle" }, "Keyboard-friendly forms with screen reader support"),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "Basic Accessible Form"),
                createVNode("p", null, "Navigate with Tab, Shift+Tab, or arrow keys. Press Enter to submit."),
                createVNode(_component_AccessibleForm, {
                  ref_key: "basicForm",
                  ref: basicForm,
                  "aria-label": "Basic contact form",
                  onSubmit: handleBasicSubmit,
                  onFieldChange: handleFieldChange,
                  onNavigationChange: handleNavigationChange
                }, {
                  default: withCtx(({ currentField }) => [
                    createVNode("div", { class: "form-grid" }, [
                      createVNode("div", { class: "form-field" }, [
                        createVNode("label", { for: "name" }, "Name *"),
                        createVNode("input", {
                          id: "name",
                          name: "name",
                          type: "text",
                          required: "",
                          placeholder: "Enter your name",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "name" }
                        }, null, 2),
                        createVNode("span", {
                          id: "name-error",
                          role: "alert",
                          class: "field-error"
                        })
                      ]),
                      createVNode("div", { class: "form-field" }, [
                        createVNode("label", { for: "email" }, "Email *"),
                        createVNode("input", {
                          id: "email",
                          name: "email",
                          type: "email",
                          required: "",
                          placeholder: "your@email.com",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "email" }
                        }, null, 2),
                        createVNode("span", {
                          id: "email-error",
                          role: "alert",
                          class: "field-error"
                        })
                      ]),
                      createVNode("div", { class: "form-field full-width" }, [
                        createVNode("label", { for: "message" }, "Message"),
                        createVNode("textarea", {
                          id: "message",
                          name: "message",
                          rows: "4",
                          placeholder: "Your message...",
                          class: { "is-current": (currentField == null ? void 0 : currentField.name) === "message" }
                        }, null, 2)
                      ]),
                      createVNode("div", { class: "form-field full-width" }, [
                        createVNode("label", null, [
                          createVNode("input", {
                            type: "checkbox",
                            name: "subscribe",
                            value: "yes"
                          }),
                          createTextVNode(" Subscribe to newsletter ")
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 512),
                currentFieldInfo.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "field-info"
                }, [
                  createVNode("p", null, [
                    createVNode("strong", null, "Current field:"),
                    createTextVNode(" " + toDisplayString(currentFieldInfo.value), 1)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "Complex Form with Focus Management"),
                createVNode("p", null, "Combines our progressive form components with accessible navigation"),
                createVNode(_component_AccessibleForm, {
                  ref_key: "complexForm",
                  ref: complexForm,
                  "aria-label": "User registration form",
                  "navigation-options": {
                    trapFocus: true,
                    scrollIntoView: true,
                    submitOnEnter: false
                  },
                  "show-reset-button": true,
                  onSubmit: handleComplexSubmit
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "form-sections" }, [
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Account Information"),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", { for: "username" }, "Username *"),
                          createVNode("input", {
                            id: "username",
                            name: "username",
                            type: "text",
                            required: "",
                            pattern: "[a-zA-Z0-9_]+",
                            "aria-describedby": "username-hint",
                            placeholder: "Choose a username"
                          }),
                          createVNode("span", {
                            id: "username-hint",
                            class: "field-hint"
                          }, " Letters, numbers, and underscores only ")
                        ]),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", { for: "password" }, "Password *"),
                          createVNode("input", {
                            id: "password",
                            name: "password",
                            type: "password",
                            required: "",
                            minlength: "8",
                            "aria-describedby": "password-hint"
                          }),
                          createVNode("span", {
                            id: "password-hint",
                            class: "field-hint"
                          }, " Minimum 8 characters ")
                        ]),
                        createVNode(_component_BottomSheetSelect, {
                          modelValue: selectedCountry.value,
                          "onUpdate:modelValue": ($event) => selectedCountry.value = $event,
                          options: countries,
                          label: "Country *",
                          name: "country",
                          required: "",
                          "aria-describedby": "country-hint"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", {
                          id: "country-hint",
                          class: "field-hint"
                        }, " Select your country of residence ")
                      ]),
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Preferences"),
                        createVNode(_component_ChoiceButtons, {
                          modelValue: selectedTheme.value,
                          "onUpdate:modelValue": ($event) => selectedTheme.value = $event,
                          options: themeOptions,
                          label: "Theme Preference",
                          name: "theme",
                          layout: "horizontal"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_ChoiceButtons, {
                          modelValue: selectedNotifications.value,
                          "onUpdate:modelValue": ($event) => selectedNotifications.value = $event,
                          options: notificationOptions,
                          label: "Email Notifications",
                          name: "notifications",
                          multiple: true,
                          layout: "vertical",
                          "helper-text": "Select which notifications you'd like to receive"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("fieldset", null, [
                        createVNode("legend", null, "Additional Information"),
                        createVNode(_component_ChatInput, {
                          modelValue: bio.value,
                          "onUpdate:modelValue": ($event) => bio.value = $event,
                          placeholder: "Tell us about yourself...",
                          label: "Bio",
                          name: "bio",
                          "max-length": 200,
                          "show-counter": true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-field" }, [
                          createVNode("label", null, [
                            createVNode("input", {
                              type: "checkbox",
                              name: "terms",
                              value: "accepted",
                              required: ""
                            }),
                            createTextVNode(" I accept the "),
                            createVNode("a", {
                              href: "#",
                              onClick: withModifiers(() => {
                              }, ["prevent"])
                            }, "terms and conditions", 8, ["onClick"]),
                            createTextVNode(" * ")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 512)
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "Keyboard Navigation Guide"),
                createVNode("div", { class: "keyboard-guide" }, [
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "Tab"),
                    createVNode("span", null, "Move to next field")
                  ]),
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "Shift + Tab"),
                    createVNode("span", null, "Move to previous field")
                  ]),
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "Enter"),
                    createVNode("span", null, "Submit form (when not in textarea)")
                  ]),
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "Escape"),
                    createVNode("span", null, "Reset form (when enabled)")
                  ]),
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "Space"),
                    createVNode("span", null, "Toggle checkbox/radio")
                  ]),
                  createVNode("div", { class: "shortcut" }, [
                    createVNode("kbd", null, "\u2191 \u2193"),
                    createVNode("span", null, "Navigate radio group options")
                  ])
                ])
              ]),
              createVNode("section", { class: "demo-section" }, [
                createVNode("h2", null, "Screen Reader Features"),
                createVNode("ul", { class: "feature-list" }, [
                  createVNode("li", null, "\u2713 Proper labeling for all form controls"),
                  createVNode("li", null, "\u2713 Live region announcements for form state"),
                  createVNode("li", null, "\u2713 Error messages linked with aria-describedby"),
                  createVNode("li", null, "\u2713 Required fields announced"),
                  createVNode("li", null, "\u2713 Field type and current value announced on focus"),
                  createVNode("li", null, "\u2713 Form submission status announced"),
                  createVNode("li", null, "\u2713 Fieldset grouping for related fields")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/accessible-forms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accessibleForms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8000c1e"]]);

export { accessibleForms as default };
//# sourceMappingURL=accessible-forms-B-UqwZz3.mjs.map
