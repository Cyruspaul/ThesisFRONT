<template>
  <section class="container-fluid">

    <MyPageHeader text="Class Management">
      <template #icon>
        <icon-book/>
      </template>
      <template #subtitle>
        2023 Year &nbsp;
        <a-tag bordered size="medium" visible>Second Semester</a-tag>
      </template>
    </MyPageHeader>

    <div class="px-5">
      <a-space :fill="true" align="center" class="d-flex justify-content-center justify-content-md-between"
               direction="horizontal" size="medium" wrap>
        <a-card v-for="item in 5" :style="{ width: '300px', marginBottom: '10px' }" hoverable>
          <div :style="{display: 'flex', alignItems: 'center',justifyContent: 'space-between', }">
      <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
        <a-avatar :size="28" :style="{ marginRight: '8px', backgroundColor: '#165DFF' }">
          A
        </a-avatar>
        <a-typography-text>Class {{ item }}</a-typography-text>
      </span>
            <a-link @click="getDetailsAboutClass">More</a-link>
          </div>
        </a-card>
      </a-space>
    </div>
  </section>
</template>

<script>
import {ref} from "vue";
import MyPageHeader from "@/components/MyPageHeader";
import {Notification} from '@arco-design/web-vue';
import router from "@/router";

export default {
  name: "LookFirst",
  components: {MyPageHeader},

  data() {
    return {
      collapse: false
    }
  },
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      other: 'extra'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra'
    }]

    const getDetailsAboutClass = function () {
      Notification.info({
        title: "Details About classe",
        closable: true,
        content: "Details Par rapport a la classe selectionnee: Comme le nombre d'etudiants",
        duration: 5000,
      })
      router.push({name: "teacher_class_management_details", params: {id: 'JS2019-191'}})
    }
    return {
      value,
      data,
      getDetailsAboutClass
    }
  },
}
</script>

<style scoped>

</style>