"use strict";
const common_vendor = require("../common/vendor.js");
require("../utils/request.js");
const utils_module_category = require("../utils/module/category.js");
require("./config.js");
const config_base = require("../config/base.js");
const useCategoryStore = common_vendor.defineStore("CategoryStore", () => {
  common_vendor.ref(false);
  const list = common_vendor.ref([]);
  const postList = common_vendor.ref([]);
  const page = common_vendor.ref(1);
  const currentCategory = common_vendor.ref("");
  const title = common_vendor.ref("");
  const isEmpty = common_vendor.ref(true);
  const loadmoreStatus = common_vendor.ref("loadmore");
  const setCurrentCategory = (name, newTitle) => {
    currentCategory.value = name;
    title.value = newTitle;
    getPostList(name, newTitle);
  };
  async function getList() {
    try {
      const res = await utils_module_category.category.getList();
      res.items.forEach((item) => {
        if (item.spec.cover && !item.spec.cover.startsWith("http")) {
          item.spec.cover = config_base.config.BASE_URL + item.spec.cover;
        }
      });
      res.items.sort((a, b) => a.spec.priority - b.spec.priority);
      list.value = res.items;
      currentCategory.value = res.items[0].metadata.name;
      title.value = res.items[0].spec.displayName;
    } catch (error) {
      console.error("请求帖子列表失败：", error);
    }
  }
  async function getPostList(name, newTitle) {
    isEmpty.value = true;
    page.value = 1;
    currentCategory.value = name === "default" ? list.value[0].metadata.name : name;
    postList.value = [];
    title.value = newTitle === "default" ? list.value[0].spec.displayName : newTitle;
    try {
      const res = await utils_module_category.category.getPostList(
        currentCategory.value,
        page.value
      );
      if (page.value === 1 && res.total > 0) {
        isEmpty.value = false;
      }
      loadmoreStatus.value = "loading";
      res.items.forEach((item) => {
        if (item.spec.cover && !item.spec.cover.startsWith("http")) {
          item.spec.cover = config_base.config.BASE_URL + item.spec.cover;
        }
        postList.value.push(item);
      });
      loadmoreStatus.value = "loadmore";
      if (!res.hasNext) {
        loadmoreStatus.value = "nomore";
      }
    } catch (error) {
      console.error("请求帖子列表失败：", error);
    }
  }
  async function getMore() {
    if (loadmoreStatus.value === "nomore") {
      return;
    }
    try {
      const res = await utils_module_category.category.getPostList(
        currentCategory.value,
        ++page.value
      );
      res.items.forEach((item) => {
        if (item.spec.cover && !item.spec.cover.startsWith("http")) {
          item.spec.cover = config_base.config.BASE_URL + item.spec.cover;
        }
        postList.value.push(item);
      });
      loadmoreStatus.value = "loadmore";
      if (!res.hasNext) {
        loadmoreStatus.value = "nomore";
      }
    } catch (error) {
      console.error("请求帖子列表失败：", error);
    }
  }
  return {
    list,
    getList,
    postList,
    getPostList,
    title,
    currentCategory,
    getMore,
    loadmoreStatus,
    isEmpty,
    setCurrentCategory
  };
});
exports.useCategoryStore = useCategoryStore;
