"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const components_uniApp_components_mpHtml_audio_context = require("./context.js");
const _sfc_main = {
  data() {
    return {
      error: false,
      playing: false,
      time: "00:00",
      value: 0
    };
  },
  props: {
    aid: String,
    name: String,
    // 音乐名
    author: String,
    // 作者
    poster: String,
    // 海报图片地址
    autoplay: [Boolean, String],
    // 是否自动播放
    controls: [Boolean, String],
    // 是否显示控件
    loop: [Boolean, String],
    // 是否循环播放
    src: String
    // 源地址
  },
  watch: {
    src(src) {
      this.setSrc(src);
    }
  },
  mounted() {
    this._ctx = common_vendor.index.createInnerAudioContext();
    this._ctx.onError((err) => {
      this.error = true;
      this.$emit("error", err);
    });
    this._ctx.onTimeUpdate(() => {
      const time = this._ctx.currentTime;
      const min = parseInt(time / 60);
      const sec = Math.ceil(time % 60);
      this.time = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
      if (!this.lastTime) {
        this.value = time / this._ctx.duration * 100;
      }
    });
    this._ctx.onEnded(() => {
      if (!this.loop) {
        this.playing = false;
      }
    });
    components_uniApp_components_mpHtml_audio_context.context.set(this.aid, this);
    this.setSrc(this.src);
  },
  beforeDestroy() {
    this._ctx.destroy();
    components_uniApp_components_mpHtml_audio_context.context.remove(this.aid);
  },
  onPageShow() {
    if (this.playing && this._ctx.paused) {
      this._ctx.play();
    }
  },
  methods: {
    // 设置源
    setSrc(src) {
      this._ctx.autoplay = this.autoplay;
      this._ctx.loop = this.loop;
      this._ctx.src = src;
      if (this.autoplay && !this.playing) {
        this.playing = true;
      }
    },
    // 播放
    play() {
      this._ctx.play();
      this.playing = true;
      this.$emit("play", {
        target: {
          id: this.aid
        }
      });
    },
    // 暂停
    pause() {
      this._ctx.pause();
      this.playing = false;
      this.$emit("pause");
    },
    // 设置播放速率
    playbackRate(rate) {
      this._ctx.playbackRate = rate;
    },
    // 移动进度条
    seek(sec) {
      this._ctx.seek(sec);
    },
    // 内部方法
    _buttonTap() {
      if (this.playing)
        this.pause();
      else
        this.play();
    },
    _seeking(e) {
      if (e.timeStamp - this.lastTime < 200)
        return;
      const time = Math.round(e.detail.value / 100 * this._ctx.duration);
      const min = parseInt(time / 60);
      const sec = time % 60;
      this.time = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
      this.lastTime = e.timeStamp;
    },
    _seeked(e) {
      this.seek(e.detail.value / 100 * this._ctx.duration);
      this.lastTime = void 0;
    },
    onClick(e) {
      this.$emit("onClick", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.controls
  }, $props.controls ? {
    b: common_vendor.n($data.playing ? "_pause" : "_play"),
    c: common_vendor.o((...args) => $options._buttonTap && $options._buttonTap(...args)),
    d: common_vendor.s("background-image:url(" + $props.poster + ")"),
    e: common_vendor.t($props.name || "未知音频"),
    f: common_vendor.t($props.author || "未知作者"),
    g: $data.error,
    h: $data.value,
    i: common_vendor.o((...args) => $options._seeking && $options._seeking(...args)),
    j: common_vendor.o((...args) => $options._seeked && $options._seeked(...args)),
    k: common_vendor.t($data.time || "00:00"),
    l: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/TinyTale/TinyTale-1.0.0 正式版/TinyTale-1.0.0 正式版/Halo-TinyTale-1.0.0/src/components/uni-app/components/mp-html/audio/audio.vue"]]);
wx.createComponent(Component);
