"use strict";
const utils_request = require("../request.js");
const comment = {
  getList(kind, name, page) {
    return utils_request.request.get(
      `/apis/api.halo.run/v1alpha1/comments`,
      {},
      {
        group: "content.halo.run",
        kind: kind ?? "Post",
        name,
        page,
        size: 20,
        version: "v1alpha1"
      }
    );
  },
  getReplyList(name) {
    return utils_request.request.get(`/apis/api.halo.run/v1alpha1/comments/${name}/reply`);
  },
  addComment(data) {
    return utils_request.request.post(`/apis/api.halo.run/v1alpha1/comments`, data, {
      "Content-Type": "application/json"
    });
  },
  addReply(data, name) {
    return utils_request.request.post(
      `/apis/api.halo.run/v1alpha1/comments/${name}/reply`,
      data,
      {
        "Content-Type": "application/json"
      }
    );
  }
};
exports.comment = comment;
