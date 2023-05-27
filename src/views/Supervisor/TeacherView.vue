<template>
  <section class="">
    <MyPageHeader text="老师管理">
      <template #icon>
        <icon-book/>
      </template>
      <template #extra>
        <a-button class="px-3 " status="normal" @click="EditOperation({},1)" type="primary">添加老师</a-button>
      </template>
    </MyPageHeader>

    <div class="container-fluid">

      <div class="">
        <a-form @submit="submitSearch" size="large" :model="searchForm" layout="inline">
          <a-row class="w-100" wrap align="center" justify="start" :gutter="16">
            <a-col :sm="24" :md="12" :lg="5" flex >
              <a-form-item field="teacherName">
                <a-input placeholder="老师名称" allow-clear v-model="searchForm.teacherName" />
              </a-form-item>
            </a-col>

            <a-col :sm="24" :md="12" :lg="5" flex >
              <a-form-item field="title">
                <a-select placeholder="老师单位" allow-clear v-model="searchForm.title">
                  <a-option value="教授"  label="教授" />
                  <a-option value="讲师" label="讲师" />
                  <a-option value="副教授"  label="副教授" />
                </a-select>
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
        <h6 class="fw-bolder my-3" >老师列表</h6>
        <a-table  :pagination="{'hide-on-single-page':true, defaultPageSize: 13,total:data.length,}" show-header :data="data" 
        :scrollbar="true" stripe :sticky-header="true" size="large">
          <template #columns>
            <a-table-column title="老师编号" data-index="teacherNo" />
            <a-table-column title="老师名称" data-index="teacherName" />
            <a-table-column title="老师单位" data-index="title" />
            <a-table-column title="老师年龄" data-index="age" />
            <a-table-column title="课程学院" data-index="collegeNo" />
            <a-table-column title="操作" :width="200">
              <template #cell="{ record }">
                <a-button-group class="text-end" size="mini" status="normal" type="text">
                  <a-button @click="EditOperation(record,0)">编辑</a-button>
                  <!-- <a-button @click="ViewOperation(record)">View</a-button> -->
                  <a-button status="danger" @click="DeleteOperation(record)">删除</a-button>
                  <!--                  <a-button @click="$notification.info({ title:'Name', content:record.courseName})">view</a-button>-->
                </a-button-group>

              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
    </div>

    <a-drawer :closable="true" :visible="drawerBoolean" esc-to-close mask-closable
              :height="400" placement="bottom" render-to-body @cancel="drawerBoolean =false"
              width="50%" @ok="ValidateEdit" ok-text="提交">
      <template #header>课程信息</template>

      <div class="container">
        <a-form size="large" :wrapper-col-props="{span:8}" :label-col-props="{span:8}" v-model:model="form" layout="horizontal">

          <a-form-item label="老师名称" field="teacherName">
            <a-input placeholder="老师名称" allow-clear v-model="form.teacherName" />
          </a-form-item>

          <a-form-item  label="学院名称" field="collegeId">
            <a-select placeholder="学院名称" allow-clear v-model="form.collegeId">
              <a-option v-for="college in collegeList" :label="college.collegeName" :value="college.collegeNo" />
            </a-select>
          </a-form-item>
              
          <a-form-item label="老师单位" field="title">
                <a-select placeholder="老师单位" allow-clear v-model="form.title">
                  <a-option value="教授"  label="教授" />
                  <a-option value="讲师" label="讲师" />
                  <a-option value="副教授"  label="副教授" />
                </a-select>
              </a-form-item>

          <a-form-item  label="Age" field="age">
            <a-input-number placeholder="age" allow-clear v-model="form.age" />
          </a-form-item>

        </a-form>
      </div>
    </a-drawer>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";
import {College, Course, Teacher} from "@/api/admin_API";
import {Modal} from "@arco-design/web-vue";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
  name: "TeacherView",
  components: {MyPageHeader},
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
      addOrEdit:0,
      ViewOperationBoolean: false,
      data:ref([]),
      searchForm:{},
      major1: ref(),
      detailsItem: {},
      form: {},
      collegeList:[]
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {

    findAll(){
      Teacher.findAll().then(response => {
        this.data = response.data.items
      })
    },
    submitSearch(data){
      if (this.searchForm.teacherName==='')
        this.searchForm.teacherName=undefined

      if (this.searchForm.title==='')
        this.searchForm.title=undefined

      if (this.searchForm !== {}){
        Teacher.search(data.values).then(response=>this.data = response.data.items)
      }
    },

    ViewOperation(record){
      this.detailsItem = record
      this.ViewOperationBoolean = true
    },
    AddOperation(){
      // this.detailsItem = record
      // this.ViewOperationBoolean = true
      Teacher.addOne(this.form).then(value => {
        showMessage(value)
        location.reload()
      }).catch(reason => showMessage(reason))
      
    },
    EditOperation(record,operation){
      this.form = record
      this.drawerBoolean = true
      this.addOrEdit = operation
      if(this.collegeList.length ===0){
        College.findAll().then(value => {
        console.log(value.data)
        this.collegeList = value.data.items
      }).catch(reason => showMessage(reason))
      }
    },
    DeleteOperation(record){
      console.log(record)
      Modal.error({ title:'确认删除次课程吗？',okText:'确认',onOk: ()=>{
          Teacher.deleteOne(record).then(value => showMessage(value)).catch(reason => showMessage(reason))
        }, cancelText:'放弃'})
    },
    ValidateEdit(){
      if (this.addOrEdit === 0 && this.form !== {}){
        Modal.info({ title:'确认修改课程信息',okText:'确认',onOk: ()=>{
            Teacher.updateOne(this.form).then(value => showMessage(value)).catch(reason => showMessage(reason))
          }})
      }else{
        this.AddOperation()
      }

      this.drawerBoolean =false
    },
  },

}

</script>

<style scoped>

</style>