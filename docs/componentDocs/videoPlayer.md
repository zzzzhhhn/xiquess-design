## VideoPlayer 视频播放器

通过h5原生标签video播放视频，具有调节播放速度、音量，设置是否可手动控制播放进度、节点信息等功能。

### 基本用法

```html
<template>
    <VideoPlayer
            ref="video"
            :width="'100%'"
            :height="'100%'"
            :url="url"
            :canJump="true"
    />
</template>
<script>
  export default {
    data () {
      return {
          url: "https://muiplayer.js.org/media/media.mp4"
      }
    }
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| url              | 设置视频地址   | string          |        |        |
| tipList              | 设置进度条节点,值为一个数据，每一项包含两个参数，startTime是节点时间秒数，text:节点描述             | Array<{startTime: "", text: ""}>  |   |
| width             | 设置播放器宽度，可为px或者%  | string |        |  600px   |
| height               | 设置播放器高度 | string |        |   400px   |
| canJump            | 设置播放器是否允许拖动播放条 | boolean |    true/false    |   true   |
| canSpeed               | 设置播放器是否允许修改播放速度 | boolean |    true/false    |  true    |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| onPlay  | 视频播放回调 |   |
| onPause  | 视频播放回调 |   |
| onEnd  | 视频播放完毕 |   |
| onLoadedData  | 视频资源加载完成 |   |
| timeupdate  | 视频播放进度 | 秒数  |
| mutedChange  | 静音修改回调 | true/false  |
| speedChange  | 倍速修改回调 | 0.25/0.5/0.75/1/1.25/1.5/1.75/2  |
| volumeChanged  | 音量修改回调 | 0.0~1.0  |
| enterFullScreen  | 进入全屏回调 |   |
| exitFullScreen  | 进入全屏回调 |   |

### Methods

| 名称	 | 说明               |  
| ------ | ------------------ | 
| play  | 播放 |
| pause  | 暂停 |
| setVolume  | 设置音量，参数：0.0～1.0 |
| setCurrentTime  | 设置播放进度，参数：秒数 |
| onToggleMuted  | 设置是否静音， 参数：true/false |
| launchFullscreen  | 设置全屏播放 |
| exitFullscreen  | 退出全屏播放 |
| onChangeSpeed  | 设置播放倍速，设置范围：0.25/0.5/0.75/1/1.25/1.5/1.75/2 |
