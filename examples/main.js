import Vue from "vue";
import App from "./App.vue";
import xiquessDesign from "../components/lib";
import "../components/css/index.scss";
Vue.use(xiquessDesign);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
