<template>
  <section class="container-fluid">
    <MyPageHeader text="Teacher timetable">
      <template #icon>
        <icon-calendar/>
      </template>
      <template #subtitle>
        2023 Year &nbsp;
        <a-tag bordered size="medium" visible>Second Semester</a-tag>
      </template>
    </MyPageHeader>
    <!--    <a-space class="d-flex mt-3 justify-content-center" direction="horizontal" size="large" wrap>-->
    <!--      <a-select :style="{width:'320px'}" placeholder="Please select Classes ...">-->
    <!--        <a-option>Beijing</a-option>-->
    <!--        <a-option>Shanghai</a-option>-->
    <!--        <a-option>Guangzhou</a-option>-->
    <!--        <a-option>Guangzhou</a-option>-->
    <!--      </a-select>-->
    <!--      <a-select :style="{width:'320px'}" placeholder="Please select Year ...">-->
    <!--        <a-option v-for="item of data" :label="item.label" :value="item"/>-->
    <!--      </a-select>-->
    <!--      <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select Semester...">-->
    <!--        <a-option value="1">Semester 1</a-option>-->
    <!--        <a-option value="2">Semester 2</a-option>-->
    <!--      </a-select>-->
    <!--      <a-button shape="square" status="default" type="primary" value="mini">Search</a-button>-->
    <!--    </a-space>-->

    <div class="px-3">
      <router-view/>
    </div>
  </section>
</template>

<script>
import {ref} from "vue";
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "TimeTablePage",
  components: {MyPageHeader},
  created() {
    // router.push("/teacher/teatab")
  }, setup() {
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

    return {
      value,
      data
    }
  },


}
</script>

<style scoped>

</style>