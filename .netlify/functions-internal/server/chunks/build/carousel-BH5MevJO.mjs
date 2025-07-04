import { _ as __nuxt_component_0 } from './LayoutContainer-BlRRBH76.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderTeleport, ssrRenderSlot } from 'vue/server-renderer';
import { l as lazyComponent, a as lazyLoadOnVisible, E as ErrorBoundary, L as LoadingSpinner } from './ErrorBoundary-DvdbXxel.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {},
    image: {},
    imageAlt: {},
    variant: { default: "default" },
    padding: { default: "md" },
    clickable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { default: "lazy" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const cardClasses = computed(() => ({
      [`card-${props.variant}`]: true,
      [`card-padding-${props.padding}`]: true,
      "card-clickable": props.clickable && !props.disabled,
      "card-disabled": props.disabled
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["card", unref(cardClasses)]
      }, _attrs))} data-v-19d37a96>`);
      if (_ctx.$slots.image || _ctx.image) {
        _push(`<div class="card-image" data-v-19d37a96>`);
        ssrRenderSlot(_ctx.$slots, "image", {}, () => {
          if (_ctx.image) {
            _push(`<img${ssrRenderAttr("src", _ctx.image)}${ssrRenderAttr("alt", _ctx.imageAlt || _ctx.title)}${ssrRenderAttr("loading", _ctx.loading)} data-v-19d37a96>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.header || _ctx.title || _ctx.subtitle) {
        _push(`<header class="card-header" data-v-19d37a96>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, () => {
          if (_ctx.title) {
            _push(`<h3 class="card-title" data-v-19d37a96>${ssrInterpolate(_ctx.title)}</h3>`);
          } else {
            _push(`<!---->`);
          }
          if (_ctx.subtitle) {
            _push(`<p class="card-subtitle" data-v-19d37a96>${ssrInterpolate(_ctx.subtitle)}</p>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.default) {
        _push(`<div class="card-content" data-v-19d37a96>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.actions) {
        _push(`<footer class="card-actions" data-v-19d37a96>`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</footer>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-19d37a96"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "carousel",
  __ssrInlineRender: true,
  setup(__props) {
    const Carousel = lazyComponent(
      () => import('./Carousel-bP-UXiRo.mjs'),
      {
        loadingComponent: LoadingSpinner,
        errorComponent: ErrorBoundary,
        delay: 200
      }
    );
    const PageView = lazyLoadOnVisible(
      () => import('./PageView-B3KwA2XT.mjs')
    );
    const MasonryGrid = lazyLoadOnVisible(
      () => import('./MasonryGrid-CD4pQcMp.mjs')
    );
    const basicCarouselIndex = ref(0);
    const multiCarouselIndex = ref(0);
    const verticalCarouselIndex = ref(0);
    const showPageView = ref(false);
    const pageViewIndex = ref(0);
    const fullscreenPageIndex = ref(0);
    const carouselImages = [
      {
        src: "https://picsum.photos/800/400?random=1",
        alt: "Slide 1",
        title: "Beautiful Landscapes",
        description: "Discover amazing views from around the world"
      },
      {
        src: "https://picsum.photos/800/400?random=2",
        alt: "Slide 2",
        title: "Urban Architecture",
        description: "Modern buildings and cityscapes"
      },
      {
        src: "https://picsum.photos/800/400?random=3",
        alt: "Slide 3",
        title: "Nature Photography",
        description: "Capturing the beauty of the natural world"
      }
    ];
    const products = [
      { id: 1, name: "Product 1", price: 29.99, image: "https://picsum.photos/300/200?random=11" },
      { id: 2, name: "Product 2", price: 39.99, image: "https://picsum.photos/300/200?random=12" },
      { id: 3, name: "Product 3", price: 49.99, image: "https://picsum.photos/300/200?random=13" },
      { id: 4, name: "Product 4", price: 59.99, image: "https://picsum.photos/300/200?random=14" },
      { id: 5, name: "Product 5", price: 69.99, image: "https://picsum.photos/300/200?random=15" },
      { id: 6, name: "Product 6", price: 79.99, image: "https://picsum.photos/300/200?random=16" }
    ];
    const testimonials = [
      {
        quote: "This is the best product I have ever used. Highly recommended!",
        name: "Sarah Johnson",
        role: "CEO, TechCorp",
        avatar: "https://picsum.photos/60/60?random=21"
      },
      {
        quote: "Outstanding quality and exceptional customer service.",
        name: "Mike Chen",
        role: "Designer, Creative Studio",
        avatar: "https://picsum.photos/60/60?random=22"
      },
      {
        quote: "A game-changer for our business. Simply amazing!",
        name: "Emma Davis",
        role: "Founder, StartupX",
        avatar: "https://picsum.photos/60/60?random=23"
      }
    ];
    const contentPages = [
      {
        title: "Welcome",
        content: "Discover our amazing features and capabilities",
        action: "Get Started"
      },
      {
        title: "Features",
        content: "Powerful tools designed for modern workflows",
        action: "Learn More"
      },
      {
        title: "Pricing",
        content: "Flexible plans that scale with your needs",
        action: "View Plans"
      }
    ];
    const onboardingPages = [
      {
        icon: "\u{1F44B}",
        title: "Welcome!",
        description: "Let's get you started with our app"
      },
      {
        icon: "\u{1F3AF}",
        title: "Set Your Goals",
        description: "Define what you want to achieve"
      },
      {
        icon: "\u{1F680}",
        title: "Ready to Launch",
        description: "You're all set to begin your journey"
      }
    ];
    const masonryItems = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      image: `https://picsum.photos/300/${200 + Math.random() * 200}?random=${i + 30}`,
      height: 200 + Math.random() * 200,
      title: `Item ${i + 1}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }));
    const mixedContent = [
      {
        type: "featured",
        title: "Featured Article",
        description: "This is a highlighted piece of content that stands out from the rest.",
        image: "https://picsum.photos/400/300?random=40"
      },
      {
        type: "quote",
        content: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
      },
      {
        type: "article",
        title: "Latest News",
        description: "Stay updated with the latest happenings in the industry.",
        image: "https://picsum.photos/400/250?random=41"
      },
      {
        type: "gallery",
        title: "Photo Collection",
        description: "A curated selection of beautiful images.",
        image: "https://picsum.photos/400/400?random=42"
      },
      {
        type: "quote",
        content: "The details are not the details. They make the design.",
        author: "Charles Eames"
      },
      {
        type: "article",
        title: "Design Trends",
        description: "Exploring the latest trends in modern design.",
        image: "https://picsum.photos/400/280?random=43"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutContainer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carousel-demo" }, _attrs))} data-v-27e8bac3>`);
      _push(ssrRenderComponent(_component_LayoutContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="demo-header" data-v-27e8bac3${_scopeId}><h1 data-v-27e8bac3${_scopeId}>Carousel &amp; Swipe Components</h1><p data-v-27e8bac3${_scopeId}>Touch-enabled carousels, page views, and masonry layouts</p></div><section data-v-27e8bac3${_scopeId}><h2 data-v-27e8bac3${_scopeId}>Carousel Component</h2><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Basic Carousel</h3><p data-v-27e8bac3${_scopeId}>Single item carousel with indicators and controls</p><div class="carousel-wrapper" data-v-27e8bac3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Carousel), {
              modelValue: basicCarouselIndex.value,
              "onUpdate:modelValue": ($event) => basicCarouselIndex.value = $event,
              items: carouselImages,
              "show-indicators": true,
              "show-controls": true
            }, {
              slide: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="carousel-slide" data-v-27e8bac3${_scopeId2}><img${ssrRenderAttr("src", item.src)}${ssrRenderAttr("alt", item.alt)} data-v-27e8bac3${_scopeId2}><div class="carousel-caption" data-v-27e8bac3${_scopeId2}><h4 data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.title)}</h4><p data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.description)}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "carousel-slide" }, [
                      createVNode("img", {
                        src: item.src,
                        alt: item.alt
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "carousel-caption" }, [
                        createVNode("h4", null, toDisplayString(item.title), 1),
                        createVNode("p", null, toDisplayString(item.description), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Multi-item Carousel</h3><p data-v-27e8bac3${_scopeId}>Shows multiple items at once with responsive columns</p><div class="carousel-wrapper" data-v-27e8bac3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Carousel), {
              modelValue: multiCarouselIndex.value,
              "onUpdate:modelValue": ($event) => multiCarouselIndex.value = $event,
              items: products,
              "items-to-show": 3,
              "items-to-scroll": 1,
              gap: 24,
              loop: true
            }, {
              slide: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Card, { clickable: "" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="product-image" data-v-27e8bac3${_scopeId3}><h4 data-v-27e8bac3${_scopeId3}>${ssrInterpolate(item.name)}</h4><p class="product-price" data-v-27e8bac3${_scopeId3}>$${ssrInterpolate(item.price)}</p>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: item.image,
                            alt: item.name,
                            class: "product-image"
                          }, null, 8, ["src", "alt"]),
                          createVNode("h4", null, toDisplayString(item.name), 1),
                          createVNode("p", { class: "product-price" }, "$" + toDisplayString(item.price), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Card, { clickable: "" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: item.image,
                          alt: item.name,
                          class: "product-image"
                        }, null, 8, ["src", "alt"]),
                        createVNode("h4", null, toDisplayString(item.name), 1),
                        createVNode("p", { class: "product-price" }, "$" + toDisplayString(item.price), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Vertical Carousel</h3><p data-v-27e8bac3${_scopeId}>Vertical scrolling with autoplay</p><div class="carousel-wrapper vertical" data-v-27e8bac3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Carousel), {
              modelValue: verticalCarouselIndex.value,
              "onUpdate:modelValue": ($event) => verticalCarouselIndex.value = $event,
              items: testimonials,
              orientation: "vertical",
              autoplay: true,
              "autoplay-interval": 4e3,
              "show-controls": false
            }, {
              slide: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="testimonial" data-v-27e8bac3${_scopeId2}><p class="testimonial-quote" data-v-27e8bac3${_scopeId2}>&quot;${ssrInterpolate(item.quote)}&quot;</p><div class="testimonial-author" data-v-27e8bac3${_scopeId2}><img${ssrRenderAttr("src", item.avatar)}${ssrRenderAttr("alt", item.name)} data-v-27e8bac3${_scopeId2}><div data-v-27e8bac3${_scopeId2}><strong data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.name)}</strong><span data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.role)}</span></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "testimonial" }, [
                      createVNode("p", { class: "testimonial-quote" }, '"' + toDisplayString(item.quote) + '"', 1),
                      createVNode("div", { class: "testimonial-author" }, [
                        createVNode("img", {
                          src: item.avatar,
                          alt: item.name
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", null, [
                          createVNode("strong", null, toDisplayString(item.name), 1),
                          createVNode("span", null, toDisplayString(item.role), 1)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section data-v-27e8bac3${_scopeId}><h2 data-v-27e8bac3${_scopeId}>PageView Component</h2><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Full-screen Page Navigation</h3><p data-v-27e8bac3${_scopeId}>Swipe between full-screen pages</p><button class="demo-button" data-v-27e8bac3${_scopeId}> Open PageView Demo </button></div><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Inline PageView</h3><p data-v-27e8bac3${_scopeId}>Embedded page navigation with effects</p><div class="pageview-wrapper" data-v-27e8bac3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PageView), {
              modelValue: pageViewIndex.value,
              "onUpdate:modelValue": ($event) => pageViewIndex.value = $event,
              pages: contentPages,
              "show-indicators": true,
              "show-arrows": true,
              "parallax-effect": true,
              "fade-effect": true
            }, {
              page: withCtx(({ page, isActive }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{ active: isActive }, "content-page"])}" data-v-27e8bac3${_scopeId2}><div class="page-content" data-v-27e8bac3${_scopeId2}><h3 data-v-27e8bac3${_scopeId2}>${ssrInterpolate(page.title)}</h3><p data-v-27e8bac3${_scopeId2}>${ssrInterpolate(page.content)}</p>`);
                  if (page.action) {
                    _push3(`<button class="page-action" data-v-27e8bac3${_scopeId2}>${ssrInterpolate(page.action)}</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ["content-page", { active: isActive }]
                    }, [
                      createVNode("div", { class: "page-content" }, [
                        createVNode("h3", null, toDisplayString(page.title), 1),
                        createVNode("p", null, toDisplayString(page.content), 1),
                        page.action ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "page-action"
                        }, toDisplayString(page.action), 1)) : createCommentVNode("", true)
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section data-v-27e8bac3${_scopeId}><h2 data-v-27e8bac3${_scopeId}>MasonryGrid Component</h2><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Pinterest-style Layout</h3><p data-v-27e8bac3${_scopeId}>Responsive masonry grid with optimal item placement</p>`);
            _push2(ssrRenderComponent(unref(MasonryGrid), {
              items: unref(masonryItems),
              columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
              gap: 16,
              animate: true
            }, {
              default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="masonry-item" style="${ssrRenderStyle({ height: item.height + "px" })}" data-v-27e8bac3${_scopeId2}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} data-v-27e8bac3${_scopeId2}><div class="masonry-content" data-v-27e8bac3${_scopeId2}><h4 data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.title)}</h4><p data-v-27e8bac3${_scopeId2}>${ssrInterpolate(item.description)}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "masonry-item",
                      style: { height: item.height + "px" }
                    }, [
                      createVNode("img", {
                        src: item.image,
                        alt: item.title
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "masonry-content" }, [
                        createVNode("h4", null, toDisplayString(item.title), 1),
                        createVNode("p", null, toDisplayString(item.description), 1)
                      ])
                    ], 4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="demo-section" data-v-27e8bac3${_scopeId}><h3 data-v-27e8bac3${_scopeId}>Mixed Content Types</h3><p data-v-27e8bac3${_scopeId}>Combining different content types in masonry layout</p>`);
            _push2(ssrRenderComponent(unref(MasonryGrid), {
              items: mixedContent,
              columns: 3,
              gap: 24,
              "fill-last-row": true
            }, {
              default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Card, {
                    variant: item.type === "featured" ? "elevated" : "outlined",
                    clickable: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (item.image) {
                          _push4(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} data-v-27e8bac3${_scopeId3}>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (item.type === "quote") {
                          _push4(`<div class="quote-content" data-v-27e8bac3${_scopeId3}><blockquote data-v-27e8bac3${_scopeId3}>${ssrInterpolate(item.content)}</blockquote><cite data-v-27e8bac3${_scopeId3}>- ${ssrInterpolate(item.author)}</cite></div>`);
                        } else {
                          _push4(`<div class="card-content" data-v-27e8bac3${_scopeId3}><span class="content-type" data-v-27e8bac3${_scopeId3}>${ssrInterpolate(item.type)}</span><h4 data-v-27e8bac3${_scopeId3}>${ssrInterpolate(item.title)}</h4><p data-v-27e8bac3${_scopeId3}>${ssrInterpolate(item.description)}</p></div>`);
                        }
                      } else {
                        return [
                          item.image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: item.image,
                            alt: item.title
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          item.type === "quote" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "quote-content"
                          }, [
                            createVNode("blockquote", null, toDisplayString(item.content), 1),
                            createVNode("cite", null, "- " + toDisplayString(item.author), 1)
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "card-content"
                          }, [
                            createVNode("span", { class: "content-type" }, toDisplayString(item.type), 1),
                            createVNode("h4", null, toDisplayString(item.title), 1),
                            createVNode("p", null, toDisplayString(item.description), 1)
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Card, {
                      variant: item.type === "featured" ? "elevated" : "outlined",
                      clickable: ""
                    }, {
                      default: withCtx(() => [
                        item.image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: item.image,
                          alt: item.title
                        }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                        item.type === "quote" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "quote-content"
                        }, [
                          createVNode("blockquote", null, toDisplayString(item.content), 1),
                          createVNode("cite", null, "- " + toDisplayString(item.author), 1)
                        ])) : (openBlock(), createBlock("div", {
                          key: 2,
                          class: "card-content"
                        }, [
                          createVNode("span", { class: "content-type" }, toDisplayString(item.type), 1),
                          createVNode("h4", null, toDisplayString(item.title), 1),
                          createVNode("p", null, toDisplayString(item.description), 1)
                        ]))
                      ]),
                      _: 2
                    }, 1032, ["variant"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("div", { class: "demo-header" }, [
                createVNode("h1", null, "Carousel & Swipe Components"),
                createVNode("p", null, "Touch-enabled carousels, page views, and masonry layouts")
              ]),
              createVNode("section", null, [
                createVNode("h2", null, "Carousel Component"),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Basic Carousel"),
                  createVNode("p", null, "Single item carousel with indicators and controls"),
                  createVNode("div", { class: "carousel-wrapper" }, [
                    createVNode(unref(Carousel), {
                      modelValue: basicCarouselIndex.value,
                      "onUpdate:modelValue": ($event) => basicCarouselIndex.value = $event,
                      items: carouselImages,
                      "show-indicators": true,
                      "show-controls": true
                    }, {
                      slide: withCtx(({ item }) => [
                        createVNode("div", { class: "carousel-slide" }, [
                          createVNode("img", {
                            src: item.src,
                            alt: item.alt
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", { class: "carousel-caption" }, [
                            createVNode("h4", null, toDisplayString(item.title), 1),
                            createVNode("p", null, toDisplayString(item.description), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Multi-item Carousel"),
                  createVNode("p", null, "Shows multiple items at once with responsive columns"),
                  createVNode("div", { class: "carousel-wrapper" }, [
                    createVNode(unref(Carousel), {
                      modelValue: multiCarouselIndex.value,
                      "onUpdate:modelValue": ($event) => multiCarouselIndex.value = $event,
                      items: products,
                      "items-to-show": 3,
                      "items-to-scroll": 1,
                      gap: 24,
                      loop: true
                    }, {
                      slide: withCtx(({ item }) => [
                        createVNode(Card, { clickable: "" }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: item.image,
                              alt: item.name,
                              class: "product-image"
                            }, null, 8, ["src", "alt"]),
                            createVNode("h4", null, toDisplayString(item.name), 1),
                            createVNode("p", { class: "product-price" }, "$" + toDisplayString(item.price), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Vertical Carousel"),
                  createVNode("p", null, "Vertical scrolling with autoplay"),
                  createVNode("div", { class: "carousel-wrapper vertical" }, [
                    createVNode(unref(Carousel), {
                      modelValue: verticalCarouselIndex.value,
                      "onUpdate:modelValue": ($event) => verticalCarouselIndex.value = $event,
                      items: testimonials,
                      orientation: "vertical",
                      autoplay: true,
                      "autoplay-interval": 4e3,
                      "show-controls": false
                    }, {
                      slide: withCtx(({ item }) => [
                        createVNode("div", { class: "testimonial" }, [
                          createVNode("p", { class: "testimonial-quote" }, '"' + toDisplayString(item.quote) + '"', 1),
                          createVNode("div", { class: "testimonial-author" }, [
                            createVNode("img", {
                              src: item.avatar,
                              alt: item.name
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", null, [
                              createVNode("strong", null, toDisplayString(item.name), 1),
                              createVNode("span", null, toDisplayString(item.role), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ]),
              createVNode("section", null, [
                createVNode("h2", null, "PageView Component"),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Full-screen Page Navigation"),
                  createVNode("p", null, "Swipe between full-screen pages"),
                  createVNode("button", {
                    onClick: ($event) => showPageView.value = true,
                    class: "demo-button"
                  }, " Open PageView Demo ", 8, ["onClick"])
                ]),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Inline PageView"),
                  createVNode("p", null, "Embedded page navigation with effects"),
                  createVNode("div", { class: "pageview-wrapper" }, [
                    createVNode(unref(PageView), {
                      modelValue: pageViewIndex.value,
                      "onUpdate:modelValue": ($event) => pageViewIndex.value = $event,
                      pages: contentPages,
                      "show-indicators": true,
                      "show-arrows": true,
                      "parallax-effect": true,
                      "fade-effect": true
                    }, {
                      page: withCtx(({ page, isActive }) => [
                        createVNode("div", {
                          class: ["content-page", { active: isActive }]
                        }, [
                          createVNode("div", { class: "page-content" }, [
                            createVNode("h3", null, toDisplayString(page.title), 1),
                            createVNode("p", null, toDisplayString(page.content), 1),
                            page.action ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "page-action"
                            }, toDisplayString(page.action), 1)) : createCommentVNode("", true)
                          ])
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ]),
              createVNode("section", null, [
                createVNode("h2", null, "MasonryGrid Component"),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Pinterest-style Layout"),
                  createVNode("p", null, "Responsive masonry grid with optimal item placement"),
                  createVNode(unref(MasonryGrid), {
                    items: unref(masonryItems),
                    columns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
                    gap: 16,
                    animate: true
                  }, {
                    default: withCtx(({ item }) => [
                      createVNode("div", {
                        class: "masonry-item",
                        style: { height: item.height + "px" }
                      }, [
                        createVNode("img", {
                          src: item.image,
                          alt: item.title
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "masonry-content" }, [
                          createVNode("h4", null, toDisplayString(item.title), 1),
                          createVNode("p", null, toDisplayString(item.description), 1)
                        ])
                      ], 4)
                    ]),
                    _: 1
                  }, 8, ["items"])
                ]),
                createVNode("div", { class: "demo-section" }, [
                  createVNode("h3", null, "Mixed Content Types"),
                  createVNode("p", null, "Combining different content types in masonry layout"),
                  createVNode(unref(MasonryGrid), {
                    items: mixedContent,
                    columns: 3,
                    gap: 24,
                    "fill-last-row": true
                  }, {
                    default: withCtx(({ item }) => [
                      createVNode(Card, {
                        variant: item.type === "featured" ? "elevated" : "outlined",
                        clickable: ""
                      }, {
                        default: withCtx(() => [
                          item.image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: item.image,
                            alt: item.title
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          item.type === "quote" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "quote-content"
                          }, [
                            createVNode("blockquote", null, toDisplayString(item.content), 1),
                            createVNode("cite", null, "- " + toDisplayString(item.author), 1)
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "card-content"
                          }, [
                            createVNode("span", { class: "content-type" }, toDisplayString(item.type), 1),
                            createVNode("h4", null, toDisplayString(item.title), 1),
                            createVNode("p", null, toDisplayString(item.description), 1)
                          ]))
                        ]),
                        _: 2
                      }, 1032, ["variant"])
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
      ssrRenderTeleport(_push, (_push2) => {
        if (showPageView.value) {
          _push2(`<div class="fullscreen-pageview" data-v-27e8bac3><button class="close-button" data-v-27e8bac3> \u2715 </button>`);
          _push2(ssrRenderComponent(unref(PageView), {
            modelValue: fullscreenPageIndex.value,
            "onUpdate:modelValue": ($event) => fullscreenPageIndex.value = $event,
            pages: onboardingPages,
            "show-indicators": true,
            keyboard: true,
            "mouse-wheel": true,
            "scale-effect": true
          }, {
            page: withCtx(({ page, index }, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="onboarding-page" data-v-27e8bac3${_scopeId}><div class="onboarding-content" data-v-27e8bac3${_scopeId}><div class="onboarding-icon" data-v-27e8bac3${_scopeId}>${ssrInterpolate(page.icon)}</div><h2 data-v-27e8bac3${_scopeId}>${ssrInterpolate(page.title)}</h2><p data-v-27e8bac3${_scopeId}>${ssrInterpolate(page.description)}</p>`);
                if (index === onboardingPages.length - 1) {
                  _push3(`<button class="onboarding-button" data-v-27e8bac3${_scopeId}> Get Started </button>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "onboarding-page" }, [
                    createVNode("div", { class: "onboarding-content" }, [
                      createVNode("div", { class: "onboarding-icon" }, toDisplayString(page.icon), 1),
                      createVNode("h2", null, toDisplayString(page.title), 1),
                      createVNode("p", null, toDisplayString(page.description), 1),
                      index === onboardingPages.length - 1 ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => showPageView.value = false,
                        class: "onboarding-button"
                      }, " Get Started ", 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/carousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const carousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27e8bac3"]]);

export { carousel as default };
//# sourceMappingURL=carousel-BH5MevJO.mjs.map
