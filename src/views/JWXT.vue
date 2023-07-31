<template>
  <a-spinner ></a-spinner>
</template>

<script>
import router from "@/router";

export default {
  name: "JWXT",
  mounted(){
    router.push('dashboard')
  }
}
</script>

<style scoped>

</style>