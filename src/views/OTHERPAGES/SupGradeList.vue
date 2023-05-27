<template>
  <section>
    <a-row :gutter="10" :style="{ width: '100%' }" :wrap="true" justify="start">

      <a-col v-for="index in size" :key="index" :lg="4" :sm="12" :span="24" class="mb-2">
        <a-card :bordered="true" :style="{ minHeight: '130px',
        minWidth:'fit-content'}" class="card-demo rounded-1 p-0"
                hoverable>
          <a-card-meta>
            <template #title>
              <a-space align="center" direction="horizontal" fill size="large">
                <span class="">数据结构与算法</span>
                <a-tag :color="index%2 ===0? 'orange':'green'" class="float-end" size="mini"
                       v-text="index%2 ===0? '未完成':'完成'"
                />
              </a-space>
            </template>
            <template #avatar>
              <a-space align="center" fill justify="between" size="mini">
                <small class="text-muted">
                  <icon-check v-if="index%2 ===0" class=" bg-secondary text-white"/>
                  <icon-close v-else class=" bg-danger text-white"/>
                  文件已经上传了</small>
              </a-space>
            </template>
            <template #description>
              考试时间：2023/06/30
            </template>
          </a-card-meta>

          <template #actions>
            <a-button v-if="index%2 ===0" :disabled="index%2!==0" size="mini" type="primary"
                      @click="modalViewBoolean=true">上传成绩
            </a-button>
          </template>

        </a-card>
      </a-col>
    </a-row>

    <a-modal ref="modalRef" :closable="false"
             :visible="modalViewBoolean" :width="700" align-center esc-to-close
             mask
             mask-closable title="数统学院2022-2023-1专业课（20、21级学生）安排" title-align="center" unmount-on-close
             @cancel="load_Data_By_Direction" @ok="load_Data_By_Direction">
      <div>
        <div class="mt-3 mx-auto w-100 d-flex justify-content-center">
          <a-typography-paragraph>显示当前老师上传文件的结果（在表里面显示各个学生的成绩）
            <a-typography-text code editable type="">FORM
              CODE
            </a-typography-text>
          </a-typography-paragraph>
        </div>
      </div>
    </a-modal>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "SupGradeList",
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