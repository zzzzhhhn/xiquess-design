import comp from "./src/index.vue";
comp.install = function (Vue) {
  Vue.component(comp.name, comp);
};
export default comp;
