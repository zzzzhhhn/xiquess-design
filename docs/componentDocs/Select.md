# MultipleSelect 多选选择器

专门用于多选的选择器，特殊之处在于可快速全选。

### 基本用法

```html
<template>
    <XqMultipleSelect :list="list" v-model="value" />
</template>
<script>
    export default {
        data () {
            return {
                list: [
                    {label: "aaa", value: 1},
                    {label: "bbb", value: 2},
                    {label: "ccc", value: 3},
                ]
                value: [2],
            }
        }
    }
</script>

```

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| value/v-model              | 选中项value列表   | array         |        |        |
| list            | 列表             | array |   |
| width             | 宽度  | string |        |  100%  |
| placeholder          | 提示文字  | string |        |  请选择   |
| labelKey             | 列表项中label的字段名  | string |        |  label   |
| valueKey             | 列表项中value的字段名  | string |        |  value   |
| allCheckedLabel      | 列表项中全选时显示的字段名  | string |        |  全部   |
| clearable      | 是否可清理  | boolean |        |  false   |


### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| change  | 勾选回调 | value  |
