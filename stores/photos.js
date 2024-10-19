"use strict";
const common_vendor = require("../common/vendor.js");
require("../utils/request.js");
const utils_module_photos = require("../utils/module/photos.js");
require("./config.js");
const config_base = require("../config/base.js");
const usePhotosStore = common_vendor.defineStore("PhotoStore", () => {
  const groupList = common_vendor.ref([
    { title: "全部", groupName: "all" }
  ]);
  const allGroupList = common_vendor.ref([]);
  const photosList = common_vendor.ref([]);
  const currentGroup = common_vendor.ref("");
  const currentPage = common_vendor.ref(1);
  const loadmoreStatus = common_vendor.ref("loadmore");
  const isEmpty = common_vendor.ref(false);
  async function getGroupList() {
    groupList.value = [{ title: "全部", groupName: "all" }];
    allGroupList.value = [];
    try {
      const res = await utils_module_photos.photos.getPhotoGroupList();
      res.items.forEach((item) => {
        groupList.value.push({
          title: item.spec.displayName,
          groupName: item.metadata.name
        });
        allGroupList.value.push({
          label: item.spec.displayName,
          value: item.metadata.name
        });
      });
    } catch (error) {
      console.error("请求照片列表失败：", error);
    }
  }
  async function fetchPhotosList(name, page) {
    loadmoreStatus.value = "loading";
    const res = await utils_module_photos.photos.getPhotosList(name, page);
    if (res.total === 0) {
      isEmpty.value = true;
      return;
    }
    isEmpty.value = false;
    const list = res.items.map((item) => {
      item.spec.url = item.spec.url.startsWith("http") ? item.spec.url : config_base.config.BASE_URL + item.spec.url;
      return item.spec.url;
    });
    photosList.value = [...photosList.value, ...list];
    loadmoreStatus.value = "loadmore";
    if (!res.hasNext) {
      loadmoreStatus.value = "nomore";
    }
  }
  async function getPhotosList(name) {
    currentGroup.value = name ?? "";
    currentPage.value = 1;
    photosList.value = [];
    try {
      await fetchPhotosList(name ?? "", 1);
    } catch (error) {
      console.error("请求照片列表失败：", error);
    }
  }
  async function getMore() {
    if (loadmoreStatus.value === "nomore") {
      return;
    }
    try {
      await fetchPhotosList(currentGroup.value, ++currentPage.value);
    } catch (error) {
      console.error("请求照片列表失败：", error);
    }
  }
  return {
    groupList,
    photosList,
    getGroupList,
    getPhotosList,
    getMore,
    loadmoreStatus,
    isEmpty,
    allGroupList
  };
});
exports.usePhotosStore = usePhotosStore;
