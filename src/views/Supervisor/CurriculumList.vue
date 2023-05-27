<template>
  <section>
    <a-row :gutter="10" :style="{ width: '100%' }" :wrap="true" justify="start">

      <!--          <a-col v-if="course_list.length === 0" :span="24" style="height: 50vh">-->
      <!--            <a-empty >-->
      <!--              <a-space direction="vertical" size="large">-->
      <!--                <a-typography-text >Please check the curriculum for the relative class</a-typography-text>-->
      <!--&lt;!&ndash;                <br>&ndash;&gt;-->
      <!--&lt;!&ndash;                <a-button  class=" rounded-pill p-3" @click="modalViewBoolean=true" type="primary" >Add New</a-button>&ndash;&gt;-->
      <!--              </a-space>-->
      <!--            </a-empty>-->
      <!--          </a-col>-->

      <a-col v-for="index in course_list" :key="index" :lg="4" :sm="12" :span="24" class="mb-2">
        <a-card :bordered="true" :style="{ minHeight: '100px', minWidth:'fit-content'}" class="card-demo rounded-1"
                hoverable>
          <a-card-meta description="Course description">
            <template #title>
              <a-space align="center" direction="horizontal" fill size="large">
                <span>The course title</span>
                <a-tag :color="index%2 ===0? 'orange':'green'" size="mini" v-text="index%2 ===0? 'Unset':'Done'"
                />
              </a-space>
            </template>
            <template #avatar>
              <a-space align="center" fill justify="between" size="normal">
                <a-avatar :size="24" shape="square"> A</a-avatar>
                <a-typography-text>Username</a-typography-text>
              </a-space>
            </template>
          </a-card-meta>

          <template #actions>
            <a-button v-if="index%2 ===0" :disabled="index%2!==0" size="mini" type="primary"
                      @click="modalViewBoolean=true">Set
              teacher
            </a-button>
          </template>

        </a-card>
      </a-col>
    </a-row>

    <a-modal ref="modalRef"
             :closable="false" :visible="modalViewBoolean" :width="700" align-center
             esc-to-close
             mask mask-closable title-align="center" unmount-on-close
             @cancel="load_Data_By_Direction" @ok="load_Data_By_Direction">
      <div>
        <MyPageHeader text=" 数统学院2022-2023-1专业课（20、21级学生）安排"></MyPageHeader>
        <div class="mt-3 mx-auto w-100 d-flex justify-content-center">
          Assign a teacher to a specific course
          <a-typography-text code editable type="">FORM CODE</a-typography-text>
        </div>
      </div>
    </a-modal>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "CurriculumList",
  components: {MyPageHeader},
  props: ['size'],
  data() {
    return {
      modalViewBoolean: false,
      course_list: 5
    }
  },
  methods: {
    load_Data_By_Direction() {
      this.modalViewBoolean = false
    }
  },
}
</script>

<style scoped>

</style>