# ImgPreviewer 图片预览器

预览图片的组件，支持缩放、旋转、下载等功能。

### 基本用法

```html
<template>
    <button @click="show = true">点击</button>
    <XqImagePreviewer v-model="show" :url-list="urlList" />
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        urlList: []
      }
    }
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| urlList              | 图片链接列表   | array          |        |     []   |
| zIndex              | 原生z-index属性             | string  |   | 2000
| initialIndex             | 默认展示图片在列表中索引  | number |        |  0   |
| value/v-model               | 是否展示弹窗 | boolean |        |   false   |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| index  | 图片切换回调 | 当前图片索引  |
| close  | 弹窗关闭回调 |   |
