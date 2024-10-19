"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_category = require("../../stores/category.js");
const config_base = require("../../config/base.js");
const utils_module_postList = require("../../utils/module/postList.js");
require("../../utils/request.js");
const stores_config = require("../../stores/config.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
if (!Math) {
  (TnNavbar + TnSwiper + TnNoticeBar + articleList + TnLoadmore)();
}
const TnSwiper = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.js";
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnNoticeBar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const articleList = () => "../../components/article-list/article-list.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      path: "/pages/index/index"
    });
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const currentSwiperIndex = common_vendor.ref(0);
    const loadmoreStatus = common_vendor.ref("loadmore");
    const currentPage = common_vendor.ref(1);
    const list = common_vendor.ref([]);
    async function fetchPosts(page = 1) {
      if (loadmoreStatus.value === "loading" || loadmoreStatus.value === "nomore") {
        return;
      }
      try {
        loadmoreStatus.value = "loading";
        const data = await utils_module_postList.post.getPostList(page);
        const item = data.items;
        item.forEach((item2) => {
          if (item2.spec.cover && !item2.spec.cover.startsWith("http")) {
            item2.spec.cover = config_base.config.BASE_URL + item2.spec.cover;
          }
          list.value.push(item2);
        });
        currentPage.value++;
        loadmoreStatus.value = "loadmore";
        if (!data.hasNext) {
          loadmoreStatus.value = "nomore";
        }
      } catch (error) {
        console.error("请求帖子列表失败：", error);
      } finally {
      }
    }
    fetchPosts(currentPage.value);
    common_vendor.onReachBottom(() => {
      console.log("page", currentPage.value);
      fetchPosts(currentPage.value);
    });
    const swichTab = (name, title) => {
      stores_category.useCategoryStore().setCurrentCategory(name, title);
      common_vendor.index.switchTab({
        url: "/pages/category/index"
      });
    };
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tool-pages/search"
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: (_a = common_vendor.unref(configStore).basic) == null ? void 0 : _a.searchIcon,
        b: common_vendor.o(($event) => toSearch()),
        c: common_vendor.p({
          fixed: true,
          opacity: 1,
          ["home-icon"]: "",
          ["back-icon"]: "",
          ["bg-color"]: "`rgba(255, 255, 255, 1)`"
        }),
        d: common_vendor.w(({
          data
        }, s0, i0) => {
          return {
            a: data.image,
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "d",
          vueId: "15cfdb78-1"
        }),
        e: common_vendor.o(($event) => currentSwiperIndex.value = $event),
        f: common_vendor.p({
          data: (_b = common_vendor.unref(configStore).home) == null ? void 0 : _b.carousel,
          indicator: true,
          ["indicator-type"]: "line",
          autoplay: true,
          loop: true,
          width: "100%",
          height: "100%",
          modelValue: currentSwiperIndex.value
        }),
        g: (_c = common_vendor.unref(configStore).home) == null ? void 0 : _c.notice.enableNotice
      }, ((_d = common_vendor.unref(configStore).home) == null ? void 0 : _d.notice.enableNotice) ? {
        h: common_vendor.p({
          data: common_vendor.unref(configStore).notionData,
          ["left-icon"]: "sound",
          ["left-icon-color"]: "tn-grey",
          ["auto-hidden"]: true,
          direction: ((_e = common_vendor.unref(configStore).home) == null ? void 0 : _e.notice.noticeType) || "horizontal",
          ["bg-color"]: "#fff"
        })
      } : {}, {
        i: common_vendor.unref(configStore).hotCategories.length > 0
      }, common_vendor.unref(configStore).hotCategories.length > 0 ? {} : {}, {
        j: common_vendor.f(common_vendor.unref(configStore).hotCategories, (category, k0, i0) => {
          return {
            a: category.spec.cover,
            b: common_vendor.t(category.spec.displayName),
            c: common_vendor.o(($event) => swichTab(category.metadata.name, category.spec.displayName), category.metadata.name),
            d: category.metadata.name
          };
        }),
        k: common_vendor.p({
          type: ((_f = common_vendor.unref(configStore).basic) == null ? void 0 : _f.type_articleShow_home) || "list",
          data: list.value
        }),
        l: common_vendor.p({
          status: loadmoreStatus.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
