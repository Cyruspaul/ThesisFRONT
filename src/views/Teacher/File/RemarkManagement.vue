<template>
  <section class="container-fluid">
    <MyPageHeader text="Remarks">
      <template #icon>
        <icon-star/>
      </template>
      <!--      <template #subtitle>-->
      <!--        2023 Year &nbsp; <a-tag size="medium" visible bordered>Second Semester</a-tag>-->
      <!--      </template>-->
    </MyPageHeader>

    <StatisticComp/>

  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import StatisticComp from "@/components/StatisticComp";

export default {
  name: "RemarkManagement",
  components: {MyPageHeader, StatisticComp}
}
</script>

<style scoped>

</style>