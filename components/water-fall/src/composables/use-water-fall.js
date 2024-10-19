"use strict";
const common_vendor = require("../../../../common/vendor.js");
const useWaterFall = (props) => {
  const instance = common_vendor.getCurrentInstance();
  if (!instance) {
    common_vendor.debugWarn("TnWaterFall", "请在 setup 中使用 useWaterFall");
  }
  const componentId = `twf-${common_vendor.generateId()}`;
  const { getSelectorNodeInfo } = common_vendor.useSelectorQuery(instance);
  const leftData = common_vendor.ref([]);
  const rightData = common_vendor.ref([]);
  let leftContainerHeight = 0;
  let rightContainerHeight = 0;
  const getContainerHeight = async () => {
    try {
      const leftContainerRectInfo = await getSelectorNodeInfo(
        `#${componentId}-left`
      );
      const rightContainerRectInfo = await getSelectorNodeInfo(
        `#${componentId}-right`
      );
      leftContainerHeight = leftContainerRectInfo.height || leftContainerHeight;
      rightContainerHeight = rightContainerRectInfo.height || rightContainerHeight;
    } catch (err) {
      common_vendor.debugWarn("TnWaterFall", `获取容器高度信息失败：${err}`);
    }
  };
  let oldUserData = [];
  const splitData = async (data) => {
    if (!data || !data.length)
      return;
    if (props.mode === "calc") {
      await getContainerHeight();
      if (leftContainerHeight <= rightContainerHeight) {
        leftData.value.push(data.shift());
      } else {
        rightData.value.push(data.shift());
      }
      common_vendor.nextTick$1(() => {
        setTimeout(() => {
          splitData(data);
        }, 200);
      });
    } else if (props.mode === "normal") {
      let firstLeft = true;
      await getContainerHeight();
      if (leftData.value.length > rightData.value.length) {
        firstLeft = false;
      }
      let leftSmall = false;
      if (leftContainerHeight < rightContainerHeight) {
        leftSmall = true;
      }
      data.forEach((item, index) => {
        if (index % 2 === 0 && firstLeft || leftSmall) {
          leftData.value.push(item);
        } else {
          rightData.value.push(item);
        }
        if (!firstLeft) {
          firstLeft = true;
        }
        if (leftSmall && index >= 2) {
          leftSmall = false;
        }
      });
    }
  };
  const resetWaterFall = () => {
    if (!props.data)
      return;
    leftData.value = [];
    rightData.value = [];
    leftContainerHeight = 0;
    rightContainerHeight = 0;
    common_vendor.nextTick$1(() => {
      oldUserData = props.data;
      splitData(props.data);
    });
  };
  common_vendor.watch(
    () => props.data,
    (val) => {
      if (val.length === 0) {
        oldUserData = val;
        leftData.value = [];
        rightData.value = [];
        leftContainerHeight = 0;
        rightContainerHeight = 0;
      }
      if (oldUserData.length === val.length)
        return;
      const newData = common_vendor.cloneDeep(val.slice(oldUserData.length));
      if (!newData.length) {
        leftData.value = [];
        rightData.value = [];
        leftContainerHeight = 0;
        rightContainerHeight = 0;
      }
      common_vendor.nextTick$1(() => {
        oldUserData = val;
        splitData(newData);
      });
    },
    {
      immediate: true
    }
  );
  return {
    componentId,
    leftData,
    rightData,
    resetWaterFall
  };
};
exports.useWaterFall = useWaterFall;
