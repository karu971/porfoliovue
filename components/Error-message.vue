<template>
  <div>
    <div v-if="errorMessage && errorMessage.status == 'error'" class="alert alert-danger">{{errorMessage}}</div>
  </div>
</template>

<script>
import eventBus from "~/plugins/services";
export default {
  data() {
    return {
      errorMessage: null
    };
  },
  created() {
    this.$nuxt.$on("errorMessage", message => {
      this.errorMessage = message;
    });
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off("errorMessage");
  }
};
</script>

<style>
</style>
