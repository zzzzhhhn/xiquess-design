import Demo from "./demo";
const components = [Demo];
components.forEach((item) => {
  if (!item.install) {
    item.install = function (Vue) {
      Vue.component(item.name, item);
    };
  }
});
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const xqui = {
  install,
  Demo,
};
window.xqui = xqui;
export default xqui;
