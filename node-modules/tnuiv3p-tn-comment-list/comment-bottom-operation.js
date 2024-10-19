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
  __name: "comment-bottom-operation",
  props: common_vendor.commentBottomOperationProps,
  emits: common_vendor.commentBottomOperationEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const ns = common_vendor.useNamespace("tn-comment-bottom-operation");
    const likeIconColor = common_vendor.computed(
      () => props.likeIconColor !== void 0 ? props.likeIconColor : "tn-gray-dark"
    );
    const activeLikeIconColor = common_vendor.computed(
      () => props.activeLikeIconColor !== void 0 ? props.activeLikeIconColor : "tn-red"
    );
    const dislikeIconColor = common_vendor.computed(
      () => props.dislikeIconColor !== void 0 ? props.dislikeIconColor : "tn-gray-dark"
    );
    const activeDislikeIconColor = common_vendor.computed(
      () => props.activeDislikeIconColor !== void 0 ? props.activeDislikeIconColor : "tn-gray-dark"
    );
    const likeClickHandle = () => {
      emits("like");
    };
    const dislikeClickHandle = () => {
      emits("dislike");
    };
    const deleteClickHandle = () => {
      emits("delete");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(_ctx.data.date),
        b: common_vendor.n(common_vendor.unref(ns).e("date")),
        c: !!_ctx.data.position
      }, !!_ctx.data.position ? {
        d: common_vendor.t(_ctx.data.position),
        e: common_vendor.n(common_vendor.unref(ns).e("position"))
      } : {}, {
        f: _ctx.showReply
      }, _ctx.showReply ? {
        g: common_vendor.n(common_vendor.unref(ns).e("reply"))
      } : {}, {
        h: _ctx.showDelete
      }, _ctx.showDelete ? {
        i: common_vendor.n(common_vendor.unref(ns).e("delete")),
        j: common_vendor.o(deleteClickHandle)
      } : {}, {
        k: common_vendor.n(common_vendor.unref(ns).e("left")),
        l: _ctx.showLike
      }, _ctx.showLike ? {
        m: common_vendor.p({
          name: _ctx.data.likeActive ? _ctx.activeLikeIcon : _ctx.likeIcon,
          color: _ctx.data.likeActive ? activeLikeIconColor.value : likeIconColor.value
        }),
        n: common_vendor.n(common_vendor.unref(ns).e("icon")),
        o: common_vendor.t(_ctx.data.likeCount),
        p: common_vendor.n(common_vendor.unref(ns).e("like-value")),
        q: common_vendor.n(common_vendor.unref(ns).e("like-container")),
        r: common_vendor.o(likeClickHandle)
      } : {}, {
        s: _ctx.showDislike
      }, _ctx.showDislike ? {
        t: common_vendor.p({
          name: _ctx.data.dislikeActive ? _ctx.activeDislikeIcon : _ctx.dislikeIcon,
          color: _ctx.data.dislikeActive ? activeDislikeIconColor.value : dislikeIconColor.value
        }),
        v: common_vendor.n(common_vendor.unref(ns).e("icon")),
        w: common_vendor.o(dislikeClickHandle)
      } : {}, {
        x: common_vendor.n(common_vendor.unref(ns).e("right")),
        y: common_vendor.o(($event) => null),
        z: common_vendor.n(common_vendor.unref(ns).b())
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a10636a"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/tnuiv3p-tn-comment-list/comment-bottom-operation.vue"]]);
wx.createComponent(Component);
