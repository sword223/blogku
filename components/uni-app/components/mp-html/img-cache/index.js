"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const data = {
  name: "imgcache",
  prefix: "imgcache_"
};
function ImgCache(vm) {
  this.vm = vm;
  this.i = 0;
  vm.imgCache = {
    get list() {
      return common_vendor.index.getStorageInfoSync().keys.filter((key) => key.startsWith(data.prefix)).map((key) => key.split(data.prefix)[1]);
    },
    get(url) {
      return common_vendor.index.getStorageSync(data.prefix + url);
    },
    delete(url) {
      const path = common_vendor.index.getStorageSync(data.prefix + url);
      if (!path)
        return false;
      plus.io.resolveLocalFileSystemURL(path, (entry) => {
        entry.remove();
      });
      common_vendor.index.removeStorageSync(data.prefix + url);
      return true;
    },
    async add(url) {
      const filename = await download(url);
      if (filename) {
        common_vendor.index.setStorageSync(data.prefix + url, filename);
        return "file://" + plus.io.convertLocalFileSystemURL(filename);
      }
      return null;
    },
    clear() {
      common_vendor.index.getStorageInfoSync().keys.filter((key) => key.startsWith(data.prefix)).forEach((key) => {
        common_vendor.index.removeStorageSync(key);
      });
      plus.io.resolveLocalFileSystemURL(`_doc/${data.name}/`, (entry) => {
        entry.removeRecursively(
          (entry2) => {
            console.log(`${data.name}缓存删除成功`, entry2);
          },
          (e) => {
            console.log(`${data.name}缓存删除失败`, e);
          }
        );
      });
    }
  };
}
exports.ImgCache = ImgCache;
