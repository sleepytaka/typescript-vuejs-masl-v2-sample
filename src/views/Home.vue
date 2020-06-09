<template>
  <div>
    <SubscriptionList />
  </div>
</template>

<script>
import SubscriptionList from "@/components/SubscriptionList.vue";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  components: {
    SubscriptionList
  }
});
</script>
