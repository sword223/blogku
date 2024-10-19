"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  TnEmpty();
}
const TnEmpty = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "empty",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: "lg",
          mode: "data"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/components/empty.vue"]]);
wx.createComponent(Component);
