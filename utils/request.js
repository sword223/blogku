"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const common_vendor = require("../common/vendor.js");
const config_base = require("../config/base.js");
let BASE_URL = "";
BASE_URL = config_base.config.BASE_URL;
class URLRequest {
  constructor() {
    __publicField(this, "header", {});
  }
  setHeader(header) {
    this.header = { ...this.header, ...header };
  }
  request(url, method, header = {}, data = {}, showError = true) {
    this.getNetworkType();
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: BASE_URL + url,
        method,
        header: { ...this.header, ...header },
        // 合并实例头信息和方法提供的头信息
        data,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          if (showError) {
            common_vendor.index.showToast({
              icon: "none",
              title: "请求失败",
              duration: 2e3
            });
          }
          reject(err);
        }
      });
    });
  }
  /**
   * 检查网络
   */
  getNetworkType() {
    common_vendor.index.getNetworkType({
      success: function(res) {
        if (res.networkType === "none") {
          common_vendor.index.showToast({
            icon: "none",
            title: "网络异常，请检测网络配置!",
            duration: 2e3
          });
        }
      }
    });
  }
  get(url, header = {}, params = {}) {
    return this.request(url, "GET", header, params);
  }
  post(url, data = {}, header = {}, showError = true) {
    return this.request(
      url,
      "POST",
      header,
      data,
      showError
    );
  }
}
const request = new URLRequest();
exports.request = request;
