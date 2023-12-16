<template>
  <div
    ref="imgPreviewer"
    class="dialog-img-previewer el-dialog xq-flex xq-flex-column xq-over-hide"
    :class="{ 'xq-full-screen': fullScreen }"
    v-show="value"
  >
    <div
      class="el-dialog__header xq-por xq-flex xq-flex-end xq-poa xq-t0 xq-l0 xq-w100"
      :style="{ 'z-index': zIndex + 10 }"
    >
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions xq-action-list">
        <!-- ARROW -->
        <div class="el-image-viewer__actions__inner">
          <template v-if="!isSingle">
            <el-tooltip
              class="item"
              popper-class="popper-tooltip-imgpreviewer"
              effect="dark"
              content="上一个"
              placement="bottom"
            >
              <span @click="prev" class="xq-action-list-item xq-mr8">
                <i
                  :class="{ 'is-disabled': !infinite && isFirst }"
                  class="iconfont-xq-design"
                  >&#xe773;</i
                >
              </span>
            </el-tooltip>
            <el-tooltip
              :offset="15"
              class="item"
              popper-class="popper-tooltip-imgpreviewer"
              effect="dark"
              content="下一个"
              placement="bottom"
            >
              <span @click="next" class="xq-action-list-item">
                <i
                  :class="{ 'is-disabled': !infinite && isLast }"
                  class="iconfont-xq-design"
                  >&#xe772;</i
                >
              </span>
            </el-tooltip>
            <span class="xq-action-list-line"></span>
          </template>
          <el-tooltip
            class="item"
            effect="dark"
            content="缩小"
            popper-class="popper-tooltip-imgpreviewer"
            placement="bottom"
          >
            <span @click="handleActions('zoomOut')" class="xq-action-list-item">
              <i class="iconfont-xq-design">&#xe76f;</i>
            </span>
          </el-tooltip>

          <span
            class="xq-font-color1 xq-f12 xq-mr12 xq-ml12 xq-font500 xq-text-center"
            style="min-width: 35px"
          >
            {{ parseInt(transform.scale * 100) + "%" }}</span
          >

          <el-tooltip
            class="item"
            effect="dark"
            content="放大"
            popper-class="popper-tooltip-imgpreviewer"
            placement="bottom"
          >
            <span @click="handleActions('zoomIn')" class="xq-action-list-item">
              <i class="iconfont-xq-design">&#xe76c;</i>
            </span>
          </el-tooltip>

          <span class="xq-action-list-line"></span>

          <el-tooltip
            class="item"
            popper-class="popper-tooltip-imgpreviewer"
            v-if="mode.name !== 'original'"
            effect="dark"
            content="原始尺寸"
            placement="bottom"
          >
            <span @click="toggleMode" class="xq-action-list-item mr8">
              <i class="iconfont-xq-design">&#xe76d;</i>
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            popper-class="popper-tooltip-imgpreviewer"
            v-else
            effect="dark"
            content="适应窗口"
            placement="bottom"
          >
            <span @click="toggleMode" class="xq-action-list-item xq-mr8">
              <i class="iconfont-xq-design">&#xe76e;</i>
            </span>
          </el-tooltip>

          <el-tooltip
            class="item"
            popper-class="popper-tooltip-imgpreviewer"
            effect="dark"
            content="旋转"
            placement="bottom"
          >
            <span
              @click="handleActions('anticlocelise')"
              class="xq-action-list-item mr8"
            >
              <i class="iconfont-xq-design">&#xe771;</i>
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            popper-class="popper-tooltip-imgpreviewer"
            effect="dark"
            content="下载"
            placement="bottom"
          >
            <span @click="onDownload" class="xq-action-list-item">
              <i class="iconfont-xq-design">&#xe770;</i>
            </span>
          </el-tooltip>
        </div>
      </div>

      <i
        class="iconfont-xq-design cursor-pointer xq-font-color1 xq-f14"
        v-if="!fullScreen"
        @click.stop="onExpand(true)"
        >&#xe69a;</i
      >
      <i
        class="iconfont-xq-design cursor-pointer xq-font-color1 xq-f14"
        v-else
        @click.stop="onExpand(false)"
        >&#xe69b;</i
      >
      <i
        class="iconfont-xq-design cursor-pointer xq-ml16 xq-font-color1 xq-f14"
        @click.stop="onClose"
        >&#xe698;</i
      >
    </div>
    <div class="el-dialog__body xq-flex-auto">
      <div
        tabindex="-1"
        ref="el-image-viewer__wrapper"
        class="el-image-viewer__wrapper"
        :style="{ 'z-index': zIndex }"
      >
        <!-- CANVAS -->
        <div class="el-image-viewer__canvas">
          <template v-for="(url, i) in urlList">
            <img
              v-if="i === index"
              ref="img"
              class="el-image-viewer__img"
              :key="url"
              :src="currentImg"
              :style="imgStyle"
              @load="handleImgLoad"
              @error="handleImgError"
              @mousedown="handleMouseDown"
              @click="hide"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { on, off } from "element-ui/src/utils/dom";
import { rafThrottle, isFirefox } from "element-ui/src/utils/util";

const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen"
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original"
  }
};

const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";

export default {
  name: "XqImagePreviewer",
  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0,
      isShow: false,
      infinite: false,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      },
      fullScreen: false
    };
  },
  computed: {
    isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst() {
      return this.index === 0;
    },
    isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg() {
      return this.urlList[this.index];
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? "transform .3s" : "",
        "margin-left": `${offsetX}px`,
        "margin-top": `${offsetY}px`
      };
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    }
  },
  watch: {
    initialIndex(v) {
      this.index = v;
    },
    index: {
      handler: function(val) {
        this.reset();
      }
    },
    currentImg(val) {
      this.$nextTick(_ => {
        const $img = this.$refs.img && this.$refs.img[0] || {};
        if (!$img.complete) {
          this.loading = true;
        }
      });
    },
    value(v) {
      if (v) {
        this.index = this.initialIndex;
        this.$nextTick(() => {
          this.deviceSupportInstall();
        });
      }
    }
  },
  methods: {
    onExpand(v) {
      this.fullScreen = v;
      if (v) {
        $(".dialog-img-previewer").css({top: 0, left: 0});
      } else {

        $(".dialog-img-previewer").css({top: "calc(50vh - 300px)", left: "calc(50vw - 400px)"});
      }
    },
    onClose() {
      this.deviceSupportUninstall();
      this.$emit("close");
    },
    hide() {
      // this.deviceSupportUninstall();
      // this.onClose();
    },
    deviceSupportInstall() {
      $(".dialog-img-previewer").unbind("mousewheel", this.mouseEvent);
      $(".dialog-img-previewer").bind("mousewheel", this.mouseEvent);
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            this.onClose();
            break;
          // SPACE
          case 32:
            this.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            this.prev();
            break;
          // UP_ARROW
          case 38:
            this.handleActions("zoomIn");
            break;
          // RIGHT_ARROW
          case 39:
            this.next();
            break;
          // DOWN_ARROW
          case 40:
            this.handleActions("zoomOut");
            break;
        }
      });

      on(document, "keydown", this._keyDownHandler);
      on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    mouseEvent(event, delta, deltaX, deltaY) {
      if (delta === undefined) {
        delta = event.originalEvent?.wheelDelta;
      }
      if (delta > 0) {
        this.handleActions("zoomIn", {
          zoomRate: 0.015,
          enableTransition: false
        });
      } else {
        this.handleActions("zoomOut", {
          zoomRate: 0.015,
          enableTransition: false
        });
      }
    },
    deviceSupportUninstall() {
      off(document, "keydown", this._keyDownHandler);
      off(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
    },
    handleImgLoad(e) {
      this.loading = false;
    },
    handleImgError(e) {
      this.loading = false;
      e.target.alt = "加载失败";
    },
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return;

      const { offsetX, offsetY } = this.transform;
      const startX = e.pageX;
      const startY = e.pageY;
      this._dragHandler = rafThrottle(ev => {
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
      });
      on(document, "mousemove", this._dragHandler);
      on(document, "mouseup", ev => {
        off(document, "mousemove", this._dragHandler);
      });

      e.preventDefault();
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    },
    toggleMode() {
      if (this.loading) return;

      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index = modeValues.indexOf(this.mode);
      const nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev() {
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
      this.$emit("index", this.index);
    },
    next() {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
      this.$emit("index", this.index);
    },
    handleActions(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      const { transform } = this;
      switch (action) {
        case "zoomOut":
          if (transform.scale > 0.2) {
            transform.scale = parseFloat(
              (transform.scale - zoomRate).toFixed(3)
            );
          }
          break;
        case "zoomIn":
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case "clocelise":
          transform.deg += rotateDeg;
          break;
        case "anticlocelise":
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    },
    onDownload() {
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        const a = document.createElement("a"); // 生成一个a元素
        const event = new MouseEvent("click"); // 创建一个单击事件
        a.download = this.getTimeFormat(); // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = this.currentImg;
    },
    getTimeFormat() {
      const now = new Date();
      return now.getFullYear().toString() + this.getPad(now.getMonth() + 1) + this.getPad(now.getDate()) + this.getPad(now.getHours()) + this.getPad(now.getMinutes()) + this.getPad(now.getSeconds());
    },
    getPad(v) {
      return v.toString().padStart(2, "0");
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.imgPreviewer);

    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    // this.$refs["el-image-viewer__wrapper"].focus();
  }
};
</script>

