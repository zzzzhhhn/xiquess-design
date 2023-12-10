<template>
  <div
    class="xq-video-player xq-por"
    :style="{ width: width, height: height }"
    ref="container"
  >
    <video
      ref="video"
      :src="url"
      preload="auto"
      crossorigin
      width="100%"
      height="100%"
      @click="onTogglePlay"
    >
      Sorry, your browser doesn't support embedded videos.
    </video>
    <!--      工具条-->
    <div
      class="xq-toolbar xq-poa xq-w100 xq-b0 xq-l0"
      v-if="!playing || moving"
    >
      <div class="xq-flex xq-row1">
        <div class="xq-flex-auto xq-flex">
          <!--          播放/暂停-->
          <div
            class="xq-btn-circle xq-cursor-pointer xq-mr10 xq-f16 xq-flex xq-flex-center"
          >
            <i
              class="iconfont-xq-design"
              style="transform: translateX(2px)"
              v-if="!playing"
              @click="play"
              >&#xe74c;</i
            >
            <i class="iconfont-xq-design" v-else @click="pause">&#xe750;</i>
          </div>
          <!--          时间-->
          <div>{{ currentTime | timeFormat }} / {{ maxTime | timeFormat }}</div>
        </div>
        <div class="xq-flex-none xq-flex">
          <!--          音量-->
          <div
            class="xq-btn-circle xq-btn-volume xq-f16 xq-mr10 xq-flex xq-flex-center"
          >
            <el-slider
              v-model="currentVolume"
              class="xq-volume-line"
              :show-tooltip="false"
              :min="0"
              :max="1"
              :step="0.1"
              @input="setVolume"
            />
            <i
              class="iconfont-xq-design xq-cursor-pointer xq-f16"
              v-if="!isMuted"
              @click="onToggleMuted(true)"
              >&#xe74f;</i
            >
            <i
              class="iconfont-xq-design xq-cursor-pointer xq-f16"
              v-else
              @click="onToggleMuted(false)"
              >&#xe74d;</i
            >
          </div>
          <!--          全屏-->
          <div
            class="xq-btn-circle xq-f16 xq-cursor-pointer xq-mr10 xq-flex xq-flex-center"
          >
            <i
              class="iconfont-xq-design"
              v-if="!isFullScreen"
              @click="launchFullscreen"
              >&#xe7cf;</i
            >
            <i class="iconfont-xq-design" v-else @click="exitFullscreen"
              >&#xe792;</i
            >
          </div>
          <!--倍速-->
          <div
            class="el-dropdown-link xq-por xq-btn-circle xq-f16 xq-cursor-pointer xq-flex xq-flex-center xq-multipleList"
            style="width: 100px; font-size: 14px"
            v-if="canSpeed && canJump"
          >
            {{ currentSpeed }}倍速<i
              class="el-icon-arrow-down el-icon--right"
            ></i>

            <div class="xq-multipleBox">
              <ul class="xq-multiple">
                <li @click="onChangeSpeed(0.25)">0.25</li>
                <li @click="onChangeSpeed(0.5)">0.5</li>
                <li @click="onChangeSpeed(0.75)">0.75</li>
                <li @click="onChangeSpeed(1)">1</li>
                <li @click="onChangeSpeed(1.25)">1.25</li>
                <li @click="onChangeSpeed(1.5)">1.5</li>
                <li @click="onChangeSpeed(1.75)">1.75</li>
                <li @click="onChangeSpeed(2)">2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="xq-row2 xq-por">
        <!--      进度条-->
        <el-slider
          v-model="currentTime"
          :max="maxTime"
          :disabled="!canJump"
          :show-tooltip="false"
          @change="onChangeCurrentTime"
        />
        <!--    节点-->
        <template v-if="!playing || moving">
          <div
            class="xq-tip-item xq-poa"
            :style="{ left: item.left }"
            v-for="(item, key) in pointList"
            :key="key"
          >
            <el-tooltip effect="dark" :content="item.text" placement="top">
              <div
                class="xq-point"
                @click="onChangeCurrentTime(item.startTime)"
              ></div>
            </el-tooltip>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip, Slider } from "element-ui";
export default {
  name: "VideoPlayer",
  components: {
    [Tooltip.name]: Tooltip,
    [Slider.name]: Slider,
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    tipList: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: "600px",
    },
    height: {
      type: String,
      default: "400px",
    },
    canJump: {
      type: Boolean,
      default: true,
    },
    canSpeed: {
      type: Boolean,
      default: true,
    },
  },
  filters: {
    timeFormat(time) {
      let h = 0,
        m = 0,
        res = "";
      if (time > 3600) {
        h = Math.floor(time / 3600);
        res += h.toString().padStart(2, "0") + ":";
        time = time % 3600;
      }
      if (time > 60) {
        m = Math.floor(time / 60);
        res += m.toString().padStart(2, "0") + ":";
        time = time % 60;
      } else {
        res = "00:";
      }
      res += time.toString().padStart(2, "0");
      return res;
    },
  },
  watch: {
    tipList: {
      handler(v) {
        this.pointList = JSON.parse(JSON.stringify(v));
        this.getPoints();
      },
      deep: true,
    },
  },
  data: () => ({
    pointList: [],
    playing: false,
    moving: true,
    lineWidth: 50,
    currentTime: 0,
    maxTime: 0,
    currentVolume: 1,
    currentSpeed: 1,
    isMuted: false,
    isFullScreen: false,
    interval: null,
    videoNowTime: "",
    movingDown: true,
  }),
  created() {
    this.pointList = JSON.parse(JSON.stringify(this.tipList));
  },
  mounted() {
    //播放回调
    this.$refs.video.addEventListener("play", () => {
      this.$emit("onPlay");
      this.playing = true;
      this.hideTipTimer = setTimeout(() => {
        this.moving = false;
      }, 2500);

      let video = this.$refs.video;
      this.interval = setInterval(() => {
        this.videoNowTime = video.currentTime;
        this.$emit("getVideoNowTime", this.videoNowTime);
      }, 1000);
    });
    //暂停回调
    this.$refs.video.addEventListener("pause", () => {
      this.$emit("onPause");
      clearInterval(this.interval);
      this.playing = false;
    });
    //播放结束
    this.$refs.video.addEventListener("ended", () => {
      this.$emit("onEnd");
      clearInterval(this.interval);
      this.playing = false;
    });
    //鼠标移动
    this.$refs.container.addEventListener("mousemove", () => {
      if (!this.playing) return;
      clearTimeout(this.hideTipTimer);
      this.moving = true;
      if (this.movingDown) {
        this.hideTipTimer = setTimeout(() => {
          this.moving = false;
        }, 2500);
      }
    });
    //鼠标离开
    this.$refs.container.addEventListener("mouseleave", () => {
      if (this.movingDown) {
        this.moving = false;
      }
    });
    //视频加载完毕
    this.$refs.video.addEventListener("loadeddata", () => {
      this.$emit("onLoadedData");
      this.maxTime = Math.floor(this.$refs.video.duration);
      this.$emit("getVideoTime", this.maxTime);
      this.getPoints();
    });
    //播放进度改变回调
    this.$refs.video.addEventListener("timeupdate", () => {
      this.currentTime = Math.floor(this.$refs.video.currentTime);
      this.$emit("timeupdate", this.currentTime);
    });
    //按键回调
    window.addEventListener("keydown", this.handleKeyDown);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("keydown", this.handleKeyDown);
    });
  },
  methods: {
    /**
     * 按键回调
     */
    handleKeyDown(e) {
      if (e.keyCode === 27) {
        this.exitFullscreen();
      }
    },
    /**
     * 切换静音
     */
    onToggleMuted(v) {
      this.isMuted = v;
      this.$refs.video.muted = v;
      if (v) {
        this.currentVolume = 0;
      } else {
        this.currentVolume = 1;
      }
      this.$emit("mutedChange", v);
    },
    /**
     * 切换播放/暂停
     */
    onTogglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    /**
     * 播放
     */
    play() {
      this.$refs.video.play();
      this.$emit("getVideoNowTime", this.currentTime);
      this.moving = true;
    },
    /**
     * 暂停
     */
    pause() {
      this.$refs.video.pause();
    },
    /**
     * 改变速度
     */
    onChangeSpeed(v) {
      this.currentSpeed = v;
      this.$refs.video.playbackRate = v;
      setTimeout(() => {
        this.moving = false;
        this.movingDown = true;
      }, 1500);
      this.$emit("speedChange", v);
    },
    /**
     * 全屏
     */
    launchFullscreen() {
      this.$emit("enterFullScreen"); //全屏回调
      this.isFullScreen = true;
      const element = this.$refs.container;
      //此方法不可以在異步任務中執行，否則火狐無法全屏
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    /**
     * 退出全屏
     */
    exitFullscreen() {
      this.$emit("exitFullScreen"); //全屏回调
      this.isFullScreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    /**
     * 改变音量
     */
    setVolume(v) {
      this.currentVolume = v;
      this.$emit("volumeChanged", v); //音量回调
      this.$refs.video.volume = v;
      if (v > 0) {
        this.isMuted = false;
        this.$refs.video.muted = false;
      } else {
        this.isMuted = true;
        this.$refs.video.muted = true;
      }
    },
    /**
     * 设置时间点
     * @param s
     */
    setCurrentTime(s) {
      this.currentTime = s;
      this.$refs.video.currentTime = s;
      this.$emit("processChanged", s); //进度回调
    },
    /**
     * 跳转时间点
     * @param s
     */
    onChangeCurrentTime(s) {
      if (this.playing) {
        this.pause();
      }
      this.setCurrentTime(s);
      if (this.playing) {
        setTimeout(() => {
          this.play();
        }, 1000);
      }
    },
    /**
     * 设置章节节点
     */
    getPoints() {
      if (this.maxTime) {
        this.pointList.forEach((item) => {
          this.$set(
            item,
            "left",
            (item.startTime / this.maxTime) * (this.width - 32) + 16 + "px"
          );
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
