<template>
  <div :class="`xq-multiple-select ${id}`" :style="{ width: width }">
    <el-popover
      placement="bottom-start"
      :visible-arrow="false"
      :popper-class="`xq-popper-multi-select ${id}`"
      :append-to-body="false"
      @show="onShow"
      @hide="onHide"
      trigger="click"
    >
      <el-checkbox
        @change="onCheckedAll"
        :label="allCheckedLabel"
        v-model="checkedAll"
      ></el-checkbox>
      <el-checkbox-group v-model="checkList" @change="onChange">
        <el-checkbox
          :label="item[valueKey]"
          v-for="(item, index) in list"
          :key="index"
          >{{ item[labelKey] }}</el-checkbox
        >
      </el-checkbox-group>
      <div
        class="xq-text-input xq-flex"
        :class="[show ? 'focus' : '']"
        slot="reference"
      >
        <div class="xq-flex-auto xq-text-left xq-text-ellipsis xq-f14">
          <span v-if="resultText">{{ resultText }}</span>
          <span class="xq-font-color3" v-else>{{ placeholder }}</span>
        </div>
        <i
          class="el-icon-arrow-down xq-rotate-arrow xq-f14 xq-transition xq-flex-none xq-mr5"
          :class="{ 'rotate-180': show }"
        ></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { Popover, Checkbox, CheckboxGroup } from "element-ui";
export default {
  name: "XqMultipleSelect",
  components: {
    [Popover.name]: Popover,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  props: {
    //列表
    list: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    //宽度
    width: {
      type: String,
      default: "100%",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    //label字段
    labelKey: {
      type: String,
      default: "label",
    },
    //value字段
    valueKey: {
      type: String,
      default: "value",
    },
    allCheckedLabel: {
      type: String,
      default: "全部",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data: () => ({
    resultList: [],
    checkList: [],
    show: false,
    id: "",
    checkedAll: true,
  }),
  watch: {
    checkList(v) {
      this.resultList = this.list
        .filter((item) => v && v.includes(item[this.valueKey]))
        .map((item) => item[this.labelKey]);
      this.checkedAllHandler();
    },
    value(v) {
      this.checkList = v || [];
    },
    list: {
      handler() {
        this.checkedAllHandler();
      },
      deep: true,
    },
  },
  computed: {
    resultText() {
      return this.list &&
        this.resultList &&
        this.resultList.length === this.list.length
        ? this.allCheckedLabel
        : this.resultList.join("、");
    },
  },
  created() {
    this.id = new Date().getTime();
    this.checkList = this.value || [];
  },
  mounted() {
    $(`.xq-popper-multi-select.${this.id}`).css(
      "width",
      $(`.xq-multiple-select.${this.id}`).css("width")
    );
  },
  methods: {
    /**
     * @description: 判断全选
     * @return {*}
     * @author: zul
     */

    checkedAllHandler() {
      if (
        this.list.filter((n) => this.checkList.includes(n[this.valueKey]))
          .length == this.list.length
      ) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    /**
     * @description: 全选
     * @param {Boolean} e
     * @return {*}
     * @author: zul
     */

    onCheckedAll(e) {
      if (e) {
        this.checkList = this.list.map((v) => v[this.valueKey]);
      } else {
        this.checkList = [];
      }
      this.$emit("change", this.checkList);
    },
    onShow() {
      this.show = true;
    },
    onHide() {
      this.show = false;
    },
    onChange(v) {
      this.$emit("change", v);
    },
  },
};
</script>
