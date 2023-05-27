<template>
  <div class="d-flex flex-column justify-content-between align-items-stretch"
       style="min-height: calc(100vh - 300px) !important; height:fit-content">

    <div class="">
      <MyPageHeader :backbutton="true" icon="icon-calendar" text="Course Details">
        <template #extra>
          <a-button size="medium" status="default" type="primary">
            <icon-edit class="me-3"/>
            Edit Files
          </a-button>
        </template>
      </MyPageHeader>
      <a-descriptions :bordered="true" :column="4" :data="data" :size="size" layout="inline-vertical"
                      title="Basic Details"/>
    </div>

    <div class="">
      <a-alert :banner="true" :show-icon="true" class="text-muted" style="height: 300px" title="Documents"
               type="info">
        This is the list of the documents you already uploaded
        <a-space :fill="true" class="mt-3" direction="horizontal" size="medium" wrap>
          <a-card v-for="item in 5" :style="{ width: 'fit-content',minWidth:'230px', marginBottom: '10px' }" hoverable>
            <a-space :fill="true" align="center" class="d-flex justify-content-center justify-content-md-between"
                     direction="horizontal" size="medium">
                <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                    <a-avatar :size="28" :style="{ marginRight: '12px', backgroundColor: '#165DFF' }">
                      A
                    </a-avatar>
                    <a-typography-text>Username</a-typography-text>
               </span>
              <a-link>Open</a-link>
            </a-space>
          </a-card>
        </a-space>
      </a-alert>
    </div>
  </div>
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