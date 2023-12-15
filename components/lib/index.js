import Vue from "vue";
import { Tooltip, Slider } from "element-ui";
import VideoPlayer from "./video-player";
import MiniEditor from "./mini-editor";
import Emotion from "./emoji";
import emojiMap from "./emoji/src/emojiMap";
import Captcha from "./captcha";
import ImgPreviewer from "./img-previewer";

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

const components = [VideoPlayer, MiniEditor, Emotion, Captcha, ImgPreviewer];
components.forEach((item) => {
  if (!item.install) {
    item.install = function (Vue) {
      Vue.component(item.name, item);
    };
  }
});
const install = function (Vue) {
  Vue.prototype.$xqGetEmotionHtml = (str) => {
    return (
      str &&
      str.replace(
        /\[[^\]]+\]/gu,
        ($1) =>
          (emojiMap[$1] &&
            `<span class="xq-wechat-emoji xq-wechat-emoji${emojiMap[$1]}"></span>`) ||
          $1
      )
    );
  };
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
