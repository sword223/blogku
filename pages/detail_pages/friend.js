"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const config_base = require("../../config/base.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
if (!Math) {
  (TnNavbar + TnLazyLoad + TnLoadmore)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnLazyLoad = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "friend",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "网站友链-" + config_base.config.title
    });
    const loadmoreStatus = common_vendor.ref("loadmore");
    const hasMore = common_vendor.ref(true);
    const friendList = common_vendor.ref();
    const getFriendList = async () => {
      var _a;
      loadmoreStatus.value = "loading";
      try {
        friendList.value = await utils_request.request.get(
          "/apis/api.plugin.halo.run/v1alpha1/plugins/PluginLinks/links"
        );
        loadmoreStatus.value = "loadmore";
        if (!((_a = friendList.value) == null ? void 0 : _a.hasNext)) {
          hasMore.value = false;
          loadmoreStatus.value = "nomore";
        }
        console.log(friendList.value);
      } catch (error) {
        console.log(error);
      }
    };
    const copyUrl = (url) => {
      common_vendor.index.setClipboardData({
        data: url,
        success: () => {
          common_vendor.index.showToast({
            title: "链接已复制"
          });
        }
      });
    };
    getFriendList();
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.f((_a = friendList.value) == null ? void 0 : _a.items, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.spec.displayName),
            b: common_vendor.t(item.spec.description),
            c: "2f45cd66-1-" + i0,
            d: common_vendor.p({
              src: item.spec.logo.startsWith("http") ? item.spec.logo : common_vendor.unref(config_base.config).BASE_URL + item.spec.logo,
              mode: "aspectFill"
            }),
            e: item.metadata.name,
            f: common_vendor.o(($event) => copyUrl(item.spec.url), item.metadata.name)
          };
        }),
        c: common_vendor.p({
          status: loadmoreStatus.value
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/detail_pages/friend.vue"]]);
wx.createPage(MiniProgramPage);
