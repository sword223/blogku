"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  TnNavbar();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "authorize",
  setup(__props) {
    const copyText = (text, des) => {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: des || "链接已复制",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.o(($event) => copyText("https://www.jiewen.run/archives/TinyTale", "链接已复制")),
        c: common_vendor.o(($event) => copyText("tyubar13@gmail.com", "邮箱已复制")),
        d: common_vendor.o(($event) => copyText("Jevon_hi", "微信号已复制")),
        e: common_vendor.o(($event) => copyText("https://www.jiewen.run/archives/TinyTale", "链接已复制"))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/detail_pages/authorize.vue"]]);
wx.createPage(MiniProgramPage);
