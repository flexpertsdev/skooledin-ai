import { _ as __nuxt_component_0 } from './LayoutSafeArea-DpoDflTO.mjs';
import { _ as __nuxt_component_0$1 } from './LayoutContainer-Cws8nv4M.mjs';
import { _ as __nuxt_component_2 } from './LayoutStack-BIvVaTu9.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useToast } from './useToast-BD9RVwOt.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
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
  __name: "content",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const cardVariants = ["default", "outlined", "elevated", "flat"];
    const masonryItems = [
      {
        title: "Mountain Vista",
        image: "https://picsum.photos/400/300?random=m1",
        content: "Breathtaking mountain views captured at golden hour. The perfect escape into nature."
      },
      {
        title: "Urban Architecture",
        image: "https://picsum.photos/400/500?random=m2",
        content: "Modern design meets functionality in this stunning example of contemporary architecture. Clean lines and sustainable materials create a harmonious urban environment."
      },
      {
        title: "Ocean Waves",
        image: "https://picsum.photos/400/250?random=m3",
        content: "The endless rhythm of the sea."
      },
      {
        title: "Forest Path",
        image: "https://picsum.photos/400/400?random=m4",
        content: "A serene journey through ancient woods where sunlight filters through the canopy."
      },
      {
        title: "City Lights",
        image: "https://picsum.photos/400/350?random=m5",
        content: "The vibrant energy of the city comes alive after dark."
      },
      {
        title: "Desert Sunset",
        image: "https://picsum.photos/400/450?random=m6",
        content: "Colors paint the sky as day transitions to night in the vast desert landscape. A moment of pure tranquility."
      }
    ];
    const features = [
      {
        icon: "\u{1F680}",
        title: "Fast Performance",
        description: "Optimized for speed with lazy loading and code splitting."
      },
      {
        icon: "\u{1F4F1}",
        title: "Mobile First",
        description: "Designed from the ground up for mobile experiences."
      },
      {
        icon: "\u{1F3A8}",
        title: "Customizable",
        description: "Flexible theming system with CSS custom properties."
      }
    ];
    const teamMembers = [
      { name: "Sarah Chen", role: "CEO", avatar: "https://picsum.photos/200/200?random=p1" },
      { name: "Mike Johnson", role: "CTO", avatar: "https://picsum.photos/200/200?random=p2" },
      { name: "Lisa Wang", role: "Designer", avatar: "https://picsum.photos/200/200?random=p3" },
      { name: "Tom Davis", role: "Developer", avatar: "https://picsum.photos/200/200?random=p4" }
    ];
    const stats = [
      {
        label: "Revenue",
        value: "$12.5K",
        change: "+12%",
        trend: "positive",
        color: "var(--success-color)"
      },
      { label: "Users", value: "1,234", change: "+5%", trend: "positive", color: "var(--info-color)" },
      { label: "Orders", value: "89", change: "-2%", trend: "negative", color: "var(--warning-color)" },
      { label: "Bounce", value: "23%", change: "+1%", trend: "negative", color: "var(--error-color)" }
    ];
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const handleCardClick = (index) => {
      toast.info(`Card ${index} clicked!`);
    };
    useHead({
      title: "Content Layout Components - Mobile-First Nuxt",
      meta: [
        {
          name: "description",
          content: "Demo of content layout components including responsive grids and cards"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutSafeArea = __nuxt_component_0;
      const _component_LayoutContainer = __nuxt_component_0$1;
      const _component_LayoutStack = __nuxt_component_2;
      const _component_CardGrid = resolveComponent("CardGrid");
      const _component_Card = resolveComponent("Card");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-demo" }, _attrs))} data-v-99d40237>`);
      _push(ssrRenderComponent(_component_LayoutSafeArea, { top: true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutStack, { spacing: "xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-header" data-v-99d40237${_scopeId3}><h1 data-v-99d40237${_scopeId3}>Content Layout Components</h1><p data-v-99d40237${_scopeId3}>Responsive grids, cards, and content organization patterns</p></div><section data-v-99d40237${_scopeId3}><h2 data-v-99d40237${_scopeId3}>CardGrid Component</h2><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Auto-fill Grid (Default)</h3><p data-v-99d40237${_scopeId3}>Automatically fills available space with cards</p>`);
                        _push4(ssrRenderComponent(_component_CardGrid, { gap: "lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(6, (i) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: `auto-${i}`,
                                  title: `Card ${i}`,
                                  subtitle: "Auto-fill grid layout",
                                  image: `https://picsum.photos/400/300?random=${i}`,
                                  variant: "elevated",
                                  clickable: "",
                                  onClick: ($event) => handleCardClick(i)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-99d40237${_scopeId5}> This card automatically sizes based on available space with a minimum width. </p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, " This card automatically sizes based on available space with a minimum width. ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `auto-${i}`,
                                    title: `Card ${i}`,
                                    subtitle: "Auto-fill grid layout",
                                    image: `https://picsum.photos/400/300?random=${i}`,
                                    variant: "elevated",
                                    clickable: "",
                                    onClick: ($event) => handleCardClick(i)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, " This card automatically sizes based on available space with a minimum width. ")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "image", "onClick"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Fixed Column Grid</h3><p data-v-99d40237${_scopeId3}>Responsive column counts</p>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(8, (i) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: `fixed-${i}`,
                                  title: `Product ${i}`,
                                  subtitle: `$${(i * 10 + 9).toFixed(2)}`,
                                  variant: "outlined"
                                }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<button class="card-button" data-v-99d40237${_scopeId5}>Add to Cart</button>`);
                                    } else {
                                      return [
                                        createVNode("button", { class: "card-button" }, "Add to Cart")
                                      ];
                                    }
                                  }),
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-99d40237${_scopeId5}>Fixed column layout adjusts based on breakpoints.</p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, "Fixed column layout adjusts based on breakpoints.")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `fixed-${i}`,
                                    title: `Product ${i}`,
                                    subtitle: `$${(i * 10 + 9).toFixed(2)}`,
                                    variant: "outlined"
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("button", { class: "card-button" }, "Add to Cart")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("p", null, "Fixed column layout adjusts based on breakpoints.")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Masonry Layout</h3><p data-v-99d40237${_scopeId3}>Pinterest-style variable height layout</p>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: { mobile: 1, tablet: 2, desktop: 3 },
                          gap: "lg",
                          masonry: true,
                          "equal-height": false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(masonryItems, (item, i) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: `masonry-${i}`,
                                  title: item.title,
                                  image: item.image,
                                  variant: "default"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-99d40237${_scopeId5}>${ssrInterpolate(item.content)}</p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, toDisplayString(item.content), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(masonryItems, (item, i) => {
                                  return createVNode(_component_Card, {
                                    key: `masonry-${i}`,
                                    title: item.title,
                                    image: item.image,
                                    variant: "default"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, toDisplayString(item.content), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "image"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Card Variants</h3>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: 4,
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(cardVariants, (variant) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: variant,
                                  title: capitalize(variant),
                                  subtitle: "Card variant",
                                  variant,
                                  clickable: true
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-99d40237${_scopeId5}>This is a ${ssrInterpolate(variant)} card variant.</p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, "This is a " + toDisplayString(variant) + " card variant.", 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(cardVariants, (variant) => {
                                  return createVNode(_component_Card, {
                                    key: variant,
                                    title: capitalize(variant),
                                    subtitle: "Card variant",
                                    variant,
                                    clickable: true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "This is a " + toDisplayString(variant) + " card variant.", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "variant"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Content Cards</h3>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: 3,
                          gap: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(features, (feature) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: feature.title,
                                  title: feature.title,
                                  variant: "flat",
                                  padding: "lg"
                                }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<a href="#" class="card-link" data-v-99d40237${_scopeId5}>Learn more \u2192</a>`);
                                    } else {
                                      return [
                                        createVNode("a", {
                                          href: "#",
                                          class: "card-link"
                                        }, "Learn more \u2192")
                                      ];
                                    }
                                  }),
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="feature-icon" data-v-99d40237${_scopeId5}>${ssrInterpolate(feature.icon)}</div><p data-v-99d40237${_scopeId5}>${ssrInterpolate(feature.description)}</p>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "feature-icon" }, toDisplayString(feature.icon), 1),
                                        createVNode("p", null, toDisplayString(feature.description), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                                  return createVNode(_component_Card, {
                                    key: feature.title,
                                    title: feature.title,
                                    variant: "flat",
                                    padding: "lg"
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("a", {
                                        href: "#",
                                        class: "card-link"
                                      }, "Learn more \u2192")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "feature-icon" }, toDisplayString(feature.icon), 1),
                                      createVNode("p", null, toDisplayString(feature.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Mixed Content Grid</h3>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: "auto-fit",
                          "min-child-width": "300px"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Card, {
                                title: "Featured Article",
                                subtitle: "5 min read",
                                image: `https://picsum.photos/600/400?random=featured`,
                                variant: "elevated",
                                clickable: "",
                                style: { "grid-column": "span 2" }
                              }, {
                                actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<button class="card-button card-button-primary" data-v-99d40237${_scopeId5}>Read More</button>`);
                                  } else {
                                    return [
                                      createVNode("button", { class: "card-button card-button-primary" }, "Read More")
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p data-v-99d40237${_scopeId5}>This featured card spans two columns on larger screens for emphasis.</p>`);
                                  } else {
                                    return [
                                      createVNode("p", null, "This featured card spans two columns on larger screens for emphasis.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(4, (i) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: `regular-${i}`,
                                  title: `Article ${i}`,
                                  subtitle: `${i + 2} min read`,
                                  variant: "default",
                                  clickable: ""
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<p data-v-99d40237${_scopeId5}>Regular sized cards fit alongside the featured content.</p>`);
                                    } else {
                                      return [
                                        createVNode("p", null, "Regular sized cards fit alongside the featured content.")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_Card, {
                                  title: "Featured Article",
                                  subtitle: "5 min read",
                                  image: `https://picsum.photos/600/400?random=featured`,
                                  variant: "elevated",
                                  clickable: "",
                                  style: { "grid-column": "span 2" }
                                }, {
                                  actions: withCtx(() => [
                                    createVNode("button", { class: "card-button card-button-primary" }, "Read More")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("p", null, "This featured card spans two columns on larger screens for emphasis.")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `regular-${i}`,
                                    title: `Article ${i}`,
                                    subtitle: `${i + 2} min read`,
                                    variant: "default",
                                    clickable: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Regular sized cards fit alongside the featured content.")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section><section data-v-99d40237${_scopeId3}><h2 data-v-99d40237${_scopeId3}>Common Patterns</h2><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Team Members</h3>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: 4,
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(teamMembers, (member) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: member.name,
                                  image: member.avatar,
                                  variant: "flat",
                                  padding: "sm"
                                }, {
                                  header: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<h4 class="member-name" data-v-99d40237${_scopeId5}>${ssrInterpolate(member.name)}</h4><p class="member-role" data-v-99d40237${_scopeId5}>${ssrInterpolate(member.role)}</p>`);
                                    } else {
                                      return [
                                        createVNode("h4", { class: "member-name" }, toDisplayString(member.name), 1),
                                        createVNode("p", { class: "member-role" }, toDisplayString(member.role), 1)
                                      ];
                                    }
                                  }),
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="member-links" data-v-99d40237${_scopeId5}><a href="#" aria-label="Email" data-v-99d40237${_scopeId5}>\u{1F4E7}</a><a href="#" aria-label="LinkedIn" data-v-99d40237${_scopeId5}>\u{1F4BC}</a></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "member-links" }, [
                                          createVNode("a", {
                                            href: "#",
                                            "aria-label": "Email"
                                          }, "\u{1F4E7}"),
                                          createVNode("a", {
                                            href: "#",
                                            "aria-label": "LinkedIn"
                                          }, "\u{1F4BC}")
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
                                (openBlock(), createBlock(Fragment, null, renderList(teamMembers, (member) => {
                                  return createVNode(_component_Card, {
                                    key: member.name,
                                    image: member.avatar,
                                    variant: "flat",
                                    padding: "sm"
                                  }, {
                                    header: withCtx(() => [
                                      createVNode("h4", { class: "member-name" }, toDisplayString(member.name), 1),
                                      createVNode("p", { class: "member-role" }, toDisplayString(member.role), 1)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "member-links" }, [
                                        createVNode("a", {
                                          href: "#",
                                          "aria-label": "Email"
                                        }, "\u{1F4E7}"),
                                        createVNode("a", {
                                          href: "#",
                                          "aria-label": "LinkedIn"
                                        }, "\u{1F4BC}")
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["image"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-section" data-v-99d40237${_scopeId3}><h3 data-v-99d40237${_scopeId3}>Dashboard Stats</h3>`);
                        _push4(ssrRenderComponent(_component_CardGrid, {
                          columns: { mobile: 2, tablet: 4 },
                          gap: "md"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(stats, (stat) => {
                                _push5(ssrRenderComponent(_component_Card, {
                                  key: stat.label,
                                  variant: "outlined",
                                  padding: "lg"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="stat-value" style="${ssrRenderStyle({ color: stat.color })}" data-v-99d40237${_scopeId5}>${ssrInterpolate(stat.value)}</div><div class="stat-label" data-v-99d40237${_scopeId5}>${ssrInterpolate(stat.label)}</div><div class="${ssrRenderClass([stat.trend, "stat-change"])}" data-v-99d40237${_scopeId5}>${ssrInterpolate(stat.change)}</div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: "stat-value",
                                          style: { color: stat.color }
                                        }, toDisplayString(stat.value), 5),
                                        createVNode("div", { class: "stat-label" }, toDisplayString(stat.label), 1),
                                        createVNode("div", {
                                          class: ["stat-change", stat.trend]
                                        }, toDisplayString(stat.change), 3)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                                  return createVNode(_component_Card, {
                                    key: stat.label,
                                    variant: "outlined",
                                    padding: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "stat-value",
                                        style: { color: stat.color }
                                      }, toDisplayString(stat.value), 5),
                                      createVNode("div", { class: "stat-label" }, toDisplayString(stat.label), 1),
                                      createVNode("div", {
                                        class: ["stat-change", stat.trend]
                                      }, toDisplayString(stat.change), 3)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></section>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-header" }, [
                            createVNode("h1", null, "Content Layout Components"),
                            createVNode("p", null, "Responsive grids, cards, and content organization patterns")
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "CardGrid Component"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Auto-fill Grid (Default)"),
                              createVNode("p", null, "Automatically fills available space with cards"),
                              createVNode(_component_CardGrid, { gap: "lg" }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                    return createVNode(_component_Card, {
                                      key: `auto-${i}`,
                                      title: `Card ${i}`,
                                      subtitle: "Auto-fill grid layout",
                                      image: `https://picsum.photos/400/300?random=${i}`,
                                      variant: "elevated",
                                      clickable: "",
                                      onClick: ($event) => handleCardClick(i)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", null, " This card automatically sizes based on available space with a minimum width. ")
                                      ]),
                                      _: 2
                                    }, 1032, ["title", "image", "onClick"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Fixed Column Grid"),
                              createVNode("p", null, "Responsive column counts"),
                              createVNode(_component_CardGrid, {
                                columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                    return createVNode(_component_Card, {
                                      key: `fixed-${i}`,
                                      title: `Product ${i}`,
                                      subtitle: `$${(i * 10 + 9).toFixed(2)}`,
                                      variant: "outlined"
                                    }, {
                                      actions: withCtx(() => [
                                        createVNode("button", { class: "card-button" }, "Add to Cart")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode("p", null, "Fixed column layout adjusts based on breakpoints.")
                                      ]),
                                      _: 2
                                    }, 1032, ["title", "subtitle"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Masonry Layout"),
                              createVNode("p", null, "Pinterest-style variable height layout"),
                              createVNode(_component_CardGrid, {
                                columns: { mobile: 1, tablet: 2, desktop: 3 },
                                gap: "lg",
                                masonry: true,
                                "equal-height": false
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(masonryItems, (item, i) => {
                                    return createVNode(_component_Card, {
                                      key: `masonry-${i}`,
                                      title: item.title,
                                      image: item.image,
                                      variant: "default"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", null, toDisplayString(item.content), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["title", "image"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Card Variants"),
                              createVNode(_component_CardGrid, {
                                columns: 4,
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(cardVariants, (variant) => {
                                    return createVNode(_component_Card, {
                                      key: variant,
                                      title: capitalize(variant),
                                      subtitle: "Card variant",
                                      variant,
                                      clickable: true
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "This is a " + toDisplayString(variant) + " card variant.", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["title", "variant"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Content Cards"),
                              createVNode(_component_CardGrid, {
                                columns: 3,
                                gap: "lg"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                                    return createVNode(_component_Card, {
                                      key: feature.title,
                                      title: feature.title,
                                      variant: "flat",
                                      padding: "lg"
                                    }, {
                                      actions: withCtx(() => [
                                        createVNode("a", {
                                          href: "#",
                                          class: "card-link"
                                        }, "Learn more \u2192")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode("div", { class: "feature-icon" }, toDisplayString(feature.icon), 1),
                                        createVNode("p", null, toDisplayString(feature.description), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["title"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Mixed Content Grid"),
                              createVNode(_component_CardGrid, {
                                columns: "auto-fit",
                                "min-child-width": "300px"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Card, {
                                    title: "Featured Article",
                                    subtitle: "5 min read",
                                    image: `https://picsum.photos/600/400?random=featured`,
                                    variant: "elevated",
                                    clickable: "",
                                    style: { "grid-column": "span 2" }
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("button", { class: "card-button card-button-primary" }, "Read More")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("p", null, "This featured card spans two columns on larger screens for emphasis.")
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                    return createVNode(_component_Card, {
                                      key: `regular-${i}`,
                                      title: `Article ${i}`,
                                      subtitle: `${i + 2} min read`,
                                      variant: "default",
                                      clickable: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "Regular sized cards fit alongside the featured content.")
                                      ]),
                                      _: 2
                                    }, 1032, ["title", "subtitle"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("section", null, [
                            createVNode("h2", null, "Common Patterns"),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Team Members"),
                              createVNode(_component_CardGrid, {
                                columns: 4,
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(teamMembers, (member) => {
                                    return createVNode(_component_Card, {
                                      key: member.name,
                                      image: member.avatar,
                                      variant: "flat",
                                      padding: "sm"
                                    }, {
                                      header: withCtx(() => [
                                        createVNode("h4", { class: "member-name" }, toDisplayString(member.name), 1),
                                        createVNode("p", { class: "member-role" }, toDisplayString(member.role), 1)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode("div", { class: "member-links" }, [
                                          createVNode("a", {
                                            href: "#",
                                            "aria-label": "Email"
                                          }, "\u{1F4E7}"),
                                          createVNode("a", {
                                            href: "#",
                                            "aria-label": "LinkedIn"
                                          }, "\u{1F4BC}")
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["image"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "demo-section" }, [
                              createVNode("h3", null, "Dashboard Stats"),
                              createVNode(_component_CardGrid, {
                                columns: { mobile: 2, tablet: 4 },
                                gap: "md"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                                    return createVNode(_component_Card, {
                                      key: stat.label,
                                      variant: "outlined",
                                      padding: "lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "stat-value",
                                          style: { color: stat.color }
                                        }, toDisplayString(stat.value), 5),
                                        createVNode("div", { class: "stat-label" }, toDisplayString(stat.label), 1),
                                        createVNode("div", {
                                          class: ["stat-change", stat.trend]
                                        }, toDisplayString(stat.change), 3)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ])
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
                          createVNode("h1", null, "Content Layout Components"),
                          createVNode("p", null, "Responsive grids, cards, and content organization patterns")
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "CardGrid Component"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Auto-fill Grid (Default)"),
                            createVNode("p", null, "Automatically fills available space with cards"),
                            createVNode(_component_CardGrid, { gap: "lg" }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `auto-${i}`,
                                    title: `Card ${i}`,
                                    subtitle: "Auto-fill grid layout",
                                    image: `https://picsum.photos/400/300?random=${i}`,
                                    variant: "elevated",
                                    clickable: "",
                                    onClick: ($event) => handleCardClick(i)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, " This card automatically sizes based on available space with a minimum width. ")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "image", "onClick"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Fixed Column Grid"),
                            createVNode("p", null, "Responsive column counts"),
                            createVNode(_component_CardGrid, {
                              columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `fixed-${i}`,
                                    title: `Product ${i}`,
                                    subtitle: `$${(i * 10 + 9).toFixed(2)}`,
                                    variant: "outlined"
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("button", { class: "card-button" }, "Add to Cart")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("p", null, "Fixed column layout adjusts based on breakpoints.")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Masonry Layout"),
                            createVNode("p", null, "Pinterest-style variable height layout"),
                            createVNode(_component_CardGrid, {
                              columns: { mobile: 1, tablet: 2, desktop: 3 },
                              gap: "lg",
                              masonry: true,
                              "equal-height": false
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(masonryItems, (item, i) => {
                                  return createVNode(_component_Card, {
                                    key: `masonry-${i}`,
                                    title: item.title,
                                    image: item.image,
                                    variant: "default"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, toDisplayString(item.content), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "image"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Card Variants"),
                            createVNode(_component_CardGrid, {
                              columns: 4,
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(cardVariants, (variant) => {
                                  return createVNode(_component_Card, {
                                    key: variant,
                                    title: capitalize(variant),
                                    subtitle: "Card variant",
                                    variant,
                                    clickable: true
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "This is a " + toDisplayString(variant) + " card variant.", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "variant"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Content Cards"),
                            createVNode(_component_CardGrid, {
                              columns: 3,
                              gap: "lg"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                                  return createVNode(_component_Card, {
                                    key: feature.title,
                                    title: feature.title,
                                    variant: "flat",
                                    padding: "lg"
                                  }, {
                                    actions: withCtx(() => [
                                      createVNode("a", {
                                        href: "#",
                                        class: "card-link"
                                      }, "Learn more \u2192")
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "feature-icon" }, toDisplayString(feature.icon), 1),
                                      createVNode("p", null, toDisplayString(feature.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Mixed Content Grid"),
                            createVNode(_component_CardGrid, {
                              columns: "auto-fit",
                              "min-child-width": "300px"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Card, {
                                  title: "Featured Article",
                                  subtitle: "5 min read",
                                  image: `https://picsum.photos/600/400?random=featured`,
                                  variant: "elevated",
                                  clickable: "",
                                  style: { "grid-column": "span 2" }
                                }, {
                                  actions: withCtx(() => [
                                    createVNode("button", { class: "card-button card-button-primary" }, "Read More")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("p", null, "This featured card spans two columns on larger screens for emphasis.")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                  return createVNode(_component_Card, {
                                    key: `regular-${i}`,
                                    title: `Article ${i}`,
                                    subtitle: `${i + 2} min read`,
                                    variant: "default",
                                    clickable: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Regular sized cards fit alongside the featured content.")
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("section", null, [
                          createVNode("h2", null, "Common Patterns"),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Team Members"),
                            createVNode(_component_CardGrid, {
                              columns: 4,
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(teamMembers, (member) => {
                                  return createVNode(_component_Card, {
                                    key: member.name,
                                    image: member.avatar,
                                    variant: "flat",
                                    padding: "sm"
                                  }, {
                                    header: withCtx(() => [
                                      createVNode("h4", { class: "member-name" }, toDisplayString(member.name), 1),
                                      createVNode("p", { class: "member-role" }, toDisplayString(member.role), 1)
                                    ]),
                                    default: withCtx(() => [
                                      createVNode("div", { class: "member-links" }, [
                                        createVNode("a", {
                                          href: "#",
                                          "aria-label": "Email"
                                        }, "\u{1F4E7}"),
                                        createVNode("a", {
                                          href: "#",
                                          "aria-label": "LinkedIn"
                                        }, "\u{1F4BC}")
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["image"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "demo-section" }, [
                            createVNode("h3", null, "Dashboard Stats"),
                            createVNode(_component_CardGrid, {
                              columns: { mobile: 2, tablet: 4 },
                              gap: "md"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                                  return createVNode(_component_Card, {
                                    key: stat.label,
                                    variant: "outlined",
                                    padding: "lg"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: "stat-value",
                                        style: { color: stat.color }
                                      }, toDisplayString(stat.value), 5),
                                      createVNode("div", { class: "stat-label" }, toDisplayString(stat.label), 1),
                                      createVNode("div", {
                                        class: ["stat-change", stat.trend]
                                      }, toDisplayString(stat.change), 3)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ])
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
                        createVNode("h1", null, "Content Layout Components"),
                        createVNode("p", null, "Responsive grids, cards, and content organization patterns")
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "CardGrid Component"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Auto-fill Grid (Default)"),
                          createVNode("p", null, "Automatically fills available space with cards"),
                          createVNode(_component_CardGrid, { gap: "lg" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                                return createVNode(_component_Card, {
                                  key: `auto-${i}`,
                                  title: `Card ${i}`,
                                  subtitle: "Auto-fill grid layout",
                                  image: `https://picsum.photos/400/300?random=${i}`,
                                  variant: "elevated",
                                  clickable: "",
                                  onClick: ($event) => handleCardClick(i)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", null, " This card automatically sizes based on available space with a minimum width. ")
                                  ]),
                                  _: 2
                                }, 1032, ["title", "image", "onClick"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Fixed Column Grid"),
                          createVNode("p", null, "Responsive column counts"),
                          createVNode(_component_CardGrid, {
                            columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                                return createVNode(_component_Card, {
                                  key: `fixed-${i}`,
                                  title: `Product ${i}`,
                                  subtitle: `$${(i * 10 + 9).toFixed(2)}`,
                                  variant: "outlined"
                                }, {
                                  actions: withCtx(() => [
                                    createVNode("button", { class: "card-button" }, "Add to Cart")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("p", null, "Fixed column layout adjusts based on breakpoints.")
                                  ]),
                                  _: 2
                                }, 1032, ["title", "subtitle"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Masonry Layout"),
                          createVNode("p", null, "Pinterest-style variable height layout"),
                          createVNode(_component_CardGrid, {
                            columns: { mobile: 1, tablet: 2, desktop: 3 },
                            gap: "lg",
                            masonry: true,
                            "equal-height": false
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(masonryItems, (item, i) => {
                                return createVNode(_component_Card, {
                                  key: `masonry-${i}`,
                                  title: item.title,
                                  image: item.image,
                                  variant: "default"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", null, toDisplayString(item.content), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["title", "image"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Card Variants"),
                          createVNode(_component_CardGrid, {
                            columns: 4,
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(cardVariants, (variant) => {
                                return createVNode(_component_Card, {
                                  key: variant,
                                  title: capitalize(variant),
                                  subtitle: "Card variant",
                                  variant,
                                  clickable: true
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", null, "This is a " + toDisplayString(variant) + " card variant.", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["title", "variant"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Content Cards"),
                          createVNode(_component_CardGrid, {
                            columns: 3,
                            gap: "lg"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(features, (feature) => {
                                return createVNode(_component_Card, {
                                  key: feature.title,
                                  title: feature.title,
                                  variant: "flat",
                                  padding: "lg"
                                }, {
                                  actions: withCtx(() => [
                                    createVNode("a", {
                                      href: "#",
                                      class: "card-link"
                                    }, "Learn more \u2192")
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", { class: "feature-icon" }, toDisplayString(feature.icon), 1),
                                    createVNode("p", null, toDisplayString(feature.description), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["title"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Mixed Content Grid"),
                          createVNode(_component_CardGrid, {
                            columns: "auto-fit",
                            "min-child-width": "300px"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Card, {
                                title: "Featured Article",
                                subtitle: "5 min read",
                                image: `https://picsum.photos/600/400?random=featured`,
                                variant: "elevated",
                                clickable: "",
                                style: { "grid-column": "span 2" }
                              }, {
                                actions: withCtx(() => [
                                  createVNode("button", { class: "card-button card-button-primary" }, "Read More")
                                ]),
                                default: withCtx(() => [
                                  createVNode("p", null, "This featured card spans two columns on larger screens for emphasis.")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                                return createVNode(_component_Card, {
                                  key: `regular-${i}`,
                                  title: `Article ${i}`,
                                  subtitle: `${i + 2} min read`,
                                  variant: "default",
                                  clickable: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", null, "Regular sized cards fit alongside the featured content.")
                                  ]),
                                  _: 2
                                }, 1032, ["title", "subtitle"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("section", null, [
                        createVNode("h2", null, "Common Patterns"),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Team Members"),
                          createVNode(_component_CardGrid, {
                            columns: 4,
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(teamMembers, (member) => {
                                return createVNode(_component_Card, {
                                  key: member.name,
                                  image: member.avatar,
                                  variant: "flat",
                                  padding: "sm"
                                }, {
                                  header: withCtx(() => [
                                    createVNode("h4", { class: "member-name" }, toDisplayString(member.name), 1),
                                    createVNode("p", { class: "member-role" }, toDisplayString(member.role), 1)
                                  ]),
                                  default: withCtx(() => [
                                    createVNode("div", { class: "member-links" }, [
                                      createVNode("a", {
                                        href: "#",
                                        "aria-label": "Email"
                                      }, "\u{1F4E7}"),
                                      createVNode("a", {
                                        href: "#",
                                        "aria-label": "LinkedIn"
                                      }, "\u{1F4BC}")
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["image"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "demo-section" }, [
                          createVNode("h3", null, "Dashboard Stats"),
                          createVNode(_component_CardGrid, {
                            columns: { mobile: 2, tablet: 4 },
                            gap: "md"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                                return createVNode(_component_Card, {
                                  key: stat.label,
                                  variant: "outlined",
                                  padding: "lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "stat-value",
                                      style: { color: stat.color }
                                    }, toDisplayString(stat.value), 5),
                                    createVNode("div", { class: "stat-label" }, toDisplayString(stat.label), 1),
                                    createVNode("div", {
                                      class: ["stat-change", stat.trend]
                                    }, toDisplayString(stat.change), 3)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const content = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99d40237"]]);

export { content as default };
//# sourceMappingURL=content-BXxLHwej.mjs.map
