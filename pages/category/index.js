"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../animate.js");
const stores_category = require("../../stores/category.js");
const config_base = require("../../config/base.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
const stores_config = require("../../stores/config.js");
if (!Math) {
  (TnNavbar + articleList + TnEmpty + TnLoadmore)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const TnEmpty = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const articleList = () => "../../components/article-list/article-list.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "分类-" + config_base.config.title,
      path: "/pages/category/index"
    });
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const categoryStore = stores_category.useCategoryStore();
    categoryStore.getPostList(categoryStore.currentCategory, categoryStore.title);
    common_vendor.onMounted(() => {
      const _this = common_vendor.getCurrentInstance();
      const observer = common_vendor.index.createIntersectionObserver(_this == null ? void 0 : _this.proxy);
      observer.relativeTo("#fu").observe("#loadMoreRef", (res) => {
        if (res.intersectionRatio > 0) {
          loadMore();
        }
      });
    });
    const loadMore = () => {
      categoryStore.getMore();
    };
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tool-pages/search"
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true,
          ["home-icon"]: "",
          ["back-icon"]: ""
        }),
        b: common_vendor.o(($event) => toSearch()),
        c: common_vendor.f(common_vendor.unref(stores_category.useCategoryStore)().list, (categoryItem, k0, i0) => {
          return {
            a: common_vendor.t(categoryItem.spec.displayName),
            b: common_vendor.unref(stores_category.useCategoryStore)().currentCategory === categoryItem.metadata.name ? 1 : "",
            c: common_vendor.o(($event) => common_vendor.unref(stores_category.useCategoryStore)().getPostList(categoryItem.metadata.name, categoryItem.spec.displayName), categoryItem.metadata.name),
            d: categoryItem.metadata.name
          };
        }),
        d: common_vendor.t(common_vendor.unref(stores_category.useCategoryStore)().title),
        e: !common_vendor.unref(categoryStore).isEmpty
      }, !common_vendor.unref(categoryStore).isEmpty ? {
        f: common_vendor.p({
          type: ((_a = common_vendor.unref(configStore).basic) == null ? void 0 : _a.type_articleShow_category) || "list",
          data: common_vendor.unref(categoryStore).postList
        })
      } : {
        g: common_vendor.p({
          mode: "data",
          size: "lg"
        })
      }, {
        h: common_vendor.p({
          status: common_vendor.unref(categoryStore).loadmoreStatus
        }),
        i: !common_vendor.unref(categoryStore).isEmpty
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/category/index.vue"]]);
wx.createPage(MiniProgramPage);
