"use strict";
const utils_request = require("../request.js");
const baseConfig = {
  getSetting() {
    return utils_request.request.get("/apis/api.tinytale.jiewen.run/tool-options", {});
  },
  getVerify: (code) => {
    return utils_request.request.get(
      "/apis/api.tinytale.jiewen.run/verify-openid",
      {},
      {
        code
      }
    );
  }
};
exports.baseConfig = baseConfig;
