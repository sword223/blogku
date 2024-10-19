"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_config = require("../../../stores/config.js");
const hook_useWxShare_index = require("../../../hook/use-wx-share/index.js");
const config_base = require("../../../config/base.js");
if (!Math) {
  (TnNavbar + TnAvatar)();
}
const TnNavbar = () => "../../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnAvatar = () => "../../../node-modules/@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "contactMe",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "社交信息-" + config_base.config.title
    });
    const configStore = stores_config.useConfigStore();
    console.log(configStore.socials);
    const copyText = (text, des) => {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: des,
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.p({
          url: (_a = common_vendor.unref(configStore).about) == null ? void 0 : _a.homeUserAvatar,
          size: "xl",
          shape: "circle"
        }),
        c: common_vendor.t((_b = common_vendor.unref(configStore).about) == null ? void 0 : _b.homeUserName),
        d: common_vendor.t((_c = common_vendor.unref(configStore).about) == null ? void 0 : _c.homeUserDesc),
        e: common_vendor.f(common_vendor.unref(configStore).socials, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.title + "："),
            c: common_vendor.t(item.content),
            d: item.name,
            e: common_vendor.o(($event) => copyText(item.content, "信息已复制"), item.name)
          };
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/about/sub-pages/contactMe.vue"]]);
wx.createPage(MiniProgramPage);
