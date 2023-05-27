<template>
  <section class="">
    <MyPageHeader text="班级管理">
      <template #icon>
        <icon-book/>
      </template>
            <template #extra>
              <a-button type="primary" @click="EditOperation({},1)">添加班级</a-button>
            </template>
    </MyPageHeader>

    <div class="container-fluid">

<!--      SEARCH FORM-->
      <div class="d-flex flex-row justify-content-between" style="width: 100%">
        <a-form :model="searchForm" layout="inline" size="large" @submit="submitSearch">
          <a-row :gutter="0" align="center" class="w-100" justify="start" wrap>
            <a-col :lg="6" :md="8" :sm="24" flex>
              <a-form-item field="id">
                <a-select :default-active-first-option="true" v-model="searchForm.majorId" allow-clear placeholder="学院名称" required>
                  <a-option label="全部" value="0"/>
                  <a-option v-for="(major,index) in majorList" :key="index" :label="major.majorName" :value="major.id"/>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6" :md="8" :sm="24" flex>
              <a-form-item field="collegeName">
                <a-select :default-active-first-option="true" v-model="searchForm.studyLevel" allow-clear placeholder="学位" required>
                  <a-option label="全部" value="0"/>
                  <a-option label="本科" :index="1" :value="1"/>
                  <a-option label="研究" :index="2" :value="2"/>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="4" :md="6" :sm="24" flex>
              <a-form-item field="submit">
                <a-button html-type="submit" status="primary" type="outline">查询</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>

<!--      CARD CONTENT-->
      <div class="m-2">

        <a-row :gutter="20" :style="{ width: '100%' }" :wrap="true" justify="start">
          <a-col v-if="course_list.length === 0" :span="24" class="text-center mt-5">
            <a-empty />
          </a-col>
          <a-col v-for="index in course_list" :key="index.classno" :lg="12" :sm="12" :xs="24" :xl="8" :xxl="6"
                 class="mb-3">
              <!--              <a-button size="mini"><icon-menu /></a-button>-->
              <a-card :bordered="true" :style="{ minHeight: 'fit-content', minWidth:'fit-content'}"
                      class="card-demo rounded-1 p-0"
                      hoverable>
                <a-card-meta class="p-0">
                  <template #title>
                    <a-space class="justify-content-between"  fill align="left" direction="horizontal">
                      <span class="me-4">{{ index.classname }}</span>

                      <a-tag  v-if="index.studylevel === 1" :color="'blue'"
                             v-text="'本科'"/>
                      <a-tag  v-if="index.studylevel === 2" :color="'orange'"
                             v-text="'研究'"/>
                      <a-popover mini position="top">
                        <template #content>
                          <a-button-group type="text">
                            <a-button class="border-0" @click="EditOperation(index,0)">编辑</a-button>
                            <a-button class="border-0" @click="this.$router.push({name:'supervisor_class_grade', params:{class:index.id}})">成绩管理</a-button>
                            <a-button class="border-0" @click="this.$router.push({name:'supervisor_class_timetable', params:{class:index.id}})">课表管理</a-button>
                          </a-button-group>
                        </template>
                        <a-button type="text"><icon-menu class="small " /></a-button>
                      </a-popover>
                    </a-space>
                  </template>
                </a-card-meta>
              </a-card>


          </a-col>
        </a-row>
      </div>
    </div>
<!--DRAWER-->
    <a-drawer :closable="true" :visible="drawerBoolean" :footer="false" esc-to-close mask-closable
              :height="600" placement="bottom" render-to-body
              width="50%"  ok-text="">
      <template #header>
        <div class="w-100 d-flex align-items-end flex-row justify-content-between">
          <h5>班级管理</h5>
          <a-button @click="drawerBoolean =false" size="mini" status="danger" html-type="cancel" >取消</a-button>
        </div>
      </template>

      <div class="container mt-5">
        <a-form  size="large"  :wrapper-col-props="{span:8}"  @submit-success="submitSuccess"
                 :label-col-props="{span:8}" v-model:model="form" layout="horizontal">
          <a-form-item  :rules="[{required:true,message:'必填'},{minLength:3,message:'must be greater than 3 characters'}]"
                        label="班级名称" field="classname">
            <a-input placeholder="班级名称" allow-clear v-model="form.classname" />
          </a-form-item>
          <a-form-item v-if="this.addOrEdit === 1"  :rules="[{required:true,message:'必填'},{}]"
                       label="年级" field="nianji">
            <a-input-number :default-value="20" mode="button" :min="20"   placeholder="年级" v-model="form.nianji" />
          </a-form-item>
          <a-form-item :rules="[{required:true,message:'必填'}]" label="学院" field="majorid">
            <a-select :allow-create="false"  v-model="form.majorid" >
              <a-option v-for="(major,index) in majorList" :key="index" :label="major.majorName" :value="major.id"/>
            </a-select>
          </a-form-item>
          <a-form-item  :rules="[{required:true,message:'必填'}]" label="学位" field="studylevel">
            <a-select :allow-create="false"  v-model="form.studylevel" >
              <a-option label="本科" :index="1" :value="1"/>
              <a-option label="研究" :index="2" :value="2"/>
            </a-select>
          </a-form-item>
          <a-form-item  >
              <a-button html-type="submit"  class=" mt-2 px-5 " type="primary">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import { CLASS, Majors} from "@/api/admin_API";
import {Message} from "@arco-design/web-vue";
import {showVALIDNotification} from "@/utils/DefinedMessageNotification";
import {ref} from "vue";

export default {
  name: "SupClassManagement",
  components: {MyPageHeader},
  data() {
    return {
      searchForm: {},
      majorList: [],
      course_list: [],
      drawerBoolean:false,
      form:ref({}),
      addOrEdit:-1
    }
  },
  methods: {
    submitSuccess(form){
      if (this.addOrEdit === 0)
        this.ValidateEdit()
      else
        this.AddOperation()
    },

    submitSearch(form) {
      if (this.searchForm.majorId === undefined || this.searchForm.studyLevel === undefined)
        Message.info("查询条件不满")
      else {
        CLASS.search(this.searchForm).then(res => this.course_list = res.data.items)
      }
    },
    ValidateEdit(){
      console.log("----------EDIT---------")
      CLASS.update(this.form).then(value => {
        showVALIDNotification(value)
      })
      this.drawerBoolean = false
      // location.reload()
    },
    AddOperation(){
      CLASS.create(this.form).then(value => {
        showVALIDNotification(value)
        console.log(value)
      })
      console.log("---------ADD-----------")
      this.drawerBoolean = false
      // location.reload()
    },
    EditOperation(record,operation){
      console.log(record)
      this.form = record
      this.form.nianji = Number.parseInt(record.nianji)
      this.drawerBoolean = true
      this.addOrEdit = operation
    },
  },
  mounted() {
    Majors.findAll().then(value => {
      // console.log(value.data)
      this.majorList = value.data.items
    })
    CLASS.search(
        {
          "majorId": "0",
          "studyLevel": 0
        }
    ).then(res => this.course_list = res.data.items)
  }
}
</script>

<style>

</style>