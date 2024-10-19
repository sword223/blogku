"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const config_base = require("../../config/base.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
if (!Math) {
  (TnNavbar + TnSearchBox + common_vendor.unref(mpHtml))();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnSearchBox = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.js";
const mpHtml = () => "../../components/uni-app/components/mp-html/mp-html.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "文章搜索-" + config_base.config.title
    });
    const emptyResult = common_vendor.ref(true);
    const searchResult = common_vendor.ref();
    const search = async (keyword) => {
      try {
        const res = await utils_request.request.get(
          "/apis/api.halo.run/v1alpha1/indices/post",
          {},
          {
            keyword,
            highlightPreTag: "<mark>",
            highlightPostTag: "</mark>"
          }
        );
        res.hits.forEach((item) => {
          item.title = item.title.replace(/<[^>]+>/g, "");
          item.content = item.content.replace(/<[^>]+>/g, "");
        });
        res.hits.forEach((item) => {
          item.publishTimestamp = item.publishTimestamp.split("T")[0];
        });
        searchResult.value = res;
        if (res.total > 0) {
          emptyResult.value = false;
        }
      } catch (error) {
      }
    };
    const searchValue = common_vendor.ref("");
    const searchInputEvent = (value) => {
      search(value);
      console.log("searchInputEvent", value);
      if (value === "") {
        emptyResult.value = true;
      }
    };
    const searchBtnClickEvent = (value) => {
      search(value);
      console.log("searchInputEvent", value);
      if (value === "") {
        emptyResult.value = true;
      }
    };
    const getArticleDetail = (metadataName, title) => {
      common_vendor.index.navigateTo({
        url: "/pages/detail_pages/article?metadataName=" + metadataName + "&title=" + title
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.o(searchInputEvent),
        c: common_vendor.o(searchBtnClickEvent),
        d: common_vendor.o(($event) => searchValue.value = $event),
        e: common_vendor.p({
          shape: "round",
          ["search-button-bg-color"]: "#2563eb",
          modelValue: searchValue.value
        }),
        f: emptyResult.value
      }, emptyResult.value ? {} : {
        g: common_vendor.f((_a = searchResult.value) == null ? void 0 : _a.hits, (item, k0, i0) => {
          return {
            a: "76644697-2-" + i0,
            b: common_vendor.p({
              content: item.title,
              domain: common_vendor.unref(config_base.config).BASE_URL
            }),
            c: "76644697-3-" + i0,
            d: common_vendor.p({
              content: item.content,
              domain: common_vendor.unref(config_base.config).BASE_URL
            }),
            e: common_vendor.t(item.publishTimestamp),
            f: item.name,
            g: common_vendor.o(($event) => getArticleDetail(item.name, item.title), item.name)
          };
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/tool-pages/search.vue"]]);
wx.createPage(MiniProgramPage);
