<template>
  <el-popover
    placement="top-start"
    title=""
    width="320"
    popper-class="popper-xq-emoji"
    trigger="hover"
    content=""
  >
    <EmojiPanel :class="[customClass]" @input="onChange" />
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script>
import EmojiPanel from "./EmojiPanel.vue";
import { Popover } from "element-ui";
export default {
  name: "XqEmoji",
  props: {
    customClass: String,
  },
  data: () => ({
    visible: false,
  }),
  components: {
    EmojiPanel,
    [Popover.name]: Popover,
  },
  methods: {
    onChange(key, value) {
      this.visible = false;
      this.$emit("emotion", key, value);
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
