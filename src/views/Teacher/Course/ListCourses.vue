<template>
  <a-space :fill="true" align="center"
           class="d-flex flex-row justify-content-center justify-content-md-between"
           direction="horizontal" size="medium"
           wrap>
    <a-card v-for="item in 5" :style="{ width: '300px', marginBottom: '10px' }" hoverable>
      <div :style="{display: 'flex', alignItems: 'center',justifyContent: 'space-between', }">
      <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
        <a-avatar :size="28" :style="{ marginRight: '8px', backgroundColor: '#165DFF' }">
          A
        </a-avatar>
        <a-typography-text>Username</a-typography-text>
      </span>
        <a-link @click="changePage">More</a-link>
      </div>
    </a-card>
  </a-space>
</template>

<script>
import router from "@/router";

export default {
  name: "ListCourses",
  methods: {
    changePage(item) {
      router.push({name: "teacher_course_management_details", params: {id: 123456}})
    }
  }
}
</script>

<style scoped>

</style>