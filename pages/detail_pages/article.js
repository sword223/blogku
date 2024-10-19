"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const stores_config = require("../../stores/config.js");
const utils_module_article = require("../../utils/module/article.js");
const config_base = require("../../config/base.js");
const stores_user = require("../../stores/user.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
if (!Math) {
  (TnNavbar + common_vendor.unref(mpHtml) + comment)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const mpHtml = () => "../../components/uni-app/components/mp-html/mp-html.js";
const comment = () => "../../components/comment.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "article",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const loaded = common_vendor.ref(false);
    function formattedDate(iso) {
      if (!iso || new Date(iso).toString() === "Invalid Date") {
        return "Invalid input";
      }
      const date = new Date(iso);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const articleData = common_vendor.ref();
    const title = common_vendor.ref("");
    const metadataName = common_vendor.ref("");
    const commentRef = common_vendor.ref(null);
    const addView = async (name, url) => {
      const screenWidth = common_vendor.index.getSystemInfoSync().screenWidth;
      const screenHeight = common_vendor.index.getSystemInfoSync().screenHeight;
      const screen = screenWidth + "x" + screenHeight;
      try {
        await utils_module_article.article.addView(name, screen, url);
      } catch (error) {
        console.error("增加浏览量失败", error);
      }
    };
    common_vendor.onLoad(async (options) => {
      console.log(options);
      title.value = options == null ? void 0 : options.title;
      metadataName.value = options == null ? void 0 : options.metadataName;
      liked.value = userStore.isLike(metadataName.value);
      common_vendor.onShareAppMessage(() => ({}));
      common_vendor.onShareTimeline(() => ({}));
      const shareTitle = options == null ? void 0 : options.title;
      const shareQuery = "metadataName=" + metadataName.value + "&title=" + title.value;
      hook_useWxShare_index.useWxShare({
        title: decodeURIComponent(shareTitle),
        query: shareQuery
      });
      try {
        const res = await utils_module_article.article.getData(options == null ? void 0 : options.metadataName);
        res.spec.publishTime = formattedDate(res.spec.publishTime);
        loaded.value = true;
        articleData.value = res;
        await addView(options == null ? void 0 : options.metadataName, res.status.permalink);
      } catch (error) {
        console.error("Error retrieving article data:", error);
      }
    });
    const showPopup = async () => {
      var _a, _b, _c;
      if (!((_a = configStore.basic) == null ? void 0 : _a.enableComment)) {
        common_vendor.index.showToast({
          title: "评论功能已关闭",
          icon: "none"
        });
        return;
      }
      await common_vendor.nextTick$1();
      (_b = commentRef.value) == null ? void 0 : _b.showPopup;
      (_c = commentRef.value) == null ? void 0 : _c.clearReplyId();
    };
    const liked = common_vendor.ref(false);
    const upvote = async (id) => {
      if (liked.value) {
        return;
      }
      try {
        await utils_module_article.article.upvote(id);
        articleData.value.stats.upvote++;
        userStore.addLike(id);
        liked.value = true;
      } catch (error) {
        console.error("点赞失败", error);
      }
    };
    const copyText = (text, des) => {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: des,
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true
        }),
        b: loaded.value
      }, loaded.value ? common_vendor.e({
        c: common_vendor.t((_a = articleData.value) == null ? void 0 : _a.spec.title),
        d: common_vendor.t(((_c = (_b = articleData.value) == null ? void 0 : _b.categories[0]) == null ? void 0 : _c.spec.displayName) ?? "未分类"),
        e: common_vendor.t((_d = articleData.value) == null ? void 0 : _d.stats.visit),
        f: common_vendor.t((_e = articleData.value) == null ? void 0 : _e.spec.publishTime),
        g: (_f = articleData.value) == null ? void 0 : _f.spec.cover
      }, ((_g = articleData.value) == null ? void 0 : _g.spec.cover) ? {
        h: ((_h = articleData.value) == null ? void 0 : _h.spec.cover.startsWith("http")) ? (_i = articleData.value) == null ? void 0 : _i.spec.cover : common_vendor.unref(config_base.config).BASE_URL + ((_j = articleData.value) == null ? void 0 : _j.spec.cover)
      } : {}, {
        i: common_vendor.p({
          content: (_k = articleData.value) == null ? void 0 : _k.content.content,
          domain: common_vendor.unref(config_base.config).BASE_URL,
          ["error-img"]: (_l = common_vendor.unref(configStore).article) == null ? void 0 : _l.errorImage,
          ["loading-img"]: (_m = common_vendor.unref(configStore).article) == null ? void 0 : _m.loadingImage,
          ["lazy-load"]: ((_n = common_vendor.unref(configStore).article) == null ? void 0 : _n.enableReward) || false
        }),
        j: !liked.value
      }, !liked.value ? {} : {}, {
        k: common_vendor.t((_o = articleData.value) == null ? void 0 : _o.stats.upvote),
        l: common_vendor.o(($event) => upvote(metadataName.value)),
        m: common_vendor.t((_p = articleData.value) == null ? void 0 : _p.stats.comment),
        n: common_vendor.o(($event) => showPopup()),
        o: common_vendor.o(($event) => {
          var _a2;
          return copyText(common_vendor.unref(config_base.config).WEB_URL + ((_a2 = articleData.value) == null ? void 0 : _a2.status.permalink), "原文链接已复制");
        }),
        p: (_q = common_vendor.unref(configStore).basic) == null ? void 0 : _q.enableComment
      }, ((_r = common_vendor.unref(configStore).basic) == null ? void 0 : _r.enableComment) ? common_vendor.e({
        q: metadataName.value
      }, metadataName.value ? {
        r: common_vendor.sr(commentRef, "cbcb2944-2", {
          "k": "commentRef"
        }),
        s: common_vendor.p({
          kind: "Post",
          name: metadataName.value
        })
      } : {}) : {}) : {});
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/detail_pages/article.vue"]]);
wx.createPage(MiniProgramPage);
