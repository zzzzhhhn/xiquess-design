# Tag 标签

自定义标签，可关闭，可设置弹性宽度，文字过长自动展示省略号。

### 基本用法

```html
<template>
    <XqTag name="abcd" />
</template>


```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| name              | 内容   | string         |        |        |
| width            | 宽度             | string |   |auto
| maxWidth             | 最大宽度  | string |        |  120px   |
| params          | 自定义参数，当触发关闭回调时会返回  | object |        |  {}   |
| closeable             | 是否可关闭  | boolean |    true/false    |  true   |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| close  | 关闭回调 | params  |
