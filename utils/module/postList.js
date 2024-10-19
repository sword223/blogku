"use strict";
const utils_request = require("../request.js");
const post = {
  getPostList(page) {
    return utils_request.request.get(
      `/apis/api.content.halo.run/v1alpha1/posts?page=${page}&size=20&sort=spec.pinned%2Cdesc&sort=spec.publishTime%2Cdesc`,
      {},
      {}
    );
  }
};
exports.post = post;
