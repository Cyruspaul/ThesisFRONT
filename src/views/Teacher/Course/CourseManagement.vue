<template>
  <section>
    <MyPageHeader text="Course Management">
      <template #icon>
        <icon-book/>
      </template>
      <template #subtitle>
        2023 Year &nbsp;
        <a-tag bordered size="medium" visible>Second Semester</a-tag>
      </template>
    </MyPageHeader>

    <div class="px-5">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "CourseManagement",
  components: {MyPageHeader},

}
</script>

<style scoped>

</style>