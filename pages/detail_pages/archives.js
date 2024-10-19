"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const hook_useWxShare_index = require("../../hook/use-wx-share/index.js");
const config_base = require("../../config/base.js");
if (!Math) {
  (TnNavbar + TnTimeLineData + TnTimeLineItem + TnTimeLine + TnLoadmore)();
}
const TnNavbar = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.js";
const TnTimeLine = () => "../../node-modules/tnuiv3p-tn-time-line/time-line.js";
const TnTimeLineItem = () => "../../node-modules/tnuiv3p-tn-time-line/time-line-item.js";
const TnTimeLineData = () => "../../node-modules/tnuiv3p-tn-time-line/time-line-data.js";
const TnLoadmore = () => "../../node-modules/@tuniao/tnui-vue3-uniapp/components/loadmore/src/loadmore.js";
const _sfc_defineComponent = common_vendor.defineComponent({
  __name: "archives",
  setup(__props) {
    common_vendor.onShareAppMessage(() => ({}));
    common_vendor.onShareTimeline(() => ({}));
    hook_useWxShare_index.useWxShare({
      title: "文章归档-" + config_base.config.title
    });
    const loadmoreStatus = common_vendor.ref("loadmore");
    const hasMore = common_vendor.ref(true);
    const timeLineData = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const lastTime = common_vendor.ref("");
    const handleTimeLineData = (data) => {
      data.forEach((item) => {
        const date = new Date(item.spec.publishTime);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const timeLineDataItem = item;
        const timeLineDataItemIndex = timeLineData.value.findIndex(
          (timeLineDataItem2) => timeLineDataItem2.month === month
        );
        if (timeLineDataItemIndex === -1) {
          timeLineData.value.push({
            month,
            data: [timeLineDataItem],
            icon: "time"
          });
        } else {
          timeLineData.value[timeLineDataItemIndex].data.push(timeLineDataItem);
        }
      });
      lastTime.value = timeLineData.value[timeLineData.value.length - 1].month;
      return timeLineData;
    };
    const getArchives = async (page) => {
      loadmoreStatus.value = "loading";
      if (!hasMore.value) {
        loadmoreStatus.value = "nomore";
        return;
      }
      try {
        const res = await utils_request.request.get(
          "/apis/api.content.halo.run/v1alpha1/posts",
          {},
          {
            page,
            size: 20,
            sort: "spec.publishTime,desc"
          }
        );
        loadmoreStatus.value = "loadmore";
        if (!res.hasNext) {
          hasMore.value = false;
          loadmoreStatus.value = "nomore";
        }
        console.log(res);
        console.log(handleTimeLineData(res.items));
        currentPage.value++;
      } catch (error) {
        console.log(error);
      }
    };
    getArchives(currentPage.value);
    common_vendor.onReachBottom(() => {
      console.log("page", currentPage.value);
      getArchives(currentPage.value);
    });
    const getArticleDetail = (metadataName, title) => {
      common_vendor.index.navigateTo({
        url: "/pages/detail_pages/article?metadataName=" + metadataName + "&title=" + title
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          fixed: true
        }),
        b: common_vendor.f(timeLineData.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.data, (dataItem, k1, i1) => {
              return {
                a: common_vendor.t(dataItem.spec.title),
                b: common_vendor.o(($event) => getArticleDetail(dataItem.metadata.name, dataItem.spec.title), dataItem.metadata.name),
                c: dataItem.metadata.name,
                d: "437cf101-3-" + i0 + "-" + i1 + "," + ("437cf101-2-" + i0)
              };
            }),
            b: index,
            c: "437cf101-2-" + i0 + ",437cf101-1",
            d: common_vendor.p({
              title: item.month,
              ["title-icon"]: item.icon !== void 0 ? item.icon : ""
            })
          };
        }),
        c: common_vendor.p({
          ["dot-color"]: "tn-purple"
        }),
        d: common_vendor.p({
          status: loadmoreStatus.value
        })
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-437cf101"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/pages/detail_pages/archives.vue"]]);
wx.createPage(MiniProgramPage);
