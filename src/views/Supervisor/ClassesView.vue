<template>
  <section>
    <MyPageHeader text="学生管理">
      <template #icon>
        <icon-book/>
      </template>
    </MyPageHeader>

    <div class="">
      <div class="container-fluid">

        <div class="">
          <a-form @submit="submitSearch" size="large" :model="searchForm" layout="inline">
            <a-row class="w-100" wrap align="center" justify="start" :gutter="16">

              <a-col :sm="24" :md="12" :lg="5" flex >
                <a-form-item field="stuNumber">
                  <a-input placeholder="学生学号" allow-clear v-model="searchForm.stuNumber" />
                </a-form-item>
              </a-col>

              <a-col :sm="24" :md="12" :lg="5" flex >
                <a-form-item field="stuName">
                  <a-input placeholder="学生名称" allow-clear v-model="searchForm.stuName" />
                </a-form-item>
              </a-col>

              <a-col :sm="24" :md="12" :lg="4" flex >
                <a-form-item field="submit">
                  <a-button status="primary" size="large"  html-type="submit" >Search</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <div class="container-fluid" >
          <h6 class="fw-bolder my-3" >学生列表</h6>
          <a-table  :pagination-props="{'hide-on-single-page':true, defaultPageSize: 1,total:data.length,}" show-header :data="data" :scrollbar="true" stripe :sticky-header="true" size="large" :pagination="{}">
            <template #columns>
              <a-table-column title="学生学号" data-index="stuNumber" />
              <a-table-column title="学生名称" data-index="stuName" />
              <a-table-column title="国家" data-index="country" />
              <a-table-column title="专业" data-index="major" />
              <a-table-column title="班级" data-index="classId" />
              <a-table-column title="操作" :width="150">
                <template #cell="{ record }">
                  <a-button-group class="text-end" size="mini" status="normal" type="text">
                    <a-button @click="EditOperation(record,0)">编辑</a-button>
                    <a-button @click="ViewOperation(record)">查看</a-button>
<!--                    <a-button status="danger" @click="DeleteOperation(record)">Delete</a-button>-->
                    <!--                  <a-button @click="$notification.info({ title:'Name', content:record.courseName})">view</a-button>-->
                  </a-button-group>

                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {reactive, ref} from "vue";
import {Course, STUDENT, Teacher} from "@/api/admin_API";
import {Modal} from "@arco-design/web-vue";
import {showMessage} from "@/utils/DefinedMessageNotification";
import router from "@/router";

export default {
  name: "ClassesView",
  components: {MyPageHeader},
  data() {
    return {
      addOrEdit:0,
      ViewOperationBoolean: false,
      data:ref([]),
      searchForm:{
        stuNumber: undefined,
        stuName: undefined,
      },
      major1: ref(),
      detailsItem: {},
      form: {}
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {

    findAll(){
      STUDENT.findAll().then(response => {
        this.data = response.data.items
      })
    },
    submitSearch(data){

      if ( this.searchForm.stuNumber!==undefined || this.searchForm.stuName!==undefined ){
        // if (this.searchForm.stuName.trim() !== '' || this.searchForm.stuNumber.trim() !== '')
          STUDENT.search(this.searchForm).then(response=> (response.data!==undefined)? this.data = response.data.items: this.data = [])
      }
    },

    ViewOperation(record){
      router.push({name:'supervisor_student_details', params:{id:record.uid}})
    },

    EditOperation(record,operation){
      router.push({name:'supervisor_student_edit', params:{id:record.uid}})
    },

    ValidateEdit(){
      if (this.addOrEdit === 0 && this.form !== {}){
        Modal.info({ title:'确认修改课程信息',okText:'确认',onOk: ()=>{
            STUDENT.updateOne(this.form).then(value => showMessage(value)).catch(reason => showMessage(reason))
          }})
      }else{
        this.AddOperation()
      }
    },
  },

}
</script>

<style>

</style>