<template>
  <div class="xq-draggable-tabs xq-w100 xq-flex xq-border-bottom">
    <div
      class="xq-flex-none xq-cursor-pointer"
      @mouseup.stop="onLeft"
      v-show="showArrow"
    >
      <i class="iconfont-xq-design">&#xe773;</i>
    </div>
    <div class="xq-flex-auto xq-h100 xq-over-hide">
      <div class="xq-h100 xq-tab-content">
        <draggable
          @sort="onSortTab"
          v-model="currentTabList"
          :animation="200"
          handle=".xq-mover"
          class="xq-flex xq-h100"
        >
          <div
            class="xq-tab-item xq-h100 xq-pl5 xq-pr5 xq-flex xq-cursor-pointer"
            :class="{ active: item.key === value }"
            v-for="(item, index) in currentTabList"
            :key="index"
          >
            <template v-if="item.children && item.children.length">
              <el-dropdown
                @command="(v) => onCommand(v, item.key)"
                trigger="hover"
                @visible-change="onVisibleChange"
              >
                <span
                  class="xq-page-title xq-f14 xq-flex xq-nowrap xq-cursor-pointer"
                  @click.stop="onClickItem(item.key)"
                >
                  <i class="iconfont-xq-design xq-mover">&#xe633;</i>
                  {{ item.label }}
                  <i
                    class="iconfont-xq-design xq-transition"
                    :class="{ 'xq-rotate180': visible }"
                    >&#xe74e;</i
                  >
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :class="{
                      'xq-color-usual-blue':
                        (currentOtherTab === chi.key ||
                          dropMenuKey === chi.key) &&
                        item.key === value,
                    }"
                    :command="chi"
                    v-for="(chi, i) in item.children"
                    :key="i"
                    >{{ chi.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <i class="iconfont-xq-design xq-mover">&#xe633;</i>
              <span
                class="xq-nowrap xq-page-title xq-f14"
                @click="onClickItem(item.key)"
                >{{ item.label }}</span
              >
            </template>
          </div>
        </draggable>
      </div>
    </div>
    <div
      class="xq-flex-none xq-cursor-pointer"
      @mouseup.stop="onRight"
      v-show="showArrow"
    >
      <i class="iconfont-xq-design">&#xe772;</i>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
export default {
  name: "XqDraggableTabs",
  components: {
    draggable,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    value: String,
    dropMenuKey: String,
  },
  watch: {
    tabList(v) {
      this.currentTabList = v;
    },
  },
  data: () => ({
    left: 0,
    allWidth: 0,
    currentTabList: [],
    currentOtherTab: "",
    showArrow: false,
    visible: false,
  }),
  created() {
    this.currentTabList = this.tabList;
  },
  mounted() {
    this.checkArrow();
  },
  methods: {
    onVisibleChange(v) {
      this.visible = v;
    },
    getAllWidth() {
      this.allWidth = 0;
      $(".xq-tab-content .xq-tab-item").each((i, e) => {
        this.allWidth -= parseInt($(e).css("width"));
      });
    },
    checkArrow() {
      this.showArrow = false;
      this.$nextTick(() => {
        this.getAllWidth();
        const width = parseInt(
          $(".xq-tab-content").css("width") ||
            $(".xq-tab-content")[0].offsetWidth
        );
        if (width < Math.abs(this.allWidth)) {
          this.showArrow = true;
        }
      });
    },
    onClickItem(key) {
      this.$emit("input", key);
      this.$emit("click", key);
    },
    onLeft() {
      if (this.left < 0) {
        this.left += 20;
        this.onMove();
      }
    },
    onRight() {
      this.getAllWidth();
      const width = parseInt(
        $(".xq-tab-content").css("width") || $(".xq-tab-content")[0].offsetWidth
      );
      if (this.left > this.allWidth + width) {
        this.left -= 10;
        this.onMove();
      }
    },
    onMove() {
      $(".xq-tab-content").css("transform", `translateX(${this.left}px)`);
    },
    onSortTab() {
      this.$emit("sort", this.currentTabList);
    },
    resize() {
      this.left = 0;
      this.onMove();
      this.checkArrow();
    },
    onCommand(v, key) {
      this.currentOtherTab = v.key;
      this.$emit("input", key);
      this.$emit("chiClick", v.key);
    },
  },
};
</script>
