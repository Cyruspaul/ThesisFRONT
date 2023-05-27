<template>
  <section>

    <MyPageHeader text="TimeTable"/>
    <div class="container">
      <MyCalender class="mx-auto" style="width: 90%"/>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import MyCalender from "@/components/MyCalendar";

export default {
  name: "StudentTimeTable",
  components: {MyCalender, MyPageHeader}
}
</script>

<style scoped>

</style>