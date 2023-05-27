<template>
  <section>

    <MyPageHeader :backbutton="true" icon="icon-calendar" text="Course Details">
    </MyPageHeader>
    <a-space class="container" direction="vertical" fill size="large" wrap>
      <div class="">
        <a-descriptions :bordered="true" :column="{xs:1,lg:3}" :data="data" :size="size" layout="inline-vertical"
                        title="Basic Details"/>
      </div>
      <div class="">
        <p class="arco-descriptions-title">Files</p>
        <div>

          <a-list :bordered="false" :pagination-props="{'hide-on-single-page':true, defaultPageSize: 5,total:10,}"
                  class="gap-2" size="mini">
            <a-list-item v-for="idx in 10" action-layout="horizontal">
              <template #extra>
                <a-link hoverable>Download {{ idx }}</a-link>
              </template>
              <a-list-item-meta description="Description" title="Course 1 HomeWork">
                <template #avatar>
                  {{ idx }}
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-space>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";

export default {
  name: "CourseDescription",
  components: {MyPageHeader},
  setup() {
    const size = ref('medium');

    const data = [{
      label: 'Name',
      value: 'Socrates',
    }, {
      label: 'Mobile',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];

    return {
      data,
      size
    }
  },
}
</script>

<style scoped>

</style>