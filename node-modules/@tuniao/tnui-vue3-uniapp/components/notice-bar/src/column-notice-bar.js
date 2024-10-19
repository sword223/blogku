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
  __name: "column-notice-bar",
  setup(__props) {
    const ns = common_vendor.useNamespace("column-notice-bar");
    const { data, interval, play, vertical, noticeClickEvent } = common_vendor.useColumnNoticeBar();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => common_vendor.unref(noticeClickEvent)(index), index)
          };
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("swiper-item")),
        c: common_vendor.n(common_vendor.unref(ns).e("swiper")),
        d: common_vendor.unref(play),
        e: common_vendor.unref(interval),
        f: common_vendor.unref(vertical),
        g: common_vendor.n(common_vendor.unref(ns).b())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-619104fb"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/notice-bar/src/column-notice-bar.vue"]]);
wx.createComponent(Component);
