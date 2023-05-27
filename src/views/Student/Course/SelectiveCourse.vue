<template>
  <section>
    <MyPageHeader text="Course Selective">
      <template #icon>
        <icon-bar-chart/>
      </template>
    </MyPageHeader>
    <div class="container">
      <a-alert class="mx-auto" show-icon style="width: 75%" title="Information" type="info">
        Your Study plan does not support selective course !!
      </a-alert>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "SelectiveCourse",
  components: {MyPageHeader}
}
</script>

<style scoped>

</style>