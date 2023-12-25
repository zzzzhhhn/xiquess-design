<template>
  <div class="custom-audio-player">
    <audio
      @ended="overAudio"
      @pause="onPause"
      @play="onPlay"
      @canplay="onCanPlay"
      ref="originAudio"
      class="origin-audio"
      :src="url"
      controls
    >
      您的浏览器不支持 audio 标签。
    </audio>
    <div class="custom-audio" :id="'custom-audio' + compIndex">
      <i
        v-if="!isPlaying"
        @click="play"
        class="audio-control play iconfont-xq-design"
        >&#xe681;</i
      >
      <i v-else @click="pause" class="audio-control pause iconfont-xq-design"
        >&#xe68a;</i
      >
      <span>{{ audioProgressDate }}/{{ audioDurationDate }}</span>
      <el-slider
        :show-tooltip="false"
        :disabled="!isReady"
        @input="onDragSlider"
        @change="onChangeProgress"
        :max="parseInt(audioDuration)"
        v-model="audioProgress"
      >
      </el-slider>
      <div class="speed cursor-pointer" @click="speedFlag = !speedFlag">
        {{ speed == "倍速" ? speed : speed + "x"
        }}<i
          class="iconfont-xq-design speed-icon"
          :class="{ rotate: speedFlag }"
          >&#xe843;</i
        >
        <div class="speedBox" v-if="speedFlag">
          <div class="down"></div>
          <div
            :class="{ active: speed == item }"
            class="speed-list"
            v-for="item in speedList"
            :key="item"
            @click="changeSpeed(item)"
          >
            {{ item }}x
          </div>
        </div>
      </div>
      <div class="audio-control-vol-box">
        <div class="audio-control-vol">
          <el-slider v-model="volume" :show-tooltip="false" width="60px">
          </el-slider>
        </div>
        <i
          @click="changeMutedStatus(true)"
          v-if="volume > 0"
          class="audio-control vol iconfont-xq-design"
          >&#xe686;</i
        >
        <i
          @click="changeMutedStatus(false)"
          v-else
          class="audio-control vol muted iconfont-xq-design"
          >&#xe68b;</i
        >
      </div>
      <form style="display: none" ref="formDonwload"></form>
      <i
        v-if="showDownload"
        @click="download"
        class="iconfont-xq-design audio-control download"
        >&#xe684;</i
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "XqAudioPlayer",
  props: {
    audioType: {
      type: String,
      default: "",
    },
    showDownload: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
    },
    compIndex: {
      type: [String, Number],
      default: 0,
    },
    id: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      speedList: [0.5, "1.0", 1.5, "2.0", 2.5, "3.0"],
      speed: "倍速",
      speedFlag: false, //是否显示倍速
      isReady: false, //播放器是否准备就绪
      isPlaying: false, //当前是否正在播放
      audioProgressDate: "00:00", //当前播放的进度（时间格式）
      audioDurationDate: "00:00", //时长（时间格式）
      audioProgress: 0, //当前播放的进度
      audioDuration: 0, //时长（秒）
      intvervalProgress: "", //定时器 获取播放中的时间
      volume: 75, //音量
      volumeTemp: 75, //临时音量
      isMuted: false, //
    };
  },
  watch: {
    isPlaying: {
      handler(newV) {
        if (newV) {
          this.intvervalProgress = setInterval(() => {
            let sec = this.$refs.originAudio.currentTime;
            if (sec > this.audioDuration) sec = this.audioDuration;
            this.audioProgress = Math.ceil(sec);
            this.audioProgressDate = this.formate(Math.ceil(sec));
            if (!this.isPlaying) {
              clearInterval(this.intvervalProgress);
            }
          }, 1 * 1000);
        } else {
          clearInterval(this.intvervalProgress);
        }
      },
      immediate: true,
    },
    volume(newV) {
      if (this.$refs.originAudio) {
        this.$refs.originAudio.volume = newV / 100;
      }
      if (newV == 0 && !this.isMuted) {
        this.isMuted = true;
      }
    },
    url() {
      this.$refs.originAudio.load();
      this.isPlaying = false;
      this.audioProgress = 0;
      this.audioProgressDate = "00:00";
    },
  },
  methods: {
    //修改播放倍速
    changeSpeed(e) {
      this.speed = e;
      this.$refs.originAudio.playbackRate = e;
    },
    /**
     * @description: audio标签播放回调
     * @param {*}
     * @return {*}
     * @author: zul
     */

    onPlay() {
      this.isPlaying = true;
    },
    /**
     * @description: audio标签暂停回调
     * @param {*}
     * @return {*}
     * @author: zul
     */

    onPause() {
      this.isPlaying = false;
    },
    /**
     * @description: audio标签播放完毕回调
     * @param {*}
     * @return {*}
     * @author: zul
     */

    overAudio() {
      this.isPlaying = false;
      clearInterval(this.intvervalProgress);
      this.audioProgressDate = this.audioDurationDate;
    },
    /**
     * @description: 手动播放
     * @param {*}
     * @return {*}
     * @author: zul
     */

    play() {
      if (!this.isReady) return;
      this.$refs.originAudio.play();
    },
    /**
     * @description: 手动暂停
     * @param {*}
     * @return {*}
     * @author: zul
     */

    pause() {
      if (!this.isReady) return;
      this.$refs.originAudio.pause();
    },
    /**
     * @description: 初始化播放器
     * @param {*}
     * @return {*}
     * @author: zul
     */

    initAudio() {
      this.$refs.originAudio.oncanplay = () => {
        this.isReady = true;
        this.audioDuration = this.$refs.originAudio?.duration;
        this.audioDurationDate = this.formate(Math.floor(this.audioDuration));
      };
    },
    onCanPlay() {
      console.log("准备完毕，可以播放");
    },
    onDragSlider(e) {
      this.audioProgressDate = this.formate(parseInt(e));
    },
    onChangeProgress(e) {
      this.$refs.originAudio.currentTime = e;
    },
    changeMutedStatus(flag) {
      if (flag) {
        this.volumeTemp = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.volumeTemp;
      }
      this.isMuted = flag;
    },
    formate(sec) {
      let s = sec % 60;
      let m = Math.floor(sec / 60);
      if (s < 10) s = `0${s}`;
      if (m < 10) m = "0" + `${m}`;
      return `${m}:${s}`;
    },
    // downloadFile(res, fileName) {
    //   let x = new XMLHttpRequest();
    //   x.open("GET", res, true);
    //   x.responseType = "blob";
    //   x.onload = function() {
    //     let res = window.URL.createObjectURL(x.response);
    //     let a = document.createElement("a");
    //     a.href = res;
    //     let arr = fileName.split("/");
    //     console.log(arr);
    //     a.download = arr[arr.length - 1];
    //     a.click();
    //   };
    //   x.send();
    // },
    async download() {
      // this.downloadFile(this.url, this.fileName ? this.fileName : this.url);
      if (this.audioType == "twoWayCall") {
        // 双向外呼的录音下载不走api接口
        fetch(this.url)
          .then((res) => res.blob())
          .then((blob) => {
            let a = document.createElement("a");
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
          });
      } else {
        let name = "";
        if (this.fileName) {
          name = this.fileName;
        } else {
          name = this.url.slice(
            this.url.lastIndexOf("/") + 1,
            this.url.lastIndexOf(".")
          );
        }
        let res = await this.$httpPOST(this.$api.callCenter.download, {
          url: this.url,
          name: name,
        });
        if (window.isElectron) {
          const fileName =
            res.data?.split("/").at(-1)?.split("?")[0] || name + ".wav";
          window.ipc.send("download", {
            downloadPath: res.data, // 下载链接（以下载vue文件为例）
            fileName: fileName, // 下载文件名，需要包含后缀名
          });
        } else {
          let a = document.createElement("a");
          a.href = res.data;
          a.click();
          console.log(res);
        }
      }
    },
    initDragSlider() {
      let el = document.querySelector(
        `#custom-audio${this.compIndex}>.el-slider .el-slider__button`
      );
      el.innerHTML = "<i class='iconfont-xq-design'>&#xe68e;</i>";
    },
  },
  beforeDestroy() {
    clearInterval(this.intvervalProgress);
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      (this.audioProgressDate = "00:00"), //当前播放的进度（时间格式）
        (this.audioDurationDate = "00:00"), //时长（时间格式）
        this.initAudio();
      this.initDragSlider();
    });
  },
};
</script>

<style lang="scss" scoped>
.custom-audio-player {
  .custom-audio {
    width: 330px;
    height: 24px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid rgba($color: #000000, $alpha: 0.08);
    border-radius: 2px;
    background-color: rgba($color: #000000, $alpha: 0.02);
    padding-top: 1px;
    .audio-control {
      cursor: pointer;
      padding: 0 4px;
      color: #4c5882;
      font-size: 16px;
    }
    .audio-control-vol-box {
      flex-shrink: 0;
      display: flex;
      border-radius: 9px;
      align-items: center;
      box-sizing: border-box;
      height: 18px;
      transition: all 0.2s linear;
      margin-left: 4px;
      width: 24px;
      overflow: hidden;
      justify-content: flex-end;
      .audio-control-vol {
        height: 18px;
        border-radius: 9px;
        display: none;
        align-items: center;
        span {
          color: #4c5882;
        }
        .el-slider {
          width: 6px;
          transition: all 0.2s linear;
          ::v-deep .el-slider__button {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            border: none;
            filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2));
          }
          ::v-deep .el-slider__bar {
            background-color: rgba($color: #0583f8, $alpha: 0.6);
          }
        }
      }
    }
    .audio-control-vol-box:hover {
      padding-left: 8px;
      width: 92px;
      background-color: #dddddd;
      .vol {
        margin-left: 4px;
      }
    }
    .audio-control-vol-box:hover .audio-control-vol {
      display: flex;
      .el-slider {
        width: 60px;
      }
    }
    .el-slider {
      width: 120px;
      height: 6px;
      ::v-deep .el-slider__runway {
        margin: 0;
      }
      ::v-deep .el-slider__button {
        width: 18px;
        height: 12px;
        border-radius: 9px;
        border: none;
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2));
      }
      ::v-deep .el-slider__bar {
        background-color: rgba($color: #0583f8, $alpha: 0.6);
      }
      ::v-deep .el-slider__runway {
        background-color: rgba($color: #000000, $alpha: 0.08);
      }
    }
    > .el-slider {
      ::v-deep .el-slider__button {
        position: relative;
        i {
          position: absolute;
          left: 3px;
          font-size: 12px;
          color: #e6e6e6;
        }
      }
    }
    span {
      color: #7b8ac0;
      display: inline-block;
      font-size: 12px;
      margin: 0 18px 0 4px;
      flex-shrink: 0;
    }
    .download {
      margin-right: 0;
      text-decoration: none;
      flex-shrink: 0;
    }
    .vol {
      flex-shrink: 0;
    }
    .speed {
      margin-left: 8px;
      min-width: 42px;
      font-size: 12px;
      position: relative;
      .speed-icon {
        // transition: all .3s ease;
        &.rotate {
          transform: rotate(180deg) scale(0.8);
        }
      }
      i {
        transform: scale(0.8);
        font-size: 10px;
        margin-left: 2px;
      }
      .speedBox {
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        top: -35px;
        left: -125px;
        position: absolute;
        background: #fff;
        box-shadow: -1px 0px 4px 0px rgba(186, 186, 186, 0.25);
        border-radius: 2px;
        opacity: 1;
        z-index: 2;
        width: 214px;
        height: 25px;
        .down {
          width: 8px;
          height: 8px;
          display: inline-block;
          transform: rotate(45deg);
          background: #fff;
          position: absolute;
          bottom: -4px;
          left: 66%;
          box-shadow: -1px 0px 4px 0px rgba(186, 186, 186, 0.25);
        }
        .sanjiao {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top: 5px solid #ddd;
          position: absolute;
          bottom: -10px;
          left: 66%;
          transform: translateX(-50%);
        }
        .speed-list {
          line-height: 25px;
          color: #000;
          text-align: center;
          display: inline-block;
          position: relative;
          background: #fff;
          z-index: 2;
        }
        .speed-list:hover {
          color: #0583f8ff;
        }
        .active {
          color: #0583f8ff;
        }
      }
    }
  }
  .origin-audio {
    display: none;
  }
}
</style>
