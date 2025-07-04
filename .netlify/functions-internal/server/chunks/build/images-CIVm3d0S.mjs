import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "images",
  __ssrInlineRender: true,
  setup(__props) {
    const placeholderColors = [
      "#FEE2E2",
      "#DBEAFE",
      "#D1FAE5",
      "#FEF3C7",
      "#E9D5FF",
      "#FECACA"
    ];
    const galleryImages = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      src: `https://picsum.photos/800/600?random=${i + 100}`,
      alt: `Gallery image ${i + 1}`,
      title: `Image ${i + 1}`,
      description: "Beautiful landscape photography",
      width: 800,
      height: 600
    }));
    const masonryImages = [
      {
        id: 1,
        src: "https://picsum.photos/400/600?random=201",
        alt: "Tall image",
        title: "Portrait",
        width: 400,
        height: 600
      },
      {
        id: 2,
        src: "https://picsum.photos/400/300?random=202",
        alt: "Wide image",
        title: "Landscape",
        width: 400,
        height: 300
      },
      {
        id: 3,
        src: "https://picsum.photos/400/400?random=203",
        alt: "Square image",
        title: "Square",
        width: 400,
        height: 400
      },
      {
        id: 4,
        src: "https://picsum.photos/400/500?random=204",
        alt: "Medium tall",
        width: 400,
        height: 500
      },
      {
        id: 5,
        src: "https://picsum.photos/400/350?random=205",
        alt: "Medium wide",
        width: 400,
        height: 350
      },
      {
        id: 6,
        src: "https://picsum.photos/400/700?random=206",
        alt: "Extra tall",
        width: 400,
        height: 700
      }
    ];
    const featuredImages = [
      {
        id: 1,
        src: "https://picsum.photos/800/600?random=301",
        alt: "Featured image",
        title: "Featured Content",
        featured: true,
        width: 800,
        height: 600
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        id: i + 2,
        src: `https://picsum.photos/400/400?random=${i + 302}`,
        alt: `Grid image ${i + 1}`,
        width: 400,
        height: 400
      }))
    ];
    const slowLoadingImage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Container = resolveComponent("Container");
      const _component_Stack = resolveComponent("Stack");
      const _component_Grid = resolveComponent("Grid");
      const _component_ResponsiveImage = resolveComponent("ResponsiveImage");
      const _component_Tabs = resolveComponent("Tabs");
      const _component_Tab = resolveComponent("Tab");
      const _component_ImageGallery = resolveComponent("ImageGallery");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "images-demo" }, _attrs))} data-v-2baa756a><header class="demo-header" data-v-2baa756a>`);
      _push(ssrRenderComponent(_component_Container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="demo-title" data-v-2baa756a${_scopeId}>Image Optimization</h1><p class="demo-description" data-v-2baa756a${_scopeId}> Responsive images with lazy loading, progressive enhancement, and optimal formats. </p>`);
          } else {
            return [
              createVNode("h1", { class: "demo-title" }, "Image Optimization"),
              createVNode("p", { class: "demo-description" }, " Responsive images with lazy loading, progressive enhancement, and optimal formats. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
      _push(ssrRenderComponent(_component_Container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Stack, { gap: 32 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Responsive Images</h2><p class="section-description" data-v-2baa756a${_scopeId2}> Automatically serve the right image size for each device and screen resolution. </p>`);
                  _push3(ssrRenderComponent(_component_Grid, {
                    cols: { mobile: 1, tablet: 2, desktop: 3 },
                    gap: 24
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>Cover Fit</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: "https://picsum.photos/800/600?random=1",
                          alt: "Cover fit example",
                          width: 800,
                          height: 600,
                          fit: "cover",
                          "responsive-sizes": {
                            mobile: "100vw",
                            tablet: "50vw",
                            desktop: "33vw",
                            default: "300px"
                          }
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>Contain Fit</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: "https://picsum.photos/600/800?random=2",
                          alt: "Contain fit example",
                          width: 600,
                          height: 800,
                          fit: "contain",
                          placeholder: "blur",
                          style: { "background": "#f3f4f6", "height": "300px" }
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>With Caption</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: "https://picsum.photos/800/600?random=3",
                          alt: "Image with caption",
                          width: 800,
                          height: 600,
                          caption: "This image includes a descriptive caption",
                          fit: "cover"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Cover Fit"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/800/600?random=1",
                              alt: "Cover fit example",
                              width: 800,
                              height: 600,
                              fit: "cover",
                              "responsive-sizes": {
                                mobile: "100vw",
                                tablet: "50vw",
                                desktop: "33vw",
                                default: "300px"
                              }
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Contain Fit"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/600/800?random=2",
                              alt: "Contain fit example",
                              width: 600,
                              height: 800,
                              fit: "contain",
                              placeholder: "blur",
                              style: { "background": "#f3f4f6", "height": "300px" }
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "With Caption"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/800/600?random=3",
                              alt: "Image with caption",
                              width: 800,
                              height: 600,
                              caption: "This image includes a descriptive caption",
                              fit: "cover"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</section><section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Progressive Loading</h2><p class="section-description" data-v-2baa756a${_scopeId2}> Images load with blur placeholders and fade in smoothly when ready. </p><div class="progressive-grid" data-v-2baa756a${_scopeId2}><!--[-->`);
                  ssrRenderList(6, (i) => {
                    _push3(`<div class="demo-card" data-v-2baa756a${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_ResponsiveImage, {
                      src: `https://picsum.photos/400/300?random=${i + 10}`,
                      alt: `Progressive loading example ${i}`,
                      width: 400,
                      height: 300,
                      placeholder: "blur",
                      "placeholder-color": placeholderColors[i % placeholderColors.length],
                      loading: i <= 2 ? "eager" : "lazy",
                      priority: i === 1,
                      "fade-in": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="image-label" data-v-2baa756a${_scopeId2}>${ssrInterpolate(i <= 2 ? "Eager loaded" : "Lazy loaded")}</p></div>`);
                  });
                  _push3(`<!--]--></div></section><section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Image Gallery</h2><p class="section-description" data-v-2baa756a${_scopeId2}> Grid and masonry layouts with lightbox support. </p>`);
                  _push3(ssrRenderComponent(_component_Tabs, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tab, { label: "Grid Layout" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ImageGallery, {
                                images: unref(galleryImages),
                                layout: "grid",
                                columns: { mobile: 1, tablet: 2, desktop: 3 },
                                gap: 16,
                                "aspect-ratio": "16:9",
                                "enable-lightbox": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ImageGallery, {
                                  images: unref(galleryImages),
                                  layout: "grid",
                                  columns: { mobile: 1, tablet: 2, desktop: 3 },
                                  gap: 16,
                                  "aspect-ratio": "16:9",
                                  "enable-lightbox": ""
                                }, null, 8, ["images"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Tab, { label: "Masonry Layout" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ImageGallery, {
                                images: masonryImages,
                                layout: "masonry",
                                columns: 3,
                                gap: 16,
                                "enable-lightbox": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ImageGallery, {
                                  images: masonryImages,
                                  layout: "masonry",
                                  columns: 3,
                                  gap: 16,
                                  "enable-lightbox": ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Tab, { label: "Featured Grid" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ImageGallery, {
                                images: featuredImages,
                                layout: "grid",
                                columns: 4,
                                gap: 8,
                                "enable-lightbox": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ImageGallery, {
                                  images: featuredImages,
                                  layout: "grid",
                                  columns: 4,
                                  gap: 8,
                                  "enable-lightbox": ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tab, { label: "Grid Layout" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: unref(galleryImages),
                                layout: "grid",
                                columns: { mobile: 1, tablet: 2, desktop: 3 },
                                gap: 16,
                                "aspect-ratio": "16:9",
                                "enable-lightbox": ""
                              }, null, 8, ["images"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Tab, { label: "Masonry Layout" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: masonryImages,
                                layout: "masonry",
                                columns: 3,
                                gap: 16,
                                "enable-lightbox": ""
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Tab, { label: "Featured Grid" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: featuredImages,
                                layout: "grid",
                                columns: 4,
                                gap: 8,
                                "enable-lightbox": ""
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</section><section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Error Handling</h2><p class="section-description" data-v-2baa756a${_scopeId2}> Graceful error states when images fail to load. </p>`);
                  _push3(ssrRenderComponent(_component_Grid, {
                    cols: { mobile: 1, tablet: 3 },
                    gap: 24
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>Failed Image</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: "https://invalid-url.com/image.jpg",
                          alt: "Failed image example",
                          width: 400,
                          height: 300,
                          "error-text": "Failed to load image"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>With Spinner</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: slowLoadingImage.value,
                          alt: "Loading with spinner",
                          width: 400,
                          height: 300,
                          "show-spinner": "",
                          placeholder: "empty"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="demo-card" data-v-2baa756a${_scopeId3}><h3 data-v-2baa756a${_scopeId3}>No Placeholder</h3>`);
                        _push4(ssrRenderComponent(_component_ResponsiveImage, {
                          src: "https://picsum.photos/400/300?random=50",
                          alt: "No placeholder example",
                          width: 400,
                          height: 300,
                          placeholder: "none"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Failed Image"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://invalid-url.com/image.jpg",
                              alt: "Failed image example",
                              width: 400,
                              height: 300,
                              "error-text": "Failed to load image"
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "With Spinner"),
                            createVNode(_component_ResponsiveImage, {
                              src: slowLoadingImage.value,
                              alt: "Loading with spinner",
                              width: 400,
                              height: 300,
                              "show-spinner": "",
                              placeholder: "empty"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "No Placeholder"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/400/300?random=50",
                              alt: "No placeholder example",
                              width: 400,
                              height: 300,
                              placeholder: "none"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</section><section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Performance Impact</h2><p class="section-description" data-v-2baa756a${_scopeId2}> See how image optimization improves loading performance. </p><div class="metrics-comparison" data-v-2baa756a${_scopeId2}><div class="metric-card" data-v-2baa756a${_scopeId2}><h3 data-v-2baa756a${_scopeId2}>Without Optimization</h3><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Average Size</span><span class="metric-value" data-v-2baa756a${_scopeId2}>2.5 MB</span></div><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Load Time</span><span class="metric-value" data-v-2baa756a${_scopeId2}>3.2s</span></div><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Format</span><span class="metric-value" data-v-2baa756a${_scopeId2}>JPEG only</span></div></div><div class="metric-card optimized" data-v-2baa756a${_scopeId2}><h3 data-v-2baa756a${_scopeId2}>With Optimization</h3><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Average Size</span><span class="metric-value" data-v-2baa756a${_scopeId2}>180 KB</span><span class="metric-improvement" data-v-2baa756a${_scopeId2}>-93%</span></div><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Load Time</span><span class="metric-value" data-v-2baa756a${_scopeId2}>0.8s</span><span class="metric-improvement" data-v-2baa756a${_scopeId2}>-75%</span></div><div class="metric-item" data-v-2baa756a${_scopeId2}><span class="metric-label" data-v-2baa756a${_scopeId2}>Format</span><span class="metric-value" data-v-2baa756a${_scopeId2}>WebP/AVIF</span><span class="metric-improvement" data-v-2baa756a${_scopeId2}>\u2713</span></div></div></div></section><section class="demo-section" data-v-2baa756a${_scopeId2}><h2 class="section-title" data-v-2baa756a${_scopeId2}>Usage Examples</h2><p class="section-description" data-v-2baa756a${_scopeId2}> Code examples for common image optimization patterns. </p><div class="code-examples" data-v-2baa756a${_scopeId2}><div class="example-card" data-v-2baa756a${_scopeId2}><h3 data-v-2baa756a${_scopeId2}>Basic Responsive Image</h3><pre data-v-2baa756a${_scopeId2}><code data-v-2baa756a${_scopeId2}>&lt;ResponsiveImage
  src=&quot;/images/hero.jpg&quot;
  alt=&quot;Hero image&quot;
  :width=&quot;1920&quot;
  :height=&quot;1080&quot;
  :responsive-sizes=&quot;{
    mobile: &#39;100vw&#39;,
    tablet: &#39;80vw&#39;,
    desktop: &#39;60vw&#39;,
    default: &#39;1200px&#39;
  }&quot;
/&gt;</code></pre></div><div class="example-card" data-v-2baa756a${_scopeId2}><h3 data-v-2baa756a${_scopeId2}>Gallery with Lightbox</h3><pre data-v-2baa756a${_scopeId2}><code data-v-2baa756a${_scopeId2}>&lt;ImageGallery
  :images=&quot;galleryImages&quot;
  layout=&quot;masonry&quot;
  :columns=&quot;3&quot;
  enable-lightbox
  placeholder=&quot;blur&quot;
/&gt;</code></pre></div><div class="example-card" data-v-2baa756a${_scopeId2}><h3 data-v-2baa756a${_scopeId2}>Priority Loading</h3><pre data-v-2baa756a${_scopeId2}><code data-v-2baa756a${_scopeId2}>&lt;ResponsiveImage
  src=&quot;/images/lcp-image.jpg&quot;
  alt=&quot;Largest Contentful Paint&quot;
  :priority=&quot;true&quot;
  loading=&quot;eager&quot;
  :srcset-widths=&quot;[640, 1024, 1920]&quot;
/&gt;</code></pre></div></div></section>`);
                } else {
                  return [
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Responsive Images"),
                      createVNode("p", { class: "section-description" }, " Automatically serve the right image size for each device and screen resolution. "),
                      createVNode(_component_Grid, {
                        cols: { mobile: 1, tablet: 2, desktop: 3 },
                        gap: 24
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Cover Fit"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/800/600?random=1",
                              alt: "Cover fit example",
                              width: 800,
                              height: 600,
                              fit: "cover",
                              "responsive-sizes": {
                                mobile: "100vw",
                                tablet: "50vw",
                                desktop: "33vw",
                                default: "300px"
                              }
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Contain Fit"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/600/800?random=2",
                              alt: "Contain fit example",
                              width: 600,
                              height: 800,
                              fit: "contain",
                              placeholder: "blur",
                              style: { "background": "#f3f4f6", "height": "300px" }
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "With Caption"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/800/600?random=3",
                              alt: "Image with caption",
                              width: 800,
                              height: 600,
                              caption: "This image includes a descriptive caption",
                              fit: "cover"
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Progressive Loading"),
                      createVNode("p", { class: "section-description" }, " Images load with blur placeholders and fade in smoothly when ready. "),
                      createVNode("div", { class: "progressive-grid" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                          return createVNode("div", {
                            key: i,
                            class: "demo-card"
                          }, [
                            createVNode(_component_ResponsiveImage, {
                              src: `https://picsum.photos/400/300?random=${i + 10}`,
                              alt: `Progressive loading example ${i}`,
                              width: 400,
                              height: 300,
                              placeholder: "blur",
                              "placeholder-color": placeholderColors[i % placeholderColors.length],
                              loading: i <= 2 ? "eager" : "lazy",
                              priority: i === 1,
                              "fade-in": ""
                            }, null, 8, ["src", "alt", "placeholder-color", "loading", "priority"]),
                            createVNode("p", { class: "image-label" }, toDisplayString(i <= 2 ? "Eager loaded" : "Lazy loaded"), 1)
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Image Gallery"),
                      createVNode("p", { class: "section-description" }, " Grid and masonry layouts with lightbox support. "),
                      createVNode(_component_Tabs, null, {
                        default: withCtx(() => [
                          createVNode(_component_Tab, { label: "Grid Layout" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: unref(galleryImages),
                                layout: "grid",
                                columns: { mobile: 1, tablet: 2, desktop: 3 },
                                gap: 16,
                                "aspect-ratio": "16:9",
                                "enable-lightbox": ""
                              }, null, 8, ["images"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Tab, { label: "Masonry Layout" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: masonryImages,
                                layout: "masonry",
                                columns: 3,
                                gap: 16,
                                "enable-lightbox": ""
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Tab, { label: "Featured Grid" }, {
                            default: withCtx(() => [
                              createVNode(_component_ImageGallery, {
                                images: featuredImages,
                                layout: "grid",
                                columns: 4,
                                gap: 8,
                                "enable-lightbox": ""
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Error Handling"),
                      createVNode("p", { class: "section-description" }, " Graceful error states when images fail to load. "),
                      createVNode(_component_Grid, {
                        cols: { mobile: 1, tablet: 3 },
                        gap: 24
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "Failed Image"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://invalid-url.com/image.jpg",
                              alt: "Failed image example",
                              width: 400,
                              height: 300,
                              "error-text": "Failed to load image"
                            })
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "With Spinner"),
                            createVNode(_component_ResponsiveImage, {
                              src: slowLoadingImage.value,
                              alt: "Loading with spinner",
                              width: 400,
                              height: 300,
                              "show-spinner": "",
                              placeholder: "empty"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "demo-card" }, [
                            createVNode("h3", null, "No Placeholder"),
                            createVNode(_component_ResponsiveImage, {
                              src: "https://picsum.photos/400/300?random=50",
                              alt: "No placeholder example",
                              width: 400,
                              height: 300,
                              placeholder: "none"
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Performance Impact"),
                      createVNode("p", { class: "section-description" }, " See how image optimization improves loading performance. "),
                      createVNode("div", { class: "metrics-comparison" }, [
                        createVNode("div", { class: "metric-card" }, [
                          createVNode("h3", null, "Without Optimization"),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Average Size"),
                            createVNode("span", { class: "metric-value" }, "2.5 MB")
                          ]),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Load Time"),
                            createVNode("span", { class: "metric-value" }, "3.2s")
                          ]),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Format"),
                            createVNode("span", { class: "metric-value" }, "JPEG only")
                          ])
                        ]),
                        createVNode("div", { class: "metric-card optimized" }, [
                          createVNode("h3", null, "With Optimization"),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Average Size"),
                            createVNode("span", { class: "metric-value" }, "180 KB"),
                            createVNode("span", { class: "metric-improvement" }, "-93%")
                          ]),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Load Time"),
                            createVNode("span", { class: "metric-value" }, "0.8s"),
                            createVNode("span", { class: "metric-improvement" }, "-75%")
                          ]),
                          createVNode("div", { class: "metric-item" }, [
                            createVNode("span", { class: "metric-label" }, "Format"),
                            createVNode("span", { class: "metric-value" }, "WebP/AVIF"),
                            createVNode("span", { class: "metric-improvement" }, "\u2713")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("section", { class: "demo-section" }, [
                      createVNode("h2", { class: "section-title" }, "Usage Examples"),
                      createVNode("p", { class: "section-description" }, " Code examples for common image optimization patterns. "),
                      createVNode("div", { class: "code-examples" }, [
                        createVNode("div", { class: "example-card" }, [
                          createVNode("h3", null, "Basic Responsive Image"),
                          createVNode("pre", null, [
                            createVNode("code", null, `<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  :width="1920"
  :height="1080"
  :responsive-sizes="{
    mobile: '100vw',
    tablet: '80vw',
    desktop: '60vw',
    default: '1200px'
  }"
/>`)
                          ])
                        ]),
                        createVNode("div", { class: "example-card" }, [
                          createVNode("h3", null, "Gallery with Lightbox"),
                          createVNode("pre", null, [
                            createVNode("code", null, '<ImageGallery\n  :images="galleryImages"\n  layout="masonry"\n  :columns="3"\n  enable-lightbox\n  placeholder="blur"\n/>')
                          ])
                        ]),
                        createVNode("div", { class: "example-card" }, [
                          createVNode("h3", null, "Priority Loading"),
                          createVNode("pre", null, [
                            createVNode("code", null, '<ResponsiveImage\n  src="/images/lcp-image.jpg"\n  alt="Largest Contentful Paint"\n  :priority="true"\n  loading="eager"\n  :srcset-widths="[640, 1024, 1920]"\n/>')
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Stack, { gap: 32 }, {
                default: withCtx(() => [
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Responsive Images"),
                    createVNode("p", { class: "section-description" }, " Automatically serve the right image size for each device and screen resolution. "),
                    createVNode(_component_Grid, {
                      cols: { mobile: 1, tablet: 2, desktop: 3 },
                      gap: 24
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "Cover Fit"),
                          createVNode(_component_ResponsiveImage, {
                            src: "https://picsum.photos/800/600?random=1",
                            alt: "Cover fit example",
                            width: 800,
                            height: 600,
                            fit: "cover",
                            "responsive-sizes": {
                              mobile: "100vw",
                              tablet: "50vw",
                              desktop: "33vw",
                              default: "300px"
                            }
                          })
                        ]),
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "Contain Fit"),
                          createVNode(_component_ResponsiveImage, {
                            src: "https://picsum.photos/600/800?random=2",
                            alt: "Contain fit example",
                            width: 600,
                            height: 800,
                            fit: "contain",
                            placeholder: "blur",
                            style: { "background": "#f3f4f6", "height": "300px" }
                          })
                        ]),
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "With Caption"),
                          createVNode(_component_ResponsiveImage, {
                            src: "https://picsum.photos/800/600?random=3",
                            alt: "Image with caption",
                            width: 800,
                            height: 600,
                            caption: "This image includes a descriptive caption",
                            fit: "cover"
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Progressive Loading"),
                    createVNode("p", { class: "section-description" }, " Images load with blur placeholders and fade in smoothly when ready. "),
                    createVNode("div", { class: "progressive-grid" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "demo-card"
                        }, [
                          createVNode(_component_ResponsiveImage, {
                            src: `https://picsum.photos/400/300?random=${i + 10}`,
                            alt: `Progressive loading example ${i}`,
                            width: 400,
                            height: 300,
                            placeholder: "blur",
                            "placeholder-color": placeholderColors[i % placeholderColors.length],
                            loading: i <= 2 ? "eager" : "lazy",
                            priority: i === 1,
                            "fade-in": ""
                          }, null, 8, ["src", "alt", "placeholder-color", "loading", "priority"]),
                          createVNode("p", { class: "image-label" }, toDisplayString(i <= 2 ? "Eager loaded" : "Lazy loaded"), 1)
                        ]);
                      }), 64))
                    ])
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Image Gallery"),
                    createVNode("p", { class: "section-description" }, " Grid and masonry layouts with lightbox support. "),
                    createVNode(_component_Tabs, null, {
                      default: withCtx(() => [
                        createVNode(_component_Tab, { label: "Grid Layout" }, {
                          default: withCtx(() => [
                            createVNode(_component_ImageGallery, {
                              images: unref(galleryImages),
                              layout: "grid",
                              columns: { mobile: 1, tablet: 2, desktop: 3 },
                              gap: 16,
                              "aspect-ratio": "16:9",
                              "enable-lightbox": ""
                            }, null, 8, ["images"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Tab, { label: "Masonry Layout" }, {
                          default: withCtx(() => [
                            createVNode(_component_ImageGallery, {
                              images: masonryImages,
                              layout: "masonry",
                              columns: 3,
                              gap: 16,
                              "enable-lightbox": ""
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Tab, { label: "Featured Grid" }, {
                          default: withCtx(() => [
                            createVNode(_component_ImageGallery, {
                              images: featuredImages,
                              layout: "grid",
                              columns: 4,
                              gap: 8,
                              "enable-lightbox": ""
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Error Handling"),
                    createVNode("p", { class: "section-description" }, " Graceful error states when images fail to load. "),
                    createVNode(_component_Grid, {
                      cols: { mobile: 1, tablet: 3 },
                      gap: 24
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "Failed Image"),
                          createVNode(_component_ResponsiveImage, {
                            src: "https://invalid-url.com/image.jpg",
                            alt: "Failed image example",
                            width: 400,
                            height: 300,
                            "error-text": "Failed to load image"
                          })
                        ]),
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "With Spinner"),
                          createVNode(_component_ResponsiveImage, {
                            src: slowLoadingImage.value,
                            alt: "Loading with spinner",
                            width: 400,
                            height: 300,
                            "show-spinner": "",
                            placeholder: "empty"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "demo-card" }, [
                          createVNode("h3", null, "No Placeholder"),
                          createVNode(_component_ResponsiveImage, {
                            src: "https://picsum.photos/400/300?random=50",
                            alt: "No placeholder example",
                            width: 400,
                            height: 300,
                            placeholder: "none"
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Performance Impact"),
                    createVNode("p", { class: "section-description" }, " See how image optimization improves loading performance. "),
                    createVNode("div", { class: "metrics-comparison" }, [
                      createVNode("div", { class: "metric-card" }, [
                        createVNode("h3", null, "Without Optimization"),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Average Size"),
                          createVNode("span", { class: "metric-value" }, "2.5 MB")
                        ]),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Load Time"),
                          createVNode("span", { class: "metric-value" }, "3.2s")
                        ]),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Format"),
                          createVNode("span", { class: "metric-value" }, "JPEG only")
                        ])
                      ]),
                      createVNode("div", { class: "metric-card optimized" }, [
                        createVNode("h3", null, "With Optimization"),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Average Size"),
                          createVNode("span", { class: "metric-value" }, "180 KB"),
                          createVNode("span", { class: "metric-improvement" }, "-93%")
                        ]),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Load Time"),
                          createVNode("span", { class: "metric-value" }, "0.8s"),
                          createVNode("span", { class: "metric-improvement" }, "-75%")
                        ]),
                        createVNode("div", { class: "metric-item" }, [
                          createVNode("span", { class: "metric-label" }, "Format"),
                          createVNode("span", { class: "metric-value" }, "WebP/AVIF"),
                          createVNode("span", { class: "metric-improvement" }, "\u2713")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("section", { class: "demo-section" }, [
                    createVNode("h2", { class: "section-title" }, "Usage Examples"),
                    createVNode("p", { class: "section-description" }, " Code examples for common image optimization patterns. "),
                    createVNode("div", { class: "code-examples" }, [
                      createVNode("div", { class: "example-card" }, [
                        createVNode("h3", null, "Basic Responsive Image"),
                        createVNode("pre", null, [
                          createVNode("code", null, `<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  :width="1920"
  :height="1080"
  :responsive-sizes="{
    mobile: '100vw',
    tablet: '80vw',
    desktop: '60vw',
    default: '1200px'
  }"
/>`)
                        ])
                      ]),
                      createVNode("div", { class: "example-card" }, [
                        createVNode("h3", null, "Gallery with Lightbox"),
                        createVNode("pre", null, [
                          createVNode("code", null, '<ImageGallery\n  :images="galleryImages"\n  layout="masonry"\n  :columns="3"\n  enable-lightbox\n  placeholder="blur"\n/>')
                        ])
                      ]),
                      createVNode("div", { class: "example-card" }, [
                        createVNode("h3", null, "Priority Loading"),
                        createVNode("pre", null, [
                          createVNode("code", null, '<ResponsiveImage\n  src="/images/lcp-image.jpg"\n  alt="Largest Contentful Paint"\n  :priority="true"\n  loading="eager"\n  :srcset-widths="[640, 1024, 1920]"\n/>')
                        ])
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const images = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2baa756a"]]);

export { images as default };
//# sourceMappingURL=images-CIVm3d0S.mjs.map
