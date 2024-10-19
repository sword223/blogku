"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "time-line",
  props: common_vendor.timeLineProps,
  setup(__props) {
    const props = __props;
    const ns = common_vendor.useNamespace("time-line");
    common_vendor.provide(common_vendor.timeLineKey, {
      showLine: common_vendor.toRef(props, "showLine")
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(ns).b())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/tnuiv3p-tn-time-line/time-line.vue"]]);
wx.createComponent(Component);
