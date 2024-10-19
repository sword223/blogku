"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnLoading();
}
const TnLoading = () => "../../loading/src/loading.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "loadmore",
  props: common_vendor.loadmoreProps,
  emits: common_vendor.loadmoreEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { ns, loadmoreClass, loadmoreStyle, dotClass, dotStyle } = common_vendor.useLoadmoreCustomStyle(props);
    const loadMoreClickEvent = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return common_vendor.e({
        a: _ctx.status === "loading" && _ctx.loadingIcon
      }, _ctx.status === "loading" && _ctx.loadingIcon ? {
        b: common_vendor.p({
          show: true,
          animation: true,
          mode: _ctx.loadingIconMode,
          size: _ctx.size,
          color: common_vendor.unref(common_vendor.isEmptyVariableInDefault)(_ctx.color, "tn-gray")
        })
      } : {}, {
        c: _ctx.loadingText
      }, _ctx.loadingText ? common_vendor.e({
        d: _ctx.status === "loadmore" && ((_a = _ctx.text) == null ? void 0 : _a.loadmore)
      }, _ctx.status === "loadmore" && ((_b = _ctx.text) == null ? void 0 : _b.loadmore) ? {
        e: common_vendor.t(_ctx.text.loadmore),
        f: common_vendor.n(common_vendor.unref(ns).em("text", "loadmore"))
      } : {}, {
        g: _ctx.status === "loading" && ((_c = _ctx.text) == null ? void 0 : _c.loading)
      }, _ctx.status === "loading" && ((_d = _ctx.text) == null ? void 0 : _d.loading) ? {
        h: common_vendor.t(_ctx.text.loading),
        i: common_vendor.n(common_vendor.unref(ns).em("text", "loading"))
      } : {}, {
        j: _ctx.status === "nomore" && ((_e = _ctx.text) == null ? void 0 : _e.nomore)
      }, _ctx.status === "nomore" && ((_f = _ctx.text) == null ? void 0 : _f.nomore) ? {
        k: common_vendor.t(_ctx.text.nomore),
        l: common_vendor.n(common_vendor.unref(ns).em("text", "nomore"))
      } : {}, {
        m: _ctx.status === "empty" && ((_g = _ctx.text) == null ? void 0 : _g.empty)
      }, _ctx.status === "empty" && ((_h = _ctx.text) == null ? void 0 : _h.empty) ? {
        n: common_vendor.t(_ctx.text.empty),
        o: common_vendor.n(common_vendor.unref(ns).em("text", "empty"))
      } : {}, {
        p: common_vendor.n(common_vendor.unref(ns).e("text"))
      }) : {}, {
        q: !_ctx.loadingText && _ctx.status !== "loading" || _ctx.status === "loading" && !_ctx.loadingIcon && !_ctx.loadingText
      }, !_ctx.loadingText && _ctx.status !== "loading" || _ctx.status === "loading" && !_ctx.loadingIcon && !_ctx.loadingText ? {
        r: common_vendor.n(common_vendor.unref(dotClass)),
        s: common_vendor.s(common_vendor.unref(dotStyle))
      } : {}, {
        t: common_vendor.n(common_vendor.unref(ns).e("content")),
        v: common_vendor.n(common_vendor.unref(loadmoreClass)),
        w: common_vendor.s(common_vendor.unref(loadmoreStyle)),
        x: common_vendor.o(loadMoreClickEvent)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17b3fce8"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.vue"]]);
wx.createComponent(Component);
