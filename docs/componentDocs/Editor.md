# Editor 富文本输入框

简易的富文本输入框，支持粘贴图片，适用于即时通讯、工单回复等场景。

### 基本用法

```html
<template>
    <XqEditor
            ref="editor"
            v-model="msgText"
            :placeholder="placeholder"
            @onReady="onCreated"
    />
</template>
<script>
  export default {
    data () {
      return {
          msgText: "",
          placeholder: "请输入"
      }
    },
      methods: {
          onReady() {
              this.msgText = "123";
              this.$refs.editor.setContent(this.msgText);
              this.$refs.editor.focusLast();
          }
      }
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| value/v-model              | 富文本内容   | string          |        |        |
| placeholder              |  输入引导语             | string  |   | 请输入 



### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| onReady  | 组件渲染完毕回调 |   |
| input  | 内容改变回调 |   |
| enterSend  | 回车键回调，可用于发送或提交内容 |   |

### Methods

| 名称	 | 说明               |  
| ------ | ------------------ | 
| focus  | 输入框聚焦 |
| blur  | 输入框失焦 |
| isEmpty  | 判断内容是否为空（空格、换行符不算内容），返回值：true/false |
| setContent  | 设置内容，参数：string |
| getContent  | 获取内容 |
| insertContent  | 在光标处插入内容 |
| textareaRange  | 换行 |
| focusLast  | 将光标聚焦到内容最后面 |
