# Emoji 微信表情包

与微信相同的表情包，适用于即时通讯、工单回复等场景。

### 基本用法

```html
<template>
    <XqEditor @emotion="onGetEmoji"><button>表情</button></XqEditor>
    <div>
        所选表情：<span v-html="emojiHtml"></span>
    </div>
</template>
<script>
  export default {
    data () {
      return {
          emojiHtml: ""
      }
    },
      methods: {
          onGetEmoji(v) {
              this.emojiHtml += this.$xqGetEmotionHtml(v);
          }
      }
  }
</script>

```



### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| emotion  | 点击表情回调 | 表情编码  |

### Methods

| 名称	 | 说明               |  
| ------ | ------------------ | 
| $xqGetEmotionHtml  | 此方法已全局挂载到Vue实例上，可用于将表情编码转变为表情html来回显，也可回显微信公众号或者微信客服发来的表情消息 |
