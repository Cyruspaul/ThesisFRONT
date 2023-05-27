<template>
  <section class="">
    <MyPageHeader text="教学计划管理">
      <template #icon>
        <icon-book/>
      </template>
<!--      <template #extra>-->
<!--        <a-button @click="$router.push({name:'supervisor_curriculum_create'})"  size="large" type="primary" >新教学计划</a-button>-->
<!--      </template>-->
    </MyPageHeader>

    <div class="container-fluid">

      <div class="d-flex flex-row justify-content-between" style="width: 100%">
        <a-form :rules="[{required:true}]" @submit-success="submitSearch" size="large" :model="searchForm" layout="inline">
          <a-row class="w-100" wrap align="center" justify="start" :gutter="0">
            <a-col :sm="24"  :md="8" :lg="6" flex >
              <a-form-item  hide-asterisk field="学院名称">
                <a-select placeholder="学院名称"  allow-clear v-model="searchForm.id" >
                  <a-option v-for="(major,index) in majorList" :key="index" :label="major.majorName" :value="major.id" />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="8" :lg="6" flex >
              <a-form-item  hide-asterisk field="学位">
                <a-select placeholder="学位" :model-value="searchForm.studyLevel"  v-model="searchForm.studyLevel" >
                  <a-option  label="本科" value="1" />
                  <a-option  label="研究" value="2" />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="6" :lg="4" flex >
              <a-form-item field="submit">
                <a-button status="primary"  type="outline"  html-type="submit" >查看</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>

      </div>

      <div class="mt-2">
        <a-table  :pagination="{'hide-on-single-page':true,simple:true, defaultPageSize: 15,total:curriculum.length,}" show-header :data="curriculum"
                  :scrollbar="true" stripe :sticky-header="true" size="large" >
          <template v-if="disabled===true" #footer>
            <div   class="d-flex flex-row justify-content-center align-items-center">
              <a-button  @click="goCreate"  size="large" type="primary" >新教学计划</a-button>
            </div>
          </template>
          <template #columns>
            <a-table-column fixed title="#" data-index="id" />
            <a-table-column  title="课程名称" data-index="courseName" />
            <a-table-column  title="老师名称名称" data-index="teacherName" />
            <a-table-column  title="老师单位" data-index="title" />
            <a-table-column  title="学期" data-index="semester" />
            <a-table-column    title="专业名称" data-index="major_name" />
            <a-table-column title="操作" :width="200">
              <template #cell="{ record }">
                <a-button-group class="text-end" size="mini" status="normal" type="text">
                  <a-button >编辑</a-button>
                  <a-button disabled status="danger">删除</a-button>
                  <!--                  <a-button @click="$notification.info({ title:'Name', content:record.courseName})">view</a-button>-->
                </a-button-group>

              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
<!--      <a-tabs :header-padding="true" animation default-active-key="1" direction="horizontal" lazy-load-->
<!--              position="top" type="text">-->
<!--        <a-tab-pane key="1" class="border-end" title="2019 Class">-->
<!--          <div class="p-2 pt-0" style="min-height: fit-content">-->
<!--            <CurriculumList :size="10"/>-->
<!--          </div>-->
<!--        </a-tab-pane>-->
<!--        <a-tab-pane key="2" title="2020 Class">-->
<!--          <div class="p-2 pt-0" style="min-height: fit-content">-->
<!--            <CurriculumList :size="9"/>-->
<!--          </div>-->
<!--        </a-tab-pane>-->
<!--      </a-tabs>-->
    </div>


  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import router from "@/router";
import CurriculumList from "@/views/Supervisor/CurriculumList";
import {Curriculum, Majors} from "@/api/admin_API";
import {ref} from "vue";
import {Message,Notification} from "@arco-design/web-vue";

export default {
  name: "CurriculumManagement",
  components: {CurriculumList, MyPageHeader},
  data() {
    return {
      searchForm:{},
      majorList:[],
      curriculum:[],
      modalViewBoolean: true,
      disabled:false
    }
  },
  watch:{
  },
  mounted() {
    Majors.findAll().then(value => {
      // console.log(value.data)
      this.majorList = value.data.items

    })

  },
  methods: {
    goCreate(){
    router.push({path:'curriculum_management/create/'+this.searchForm.id+"/"+this.searchForm.studyLevel})
    },
    submitSearch(formData){

      if (this.searchForm.id==='' || this.searchForm.id === undefined ||this.searchForm.studyLevel==='' || this.searchForm.studyLevel === undefined){
        Message.info("查询条件不满 !!")
      } else{
        // JSON.parse(`{"id": ${this.searchForm.id} }`)
        Curriculum.getOne(this.searchForm).then(value => {
          console.log(value)
          if (value.data === undefined){
            this.curriculum = []
            Message.warning({
              content:'没有设计教学计划 ！！',
              duration:5000,
              showIcon:true
            })
          }
          else{
            this.curriculum = value.data.items
          }
          if (this.curriculum.length === 0){
            this.disabled = true
          }else{
            this.disabled = false
          }
        })
      }

      // this.curriculum = []
    },
    load_Data_By_Direction() {
      this.modalViewBoolean = false
    }
  },

}
</script>

<style scoped>

</style>