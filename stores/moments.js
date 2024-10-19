"use strict";
const common_vendor = require("../common/vendor.js");
require("../utils/request.js");
require("./config.js");
const utils_module_moments = require("../utils/module/moments.js");
const config_base = require("../config/base.js");
const useMomentStore = common_vendor.defineStore("moment", () => {
  const list = common_vendor.ref([]);
  const page = common_vendor.ref(1);
  const tags = common_vendor.ref([]);
  const loadmoreStatus = common_vendor.ref("loadmore");
  const isEmpty = common_vendor.ref(false);
  function formatDate(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }
  function setItems(items) {
    for (const item of items) {
      if (item.spec.content.medium) {
        for (const medium of item.spec.content.medium) {
          if (medium.url && !medium.url.startsWith("http")) {
            medium.url = config_base.config.BASE_URL + medium.url;
          }
        }
      }
      if (item.spec.releaseTime) {
        item.spec.releaseTime = formatDate(item.spec.releaseTime);
      }
    }
    return items;
  }
  const getMomentList = async () => {
    try {
      const res = await utils_module_moments.moments.getMomentList(page.value);
      if (res.total === 0) {
        isEmpty.value = true;
      }
      list.value = setItems(res.items);
      if (!res.hasNext) {
        loadmoreStatus.value = "nomore";
      }
    } catch (error) {
      console.error("请求动态列表失败：", error);
    }
  };
  const getMore = async () => {
    if (loadmoreStatus.value === "nomore")
      return;
    try {
      loadmoreStatus.value = "loading";
      const res = await utils_module_moments.moments.getMomentList(++page.value);
      list.value = list.value.concat(setItems(res.items));
      loadmoreStatus.value = "loadmore";
      if (!res.hasNext) {
        loadmoreStatus.value = "nomore";
      }
    } catch (error) {
      console.error("请求动态列表失败：", error);
    }
  };
  const getTags = async () => {
    try {
      const tagsItem = await utils_module_moments.moments.getTags();
      tags.value = tagsItem.map((tag) => {
        return {
          label: tag,
          value: tag
        };
      });
    } catch (error) {
      console.error("请求标签列表失败：", error);
    }
  };
  const postMoment = async (data) => {
    try {
      await utils_module_moments.moments.postMoment(data);
      await common_vendor.index.showToast({
        title: "发布成功"
      });
      await getMomentList();
    } catch (error) {
      console.error("发布动态失败：", error);
    }
  };
  return {
    list,
    getMomentList,
    loadmoreStatus,
    isEmpty,
    getMore,
    getTags,
    tags,
    postMoment
  };
});
exports.useMomentStore = useMomentStore;
