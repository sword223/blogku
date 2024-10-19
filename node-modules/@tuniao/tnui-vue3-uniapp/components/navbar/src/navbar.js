"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "navbar",
  props: common_vendor.navBarProps,
  emits: common_vendor.navbarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { navbackButtonType, hasRightOperation, clickBackEvent, clickHomeEvent } = common_vendor.useNavbar(props);
    const {
      ns,
      backNs,
      navBarInfo,
      navbarClass,
      navbarStyle,
      navbarBgClass,
      navbarBgStyle,
      navbarPlaceholderStyle,
      navbarWrapperStyle,
      backStyle,
      contentStyle,
      rightOperationStyle
    } = common_vendor.useNavbarCustomStyle(props, navbackButtonType, hasRightOperation);
    const backEvent = (type) => {
      if (type === "back") {
        clickBackEvent();
      } else {
        clickHomeEvent();
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        emits("initFinish", navBarInfo);
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(navbarBgClass)),
        b: common_vendor.s(common_vendor.unref(navbarBgStyle)),
        c: common_vendor.unref(navbackButtonType) !== "none"
      }, common_vendor.unref(navbackButtonType) !== "none" ? common_vendor.e({
        d: common_vendor.unref(navbackButtonType) === "multi"
      }, common_vendor.unref(navbackButtonType) === "multi" ? {
        e: common_vendor.p({
          name: props.backIcon
        }),
        f: common_vendor.n(common_vendor.unref(backNs).e("multi__item")),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(clickBackEvent) && common_vendor.unref(clickBackEvent)(...args)
        ),
        h: common_vendor.p({
          name: props.homeIcon
        }),
        i: common_vendor.n(common_vendor.unref(backNs).e("multi__item")),
        j: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(clickHomeEvent) && common_vendor.unref(clickHomeEvent)(...args)
        ),
        k: common_vendor.n(common_vendor.unref(backNs).e("multi"))
      } : {}, {
        l: common_vendor.unref(navbackButtonType) === "single"
      }, common_vendor.unref(navbackButtonType) === "single" ? common_vendor.e({
        m: props.backIcon
      }, props.backIcon ? {
        n: common_vendor.p({
          name: props.backIcon
        })
      } : props.homeIcon ? {
        p: common_vendor.p({
          name: props.homeIcon
        })
      } : {}, {
        o: props.homeIcon,
        q: common_vendor.n(common_vendor.unref(backNs).e("single")),
        r: common_vendor.o(($event) => backEvent(props.backIcon ? "back" : "home"))
      }) : {}, {
        s: common_vendor.unref(navbackButtonType) === "text"
      }, common_vendor.unref(navbackButtonType) === "text" ? {
        t: common_vendor.p({
          name: _ctx.backIcon || "left"
        }),
        v: common_vendor.n(common_vendor.unref(backNs).e("text__icon")),
        w: common_vendor.t(_ctx.backText || "返回"),
        x: common_vendor.n(common_vendor.unref(backNs).e("text__value")),
        y: common_vendor.n(common_vendor.unref(backNs).e("text")),
        z: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(clickBackEvent) && common_vendor.unref(clickBackEvent)(...args)
        )
      } : {}, {
        A: common_vendor.n(common_vendor.unref(backNs).b()),
        B: common_vendor.s(common_vendor.unref(backStyle))
      }) : {}, {
        C: _ctx.$slots.default
      }, _ctx.$slots.default ? {
        D: common_vendor.n(common_vendor.unref(ns).e("content")),
        E: common_vendor.n({
          [common_vendor.unref(ns).em("content", "center")]: props.center
        }),
        F: common_vendor.s(common_vendor.unref(contentStyle))
      } : {}, {
        G: _ctx.$slots.right
      }, _ctx.$slots.right ? {
        H: common_vendor.n(common_vendor.unref(ns).e("right-operation")),
        I: common_vendor.s(common_vendor.unref(rightOperationStyle))
      } : {}, {
        J: common_vendor.n(common_vendor.unref(ns).e("wrapper")),
        K: common_vendor.s(common_vendor.unref(navbarWrapperStyle)),
        L: common_vendor.n(common_vendor.unref(navbarClass)),
        M: common_vendor.s(common_vendor.unref(navbarStyle)),
        N: _ctx.fixed && _ctx.placeholder
      }, _ctx.fixed && _ctx.placeholder ? {
        O: common_vendor.n(common_vendor.unref(ns).e("placeholder")),
        P: common_vendor.s(common_vendor.unref(navbarPlaceholderStyle))
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9f12ec2d"], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/node_modules/@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue"]]);
wx.createComponent(Component);
