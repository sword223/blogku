"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "row-notice-bar",
  setup(__props) {
    const ns = common_vendor.useNamespace("row-notice-bar");
    const { componentId, componentTextId, data, animationData, noticeClickEvent } = common_vendor.useRowNoticeBar();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(data)),
        b: common_vendor.unref(componentTextId),
        c: common_vendor.n(common_vendor.unref(ns).e("value")),
        d: common_vendor.unref(componentId),
        e: common_vendor.n(common_vendor.unref(ns).b()),
        f: common_vendor.unref(animationData),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(noticeClickEvent) && common_vendor.unref(noticeClickEvent)(...args)
        )
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-47fb2c80"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/notice-bar/src/row-notice-bar.vue"]]);
wx.createComponent(Component);
