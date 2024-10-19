"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore(
  "user",
  () => {
    const admin = common_vendor.ref(false);
    const articleLike = common_vendor.ref([]);
    const setAdmin = (value) => {
      admin.value = value;
    };
    function isLike(id) {
      var _a;
      return (_a = articleLike.value) == null ? void 0 : _a.includes(id);
    }
    const addLike = (id) => {
      var _a;
      (_a = articleLike.value) == null ? void 0 : _a.push(id);
    };
    return { articleLike, isLike, addLike, admin, setAdmin };
  },
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    unistorage: true
    // 开启后对 state 的数据读写都将持久化
  }
);
exports.useUserStore = useUserStore;
