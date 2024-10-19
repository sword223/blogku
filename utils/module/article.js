"use strict";
const utils_request = require("../request.js");
const config_base = require("../../config/base.js");
const article = {
  getData(id) {
    return utils_request.request.get(`/apis/api.content.halo.run/v1alpha1/posts/${id}`);
  },
  upvote(id) {
    return utils_request.request.post(`/apis/api.halo.run/v1alpha1/trackers/upvote`, {
      group: "content.halo.run",
      plural: "posts",
      name: id
    });
  },
  //   添加阅读量
  addView(name, screen, url) {
    const match = config_base.config.BASE_URL.match(/:\/\/(.[^/]+)/);
    const hostname = match ? match[1] : "localhost";
    return utils_request.request.post(`/apis/api.halo.run/v1alpha1/trackers/counter`, {
      group: "content.halo.run",
      plural: "posts",
      name,
      hostname,
      screen,
      language: "zh-CN",
      url,
      referrer: ""
    });
  }
};
exports.article = article;
