<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "XqTeleport",
  props: {
    /* 移动至哪个标签内，最好使用id */

    to: {
      type: String,
      required: true,
    },
  },

  mounted() {
    document.querySelector(this.to)?.appendChild(this.$el);
  },

  destroyed() {
    document.querySelector(this.to)?.removeChild(this.$el);
  },

  render() {
    return <div>{this.$scopedSlots.default()}</div>;
  },
};
</script>

<style lang="scss" scoped>
.file {
  height: 32px;
  line-height: 32px;
  margin-bottom: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 7px;
  background-color: rgba(42, 130, 228, 0.06);
  border: 1px solid rgba(42, 130, 228, 0.4);
  &-left {
    font-size: 14px;
    display: flex;
    flex: 1;
    i {
      color: rgba(42, 130, 228, 1);
    }
    span {
      color: #333;
      white-space: nowrap;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 7px;
    }
  }
  &-right {
    display: flex;
    align-items: center;
    span {
      margin: 0 3px;
      color: rgba(42, 130, 228, 1);
      cursor: pointer;
      font-size: 14px;
    }
    p {
      margin: 0 3px;
      color: rgba(42, 130, 228, 1);
      cursor: default;
      font-size: 14px;
    }
  }
}
</style>
