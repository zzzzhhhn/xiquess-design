<template>
  <div id="app">
    <!--    <XqVideoPlayer url="https://muiplayer.js.org/media/media.mp4" />-->
    <!--    <XqEditor v-model="text" />-->
    <!--    内容： {{ text }}-->
    <!--    <XqEmoji @emotion="onGetEmoji"><button>表情</button></XqEmoji>-->
    <!--    表情-->
    <!--    <div v-html="emojiHtml"></div>-->
    <!--    <XqCaptcha />-->
    <button @click="show = true">点击</button>
    <XqImagePreviewer v-model="show" :url-list="urlList"></XqImagePreviewer>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    text: "",
    emojiHtml: "",
    show: false,
    urlList: [
      "https://zxb-file.oss-cn-hangzhou.aliyuncs.com/1694999375017369601/im/2023/12/13/17/29/1702459754150_61811.png?Expires=1703156291&OSSAccessKeyId=LTAI5tADTigDwZt42MebrDb4&Signature=VAD6qxIyPx08cyE72wEJvt2lvYk%3D&response-content-disposition=attachment%3Bfilename%3D1702459754150.png",
    ],
  }),
  methods: {
    onGetEmoji(v1, v2) {
      console.log({ v1, v2 });
      this.emojiHtml += this.$xqGetEmotionHtml(v1);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
