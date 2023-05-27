<template>
<!--  <a-result status="500" subtitle="This page isn’t working.">-->
<!--    <template #extra>-->
<!--      <a-space>-->
<!--        <a-button type="primary" @click="backToLogin">Back</a-button>-->
<!--      </a-space>-->
<!--    </template>-->
<!--  </a-result>-->
<section class="h-100 w-100 d-flex flex-row justify-content-center align-items-center">
    <a-spin loading  :size="100" />
</section>
</template>

<script>
import router from "../router";

export default {
  name: "NotFound",
  methods: {
    backToLogin() {
      router.back()
    }
  }
}
</script>

<style scoped>

</style>