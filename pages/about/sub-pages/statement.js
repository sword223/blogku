"use strict";
const common_vendor = require("../../../common/vendor.js");
const config_base = require("../../../config/base.js");
const hook_useWxShare_index = require("../../../hook/use-wx-share/index.js");
if (!Math) {
  TnNavbar();
}
const TnNavbar = () => "../../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "statement",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "免责声明-" + config_base.config.title
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.t(common_vendor.unref(config_base.config).title),
        c: common_vendor.t(common_vendor.unref(config_base.config).title),
        d: common_vendor.t(common_vendor.unref(config_base.config).title),
        e: common_vendor.t(common_vendor.unref(config_base.config).title),
        f: common_vendor.t(common_vendor.unref(config_base.config).title),
        g: common_vendor.t(common_vendor.unref(config_base.config).title),
        h: common_vendor.t(common_vendor.unref(config_base.config).title),
        i: common_vendor.t(common_vendor.unref(config_base.config).title)
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/about/sub-pages/statement.vue"]]);
wx.createPage(MiniProgramPage);
