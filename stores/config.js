"use strict";
const common_vendor = require("../common/vendor.js");
require("../utils/request.js");
const utils_module_config = require("../utils/module/config.js");
const config_base = require("../config/base.js");
const stores_category = require("./category.js");
const useConfigStore = common_vendor.defineStore("configStore", () => {
  const isAuthorized = common_vendor.ref(true);
  const configData = common_vendor.ref();
  const basic = common_vendor.ref();
  const home = common_vendor.ref();
  const about = common_vendor.ref();
  const article = common_vendor.ref();
  const hotCategories = common_vendor.ref([]);
  const notionData = common_vendor.ref();
  const socials = common_vendor.ref([]);
  const token = common_vendor.ref("");
  const socialsMode = [
    {
      name: "qq",
      icon: "i-mdi-qqchat",
      title: "QQ",
      content: ""
    },
    {
      name: "wechat",
      icon: "i-mdi-wechat",
      title: "微信",
      content: ""
    },
    {
      name: "email",
      icon: "i-mdi-email",
      title: "邮箱",
      content: ""
    },
    {
      name: "github",
      icon: "i-mdi-github",
      title: "GitHub",
      content: ""
    },
    {
      name: "twitter",
      icon: "i-mdi-twitter",
      title: "Twitter",
      content: ""
    },
    {
      name: "facebook",
      icon: "i-mdi-facebook",
      title: "Facebook",
      content: ""
    },
    {
      name: "instagram",
      icon: "i-mdi-instagram",
      title: "Instagram",
      content: ""
    },
    {
      name: "linkedIn",
      icon: "i-mdi-linkedin",
      title: "LinkedIn",
      content: ""
    },
    {
      name: "youTube",
      icon: "i-mdi-youtube",
      title: "YouTube",
      content: ""
    },
    {
      name: "weibo",
      icon: "i-mdi-sina",
      title: "微博",
      content: ""
    },
    {
      name: "zhihu",
      icon: "i-ant-design-zhihu-circle-filled",
      title: "知乎",
      content: ""
    },
    {
      name: "douban",
      icon: "i-tabler-brand-douban",
      title: "豆瓣",
      content: ""
    },
    {
      name: "telegram",
      icon: "i-ic-baseline-telegram",
      title: "Telegram",
      content: ""
    },
    {
      name: "bilibili",
      icon: "i-tabler-brand-bilibili",
      title: "Bilibili",
      content: ""
    },
    {
      name: "rss",
      icon: "i-mdi-rss-box",
      title: "RSS",
      content: ""
    }
  ];
  function completeImageUrls(data) {
    const completedData = { ...data };
    if (!completedData.about.homeUserAvatar.startsWith("http") && completedData.about.homeUserAvatar) {
      completedData.about.homeUserAvatar = config_base.config.BASE_URL + completedData.about.homeUserAvatar;
    }
    if (!completedData.about.qrcode.qrcodeImage.startsWith("http") && completedData.about.qrcode.qrcodeImage) {
      completedData.about.qrcode.qrcodeImage = config_base.config.BASE_URL + completedData.about.qrcode.qrcodeImage;
    }
    if (completedData.article.errorImage && !completedData.article.errorImage.startsWith("http")) {
      completedData.article.errorImage = config_base.config.BASE_URL + completedData.article.errorImage;
    }
    if (completedData.article.loadingImage && !completedData.article.loadingImage.startsWith("http")) {
      completedData.article.loadingImage = config_base.config.BASE_URL + completedData.article.loadingImage;
    }
    completedData.home.carousel = completedData.home.carousel.map((item) => ({
      ...item,
      image: item.image.startsWith("http") ? item.image : config_base.config.BASE_URL + item.image
    }));
    if (!completedData.basic.searchIcon.startsWith("http") && completedData.basic.searchIcon) {
      completedData.basic.searchIcon = config_base.config.BASE_URL + completedData.basic.searchIcon;
    }
    return completedData;
  }
  const handleHotCategories = async (data) => {
    try {
      await stores_category.useCategoryStore().getList();
      const categoryList = stores_category.useCategoryStore().list;
      if (categoryList.length > 0) {
        hotCategories.value = data.map(
          (categoryName) => categoryList.find(
            (categoryItem) => categoryItem.metadata.name === categoryName
          )
        ).filter((item) => item !== void 0);
      }
    } catch (error) {
      console.error("请求热门分类失败：", error);
    }
  };
  async function getSetting() {
    try {
      const res = await utils_module_config.baseConfig.getSetting();
      if (Object.keys(res).length === 0) {
        isAuthorized.value = false;
      }
      const completedData = completeImageUrls(res);
      configData.value = completedData;
      basic.value = completedData.basic;
      handleHotCategories(completedData.home.hot_category);
      home.value = completedData.home;
      about.value = completedData.about;
      article.value = completedData.article;
      if (res.home.notice.noticeContent) {
        notionData.value = res.home.notice.noticeContent.split("\n");
      }
      socials.value = socialsMode.filter(
        (item) => res.about.social.social_links.some((social) => {
          if (item.name === social.icon_code) {
            item.content = social.link;
            return true;
          }
          return false;
        })
      );
    } catch (error) {
      console.error("请求配置失败：", error);
    }
  }
  const checkAuthorization = () => {
    if (!isAuthorized.value) {
      common_vendor.index.showModal({
        title: "应用未授权",
        content: "您的小程序尚未授权，请购买后再使用！！！",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: "/pages/detail_pages/authorize"
            });
          }
        }
      });
    }
  };
  return {
    configData,
    basic,
    home,
    about,
    article,
    getSetting,
    hotCategories,
    notionData,
    socials,
    checkAuthorization,
    token
  };
});
exports.useConfigStore = useConfigStore;
