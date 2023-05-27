<template>
  <a-layout class="layout-demo">
    <a-layout-header class="bg-white navbar " style=" height: 64px">
      <!--        <a-button class="rounded p-2" shape="round" @click="onCollapse">-->
      <!--          <IconCaretRight v-if="collapsed" />-->
      <!--          <IconCaretLeft v-else />-->
      <!--        </a-button>-->
      <a-menu
          :selectedKeys="['0_1']"
          mode='horizontal'
          @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="0_1">
          <IconHome/>
          Menu 1
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar/>
          Menu 2
        </a-menu-item>
        <a-sub-menu key="1">
          <template #title>
            <span><IconCalendar/>Navigation 1</span>
          </template>
          <a-menu-item key="1_1">Menu 1</a-menu-item>
          <a-menu-item key="1_2">Menu 2</a-menu-item>
          <a-sub-menu key="2" title="Navigation 2">
            <a-menu-item key="2_1">Menu 1</a-menu-item>
            <a-menu-item key="2_2">Menu 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3" title="Navigation 3">
            <a-menu-item key="3_1">Menu 1</a-menu-item>
            <a-menu-item key="3_2">Menu 2</a-menu-item>
            <a-menu-item key="3_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="4">
          <template #title>
            <span><IconCalendar/>Navigation 4</span>
          </template>
          <a-menu-item key="4_1">Menu 1</a-menu-item>
          <a-menu-item key="4_2">Menu 2</a-menu-item>
          <a-menu-item key="4_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout class="container-fluid" style="padding: 24px 24px;">

      <a-layout-content>
        Student Content
      </a-layout-content>
      <!--        <a-layout-footer>Footer</a-layout-footer>-->
    </a-layout>
  </a-layout>
</template>
<script>
import {Message} from "@arco-design/web-vue";

export default {
  name: "StudentBasicLayout",
  components: {},
  setup() {
  },
  methods: {
    onClickMenuItem(key) {
      Message.info({content: `You select ${key}`, showIcon: true});
    }
  }
}
</script>
<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
</style>
