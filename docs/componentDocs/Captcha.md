# Captcha 验证码

通过canvas绘制自定义验证码图片。

### 基本用法

```html
<template>
    <XqCaptcha
        :identifyCode="verifyCode"
        @click.native="fetchVerifyCode"
    />
</template>
<script>
  export default {
      data() {
          return {
              verifyCode: "1234"
          }
      },
      methods: {
          fetchVerifyCode() {
            this.verifyCode = Math.random().toString().substring(2, 6);
          }
      }
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| identifyCode              | 验证码字符   | string          |        |        |
| fontSizeMin              | 字体随机大小最小值             | number  | | 20 |
| fontSizeMax              | 字体随机大小最大值             | number  | | 30 |
| contentWidth             | 图片宽度，可为px或者%  | number |        |  112   |
| contentHeight               | 图片高度 | number |        |   32   |
| backgroundColorMin            | 背景随机颜色色域最小值 | number |        |   180   |
| backgroundColorMax            | 背景随机颜色色域最大值 | number |        |   240   |
| colorMin            | 字体随机颜色色域最小值 | number |        |   50   |
| colorMax            | 字体随机颜色色域最大值 | number |        |   160   |
| lineColorMin            | 干扰线随机颜色色域最小值 | number |        |   40   |
| lineColorMax            | 干扰线随机颜色色域最大值 | number |        |   180   |

