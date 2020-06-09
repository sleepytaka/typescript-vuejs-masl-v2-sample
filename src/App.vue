<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img alt="Vue logo" src="./assets/logo.png" />
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
      >
        <div class="navbar-end">
          <div class="navbar-item">
            <span>{{ account.name }}</span>
          </div>
          <div class="navbar-item" v-if="account.isActive">
            <div class="buttons">
              <a class="button is-light" v-on:click="signOut">
                Log out
              </a>
            </div>
          </div>
          <div class="navbar-item" v-else>
            <div class="buttons">
              <a class="button is-light" v-on:click="signIn">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">
      <router-view v-if="account.isActive" />
      <section class="hero" v-else>
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              MSAL.js Samples
            </h1>
            <h2 class="subtitle">
              typescript-vuejs-masl-v2
            </h2>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  defineComponent,
  onMounted
} from "@vue/composition-api";
export default defineComponent({
  setup(props, context) {
    const showNav = ref(false);
    const account = reactive({ name: "", isActive: false });
    onMounted(async () => {
      await context.root.$msal.handleRedirectPromise().catch(error => {
        console.log("failed: ", error);
      });
      if (context.root.$msal.getAccount()) {
        account.name = context.root.$msal.getAccount().name;
        account.isActive = true;
      } else {
        account.name = "";
        account.isActive = false;
      }
    });
    return {
      account,
      showNav,
      signIn() {
        const loginRequest = {
          scopes: ["https://management.core.windows.net//user_impersonation"]
        };
        context.root.$msal.loginRedirect(loginRequest);
      },
      signOut() {
        context.root.$msal.logout();
      }
    };
  }
});
</script>
<style></style>
