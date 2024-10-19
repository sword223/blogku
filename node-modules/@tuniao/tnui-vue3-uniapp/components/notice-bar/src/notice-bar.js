"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  (TnIcon + TnColumnNoticeBar + TnRowNoticeBar)();
}
const TnIcon = () => "../../icon/src/icon.js";
const TnColumnNoticeBar = () => "./column-notice-bar.js";
const TnRowNoticeBar = () => "./row-notice-bar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "notice-bar",
  props: common_vendor.noticeBarProps,
  emits: common_vendor.noticeBarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const ns = common_vendor.useNamespace("notice-bar");
    const { showNoticeBar, leftIconClick, rightIconClick } = common_vendor.useNoticeBar(
      props,
      emits
    );
    const { commonClass, commonStyle } = common_vendor.useNoticeBarCommonProps(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(showNoticeBar)
      }, common_vendor.unref(showNoticeBar) ? common_vendor.e({
        b: _ctx.leftIcon
      }, _ctx.leftIcon ? {
        c: common_vendor.p({
          name: _ctx.leftIcon
        }),
        d: common_vendor.n(common_vendor.unref(ns).e("left-icon")),
        e: common_vendor.n(common_vendor.unref(commonClass)("leftIcon")),
        f: common_vendor.s(common_vendor.unref(commonStyle)("leftIcon")),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(leftIconClick) && common_vendor.unref(leftIconClick)(...args)
        )
      } : {}, {
        h: _ctx.direction === "vertical" || _ctx.direction === "horizontal" && !_ctx.loop
      }, _ctx.direction === "vertical" || _ctx.direction === "horizontal" && !_ctx.loop ? {} : {}, {
        i: common_vendor.n(common_vendor.unref(ns).e("content")),
        j: _ctx.rightIcon
      }, _ctx.rightIcon ? {
        k: common_vendor.p({
          name: _ctx.rightIcon
        }),
        l: common_vendor.n(common_vendor.unref(ns).e("right-icon")),
        m: common_vendor.n(common_vendor.unref(commonClass)("rightIcon")),
        n: common_vendor.s(common_vendor.unref(commonStyle)("rightIcon")),
        o: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(rightIconClick) && common_vendor.unref(rightIconClick)(...args)
        )
      } : {}, {
        p: common_vendor.n(common_vendor.unref(ns).b()),
        q: common_vendor.n(common_vendor.unref(commonClass)("normal")),
        r: common_vendor.s(common_vendor.unref(commonStyle)("normal"))
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35b71007"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue"]]);
wx.createComponent(Component);
