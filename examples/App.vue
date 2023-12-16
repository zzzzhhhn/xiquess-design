<template>
  <div id="app">
    <!--    <XqVideoPlayer url="https://muiplayer.js.org/media/media.mp4" />-->
    <!--    <XqEditor v-model="text" />-->
    <!--    内容： {{ text }}-->
    <!--    <XqEmoji @emotion="onGetEmoji"><button>表情</button></XqEmoji>-->
    <!--    表情-->
    <!--    <div v-html="emojiHtml"></div>-->
    <!--    <XqCaptcha />-->
    <!--    <button @click="show = true">点击</button>-->
    <!--    <XqImagePreviewer v-model="show" :url-list="urlList"></XqImagePreviewer>-->
    <!--    <XqDraggableTabs-->
    <!--      :tabList="tabList"-->
    <!--      v-model="value"-->
    <!--      :dropMenuKey="currentPageId"-->
    <!--      @chiClick="onChiClick"-->
    <!--    />-->
    <!--    <XqPdfPreviewer :src="pdf" v-model="show"></XqPdfPreviewer>-->
    <!--    <XqTag name="1231232dadasdasdsadasdasdasdasd" @close="onClose" />-->
    <!--    <XqTag name="1231232dadasdasdsadasdasdasdasd" @close="onClose" />-->
    <XqMultipleSelect :list="list" v-model="value" />
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
    tabList: [
      { key: 1, label: "aaa" },
      { key: 2, label: "bbb" },
      {
        key: 3,
        label: "ccc",
        children: [
          { key: 1, label: "asdv" },
          { key: 2, label: "3434asdv" },
        ],
      },
      {
        key: 4,
        label: "ddd",
        children: [
          { key: 1, label: "a111sdv" },
          { key: 2, label: "113434asdv" },
        ],
      },
    ],
    value: [1],
    currentPageId: 2,
    pdf: "https://zxb-file.oss-cn-hangzhou.aliyuncs.com/1712277064992423937/im/2023/12/16/15/18/1702711098626_84210.pdf?Expires=1703315912&OSSAccessKeyId=LTAI5tADTigDwZt42MebrDb4&Signature=G0dRkwmVsRUnd3g1qVdHc7sGYcs%3D&response-content-disposition=attachment%3Bfilename%3D2022年美团技术年货-合辑.pdf",
    list: [
      { label: "aaa", value: 1 },
      { label: "bbb", value: 2 },
      { label: "ccc", value: 3 },
    ],
  }),
  methods: {
    onClose() {},
    onGetEmoji(v1, v2) {
      console.log({ v1, v2 });
      this.emojiHtml += this.$xqGetEmotionHtml(v1);
    },
    onChiClick(v) {
      this.currentPageId = v;
    },
  },
};
</script>

<style lang="scss"></style>
