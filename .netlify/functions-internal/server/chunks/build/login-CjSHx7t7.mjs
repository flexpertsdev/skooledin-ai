import { _ as __nuxt_component_0 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_1 } from './FormField-Bpl71xcO.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D4SBA0xZ.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, withDirectives, vModelCheckbox, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    useRouter();
    const loading = ref(false);
    const error = ref("");
    const formData = reactive({
      email: "",
      password: "",
      rememberMe: false
    });
    const errors = reactive({
      email: "",
      password: ""
    });
    const isFormValid = computed(() => {
      return formData.email && formData.password && !errors.email && !errors.password;
    });
    const validateEmail = () => {
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email";
      } else {
        errors.email = "";
      }
    };
    const handleLogin = async () => {
      validateEmail();
      if (!formData.password) {
        errors.password = "Password is required";
        return;
      }
      if (!isFormValid.value) return;
      loading.value = true;
      error.value = "";
      try {
        await firebaseAuth.signIn(formData.email, formData.password);
        await navigateTo("/app");
      } catch (err) {
        console.error("Login error:", err);
        switch (err.code) {
          case "auth/user-not-found":
            error.value = "No account found with this email";
            break;
          case "auth/wrong-password":
            error.value = "Incorrect password";
            break;
          case "auth/invalid-email":
            error.value = "Invalid email address";
            break;
          case "auth/user-disabled":
            error.value = "This account has been disabled";
            break;
          case "auth/too-many-requests":
            error.value = "Too many failed attempts. Please try again later";
            break;
          default:
            error.value = "Failed to sign in. Please try again";
        }
      } finally {
        loading.value = false;
      }
    };
    const handleGoogleLogin = async () => {
      loading.value = true;
      error.value = "";
      try {
        await firebaseAuth.signInWithGoogle();
        await navigateTo("/app");
      } catch (err) {
        console.error("Google login error:", err);
        switch (err.code) {
          case "auth/popup-closed-by-user":
            break;
          case "auth/popup-blocked":
            error.value = "Please allow popups for this site";
            break;
          default:
            error.value = "Failed to sign in with Google";
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
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Alert = resolveComponent("Alert");
      const _component_Button = resolveComponent("Button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-de05cd32>`);
      _push(ssrRenderComponent(_component_LayoutContainer, { class: "login-container" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="login-box" data-v-de05cd32${_scopeId}><div class="login-header" data-v-de05cd32${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:school",
              class: "login-logo"
            }, null, _parent2, _scopeId));
            _push2(`<h1 class="login-title" data-v-de05cd32${_scopeId}>Welcome Back</h1><p class="login-subtitle" data-v-de05cd32${_scopeId}>Sign in to continue learning</p></div><form class="login-form" data-v-de05cd32${_scopeId}>`);
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
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_PasswordField, {
                    modelValue: unref(formData).password,
                    "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                    placeholder: "Enter your password",
                    error: !!unref(errors).password,
                    autocomplete: "current-password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_PasswordField, {
                      modelValue: unref(formData).password,
                      "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                      placeholder: "Enter your password",
                      error: !!unref(errors).password,
                      autocomplete: "current-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="login-options" data-v-de05cd32${_scopeId}><label class="login-remember" data-v-de05cd32${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(formData).rememberMe) ? ssrLooseContain(unref(formData).rememberMe, null) : unref(formData).rememberMe) ? " checked" : ""} type="checkbox" class="login-checkbox" data-v-de05cd32${_scopeId}><span data-v-de05cd32${_scopeId}>Remember me</span></label>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/forgot-password",
              class: "login-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Forgot password? `);
                } else {
                  return [
                    createTextVNode(" Forgot password? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
              class: "login-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign In `);
                } else {
                  return [
                    createTextVNode(" Sign In ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form><div class="login-divider" data-v-de05cd32${_scopeId}><span data-v-de05cd32${_scopeId}>or continue with</span></div><div class="login-oauth" data-v-de05cd32${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="oauth-button" data-v-de05cd32${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "logos:google-icon" }, null, _parent2, _scopeId));
            _push2(`<span data-v-de05cd32${_scopeId}>Continue with Google</span></button></div><p class="login-footer" data-v-de05cd32${_scopeId}> Don&#39;t have an account? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/signup",
              class: "login-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign up `);
                } else {
                  return [
                    createTextVNode(" Sign up ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode("div", { class: "login-box" }, [
                createVNode("div", { class: "login-header" }, [
                  createVNode(_component_Icon, {
                    name: "mdi:school",
                    class: "login-logo"
                  }),
                  createVNode("h1", { class: "login-title" }, "Welcome Back"),
                  createVNode("p", { class: "login-subtitle" }, "Sign in to continue learning")
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(handleLogin, ["prevent"]),
                  class: "login-form"
                }, [
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
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_PasswordField, {
                        modelValue: unref(formData).password,
                        "onUpdate:modelValue": ($event) => unref(formData).password = $event,
                        placeholder: "Enter your password",
                        error: !!unref(errors).password,
                        autocomplete: "current-password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode("div", { class: "login-options" }, [
                    createVNode("label", { class: "login-remember" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(formData).rememberMe = $event,
                        type: "checkbox",
                        class: "login-checkbox"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(formData).rememberMe]
                      ]),
                      createVNode("span", null, "Remember me")
                    ]),
                    createVNode(_component_NuxtLink, {
                      to: "/auth/forgot-password",
                      class: "login-link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot password? ")
                      ]),
                      _: 1
                    })
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
                    class: "login-button"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign In ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ], 32),
                createVNode("div", { class: "login-divider" }, [
                  createVNode("span", null, "or continue with")
                ]),
                createVNode("div", { class: "login-oauth" }, [
                  createVNode("button", {
                    type: "button",
                    onClick: handleGoogleLogin,
                    disabled: unref(loading),
                    class: "oauth-button"
                  }, [
                    createVNode(_component_Icon, { name: "logos:google-icon" }),
                    createVNode("span", null, "Continue with Google")
                  ], 8, ["disabled"])
                ]),
                createVNode("p", { class: "login-footer" }, [
                  createTextVNode(" Don't have an account? "),
                  createVNode(_component_NuxtLink, {
                    to: "/auth/signup",
                    class: "login-link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign up ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de05cd32"]]);

export { login as default };
//# sourceMappingURL=login-CjSHx7t7.mjs.map
