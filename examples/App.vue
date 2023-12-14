<template>
  <div id="app">
    <XqVideoPlayer url="https://muiplayer.js.org/media/media.mp4" />
    <XqEditor v-model="text" />
    内容： {{ text }}
    <XqEmoji @emotion="onGetEmoji"><button>表情</button></XqEmoji>
    表情
    <div v-html="emojiHtml"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    text: "",
    emojiHtml: "",
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
