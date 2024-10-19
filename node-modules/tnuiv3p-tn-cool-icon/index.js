"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../@tuniao/tnui-vue3-uniapp/components/icon/src/icon.js";
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "index",
  props: common_vendor.coolIconProps,
  emits: common_vendor.coolIconEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { ns, gradientIcon, coolIconStyle, coolIconBgClass, coolIconBgStyle } = common_vendor.useCoolIconCustomStyle(props);
    const iconClickHandle = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(coolIconBgClass)),
        b: common_vendor.s(common_vendor.unref(coolIconBgStyle)),
        c: common_vendor.p({
          name: _ctx.name,
          color: _ctx.type !== "dark-goldborder" ? _ctx.color : "tn-orangeyellow",
          transparent: common_vendor.unref(gradientIcon),
          ["transparent-bg"]: _ctx.color
        }),
        d: common_vendor.n(common_vendor.unref(ns).e("icon")),
        e: common_vendor.n(common_vendor.unref(ns).b()),
        f: common_vendor.n(common_vendor.unref(ns).m(_ctx.type)),
        g: common_vendor.s(common_vendor.unref(coolIconStyle)),
        h: common_vendor.o(iconClickHandle)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f58628ed"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/tnuiv3p-tn-cool-icon/index.vue"]]);
wx.createComponent(Component);
