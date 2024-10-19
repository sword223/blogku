"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const utils_module_photos = require("../../utils/module/photos.js");
const stores_config = require("../../stores/config.js");
const config_base = require("../../config/base.js");
const stores_user = require("../../stores/user.js");
const stores_photos = require("../../stores/photos.js");
if (!Math) {
  (TnNavbar + SelectTags + TnImageUpload + TnButton + empty)();
}
const TnImageUpload = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/image-upload/src/image-upload.js";
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const SelectTags = () => "../../node-modules/tnuiv3p-tn-select-tags/index.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const empty = () => "../../components/empty.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "createPhotos",
  setup(__props) {
    const photosStore = stores_photos.usePhotosStore();
    const configStore = stores_config.useConfigStore();
    const auth = common_vendor.ref(false);
    auth.value = stores_user.useUserStore().admin;
    photosStore.getGroupList();
    const photoData = common_vendor.ref([]);
    const imageList = common_vendor.ref([]);
    const actionUrl = config_base.config.BASE_URL + "/apis/api.console.halo.run/v1alpha1/attachments/upload";
    const uploadHandle = (file) => {
      return new Promise((resolve, reject) => {
        var _a, _b;
        const url = file.path;
        common_vendor.index.uploadFile({
          url: actionUrl,
          header: {
            Authorization: "Bearer " + configStore.token
          },
          formData: {
            policyName: ((_a = configStore.basic) == null ? void 0 : _a.policyName) || "default-policy",
            groupName: ((_b = configStore.basic) == null ? void 0 : _b.groupName) ?? ""
          },
          filePath: url,
          name: "file",
          success: (res) => {
            const data = JSON.parse(res.data);
            const imgUrl = data.metadata.annotations["storage.halo.run/uri"] || data.metadata.annotations["storage.halo.run/external-link"];
            const imgTitle = url.split("/").pop();
            const postImg = {
              metadata: {
                name: "",
                generateName: "photo-"
              },
              spec: {
                groupName: "",
                url: imgUrl,
                cover: imgUrl,
                displayName: imgTitle,
                type: data.spec.mediaType
              },
              kind: "Photo",
              apiVersion: "core.halo.run/v1alpha1"
            };
            photoData.value.push(postImg);
            resolve(imgUrl.startsWith("http") ? imgUrl : config_base.config.BASE_URL + imgUrl);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    };
    const currentSelectTags = common_vendor.ref([]);
    const submit = () => {
      for (const item of photoData.value) {
        item.spec.url = item.spec.url.startsWith("http") ? item.spec.url : config_base.config.BASE_URL + item.spec.url;
        if (!imageList.value.includes(item.spec.url)) {
          continue;
        }
        item.spec.groupName = currentSelectTags.value[0];
        try {
          utils_module_photos.photos.postPhoto(item).then((res) => {
            console.log(res);
            common_vendor.index.showToast({
              title: "发布成功"
            });
            photoData.value = [];
            imageList.value = [];
            currentSelectTags.value = [];
            photosStore.getPhotosList("all");
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          fixed: true
        }),
        b: auth.value
      }, auth.value ? {
        c: common_vendor.o(($event) => currentSelectTags.value = $event),
        d: common_vendor.p({
          items: common_vendor.unref(photosStore).allGroupList,
          multiple: false,
          cancelable: false,
          ["active-bg-color"]: "#6366f1",
          ["active-color"]: "#fff",
          modelValue: currentSelectTags.value
        }),
        e: common_vendor.o(($event) => imageList.value = $event),
        f: common_vendor.p({
          action: actionUrl,
          ["custom-upload-handler"]: uploadHandle,
          limit: 99,
          modelValue: imageList.value
        }),
        g: common_vendor.o(submit),
        h: common_vendor.p({
          ["bg-color"]: "#2563eb",
          ["text-color"]: "#fff",
          size: "xl"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/tool-pages/createPhotos.vue"]]);
wx.createPage(MiniProgramPage);
