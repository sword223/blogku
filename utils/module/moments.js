"use strict";
const utils_request = require("../request.js");
const stores_config = require("../../stores/config.js");
const moments = {
  getMomentList(page) {
    return utils_request.request.get(
      "/apis/api.tinytale.jiewen.run/tool-getMoments",
      {},
      {
        page,
        size: 10,
        sort: "spec.releaseTime,desc"
      }
    );
  },
  getTags() {
    return utils_request.request.get("/apis/console.api.moment.halo.run/v1alpha1/tags", {
      Authorization: "Bearer " + stores_config.useConfigStore().token
    });
  },
  postMoment(data) {
    return utils_request.request.post(
      "/apis/console.api.moment.halo.run/v1alpha1/moments",
      data,
      {
        Authorization: "Bearer " + stores_config.useConfigStore().token
      }
    );
  }
};
exports.moments = moments;
