<template>
  <section class="">
    <MyPageHeader :backbutton="true" text="成绩管理">
      <template #icon>
        <icon-book/>
      </template>
      <template #subtitle>
        {{classname}}
      </template>
    </MyPageHeader>

    <div class="main-content px-3">
          <div class="p-2 pt-0" style="min-height: fit-content">
            <a-row :gutter="10" :style="{ width: '100%' }" :wrap="true" justify="start">
              <a-col v-if="grade.length === 0" :span="24" class="text-center mt-5">
                <a-empty />

              </a-col>
              <a-col v-for="index in grade" :key="index.course" :lg="8" :xl="6" :xs="24" :md="24" :span="24" class="mb-3">
                <a-card :bordered="true" size="large" :style="{ minHeight: '130px',
        minWidth:'fit-content'}" class="card-demo rounded-1 p-0"
                        hoverable>
                  <template #title>
                      <span class="">{{index.course}}</span>
                  </template>

                  <template #extra>
                    <a-tag v-if="index.score?index.score.status===1:false" :color="index.score===0? 'orange':'green'" class="float-end" size="mini"
                           v-text="index.score===0? '等待':'完成'"
                    />
                  </template>
                  <a-card-meta>
                    <template #avatar>
                      <a-space align="center" fill justify="between" size="mini">
                        <small class="text-muted ">
                          <icon-check v-if="index.score ===0" class=" bg-secondary text-white"/>
                          <icon-check v-else-if="index.score ===1" class=" bg-success text-white"/>
                          <icon-close v-else class=" bg-danger text-white"/>
                        <span class="ms-2" v-text="index.score===0?'文件已经上传了':'未上传文件了'"></span>
                        </small>
                      </a-space>
                    </template>
                    <template #description>
                      <a-descriptions align="center" layout="inline-vertical" :column="3"  size="mini">
                        <a-descriptions-item label="学分" ><a-tag>{{index.credit}}</a-tag></a-descriptions-item>
                        <a-descriptions-item label="课资质" ><a-tag>{{index.courseattr}}</a-tag></a-descriptions-item>
                        <a-descriptions-item label="学期" ><a-tag>{{index.semester}}</a-tag></a-descriptions-item>
                      </a-descriptions>

<!--                      考试时间：{{index.score?index.score.gmtcreate:''}}-->
                    </template>
                  </a-card-meta>

                  <template #actions>
                    <a-button v-if="index.score?index.score.status===1:false"
                              :disabled="index.score===null||index.score===2" size="mini" type="primary"
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
          </div>
    </div>


  </section>
</template>

<script>
import SupGradeList from "@/views/OTHERPAGES/SupGradeList";
import MyPageHeader from "@/components/MyPageHeader";
import {SCORE} from "@/api/admin_API";
import router from "@/router";
import { showModalWarning} from "@/utils/DefinedMessageNotification";

export default {
  name: "SupGradeManagement",
  components: {MyPageHeader, SupGradeList},
  data() {
    return {
      modalViewBoolean: false,
      course_list: 5,
      grade:[],
      classname: ""
    }
  },
  mounted() {

    SCORE.getByClass(router.currentRoute.value.params.class).then(data=>{
      this.grade = data.data.items ?data.data.items:[]
      this.classname = data.data.classname
      showModalWarning(data)
      console.log(data)
    })
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