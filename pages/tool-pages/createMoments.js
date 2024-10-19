"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_moments = require("../../stores/moments.js");
const config_base = require("../../config/base.js");
const stores_user = require("../../stores/user.js");
const stores_config = require("../../stores/config.js");
if (!Math) {
  (TnNavbar + SelectTags + TnInput + TnImageUpload + TnButton + empty)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnInput = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/input/src/input.js";
const SelectTags = () => "../../node-modules/tnuiv3p-tn-select-tags/index.js";
const TnImageUpload = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/image-upload/src/image-upload.js";
const TnButton = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const empty = () => "../../components/empty.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "createMoments",
  setup(__props) {
    const configStore = stores_config.useConfigStore();
    const auth = common_vendor.ref(false);
    auth.value = stores_user.useUserStore().admin;
    const momentStore = stores_moments.useMomentStore();
    momentStore.getTags();
    const markdownText = common_vendor.ref("");
    const htmlText = common_vendor.ref("");
    const updateHTML = () => {
      htmlText.value = renderedMarkdown(markdownText.value);
    };
    const renderedMarkdown = (markdown) => {
      const md = new common_vendor.MarkdownIt();
      return md.render(markdown);
    };
    const currentSelectTags = common_vendor.ref([]);
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
            url.split("/").pop();
            const postImg = {
              type: "PHOTO",
              url: imgUrl,
              originType: data.spec.mediaType
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
    function insertLinksAtFirstParagraph(html, urls) {
      const regex = /<p\s*[^>]*>/i;
      const match = html.match(regex);
      if (!match)
        return html;
      const insertionPoint = match.index + match[0].length;
      const linksHtml = urls.map((url) => `<a class="tag" href="?tag=${url}" data-pjax="">${url}</a>`).join("");
      return html.slice(0, insertionPoint) + linksHtml + html.slice(insertionPoint);
    }
    function setDataModel() {
      const now = /* @__PURE__ */ new Date();
      htmlText.value = insertLinksAtFirstParagraph(
        htmlText.value,
        currentSelectTags.value
      );
      photoData.value = photoData.value.filter((item) => {
        item.url = item.url.startsWith("http") ? item.url : config_base.config.BASE_URL + item.url;
        return imageList.value.some((img) => img === item.url);
      });
      console.log("photoData", photoData.value);
      const data = {
        spec: {
          content: {
            raw: htmlText.value,
            html: htmlText.value,
            medium: photoData.value
          },
          releaseTime: now.toISOString(),
          owner: "",
          visible: "PUBLIC",
          tags: currentSelectTags.value
        },
        metadata: { generateName: "moment-" },
        kind: "Moment",
        apiVersion: "moment.halo.run/v1alpha1"
      };
      return data;
    }
    const postMoment = () => {
      const data = setDataModel();
      momentStore.postMoment(data);
      markdownText.value = "";
      photoData.value = [];
      imageList.value = [];
      currentSelectTags.value = [];
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
          items: common_vendor.unref(momentStore).tags,
          ["active-bg-color"]: "#6366f1",
          ["active-color"]: "#fff",
          modelValue: currentSelectTags.value
        }),
        e: common_vendor.o(updateHTML),
        f: common_vendor.o(($event) => markdownText.value = $event),
        g: common_vendor.p({
          type: "textarea",
          border: false,
          placeholder: "分享此刻的心情吧！！！",
          height: "300",
          modelValue: markdownText.value
        }),
        h: common_vendor.o(($event) => imageList.value = $event),
        i: common_vendor.p({
          action: actionUrl,
          ["custom-upload-handler"]: uploadHandle,
          modelValue: imageList.value
        }),
        j: common_vendor.o(postMoment),
        k: common_vendor.p({
          ["bg-color"]: "#2563eb",
          ["text-color"]: "#fff",
          size: "xl"
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/tool-pages/createMoments.vue"]]);
wx.createPage(MiniProgramPage);
