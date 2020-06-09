import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCompositionApi from "@vue/composition-api";
import Msal from "./plugins/msalBrowserPlugin";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
const msalConfig = {
  auth: {
    clientId: "Application(Client)ID",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:8080/"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
Vue.use(Msal, msalConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
