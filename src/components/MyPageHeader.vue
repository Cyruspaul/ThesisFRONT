<template>
  <div class=" mb-4 pt-0">
    <a-page-header :show-back="backbutton === true" class="p-0 m-0 border-0" @back="pressback">
      <template #title>
        <p class="m-0 p-0" style="font-size: 18px">
          <slot name="icon"/>
          {{ text }}
        </p>
      </template>
      <template #subtitle>
        <slot name="subtitle"/>
      </template>
      <template #extra>
        <a-space direction="horizontal" size="large">
          <slot name="extra"/>
          <a-tooltip position="left" mini content="刷新页面">
            <a-button @click="refresh" size="mini" status="normal" type="dashed" class="p-2" ><icon-refresh /></a-button>
          </a-tooltip>
        </a-space>

      </template>
    </a-page-header>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "MyPageHeader",
  props: ['icon', 'text', 'backbutton'],
  methods: {
    pressback() {
      router.back()
    },
    refresh(){
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>