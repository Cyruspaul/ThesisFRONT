<template>
  <section class="container">
    <a-row :gutter="15" class="row flex-wrap g-2">
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :value="112893" style="margin-right: 50px" title="Total"/>
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :precision="2" animation :value="112893" title="Account Balance (CNY)"/>
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card>
          <a-statistic :precision="2" :value="11.28" :value-style="{ color: '#3f8600' }"
                       suffix="%" title="Feedback">
            <template #extra>extra</template>
            <template #prefix>prefix</template>
            <template #suffix>suffix</template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :lg="6" :sm="12" :xs="24">
        <a-card class="w-100">
          <a-statistic :precision="2" :value="9.3" :value-style="{ color: '#cf1322' }"
                       class="demo-class w-100" suffix="%" title="Idle">
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>

<script>
export default ({
  components: {},
  name: "StatisticComp",
  setup() {
    // todo
    return {}
  },
  updated() {
    console.log("_------------------------- StatisticComp UPDATED----------------")
  }
})
</script>

<style lang='stylus' scoped></style>
    