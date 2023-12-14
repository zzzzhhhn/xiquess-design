import Vue from "vue";
import { Tooltip, Slider } from "element-ui";
import VideoPlayer from "./VideoPlayer";
import MiniEditor from "./MiniEditor";

const _components = [Tooltip, Slider];

const Element = {
  install(Vue) {
    _components.forEach((component) => {
      console.log(component.name, component);
      Vue.component(component.name, component);
    });
  },
};
Vue.use(Element);

const components = [VideoPlayer, MiniEditor];
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
const xiquessDesign = {
  install,
  VideoPlayer,
};
window.xiquessDesign = xiquessDesign;
export default xiquessDesign;
