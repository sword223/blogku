"use strict";
const common_vendor = require("../common/vendor.js");
require("../utils/request.js");
require("../stores/config.js");
const utils_module_comment = require("../utils/module/comment.js");
const common_assets = require("../common/assets.js");
if (!Math) {
  (TnCommentList + TnEmpty + TnInput + TnFormItem + TnForm + TnButton + TnPopup)();
}
const TnCommentList = () => "../node-modules/tnuiv3p-tn-comment-list/index.js";
const TnPopup = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/popup/src/popup.js";
const TnForm = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form.js";
const TnFormItem = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/form/src/form-item.js";
const TnButton = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/button/src/button.js";
const TnInput = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/input/src/input.js";
const TnEmpty = () => "../node-modules/@tuniao/tnui-vue3-uniapp/components/empty/src/empty.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comment",
  props: {
    kind: {},
    name: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const commentList = common_vendor.ref();
    const commentListRef = common_vendor.ref();
    async function getCommentList() {
      const page = common_vendor.ref(1);
      try {
        const data = await utils_module_comment.comment.getList(
          props.kind,
          props.name,
          page.value
        );
        commentList.value = data.items.map((item) => {
          const date = new Date(item.spec.creationTime);
          const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;
          return {
            id: item.metadata.name,
            avatar: item.owner.avatar || common_assets.avatar,
            nickname: item.owner.displayName || "匿名用户",
            date: formattedDate,
            position: item.spec.ipAddress,
            content: item.spec.content,
            likeActive: false,
            likeCount: item.stats.upvote,
            dislikeActive: false,
            disabledReply: false,
            allowDelete: false,
            commentCount: item.status.replyCount
          };
        });
        if (data.total > 0) {
          isEmpty.value = false;
        }
        console.log("数据：" + commentList.value);
      } catch (error) {
        console.error("请求评论列表失败：", error);
      }
    }
    function convertComments(items) {
      const commentsMap = {};
      const rootComments = [];
      items.forEach((item) => {
        const date = new Date(item.metadata.creationTimestamp);
        const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;
        const comment2 = {
          id: item.metadata.name,
          // 假设使用 metadata.name 转换为唯一的 ID
          avatar: item.owner.avatar || common_assets.avatar,
          // 随机化头像
          nickname: item.spec.owner.displayName,
          date: formattedDate,
          position: item.spec.ipAddress,
          content: item.spec.content,
          likeActive: false,
          likeCount: item.stats.upvote,
          dislikeActive: false,
          disabledReply: false,
          allowDelete: false,
          commentCount: 0,
          // 初始化为0，稍后更新
          comment: []
        };
        commentsMap[item.metadata.name] = comment2;
        if (!item.spec.quoteReply) {
          rootComments.push(comment2);
        }
      });
      items.forEach((item) => {
        if (item.spec.quoteReply && commentsMap[item.spec.quoteReply]) {
          commentsMap[item.spec.quoteReply].comment.push(
            commentsMap[item.metadata.name]
          );
          commentsMap[item.spec.quoteReply].commentCount++;
        }
      });
      return rootComments;
    }
    const currentCommentId = common_vendor.ref("");
    const showMoreClickHandle = async ({ id }) => {
      var _a;
      currentCommentId.value = id;
      try {
        const data = await utils_module_comment.comment.getReplyList(id);
        console.log(data.items);
        (_a = commentListRef.value) == null ? void 0 : _a.addCommentData(id, convertComments(data.items));
      } catch (error) {
        console.error("请求回复列表失败：", error);
      }
    };
    getCommentList();
    const showPopup = common_vendor.ref(false);
    const replyId = common_vendor.ref("");
    const replyClickHandle = ({ id }) => {
      console.log("回复评论", id);
      showPopup.value = true;
      replyId.value = id;
    };
    const formRef = common_vendor.ref();
    const formData = common_vendor.reactive({
      comment: "",
      nickname: "",
      email: "",
      website: ""
    });
    const formRules = {
      comment: [
        { required: true, message: "请输入评论内容", trigger: ["change", "blur"] }
      ],
      nickname: [
        { required: true, message: "请输入昵称", trigger: ["change", "blur"] }
      ],
      email: [
        { required: true, message: "请输入邮箱", trigger: ["change", "blur"] },
        {
          type: "email",
          message: "请输入正确的邮箱格式",
          trigger: ["change", "blur"]
        }
      ],
      website: [
        { required: false, message: "网址", trigger: ["change", "blur"] },
        {
          type: "url",
          message: "请输入正确的网址格式",
          trigger: ["change", "blur"]
        }
      ]
    };
    const restForm = () => {
      formData.comment = "";
      formData.nickname = "";
      formData.email = "";
      formData.website = "";
      showPopup.value = false;
    };
    const replySubmit = () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.validate(async (valid) => {
        var _a2;
        if (valid) {
          let quoteReplyId = "";
          let id = "";
          if (replyId.value === currentCommentId.value || currentCommentId.value === "") {
            quoteReplyId = "";
            id = replyId.value;
          } else {
            quoteReplyId = replyId.value;
            id = currentCommentId.value;
          }
          console.log("提交表单", formData, quoteReplyId, id);
          try {
            const res = await utils_module_comment.comment.addReply(
              {
                raw: formData.comment,
                content: formData.comment,
                allowNotification: true,
                quoteReply: quoteReplyId,
                owner: {
                  displayName: formData.nickname,
                  email: formData.email,
                  website: formData.website
                }
              },
              id
            );
            common_vendor.index.showToast({
              title: "提交成功"
            });
            (_a2 = commentListRef.value) == null ? void 0 : _a2.addCommentReply(replyId.value, {
              id: res.metadata.name,
              avatar: common_assets.avatar,
              nickname: res.spec.owner.displayName,
              date: "刚刚",
              position: res.spec.ipAddress,
              content: res.spec.content,
              disabledReply: false,
              allowDelete: false
            });
            restForm();
          } catch (error) {
            console.error("提交评论失败：", error);
            common_vendor.index.showToast({
              title: "提交失败",
              icon: "none"
            });
          }
        } else {
          common_vendor.index.showToast({
            title: "表单校验失败",
            icon: "none"
          });
        }
      });
    };
    const articleComment = async () => {
      try {
        const res = await utils_module_comment.comment.addComment({
          raw: formData.comment,
          content: formData.comment,
          allowNotification: true,
          subjectRef: {
            group: "content.halo.run",
            kind: "Post",
            name: props.name,
            version: "v1alpha1"
          },
          owner: {
            displayName: formData.nickname,
            email: formData.email,
            website: formData.website
          }
        });
        common_vendor.index.showToast({
          title: "提交成功"
        });
        getCommentList();
        restForm();
      } catch (error) {
        console.error("提交评论失败：", error);
      }
    };
    const submitForm = () => {
      if (replyId.value === "") {
        articleComment();
      } else {
        replySubmit();
      }
    };
    const clearReplyId = () => {
      showPopup.value = true;
      replyId.value = "";
    };
    __expose({
      showPopup,
      clearReplyId
    });
    const isEmpty = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isEmpty.value
      }, !isEmpty.value ? {
        b: common_vendor.sr(commentListRef, "03b42f1c-0", {
          "k": "commentListRef"
        }),
        c: common_vendor.o(showMoreClickHandle),
        d: common_vendor.o(replyClickHandle),
        e: common_vendor.p({
          data: commentList.value,
          ["show-dislike"]: false
        })
      } : {
        f: common_vendor.p({
          mode: "data"
        })
      }, {
        g: common_vendor.o(($event) => common_vendor.unref(formData).comment = $event),
        h: common_vendor.p({
          type: "textarea",
          placeholder: "请输入评论内容",
          height: "250",
          modelValue: common_vendor.unref(formData).comment
        }),
        i: common_vendor.p({
          prop: "comment"
        }),
        j: common_vendor.o(($event) => common_vendor.unref(formData).nickname = $event),
        k: common_vendor.p({
          type: "textarea",
          placeholder: "昵称",
          modelValue: common_vendor.unref(formData).nickname
        }),
        l: common_vendor.p({
          prop: "nickname"
        }),
        m: common_vendor.o(($event) => common_vendor.unref(formData).email = $event),
        n: common_vendor.p({
          placeholder: "邮箱",
          type: "textarea",
          modelValue: common_vendor.unref(formData).email
        }),
        o: common_vendor.p({
          prop: "email"
        }),
        p: common_vendor.o(($event) => common_vendor.unref(formData).website = $event),
        q: common_vendor.p({
          type: "textarea",
          placeholder: "网址",
          modelValue: common_vendor.unref(formData).website
        }),
        r: common_vendor.p({
          prop: "website"
        }),
        s: common_vendor.sr(formRef, "03b42f1c-3,03b42f1c-2", {
          "k": "formRef"
        }),
        t: common_vendor.p({
          model: common_vendor.unref(formData),
          rules: formRules
        }),
        v: common_vendor.o(($event) => submitForm()),
        w: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3b82f6",
          ["text-color"]: "#fff"
        }),
        x: common_vendor.o(($event) => showPopup.value = $event),
        y: common_vendor.p({
          ["open-direction"]: "bottom",
          modelValue: showPopup.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/components/comment.vue"]]);
wx.createComponent(Component);
