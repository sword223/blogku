"use strict";
const utils_request = require("../request.js");
const category = {
  getList() {
    return utils_request.request.get("/apis/api.content.halo.run/v1alpha1/categories");
  },
  getPostList(name, page) {
    return utils_request.request.get(
      `/apis/api.content.halo.run/v1alpha1/categories/${name}/posts`,
      {},
      {
        page,
        size: 20,
        sort: "spec.publishTime,desc"
      }
    );
  }
};
exports.category = category;
