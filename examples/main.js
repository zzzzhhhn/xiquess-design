import Vue from "vue";
import App from "./App.vue";
import Demo from "../components/lib/demo/index.js";
console.log("Demo", Demo);
Vue.use(Demo);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
