import Vue from "vue";
import * as Msal from "@azure/msal-browser";

declare module "vue/types/vue" {
  interface Vue {
    $msal: Msal.PublicClientApplication;
  }
}
