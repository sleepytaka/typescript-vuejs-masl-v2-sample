<template>
  <div class="hello">
    <h1>Subscription List</h1>
    <div v-for="subscription in subscriptions" v-bind:key="subscription">
      <p>{{ subscription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from "@vue/composition-api";
export default defineComponent({
  setup(props, context) {
    const subscriptions = reactive<string[]>([]);
    async function callApi(endpoint: string, token: string) {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;
      headers.append("Authorization", bearer);
      const options = {
        method: "GET",
        headers: headers
      };
      return await (await fetch(endpoint, options)).json();
    }
    onMounted(async () => {
      const silentRequest = {
        scopes: ["https://management.core.windows.net//user_impersonation"]
      };
      try {
        const response = await context.root.$msal.acquireTokenSilent(
          silentRequest
        );
        const data = await callApi(
          "https://management.azure.com/subscriptions?api-version=2020-01-01",
          response.accessToken
        );
        data.value.forEach(function(value: any) {
          const id: string = value.subscriptionId;
          subscriptions.push(id);
        });
      } catch (error) {
        console.log("failed: ", error);
      }
    });
    return {
      subscriptions
    };
  }
});
</script>
