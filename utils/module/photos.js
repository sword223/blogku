"use strict";
const utils_request = require("../request.js");
const stores_config = require("../../stores/config.js");
const photos = {
  getPhotoGroupList() {
    return utils_request.request.get("/apis/api.tinytale.jiewen.run/tool-getPhotoGroups", {});
  },
  getPhotosList(name, page) {
    if (name === "all") {
      name = "";
    }
    return utils_request.request.get(
      `/apis/api.tinytale.jiewen.run/tool-getPhotos`,
      {},
      {
        page,
        size: 10,
        group: name
      }
    );
  },
  postPhoto(data) {
    return utils_request.request.post(`/apis/core.halo.run/v1alpha1/photos`, data, {
      Authorization: "Bearer " + stores_config.useConfigStore().token
    });
  }
};
exports.photos = photos;
