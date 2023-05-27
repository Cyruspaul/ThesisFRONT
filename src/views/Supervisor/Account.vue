<template>
  <section>
    <MyPageHeader text="账号管理">
      <template #icon>
        <icon-book/>
      </template>
    </MyPageHeader>

    <div class="">
      <div class="container-fluid">

        <div class="">
          <a-form @submit-success="submitSearch" size="large" :model="searchForm" layout="inline">
            <a-row class="w-100" wrap align="center" justify="start" :gutter="16">

              <a-col :sm="24" :md="12" :lg="5" flex >
                <a-form-item field="account">
                  <a-input aria-required="true"  placeholder="编号" allow-clear v-model="searchForm.account" />
                </a-form-item>
              </a-col>

              <a-col :sm="24" :md="12" :lg="4" flex >
                <a-form-item field="submit">
                  <a-button status="primary" size="large"  html-type="submit" >查询</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <div class="container-fluid" >
          <h6 class="fw-bolder my-3" >账号列表</h6>
          <a-table  :pagination="{'hide-on-single-page':true, defaultPageSize: 13,total:data.length,}" show-header :data="data" 
          :scrollbar="true" stripe :sticky-header="true" size="large" >
            <template #columns>
              <a-table-column title="编号" data-index="id" />
              <a-table-column title="账号" data-index="account" />
              <!-- <a-table-column title="密码" data-index="password" /> -->
              <a-table-column title="role">
                <template #cell="record">
                 <ATag class="py-3 px-1 text-lowercase" size="mini" :color="'#458545'" v-if="record.record.role==='111111'" > {{convert(record.record.role)}}</ATag>
                 <ATag class="py-3 px-1 text-lowercase" size="mini" :color="'#123123'" v-if="record.record.role==='222222'" > {{convert(record.record.role)}}</ATag>
                 <ATag class="py-3 px-1 text-lowercase" size="mini" :color="'#147885'" v-if="record.record.role==='333333'" > {{convert(record.record.role)}}</ATag>
                 <ATag class="py-3 px-1 text-lowercase" size="mini" :color="'#245698'" v-if="record.record.role==='444444'" > {{convert(record.record.role)}}</ATag>
                 <ATag class="py-3 px-1 text-lowercase" size="mini" :color="'#245698'" v-if="record.record.role==='555555'" > {{convert(record.record.role)}}</ATag>
                </template>
              </a-table-column>
              <a-table-column title="创建时间" data-index="gmtCreate" />
              <a-table-column title="操作" :width="200">
                <template #cell="{ record }">
                  <a-button-group class="text-end" size="mini" status="normal" type="text">
                    <a-button @click="EditOperation(record,0)">编辑</a-button>
<!--                    <a-button @click="ViewOperation(record)">View</a-button>-->
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
        <template #header>账号信息</template>

        <div class="container">
          <a-form size="large" :wrapper-col-props="{span:8}" :label-col-props="{span:8}" v-model:model="form" layout="horizontal">
            <a-form-item label="账号" field="account">
              <a-input placeholder="账号" allow-clear v-model="form.account" />
            </a-form-item>
            <a-form-item  label="密码" field="courseName">
              <a-input placeholder="密码" allow-clear v-model="form.password" />
            </a-form-item>
            <a-form-item  label="角色" field="courseName">
              <a-select :allow-create="false" allow-clear v-model="form.role" >
                <a-option label="111111"  >管理员</a-option>
                <a-option label="222222" >老师</a-option>
                <a-option label="333333" >招生</a-option>
                <a-option label="444444" >本科生</a-option>
                <a-option label="555555" >研究生</a-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";
import {ACCOUNT} from "@/api/admin_API";
import {Message, Modal} from "@arco-design/web-vue";
import {showMessage} from "@/utils/DefinedMessageNotification";
import { convertRoleCode } from "@/router";

export default {
  name: "ClassesView",
  components: {MyPageHeader},
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
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
    convert(role){
      return convertRoleCode(role)
    },
    findAll(){
      ACCOUNT.findAll().then(response => {
        console.log(response)
        this.data = response.data.items
      })
    },
    submitSearch(data){
      if ( this.searchForm.account!==undefined || this.searchForm.account!==undefined ){
        // if (this.searchForm.stuName.trim() !== '' || this.searchForm.stuNumber.trim() !== '')
          ACCOUNT.search(this.searchForm).then(response=> (response.data!==undefined)? this.data = response.data.items: this.data = [])
      } else {
        Message.info("查询条件不满")
      }
    },

    ViewOperation(record){
      this.detailsItem = record
      this.ViewOperationBoolean = true
    },
    AddOperation(){
      // this.detailsItem = record
      // this.ViewOperationBoolean = true
      ACCOUNT.addOne(this.form).then(value => {
        console.log(value)
      })
    },
    EditOperation(record,operation){
      this.form = record
      this.drawerBoolean = true
      this.addOrEdit = operation
    },
    DeleteOperation(record){
      console.log(record)
      Modal.error({ title:'确认删除次课程吗？',okText:'确认',onOk: ()=>{
          ACCOUNT.deleteOne(record).then(value =>  {
            showMessage(value)
            this.findAll()
          }).catch(reason => showMessage(reason))
        }, cancelText:'放弃'})
    },
    ValidateEdit(){
      if (this.addOrEdit === 0 && this.form !== {}){
        Modal.info({ title:'确认修改课程信息',okText:'确认',onOk: ()=>{
            ACCOUNT.updateOne(this.form).then(value =>  {
              location.reload()
              showMessage(value)
            }).catch(reason => showMessage(reason))
          }})
      }else{
        this.AddOperation()
      }

      this.drawerBoolean =false
    },
  },

}
</script>

<style>

</style>