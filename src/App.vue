<template>
  <a-layout class="w-100" style="height: 100vh; width: 100%">
    <router-view v-slot="{ Component }">
      <div class="bg-white" style="min-height: calc(100vh - 130px) !important; height: 100%">
        <component :is="Component"/>
      </div>
    </router-view>
  </a-layout>
</template>

<script>

import {routes} from "@/router";

export default {
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route,
        () => {
          // verifyPermission(store.getters.getuserInfo.role)
          //
          // console.log(router.getRoutes())
        },
        // fetch the data when the view is created and the data is
        // already being observed
        {immediate: true}
    )
  },


}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
*{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px !important;
}

.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.arco-select, .arco-picker{
  border: 0.5px solid rgba(200,200,200,0.3) !important;
}
.arco-input-wrapper{
  border: 0.5px solid rgba(200,200,200,0.3) !important;
}
.arco-form-item-content .arco-btn{
  border: 0.5px solid rgba(200,200,200,0.3) !important;
}
</style>
