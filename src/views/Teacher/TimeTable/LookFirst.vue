<template>
  <section>
    <div class="m-3">
      <h5 class="text-center fw-bold ms-1">Teacher timetable</h5>
    </div>
    <a-space class="d-flex justify-content-center" direction="horizontal" size="large" wrap>
      <a-select :style="{width:'320px'}" placeholder="Please select Class ...">
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
        <a-option>Guangzhou</a-option>
        <a-option>Guangzhou</a-option>
      </a-select>
      <a-select :style="{width:'320px'}" placeholder="Please select Year ...">
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
        <a-option>Guangzhou</a-option>
        <a-option>Disabled</a-option>
      </a-select>
      <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select Semester...">
        <a-option v-for="item of data" :label="item.label" :value="item"/>
      </a-select>
      <a-button shape="square" status="default" type="primary" value="mini">Search</a-button>
    </a-space>
  </section>
</template>

<script>
import {ref} from "vue";

export default {
  name: "LookFirst",
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

    return {
      value,
      data
    }
  },
}
</script>

<style scoped>

</style>