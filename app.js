"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_config = require("./stores/config.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/category/index.js";
  "./pages/photos/index.js";
  "./pages/moments/index.js";
  "./pages/about/index.js";
  "./pages/detail_pages/article.js";
  "./pages/tool-pages/createPhotos.js";
  "./pages/tool-pages/createMoments.js";
  "./pages/detail_pages/friend.js";
  "./pages/detail_pages/archives.js";
  "./pages/about/sub-pages/contactMe.js";
  "./pages/tool-pages/search.js";
  "./pages/about/sub-pages/statement.js";
  "./pages/detail_pages/authorize.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const configStore = stores_config.useConfigStore();
    configStore.getSetting();
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const store = common_vendor.createPinia();
  store.use(common_vendor.createUnistorage());
  app.use(store);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
