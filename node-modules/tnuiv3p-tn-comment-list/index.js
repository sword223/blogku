"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_TnIcon = common_vendor.resolveComponent("TnIcon");
  _component_TnIcon();
}
if (!Math) {
  (TnAvatar + CommentBottomOperation)();
}
const TnAvatar = () => "../@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.js";
const CommentBottomOperation = () => "./comment-bottom-operation.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: common_vendor.commentListProps,
  emits: common_vendor.commentListEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const ns = common_vendor.useNamespace("tn-comment-list");
    const {
      listData,
      likeClickHandle,
      dislikeClickHandle,
      replyClickHandle,
      deleteClickHandle,
      replyOperationClickHandle,
      addCommentData,
      addCommentReplyWithId,
      deleteCommentReplyWithId
    } = common_vendor.useCommentList(props, emits);
    __expose({
      /**
       * @description 添加评论
       */
      addCommentData,
      /**
       * @description 添加评论回复
       */
      addCommentReply: addCommentReplyWithId,
      /**
       * @description 删除评论回复
       */
      deleteCommentReply: deleteCommentReplyWithId
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: "2c7daae8-0-" + i0,
            b: common_vendor.p({
              url: item.avatar,
              size: "70"
            }),
            c: common_vendor.t(item.nickname),
            d: common_vendor.t(item.content),
            e: common_vendor.o(() => common_vendor.unref(likeClickHandle)(item.id, index), index),
            f: common_vendor.o(() => common_vendor.unref(dislikeClickHandle)(item.id, index), index),
            g: common_vendor.o(() => common_vendor.unref(deleteClickHandle)(item.id), index),
            h: "2c7daae8-1-" + i0,
            i: common_vendor.p({
              data: {
                date: item.date,
                position: item.position,
                likeActive: item.likeActive,
                likeCount: item.likeCount,
                dislikeActive: item.dislikeActive
              },
              ["show-like"]: _ctx.showLike,
              ["show-dislike"]: _ctx.showDislike,
              ["like-icon"]: _ctx.likeIcon,
              ["active-like-icon"]: _ctx.activeLikeIcon,
              ["dislike-icon"]: _ctx.dislikeIcon,
              ["like-icon-color"]: _ctx.likeIconColor,
              ["active-like-icon-color"]: _ctx.activeLikeIconColor,
              ["dislike-icon-color"]: _ctx.dislikeIconColor,
              ["show-delete"]: item.allowDelete,
              ["show-reply"]: !item.disabledReply
            }),
            j: common_vendor.o(($event) => common_vendor.unref(replyClickHandle)(item), index),
            k: common_vendor.f(item.comment, (commentItem, commentIndex, i1) => {
              return common_vendor.e({
                a: "2c7daae8-2-" + i0 + "-" + i1,
                b: common_vendor.p({
                  url: commentItem.avatar,
                  size: "40"
                }),
                c: common_vendor.t(commentItem.nickname),
                d: commentItem.authorNickname
              }, commentItem.authorNickname ? {
                e: common_vendor.t(commentItem.authorNickname)
              } : {}, {
                f: common_vendor.t(commentItem.content),
                g: common_vendor.o(() => common_vendor.unref(likeClickHandle)(commentItem.id, index, commentIndex), commentIndex),
                h: common_vendor.o(() => common_vendor.unref(dislikeClickHandle)(commentItem.id, index, commentIndex), commentIndex),
                i: common_vendor.o(() => common_vendor.unref(deleteClickHandle)(commentItem.id), commentIndex),
                j: "2c7daae8-3-" + i0 + "-" + i1,
                k: common_vendor.p({
                  data: {
                    date: commentItem.date,
                    position: commentItem.position,
                    likeActive: commentItem.likeActive,
                    likeCount: commentItem.likeCount,
                    dislikeActive: commentItem.dislikeActive
                  },
                  ["show-like"]: _ctx.showLike,
                  ["show-dislike"]: _ctx.showDislike,
                  ["like-icon"]: _ctx.likeIcon,
                  ["active-like-icon"]: _ctx.activeLikeIcon,
                  ["dislike-icon"]: _ctx.dislikeIcon,
                  ["like-icon-color"]: _ctx.likeIconColor,
                  ["active-like-icon-color"]: _ctx.activeLikeIconColor,
                  ["dislike-icon-color"]: _ctx.dislikeIconColor,
                  ["show-delete"]: commentItem.allowDelete,
                  ["show-reply"]: !commentItem.disabledReply
                }),
                l: common_vendor.o(($event) => common_vendor.unref(replyClickHandle)(commentItem), commentIndex),
                m: commentIndex
              });
            }),
            l: `${item.hidden ? "0px" : "auto"}`,
            m: item.commentCount > 0
          }, item.commentCount > 0 ? common_vendor.e({
            n: !((_a = item == null ? void 0 : item.comment) == null ? void 0 : _a.length) || item.hidden
          }, !((_b = item == null ? void 0 : item.comment) == null ? void 0 : _b.length) || item.hidden ? {
            o: common_vendor.t(item.commentCount)
          } : item.commentCount > item.comment.length ? {} : item.commentCount === item.comment.length ? {} : {}, {
            p: item.commentCount > item.comment.length,
            q: item.commentCount === item.comment.length,
            r: common_vendor.n(common_vendor.unref(ns).em("show-more-operation", "tips")),
            s: "2c7daae8-4-" + i0,
            t: common_vendor.p({
              name: item.commentCount > item.comment.length || item.hidden ? "down" : "up"
            }),
            v: common_vendor.n(common_vendor.unref(ns).em("show-more-operation", "icon")),
            w: common_vendor.n(common_vendor.unref(ns).e("show-more-operation")),
            x: common_vendor.o(($event) => common_vendor.unref(replyOperationClickHandle)(item.id), index)
          }) : {}, {
            y: index
          });
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("avatar")),
        c: common_vendor.n(common_vendor.unref(ns).em("item-data", "left")),
        d: common_vendor.n(common_vendor.unref(ns).e("nickname")),
        e: common_vendor.n(common_vendor.unref(ns).e("content")),
        f: common_vendor.n(common_vendor.unref(ns).e("bottom-operation")),
        g: common_vendor.n(common_vendor.unref(ns).e("main-data")),
        h: common_vendor.n(common_vendor.unref(ns).e("avatar")),
        i: common_vendor.n(common_vendor.unref(ns).em("reply-item", "left")),
        j: common_vendor.n(common_vendor.unref(ns).e("reply-nickname")),
        k: common_vendor.n(common_vendor.unref(ns).e("nickname")),
        l: common_vendor.n(common_vendor.unref(ns).e("content")),
        m: common_vendor.n(common_vendor.unref(ns).e("bottom-operation")),
        n: common_vendor.n(common_vendor.unref(ns).em("reply-item", "right")),
        o: common_vendor.n(common_vendor.unref(ns).e("reply-item")),
        p: common_vendor.n(common_vendor.unref(ns).e("reply-data")),
        q: common_vendor.n(common_vendor.unref(ns).em("item-data", "right")),
        r: common_vendor.n(common_vendor.unref(ns).e("item-data")),
        s: common_vendor.n(common_vendor.unref(ns).e("item")),
        t: common_vendor.n(common_vendor.unref(ns).b())
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2c7daae8"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/tnuiv3p-tn-comment-list/index.vue"]]);
wx.createComponent(Component);
