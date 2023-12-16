# DraggableTabs 可拖拽标签页

可拖拽排序的标签页，支持二级下拉菜单。

### 基本用法

```html
<template>
    <XqDraggableTabs
            :tabList="tabList"
            v-model="value"
            :dropMenuKey="currentPageId"
            @chiClick="onChiClick"
    />
</template>
<script>
  export default {
    data () {
      return {
          tabList: [
              {key:1, label: "aaa"},
              {key:2, label: "bbb"},
              {key:3, label: "ccc", children: [{key: 1, label: "aaa"},{key: 2, label: "bbb"}]},
              {key:4, label: "ddd", children: [{key: 1, label: "ccc"},{key: 2, label: "ddd"}]},
          ],
          value: 4,
          currentPageId: 2
      }
    },
      methods: {
          onChiClick(v) {
              this.currentPageId = v;
          }
      }
  }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| tabList              | tabs列表   | Array<{key（唯一标识）, label（tab名称）, children?（数组，如果有则渲染为下拉菜单）}>          |        |        |
| value/v-model              | 当前选中项的key             | string |   |
| dropMenuKey             | 当前选中下拉菜单项的key  | string |        |  600px   |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| input  | 选中项变更 | key  |
| click  | 点击tab项 | key  |
| sort  | 拖拽排序后回调 | 排序后的数组  |
| chiClick  | 下拉菜单点击 | key  |
