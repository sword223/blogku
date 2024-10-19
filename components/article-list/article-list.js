"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../animate.js");
const stores_config = require("../../stores/config.js");
if (!Math) {
  TnLazyLoad();
}
const TnLazyLoad = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "article-list",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "list"
    }
  },
  setup(__props) {
    const configStore = stores_config.useConfigStore();
    const props = __props;
    const getArticleDetail = (metadataName, title) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail_pages/article?metadataName=${metadataName}&title=${title}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.type === "list"
      }, props.type === "list" ? {
        b: common_vendor.f(props.data, (post, k0, i0) => {
          var _a, _b, _c, _d;
          return common_vendor.e({
            a: common_vendor.t(post.spec.title),
            b: common_vendor.t(post.status.excerpt),
            c: post.categories[0]
          }, post.categories[0] ? {
            d: common_vendor.t((_a = post.categories[0]) == null ? void 0 : _a.spec.displayName)
          } : {}, {
            e: common_vendor.t(post.stats.visit),
            f: common_vendor.t(post.stats.upvote),
            g: post.spec.cover || ((_b = common_vendor.unref(configStore).basic) == null ? void 0 : _b.randomPhotoApi)
          }, post.spec.cover || ((_c = common_vendor.unref(configStore).basic) == null ? void 0 : _c.randomPhotoApi) ? {
            h: "2c983568-0-" + i0,
            i: common_vendor.p({
              src: post.spec.cover || ((_d = common_vendor.unref(configStore).basic) == null ? void 0 : _d.randomPhotoApi) + "&random=" + Math.random(),
              width: "100%",
              mode: "aspectFill"
            })
          } : {}, {
            j: common_vendor.o(($event) => getArticleDetail(post.metadata.name, post.spec.title), post.metadata.name),
            k: post.metadata.name
          });
        })
      } : {}, {
        c: props.type === "double"
      }, props.type === "double" ? {
        d: common_vendor.f(props.data, (post, k0, i0) => {
          var _a, _b, _c, _d, _e;
          return common_vendor.e({
            a: post.spec.cover || ((_a = common_vendor.unref(configStore).basic) == null ? void 0 : _a.randomPhotoApi)
          }, post.spec.cover || ((_b = common_vendor.unref(configStore).basic) == null ? void 0 : _b.randomPhotoApi) ? {
            b: "2c983568-1-" + i0,
            c: common_vendor.p({
              src: post.spec.cover || ((_c = common_vendor.unref(configStore).basic) == null ? void 0 : _c.randomPhotoApi) + "&random=" + Math.random(),
              width: "100%",
              mode: "aspectFill"
            })
          } : {}, {
            d: common_vendor.t(post.spec.title),
            e: (_d = post.contributors[0]) == null ? void 0 : _d.avatar,
            f: common_vendor.t((_e = post.contributors[0]) == null ? void 0 : _e.displayName),
            g: common_vendor.t(post.stats.upvote),
            h: post.metadata.name,
            i: common_vendor.o(($event) => getArticleDetail(post.metadata.name, post.spec.title), post.metadata.name)
          });
        })
      } : {}, {
        e: props.type === "card"
      }, props.type === "card" ? {
        f: common_vendor.f(props.data, (post, k0, i0) => {
          var _a, _b, _c, _d, _e;
          return common_vendor.e({
            a: post.spec.cover || ((_a = common_vendor.unref(configStore).basic) == null ? void 0 : _a.randomPhotoApi)
          }, post.spec.cover || ((_b = common_vendor.unref(configStore).basic) == null ? void 0 : _b.randomPhotoApi) ? {
            b: "2c983568-2-" + i0,
            c: common_vendor.p({
              src: post.spec.cover || ((_c = common_vendor.unref(configStore).basic) == null ? void 0 : _c.randomPhotoApi) + "&random=" + Math.random(),
              width: "100%",
              mode: "aspectFill"
            })
          } : {}, {
            d: common_vendor.t((_d = post.categories[0]) == null ? void 0 : _d.spec.displayName),
            e: common_vendor.f(post.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag.spec.displayName),
                b: tag.metadata.name
              };
            }),
            f: common_vendor.t(post.spec.title),
            g: common_vendor.t(post.status.excerpt),
            h: (_e = post.contributors[0]) == null ? void 0 : _e.avatar,
            i: common_vendor.t(new Date(post.spec.publishTime).getFullYear() + "-" + (new Date(post.spec.publishTime).getMonth() + 1) + "-" + new Date(post.spec.publishTime).getDate()),
            j: post.metadata.name,
            k: common_vendor.o(($event) => getArticleDetail(post.metadata.name, post.spec.title), post.metadata.name)
          });
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/components/article-list/article-list.vue"]]);
wx.createComponent(Component);
