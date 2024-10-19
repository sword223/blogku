"use strict";
const common_vendor = require("../../common/vendor.js");
const config_base = require("../../config/base.js");
const useWxShare = (options) => {
  const title = (options == null ? void 0 : options.title) ?? config_base.config.title;
  const path = (options == null ? void 0 : options.path) ?? "";
  const query = (options == null ? void 0 : options.query) ?? "";
  const imageUrl = (options == null ? void 0 : options.imageUrl) ?? "";
  common_vendor.onShareAppMessage(() => {
    return {
      title,
      path: path ? `${path}${query ? `?${query}` : ""}` : "",
      imageUrl
    };
  });
  common_vendor.onShareTimeline(() => {
    return {
      title,
      query: (options == null ? void 0 : options.query) ?? "",
      imageUrl
    };
  });
};
exports.useWxShare = useWxShare;
