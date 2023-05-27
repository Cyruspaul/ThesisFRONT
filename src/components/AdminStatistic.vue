x
<template>
  <section class="">
    <a-row :gutter="20" class=" text-start">
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :value="112893" :value-style="{ color: '#0a5a00'}" style="" title="Total Student">
            <template #prefix>
              <i class="bi bi-check2-square"/>
            </template>
          </a-statistic>
          <!--          <small class="text-end">Get to know all of them</small><span><router-link :to="{path:'/admin/students'}" >more</router-link></span>-->
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :precision="0" :value="150" :value-style="{ color: '#0339d2'}" title="Total Teacher">
            <template #prefix>
              <i class="bi bi-people"/>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :precision="0" :value="10" :value-style="{ color: '#3f8600' }" style=""
                       suffix="" title="Notifications">
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card class="w-100">
          <a-statistic :precision="0" :value="0" :value-style="{ color: '#cf1322' }"
                       class="demo-class w-100" suffix="" title="Today's Events">
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>

<script>
export default {
  name: "AdminStatistic"
}
</script>

<style scoped>

</style>