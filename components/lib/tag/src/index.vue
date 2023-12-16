<template>
  <div class="xq-tag-container xq-flex-inline" :style="{ maxWidth, width }">
    <div class="xq-flex-auto xq-text-ellipsis">{{ name }}</div>
    <i
      class="iconfont-xq-design xq-flex-none xq-cursor-pointer xq-ml5"
      v-if="closeable"
      @click="onRemove"
      >&#xe698;</i
    >
  </div>
</template>

<script>
export default {
  name: "XqTag",
  props: {
    width: {
      type: String,
      default: "auto",
    },
    maxWidth: {
      type: String,
      default: "120px",
    },
    name: String,
    params: {
      type: Object,
      default: () => ({}),
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onRemove() {
      this.$emit("close", this.param);
    },
  },
};
</script>
