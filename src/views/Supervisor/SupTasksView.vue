<template>
  <section class="container-fluid">
    <MyPageHeader text="Tasks">
      <template #extra>
        <a-button status="normal" type="primary">
          <icon-plus class="me-1"/>
          Add task
        </a-button>
      </template>
    </MyPageHeader>

    <a-space :fill="true" class="px-5" direction="vertical" size="large">

<!--      <a-radio-group default-value="all" direction="vertical" size="large" type="button">-->
<!--        <a-radio value="all">All</a-radio>-->
<!--      </a-radio-group>-->

      <div>
        <a-list :max-height="1000" :pagination-props="{'hide-on-single-page':true, defaultPageSize: 10,total:12,}"
                bordered
                class="flex-grow-1">
          <a-list-item v-for="idx in 12">
            <a-list-item-meta>
              <template #avatar>
                <a-popconfirm content="Are you sure you want to delete?" type="success">
                  <a-checkbox @change="changeTaskState(idx)"/>
                </a-popconfirm>
              </template>
              <template #title>
                Go to school and manage all the file i have there and get a coffee {{ idx }}
              </template>
            </a-list-item-meta>
            <template #extra>
              <a-space align="center" direction="horizontal" size="large">
                <span>2023/03/30 - 18:00</span>
                <a-tag :color="'#352489'" size="mini">Pending</a-tag>
              </a-space>
            </template>
          </a-list-item>
        </a-list>
      </div>
    </a-space>

  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "SupTasksView",
  components: {MyPageHeader},
  methods: {
    changeTaskState(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>

</style>