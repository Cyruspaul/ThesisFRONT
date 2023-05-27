<template>
  <section>
    <MyPageHeader text="Graduation Plan">
      <template #icon>
        <icon-bar-chart/>
      </template>
    </MyPageHeader>
    <div class="container">
      <a-alert class="mx-auto" show-icon style="width: 75%" title="Information" type="info">
        It's not not yet your graduation Year. Please wait again in some Years to come !!!
      </a-alert>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "GraduationPage",
  components: {MyPageHeader}
}
</script>

<style scoped>

</style>