"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_photos = require("../../stores/photos.js");
require("../../animate.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
const config_base = require("../../config/base.js");
const stores_config = require("../../stores/config.js");
if (!Math) {
  (TnNavbar + TnTabsItem + TnTabs + TnPhotoAlbum + TnLazyLoad + TnWaterFall + TnEmpty + TnLoadmore)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnTabs = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.js";
const TnTabsItem = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.js";
const TnPhotoAlbum = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.js";
const TnWaterFall = () => "../../components/water-fall/src/water-fall.js";
const TnLazyLoad = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/lazy-load/src/lazy-load.js";
const TnEmpty = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "相册-" + config_base.config.title
    });
    const waterfall = common_vendor.ref();
    const configStore = stores_config.useConfigStore();
    configStore.checkAuthorization();
    const photosStore = stores_photos.usePhotosStore();
    photosStore.getGroupList();
    const mode = ((_a = configStore.basic) == null ? void 0 : _a.type_photoShow) || "default";
    const currentTabIndex = common_vendor.ref("all");
    const isFirstLoad = common_vendor.ref(true);
    common_vendor.onMounted(() => {
      common_vendor.effect(async () => {
        await photosStore.getPhotosList(currentTabIndex.value);
        if (mode === "waterfall") {
          if (isFirstLoad.value) {
            isFirstLoad.value = false;
            return;
          }
          waterfall.value.reset();
        }
      });
    });
    common_vendor.onReachBottom(() => {
      getMore();
    });
    const getMore = async () => {
      await photosStore.getMore();
    };
    const previewImage = (currentUrl) => {
      const urls = photosStore.photosList.map((item) => item);
      common_vendor.index.previewImage({
        urls,
        current: currentUrl
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true,
          ["home-icon"]: "",
          ["back-icon"]: ""
        }),
        b: common_vendor.f(common_vendor.unref(photosStore).groupList, (item, k0, i0) => {
          return {
            a: item.groupName,
            b: "32ea3c65-2-" + i0 + ",32ea3c65-1",
            c: common_vendor.p({
              name: item.groupName,
              title: item.title
            })
          };
        }),
        c: common_vendor.o(($event) => currentTabIndex.value = $event),
        d: common_vendor.p({
          ["active-color"]: "#2563eb",
          ["bar-color"]: "#2563eb",
          modelValue: currentTabIndex.value
        }),
        e: !common_vendor.unref(photosStore).isEmpty
      }, !common_vendor.unref(photosStore).isEmpty ? common_vendor.e({
        f: common_vendor.unref(mode) === "default"
      }, common_vendor.unref(mode) === "default" ? {
        g: common_vendor.p({
          data: common_vendor.unref(photosStore).photosList,
          column: 2,
          max: 9999999,
          ["lazy-load"]: true
        })
      } : {
        h: common_vendor.w(({
          item
        }, s0, i0) => {
          return {
            a: "32ea3c65-5-" + i0 + ",32ea3c65-4",
            b: common_vendor.p({
              src: item,
              mode: "widthFix"
            }),
            c: common_vendor.o(($event) => previewImage(item)),
            d: i0,
            e: s0
          };
        }, {
          name: "left",
          path: "h",
          vueId: "32ea3c65-4"
        }),
        i: common_vendor.w(({
          item
        }, s0, i0) => {
          return {
            a: "32ea3c65-6-" + i0 + ",32ea3c65-4",
            b: common_vendor.p({
              src: item,
              mode: "widthFix"
            }),
            c: common_vendor.o(($event) => previewImage(item)),
            d: i0,
            e: s0
          };
        }, {
          name: "right",
          path: "i",
          vueId: "32ea3c65-4"
        }),
        j: common_vendor.sr(waterfall, "32ea3c65-4", {
          "k": "waterfall"
        }),
        k: common_vendor.p({
          data: common_vendor.unref(photosStore).photosList,
          mode: "normal"
        })
      }) : {
        l: common_vendor.p({
          mode: "data",
          size: "lg"
        })
      }, {
        m: common_vendor.p({
          status: common_vendor.unref(photosStore).loadmoreStatus
        }),
        n: !common_vendor.unref(photosStore).isEmpty
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/photos/index.vue"]]);
wx.createPage(MiniProgramPage);
