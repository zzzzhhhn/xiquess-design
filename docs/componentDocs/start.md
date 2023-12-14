# 快速开始

本节将介绍如何在项目中使用 xiquessDesign。

## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i xiquess-design -S
```
## 引入 xiquessDesign

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import xiquessDesign from "xiquess-design";
import "xiquess-design/dist/css/index.css";
import App from './App.vue';

Vue.use(xiquessDesign);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 xiquessDesign 的引入。需要注意的是，样式文件需要单独引入。

### 开始使用

至此，一个基于 Vue 和 xiquessDesign 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。



