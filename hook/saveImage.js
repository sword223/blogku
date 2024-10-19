"use strict";
const common_vendor = require("../common/vendor.js");
const isAuth = () => {
  common_vendor.index.showModal({
    content: "由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权。",
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.openSetting({
          success: (result) => {
            console.log(result.authSetting);
          }
        });
      }
    }
  });
};
const saveNetImageToLocal = (url) => {
  common_vendor.index.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        common_vendor.index.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: "图片保存成功！",
                icon: "none"
              });
            }, 1e3);
          },
          fail: (err) => {
            console.log(err.errMsg);
            common_vendor.index.showToast({
              title: err.errMsg,
              icon: "none"
            });
          },
          // 无论成功失败都走的回调
          complete: () => {
            common_vendor.index.hideLoading();
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "网络错误！",
          icon: "none"
        });
      }
    }
  });
};
function downloadFile(url) {
  common_vendor.index.showLoading({
    title: "正在保存图片..."
  });
  common_vendor.index.authorize({
    scope: "scope.writePhotosAlbum",
    success: () => {
      common_vendor.index.hideLoading();
      saveNetImageToLocal(url);
    },
    // 授权失败
    fail: () => {
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "未授权保存图片到相册！",
        icon: "none"
      });
      common_vendor.index.getSetting({
        success: (res) => {
          common_vendor.index.showToast({
            title: res,
            icon: "none"
          });
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            isAuth();
          }
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
  });
}
exports.downloadFile = downloadFile;
