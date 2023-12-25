# AudioPlayer 音频播放器

音频播放器，支持进度拖拽、倍速调节、音量调节、下载。

### 基本用法

```html
<template>
    <AudioPlayer
        :url="url"
    ></AudioPlayer>
</template>
<script>
  export default {
      data() {
          return {
              downloadAvailable: false,
              url:""
          }
      },
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| url              | 音频文件地址   | string          |        |        |
| showDownload              | 是否展示下载按钮             | string  | | true |
| fileName              | 下载文件名             | string  | |  |

