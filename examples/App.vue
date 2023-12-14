<template>
  <div id="app">
    <XqVideoPlayer url="https://muiplayer.js.org/media/media.mp4" />
    <XqEditor v-model="text" />
    内容： {{ text }}
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    text: "",
  }),
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
