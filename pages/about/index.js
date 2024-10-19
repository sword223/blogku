"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_config = require("../../stores/config.js");
require("../../utils/request.js");
const utils_module_config = require("../../utils/module/config.js");
const config_base = require("../../config/base.js");
const hook_saveImage = require("../../hook/saveImage.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
const stores_user = require("../../stores/user.js");
if (!Math) {
  (TnAvatar + TnIcon + TnCoolIcon + TnButton + TnPopup)();
}
const TnAvatar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.js";
const TnIcon = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/icon/src/icon.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnCoolIcon = () => "../../node-modules/tnuiv3p-tn-cool-icon/index.js";
const TnPopup = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/popup/src/popup.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "关于我-" + config_base.config.title,
      path: "/pages/category/index"
    });
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const isAuth = common_vendor.ref(false);
    const login = async () => {
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          getAuth(loginRes.code);
        }
      });
    };
    const getAuth = (code) => {
      try {
        utils_module_config.baseConfig.getVerify(code).then((res) => {
          if (res.result) {
            isAuth.value = res.result;
            stores_user.useUserStore().setAdmin(res.result);
            if (res.token != null) {
              configStore.token = res.token;
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    login();
    const copyText = (text, des) => {
      common_vendor.index.setClipboardData({
        data: text,
        success: () => {
          common_vendor.index.showToast({
            title: des || "链接已复制",
            icon: "none"
          });
        }
      });
    };
    const showPopup = common_vendor.ref(false);
    const showPopupFn = () => {
      showPopup.value = true;
    };
    const toPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: common_vendor.p({
          url: (_a = common_vendor.unref(configStore).about) == null ? void 0 : _a.homeUserAvatar,
          size: "xl",
          shape: "circle"
        }),
        b: common_vendor.t((_b = common_vendor.unref(configStore).about) == null ? void 0 : _b.homeUserName),
        c: common_vendor.t((_c = common_vendor.unref(configStore).about) == null ? void 0 : _c.homeUserDesc),
        d: common_vendor.p({
          name: "qr-code-circle",
          size: "32px"
        }),
        e: common_vendor.o(($event) => showPopupFn()),
        f: (_d = common_vendor.unref(configStore).about) == null ? void 0 : _d.qrcode.qrcodeImage,
        g: common_vendor.p({
          name: "reload-planet-fill",
          color: "#2563eb",
          size: "32px"
        }),
        h: common_vendor.o(($event) => toPage("../detail_pages/archives")),
        i: common_vendor.p({
          name: "gloves-fill",
          color: "#2563eb",
          size: "32px"
        }),
        j: common_vendor.o(($event) => toPage("../detail_pages/friend")),
        k: common_vendor.p({
          name: "location-fill",
          color: "#2563eb",
          size: "32px"
        }),
        l: common_vendor.o(($event) => toPage("/pages/tool-pages/search")),
        m: common_vendor.p({
          name: "trusty-fill",
          color: "#2563eb",
          size: "32px"
        }),
        n: common_vendor.o(($event) => toPage("/pages/about/sub-pages/statement")),
        o: common_vendor.unref(isAuth)
      }, common_vendor.unref(isAuth) ? {
        p: common_vendor.p({
          name: "cursor",
          type: "circle",
          ["bg-color"]: "tn-blue",
          color: "tn-white"
        }),
        q: common_vendor.p({
          name: "floral",
          type: "circle",
          ["bg-color"]: "tn-purple",
          color: "tn-white"
        })
      } : {}, {
        r: common_vendor.p({
          name: "bookmark",
          size: "24px"
        }),
        s: common_vendor.o(($event) => {
          var _a2;
          return copyText((_a2 = common_vendor.unref(configStore).about) == null ? void 0 : _a2.website, "网址已复制");
        }),
        t: common_vendor.p({
          ["only-button"]: true
        }),
        v: common_vendor.p({
          name: "my-add",
          size: "24px"
        }),
        w: common_vendor.p({
          name: "service-simple",
          size: "24px"
        }),
        x: common_vendor.p({
          ["only-button"]: true,
          ["open-type"]: "contact"
        }),
        y: common_vendor.p({
          name: "tip",
          size: "24px"
        }),
        z: common_vendor.p({
          ["only-button"]: true,
          ["open-type"]: "feedback"
        }),
        A: common_vendor.p({
          name: "cursor",
          size: "24px"
        }),
        B: common_vendor.t((_e = common_vendor.unref(configStore).about) == null ? void 0 : _e.homeUserEmail),
        C: common_vendor.o(($event) => {
          var _a2;
          return copyText((_a2 = common_vendor.unref(configStore).about) == null ? void 0 : _a2.homeUserEmail, "邮箱已复制");
        }),
        D: ((_f = common_vendor.unref(configStore).about) == null ? void 0 : _f.qrcode.qrcodeImage.startsWith("http")) ? (_g = common_vendor.unref(configStore).about) == null ? void 0 : _g.qrcode.qrcodeImage : common_vendor.unref(config_base.config).BASE_URL + ((_h = common_vendor.unref(configStore).about) == null ? void 0 : _h.qrcode.qrcodeImage),
        E: common_vendor.t((_i = common_vendor.unref(configStore).about) == null ? void 0 : _i.qrcode.qrcodeDesc),
        F: common_vendor.o(($event) => {
          var _a2, _b2, _c2;
          return common_vendor.unref(hook_saveImage.downloadFile)(((_a2 = common_vendor.unref(configStore).about) == null ? void 0 : _a2.qrcode.qrcodeImage.startsWith("http")) ? (_b2 = common_vendor.unref(configStore).about) == null ? void 0 : _b2.qrcode.qrcodeImage : common_vendor.unref(config_base.config).BASE_URL + ((_c2 = common_vendor.unref(configStore).about) == null ? void 0 : _c2.qrcode.qrcodeImage));
        }),
        G: common_vendor.o(($event) => common_vendor.isRef(showPopup) ? showPopup.value = $event : null),
        H: common_vendor.p({
          ["overlay-opacity"]: 0.2,
          modelValue: common_vendor.unref(showPopup)
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-6b4e7e2d"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/about/index.vue"]]);
wx.createPage(MiniProgramPage);
