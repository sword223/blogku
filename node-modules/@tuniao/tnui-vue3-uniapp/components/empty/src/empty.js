"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "empty",
  props: common_vendor.emptyProps,
  setup(__props) {
    const props = __props;
    const slots = common_vendor.useSlots();
    const customIconContent = common_vendor.computed(() => !!(slots == null ? void 0 : slots.icon));
    const customTipsContent = common_vendor.computed(() => !!(slots == null ? void 0 : slots.tips));
    const { ns, emptyClass, emptyStyle, iconTextStyle } = common_vendor.useEmptyCustomStyle(
      props,
      customIconContent,
      customTipsContent
    );
    const emptyTips = common_vendor.computed(
      () => props.mode ? common_vendor.emptyDefaultTips[props.mode] : ""
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: `empty-${_ctx.mode}`
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("icon")),
        c: common_vendor.n(common_vendor.unref(ns).is("custom", customIconContent.value)),
        d: common_vendor.s(common_vendor.unref(iconTextStyle)("icon")),
        e: _ctx.showTips || _ctx.$slots.tips
      }, _ctx.showTips || _ctx.$slots.tips ? {
        f: common_vendor.t(emptyTips.value),
        g: common_vendor.n(common_vendor.unref(ns).e("tips")),
        h: common_vendor.n(common_vendor.unref(ns).is("custom", customTipsContent.value)),
        i: common_vendor.s(common_vendor.unref(iconTextStyle)("tips"))
      } : {}, {
        j: common_vendor.n(common_vendor.unref(emptyClass)),
        k: common_vendor.s(common_vendor.unref(emptyStyle))
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-76901d25"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue"]]);
wx.createComponent(Component);
