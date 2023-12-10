import Vue from "vue";
import App from "./App.vue";
import VideoPlayer from "../components/lib/VideoPlayer/index.js";
import "../components/css/index.scss";
Vue.use(VideoPlayer);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
