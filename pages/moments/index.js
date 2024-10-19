"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_moments = require("../../stores/moments.js");
const stores_config = require("../../stores/config.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
const config_base = require("../../config/base.js");
if (!Math) {
  (TnNavbar + TnAvatar + common_vendor.unref(mpHtml) + TnLazyLoad + TnEmpty + TnLoadmore)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnAvatar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.js";
const TnLazyLoad = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.js";
const mpHtml = () => "../../components/uni-app/components/mp-html/mp-html.js";
const TnEmpty = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "瞬间-" + config_base.config.title,
      path: "/pages/moments/index"
    });
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const momentStore = stores_moments.useMomentStore();
    momentStore.getMomentList();
    common_vendor.onReachBottom(() => {
      momentStore.getMore();
    });
    const previewImage = (url, index) => {
      const urls = url.map((item) => item.url);
      common_vendor.index.previewImage({
        urls,
        current: urls[index]
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true,
          ["home-icon"]: "",
          ["back-icon"]: ""
        }),
        b: !common_vendor.unref(momentStore).isEmpty
      }, !common_vendor.unref(momentStore).isEmpty ? {
        c: common_vendor.f(common_vendor.unref(momentStore).list, (moment, k0, i0) => {
          return {
            a: "d049abad-1-" + i0,
            b: common_vendor.t(moment.spec.releaseTime),
            c: "d049abad-2-" + i0,
            d: common_vendor.p({
              content: moment.spec.content.html
            }),
            e: common_vendor.f(moment.spec.content.medium, (medium, index, i1) => {
              return common_vendor.e({
                a: medium.type === "PHOTO"
              }, medium.type === "PHOTO" ? {
                b: "d049abad-3-" + i0 + "-" + i1,
                c: common_vendor.p({
                  width: "100%",
                  src: medium.url,
                  mode: "aspectFill"
                }),
                d: common_vendor.o(($event) => previewImage(moment.spec.content.medium, index), index)
              } : {}, {
                e: index
              });
            }),
            f: common_vendor.n("medium-" + moment.spec.content.medium.length),
            g: moment.metadata.name
          };
        }),
        d: common_vendor.p({
          url: (_a = common_vendor.unref(stores_config.useConfigStore)().about) == null ? void 0 : _a.homeUserAvatar
        }),
        e: common_vendor.t((_b = common_vendor.unref(stores_config.useConfigStore)().about) == null ? void 0 : _b.homeUserName)
      } : {
        f: common_vendor.p({
          mode: "data",
          size: "lg"
        })
      }, {
        g: common_vendor.p({
          status: common_vendor.unref(momentStore).loadmoreStatus
        }),
        h: !common_vendor.unref(momentStore).isEmpty
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-d049abad"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/moments/index.vue"]]);
wx.createPage(MiniProgramPage);
