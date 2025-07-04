import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_1 } from './FormField-Bpl71xcO.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D4SBA0xZ.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, Fragment, renderList, withDirectives, vModelRadio, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate, ssrLooseContain } from 'vue/server-renderer';
import { u as useAuthStore, f as firebaseAuth } from './auth-Bugpmb1I.mjs';
import { _ as _export_sfc, a as useRouter, n as navigateTo } from './server.mjs';
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
import 'firebase/auth';
import 'firebase/firestore';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useRouter();
    const roles = [
      { value: "student", label: "Student", icon: "heroicons:academic-cap" },
      { value: "teacher", label: "Teacher", icon: "heroicons:user-group" },
      { value: "parent", label: "Parent", icon: "heroicons:users" }
    ];
    const loading = ref(false);
    const error = ref("");
    const formData = reactive({
      role: "",
      name: "",
      email: "",
      password: "",
      acceptTerms: false
    });
    const errors = reactive({
      role: "",
      name: "",
      email: "",
      password: "",
      terms: ""
    });
    const isFormValid = computed(() => {
      return formData.role && formData.name && formData.email && formData.password && formData.acceptTerms && !errors.role && !errors.name && !errors.email && !errors.password && !errors.terms;
    });
    const validateRole = () => {
      if (!formData.role) {
        errors.role = "Please select your role";
      } else {
        errors.role = "";
      }
    };
    const validateName = () => {
      if (!formData.name) {
        errors.name = "Name is required";
      } else if (formData.name.length < 2) {
        errors.name = "Name must be at least 2 characters";
      } else {
        errors.name = "";
      }
    };
    const validateEmail = () => {
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email";
      } else {
        errors.email = "";
      }
    };
    const validatePassword = () => {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else {
        errors.password = "";
      }
    };
    const validateTerms = () => {
      if (!formData.acceptTerms) {
        errors.terms = "You must accept the terms to continue";
      } else {
        errors.terms = "";
      }
    };
    const handleSignup = async () => {
      validateRole();
      validateName();
      validateEmail();
      validatePassword();
      validateTerms();
      if (!isFormValid.value) return;
      loading.value = true;
      error.value = "";
      try {
        await firebaseAuth.signUp(
          formData.email,
          formData.password,
          {
            displayName: formData.name,
            role: formData.role
          }
        );
        await navigateTo("/onboarding");
      } catch (err) {
        console.error("Signup error:", err);
        switch (err.code) {
          case "auth/email-already-in-use":
            error.value = "An account with this email already exists";
            break;
          case "auth/invalid-email":
            error.value = "Invalid email address";
            break;
          case "auth/weak-password":
            error.value = "Password is too weak. Please use a stronger password";
            break;
          case "auth/operation-not-allowed":
            error.value = "Email/password accounts are not enabled";
            break;
          default:
            error.value = "Failed to create account. Please try again";
        }
      } finally {
        loading.value = false;
      }
    };
    const handleGoogleSignup = async () => {
      validateRole();
      if (errors.role) return;
      loading.value = true;
      error.value = "";
      try {
        await firebaseAuth.signInWithGoogle(formData.role);
        await navigateTo("/onboarding");
      } catch (err) {
        console.error("Google signup error:", err);
        switch (err.code) {
          case "auth/popup-closed-by-user":
            break;
          case "auth/popup-blocked":
            error.value = "Please allow popups for this site";
            break;
          default:
            error.value = "Failed to sign up with Google";
        }
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      const _component_Icon = resolveComponent("Icon");
      const _component_FormField = __nuxt_component_1;
      const _component_Input = resolveComponent("Input");
      const _component_PasswordField = resolveComponent("PasswordField");
      const _component_Alert = resolveComponent("Alert");
      const _component_Button = resolveComponent("Button");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "signup-page" }, _attrs))} data-v-90fd2520>`);
      _push(ssrRenderComponent(_component_LayoutContainer, { class: "signup-container" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="signup-box" data-v-90fd2520${_scopeId}><div class="signup-header" data-v-90fd2520${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:school",
              class: "signup-logo"
            }, null, _parent2, _scopeId));
            _push2(`<h1 class="signup-title" data-v-90fd2520${_scopeId}>Create Your Account</h1><p class="signup-subtitle" data-v-90fd2520${_scopeId}>Start your learning journey today</p></div><form class="signup-form" data-v-90fd2520${_scopeId}><div class="role-selection" data-v-90fd2520${_scopeId}><p class="role-label" data-v-90fd2520${_scopeId}>I am a...</p><div class="role-options" data-v-90fd2520${_scopeId}><!--[-->`);
            ssrRenderList(roles, (role) => {
              _push2(`<label class="${ssrRenderClass([{ "role-option--selected": unref(formData).role === role.value }, "role-option"])}" data-v-90fd2520${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(formData).role, role.value)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", role.value)} class="role-input" data-v-90fd2520${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: role.icon,
                class: "role-icon"
              }, null, _parent2, _scopeId));
              _push2(`<span class="role-name" data-v-90fd2520${_scopeId}>${ssrInterpolate(role.label)}</span></label>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(errors).role) {
              _push2(`<p class="role-error" data-v-90fd2520${_scopeId}>${ssrInterpolate(unref(errors).role)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_FormField, {
              label: "Full Name",
              error: unref(errors).name,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, {
                    modelValue: unref(formData).name,
                    "onUpdate:modelValue": ($event) => unref(formData).name = $event,
                    type: "text",
                    placeholder: "Enter your full name",
                    error: !!unref(errors).name,
                    onBlur: validateName
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, {
                      modelValue: unref(formData).name,
                      "onUpdate:modelValue": ($event) => unref(formData).name = $event,
                      type: "text",
                      placeholder: "Enter your full name",
                      error: !!unref(errors).name,
                      onBlur: validateName
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormField, {
              label: "Email",
              error: unref(errors).email,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Input, {
                    modelValue: unref(formData).email,
                    "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                    type: "email",
                    placeholder: "Enter your email",
                    error: !!unref(errors).email,
                    onBlur: validateEmail
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Input, {
                      modelValue: unref(formData).email,
                      "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                      type: "email",
                      placeholder: "Enter your email",
                      error: !!unref(errors).email,
                      onBlur: validateEmail
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormField, {
              label: "Password",
              error: unref(errors).password,
              hint: "At least 8 characters",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_PasswordField, {
                    modelValue: unref(formData).password,
                    "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                    placeholder: "Create a password",
                    error: !!unref(errors).password,
                    "show-strength": "",
                    autocomplete: "new-password",
                    onBlur: validatePassword
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_PasswordField, {
                      modelValue: unref(formData).password,
                      "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                      placeholder: "Create a password",
                      error: !!unref(errors).password,
                      "show-strength": "",
                      autocomplete: "new-password",
                      onBlur: validatePassword
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="terms-section" data-v-90fd2520${_scopeId}><label class="terms-label" data-v-90fd2520${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(formData).acceptTerms) ? ssrLooseContain(unref(formData).acceptTerms, null) : unref(formData).acceptTerms) ? " checked" : ""} type="checkbox" class="terms-checkbox" data-v-90fd2520${_scopeId}><span data-v-90fd2520${_scopeId}> I agree to the <a href="/terms" target="_blank" class="terms-link" data-v-90fd2520${_scopeId}>Terms of Service</a> and <a href="/privacy" target="_blank" class="terms-link" data-v-90fd2520${_scopeId}>Privacy Policy</a></span></label>`);
            if (unref(errors).terms) {
              _push2(`<p class="terms-error" data-v-90fd2520${_scopeId}>${ssrInterpolate(unref(errors).terms)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(error)) {
              _push2(ssrRenderComponent(_component_Alert, {
                variant: "error",
                dismissible: "",
                onDismiss: ($event) => error.value = ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(error))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(error)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              loading: unref(loading),
              disabled: !unref(isFormValid),
              class: "signup-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create Account `);
                } else {
                  return [
                    createTextVNode(" Create Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><div class="signup-divider" data-v-90fd2520${_scopeId}><span data-v-90fd2520${_scopeId}>or sign up with</span></div><div class="signup-oauth" data-v-90fd2520${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="oauth-button" data-v-90fd2520${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "logos:google-icon" }, null, _parent2, _scopeId));
            _push2(`<span data-v-90fd2520${_scopeId}>Continue with Google</span></button></div><p class="signup-footer" data-v-90fd2520${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/login",
              class: "signup-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in `);
                } else {
                  return [
                    createTextVNode(" Sign in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode("div", { class: "signup-box" }, [
                createVNode("div", { class: "signup-header" }, [
                  createVNode(_component_Icon, {
                    name: "mdi:school",
                    class: "signup-logo"
                  }),
                  createVNode("h1", { class: "signup-title" }, "Create Your Account"),
                  createVNode("p", { class: "signup-subtitle" }, "Start your learning journey today")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(handleSignup, ["prevent"]),
                  class: "signup-form"
                }, [
                  createVNode("div", { class: "role-selection" }, [
                    createVNode("p", { class: "role-label" }, "I am a..."),
                    createVNode("div", { class: "role-options" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(roles, (role) => {
                        return createVNode("label", {
                          key: role.value,
                          class: ["role-option", { "role-option--selected": unref(formData).role === role.value }]
                        }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(formData).role = $event,
                            type: "radio",
                            value: role.value,
                            class: "role-input"
                          }, null, 8, ["onUpdate:modelValue", "value"]), [
                            [vModelRadio, unref(formData).role]
                          ]),
                          createVNode(_component_Icon, {
                            name: role.icon,
                            class: "role-icon"
                          }, null, 8, ["name"]),
                          createVNode("span", { class: "role-name" }, toDisplayString(role.label), 1)
                        ], 2);
                      }), 64))
                    ]),
                    unref(errors).role ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "role-error"
                    }, toDisplayString(unref(errors).role), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode(_component_FormField, {
                    label: "Full Name",
                    error: unref(errors).name,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Input, {
                        modelValue: unref(formData).name,
                        "onUpdate:modelValue": ($event) => unref(formData).name = $event,
                        type: "text",
                        placeholder: "Enter your full name",
                        error: !!unref(errors).name,
                        onBlur: validateName
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_FormField, {
                    label: "Email",
                    error: unref(errors).email,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Input, {
                        modelValue: unref(formData).email,
                        "onUpdate:modelValue": ($event) => unref(formData).email = $event,
                        type: "email",
                        placeholder: "Enter your email",
                        error: !!unref(errors).email,
                        onBlur: validateEmail
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_FormField, {
                    label: "Password",
                    error: unref(errors).password,
                    hint: "At least 8 characters",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_PasswordField, {
                        modelValue: unref(formData).password,
                        "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                        placeholder: "Create a password",
                        error: !!unref(errors).password,
                        "show-strength": "",
                        autocomplete: "new-password",
                        onBlur: validatePassword
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode("div", { class: "terms-section" }, [
                    createVNode("label", { class: "terms-label" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(formData).acceptTerms = $event,
                        type: "checkbox",
                        class: "terms-checkbox"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(formData).acceptTerms]
                      ]),
                      createVNode("span", null, [
                        createTextVNode(" I agree to the "),
                        createVNode("a", {
                          href: "/terms",
                          target: "_blank",
                          class: "terms-link"
                        }, "Terms of Service"),
                        createTextVNode(" and "),
                        createVNode("a", {
                          href: "/privacy",
                          target: "_blank",
                          class: "terms-link"
                        }, "Privacy Policy")
                      ])
                    ]),
                    unref(errors).terms ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "terms-error"
                    }, toDisplayString(unref(errors).terms), 1)) : createCommentVNode("", true)
                  ]),
                  unref(error) ? (openBlock(), createBlock(_component_Alert, {
                    key: 0,
                    variant: "error",
                    dismissible: "",
                    onDismiss: ($event) => error.value = ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(error)), 1)
                    ]),
                    _: 1
                  }, 8, ["onDismiss"])) : createCommentVNode("", true),
                  createVNode(_component_Button, {
                    type: "submit",
                    loading: unref(loading),
                    disabled: !unref(isFormValid),
                    class: "signup-button"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Create Account ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ], 32),
                createVNode("div", { class: "signup-divider" }, [
                  createVNode("span", null, "or sign up with")
                ]),
                createVNode("div", { class: "signup-oauth" }, [
                  createVNode("button", {
                    type: "button",
                    onClick: handleGoogleSignup,
                    disabled: unref(loading),
                    class: "oauth-button"
                  }, [
                    createVNode(_component_Icon, { name: "logos:google-icon" }),
                    createVNode("span", null, "Continue with Google")
                  ], 8, ["disabled"])
                ]),
                createVNode("p", { class: "signup-footer" }, [
                  createTextVNode(" Already have an account? "),
                  createVNode(_component_NuxtLink, {
                    to: "/auth/login",
                    class: "signup-link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign in ")
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90fd2520"]]);

export { signup as default };
//# sourceMappingURL=signup-CYwSsNio.mjs.map
