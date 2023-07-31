<template>
  <section>
    <MyPageHeader text="专业管理">
      <template #icon>
        <icon-common/>
      </template>
      <!--      <template #extra>-->
      <!--        <a-space direction="horizontal">-->
      <!--          <a-button type="outline" status="warning"  >添加学院</a-button>-->
      <!--          <a-button type="outline"  >添加专业</a-button>-->
      <!--        </a-space>-->
      <!--      </template>-->
    </MyPageHeader>
    <div  class="container-fluid">
      <div class="d-flex flex-row justify-content-between" style="width: 100%">
        <a-form  @submit="submitSearch" size="large" :model="searchForm" layout="inline">
          <a-row class="w-100" wrap align="center" justify="start" :gutter="16">
            <a-col :sm="24" :md="10" :lg="6" flex >
              <a-form-item field="collegeName">
                <a-input placeholder="学院名称" allow-clear v-model="searchForm.majorName" />
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="6" :lg="4" flex >
              <a-form-item field="submit">
                <a-button status="primary"  type="outline"  html-type="submit" >Search</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-button type="outline">添加专业</a-button>
      </div>
      <h6 class="fw-bolder my-3" >专业列表</h6>
      <div class="">
        <a-table  :pagination-props="{'hide-on-single-page':true, defaultPageSize: 1,total:majorList.length,}" show-header :data="majorList"
                  :scrollbar="true" stripe :sticky-header="true" size="large" :pagination="{}">
          <template #columns>
            <a-table-column fixed title="专业编号" data-index="id" />
            <a-table-column    title="专业名称" data-index="majorName" />
            <a-table-column  title="学院名称" data-index="collegeName" />
            <a-table-column title="操作" :width="200">
              <template #cell="{ record }">
                <a-button-group class="text-end" size="mini" status="normal" type="text">
                  <a-button @click="EditOperation(record,0)">编辑</a-button>
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
          <a-form-item aria-readonly="true" label="专业编号" field="id">
            <a-input readonly placeholder="编号"  v-model="form.id" />
          </a-form-item>
          <a-form-item  label="专业名称" field="majorName">
            <a-input placeholder="专业名称"  v-model="form.majorName" />
          </a-form-item>
          <a-form-item  label="学院名称" field="collegeId">
            <a-select placeholder="学院名称" v-model="form.collegeId">
              <a-option v-for="college in collegeList" :label="college.collegeName" :value="college.collegeNo" />
            </a-select>
          </a-form-item>
        </a-form>
      </div>

    </a-drawer>

  </section>
</template>

<script>
import {College, Course, Majors} from "@/api/admin_API";
import MyPageHeader from "@/components/MyPageHeader";
import {Modal} from "@arco-design/web-vue";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
  name: "SupMajormanagement",
  components: {MyPageHeader},
  data(){
    return{
      drawerBoolean: false,
      addOrEdit:0,
      form:{},
      searchForm:{},
      majorList: [],
      collegeList:[]
    }
  },
  watch:{
  },
  methods:{
    submitSearch(formData){
      console.log(formData)
      this.majorList = this.majorList.filter(value =>value.majorName.includes(this.searchForm.majorName))
    },
    ValidateEdit(){
      if (this.addOrEdit === 0 && this.form !== {}){
        Modal.warning({ title:'确认修改专业信息',content:'如果你不确定的话，可以随便按外框 ！',okText:'确认',cancelText:'放弃',onOk: ()=>{
            Majors.updateOne(this.form).then(value => {
              location.reload()
              showMessage(value)
            }).catch(reason => showMessage(reason))
          },  closable:true, onCancel:()=>{
          console.log('Cancel')
        }})
      }
      this.drawerBoolean =false
    },
    EditOperation(record,operation){
      this.form={}
      this.form = record
      this.drawerBoolean = true
      this.addOrEdit = operation
      console.log("Edit...")
      if(this.collegeList.length === 0){
        College.findAll().then(value => {
          console.log(value.data)
          this.collegeList = value.data.items
        })
      }

    },
    DeleteOperation(record){
      console.log(record)
      Modal.warning({ title:'确认删除这专业吗？',okText:'确认',onOk: ()=>{
          Course.deleteOne(record).then(value => {
            showNotification(value)
            location.reload()
          }).catch(reason => showNotification(reason))
        }, cancelText:'放弃',closable:true})
    },
  },
  mounted() {
      Majors.findAll().then(value => {
      console.log(value.data)
      this.majorList = value.data.items
    })
  }
}
</script>

<style scoped>

</style>