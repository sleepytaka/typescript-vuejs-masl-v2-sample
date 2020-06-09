import * as Msal from "@azure/msal-browser";

export default {
  install(Vue: Vue.VueConstructor, options: Msal.Configuration) {
    Vue.prototype.$msal = new Msal.PublicClientApplication(options);
  }
};
