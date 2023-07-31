<template>
  <section>
    <MyPageHeader text="招生管理">
      <template #icon>
        <icon-book/>
      </template>
    </MyPageHeader>

    <div class="">
      <div class="container-fluid">

        <div class="">
          <a-form @submit="submitSearch" size="large" :model="searchForm" layout="inline">
            <a-row class="w-100" wrap align="center" justify="start" :gutter="16">

              <a-col :sm="24" :md="12" :lg="7" flex >
                <a-form-item field="account">
                  <a-input class="border" placeholder="搜索..." allow-clear v-model="searchForm.account" />
                </a-form-item>
              </a-col>

              <a-col :sm="24" :md="12" :lg="4" flex >
                <a-form-item field="submit">
                  <a-button class="border" status="primary" size="large"  html-type="submit" >Search</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <div class="container-fluid" >
          <h6 class="fw-bolder my-3" >账号列表</h6>
          <a-table  :pagination="{'hide-on-single-page':true, defaultPageSize: 14,total:data.length,}" show-header
          :data="data" :scrollbar="true" stripe :sticky-header="true" size="large" >
            <template #columns>
              <a-table-column :width="180" title="编号" data-index="regNum" />
              <a-table-column title="账号" data-index="name" />
              <a-table-column title="护照" data-index="passport" />
              <a-table-column title="国家" data-index="country" />
              <a-table-column title="邮政" data-index="email" />
              <a-table-column title="申请程度" data-index="status" />
              <a-table-column title="出生日" data-index="gmtCreate" />
              <a-table-column title="操作" :width="100">
                <template #cell="{ record }">
                  <a-button-group class="text-end" size="mini" status="normal" type="text">
                    <a-button @click="EditOperation(record,0)">查看</a-button>
<!--                    <a-button status="danger" @click="DeleteOperation(record)">删除</a-button>-->
                  </a-button-group>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>
      </div>

      <a-drawer :closable="true" :visible="drawerBoolean" esc-to-close mask-closable :footer="false"
                :height="'70%'" fullscreen placement="bottom" :render-to-body="false" @cancel="drawerBoolean =false"
                width="100%" @ok="ValidateEdit" ok-text="提交" :header="false" >


        <div class="w-75 mx-auto">
            <div class="fw-bold  fs-4 mx-3 my-5 w-100 d-flex justify-content-between">
              申请信息
              <a-button size="mini"  type="primary" status="default" @click="drawerBoolean=false">
                <icon-close  />
              </a-button>
            </div>
            <a-descriptions class="container" bordered :label-style="{fontSize: '17px'}" :bordered="false" :value-style="{fontSize: '17px'}"
                            size="large" :column="{xs:1,md:3, xl:3}" layout="vertical" >
              <a-descriptions-item label="编号"   >{{ form.regNum }}</a-descriptions-item>
              <a-descriptions-item label="姓名"   >{{ form.name }}</a-descriptions-item>
              <a-descriptions-item label="护照"   >{{ form.passport}}</a-descriptions-item>
              <a-descriptions-item label="备注" >{{ form.age}}</a-descriptions-item>
              <a-descriptions-item label="邮政"   >{{ form.email}}</a-descriptions-item>
              <a-descriptions-item label="手机号"   >{{ form.phone}}</a-descriptions-item>
              <a-descriptions-item label="国家"   >{{ form.country}}</a-descriptions-item>
              <a-descriptions-item label="学籍编号"   >{{ form.degree}}</a-descriptions-item>
              <a-descriptions-item label="申请程度"   ><a-tag >{{ form.status}}</a-tag></a-descriptions-item>
              <a-descriptions-item label="创建时间"   >{{ form.gmtCreate}}</a-descriptions-item>
              <a-descriptions-item label="更新时间"  >{{ form.remarks}}</a-descriptions-item>
            </a-descriptions>
          <a-space class="ms-2 mt-4">
            <a-button :disabled="form.status===2" size="large" @click="ValidateEdit(1)" class="px-4" type="primary" status="default" >接受</a-button>
            <a-button :disabled="form.status===2" size="large" @click="ValidateEdit(0)" class="px-4" type="primary" status="warning" >拒绝</a-button>
            <a-button size="large" @click="DeleteOperation" class="px-4" type="primary" status="danger" >删除</a-button>
          </a-space>
        </div>
      </a-drawer>

    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";
import {ACCOUNT, APPLICATION} from "@/api/admin_API";
import {Message, Modal} from "@arco-design/web-vue";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
  name: "Application",
  components: {MyPageHeader},
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
      addOrEdit:0,
      ViewOperationBoolean: false,
      data:ref([]),
      dataCopy:ref([]),
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
      APPLICATION.findAll().then(response => {
        console.log(response)
        this.data = response.data.items
        this.dataCopy = response.data.items
      })
    },
    submitSearch(data){
      if ( this.searchForm.account !== undefined && this.searchForm.account.trim() !== ''){
        // if (this.searchForm.stuName.trim() !== '' || this.searchForm.stuNumber.trim() !== '')
        //   ACCOUNT.search(this.searchForm).then(response=> (response.data!==undefined)? this.data = response.data.items: this.data = [])
        let array = []
        this.dataCopy.forEach(value=>{
          if (value.email.includes(this.searchForm.account) || value.name.includes(this.searchForm.account)){
            array.push(value)
          }
        })
        this.data = array
      }else{
        this.data = this.dataCopy
      }
    },

    ViewOperation(record){
      this.detailsItem = record
      this.ViewOperationBoolean = true
    },
    EditOperation(record,operation){
      this.form = record
      this.drawerBoolean = true
      this.addOrEdit = operation
    },
    DeleteOperation(){

      Modal.error({cancelText:'放弃',hideCancel:false,  title:'确认删除申请吗？',okText:'确认',onOk: ()=>
        {
          APPLICATION.deleteOne(this.form.regNum).then(value =>  {
            showMessage(value)
            this.findAll()
          }).catch(reason => showMessage(reason))
        },})
    },
    ValidateEdit(op){
      if (op === 0 && this.form !== {}){
        //REFUSE
        Modal.warning({cancelText:'放弃',hideCancel:false ,title:'确认拒绝申请吗？',okText:'确认',onOk: ()=>{
            APPLICATION.refuse(this.form.regNum).then(value =>  {
              // location.reload()
              showMessage(value)
              this.findAll()
            }).catch(reason => showMessage(reason))
          }})
      }else if (op === 1 && this.form !== {}){
        //ACCEPT
        Modal.info({ cancelText:'放弃',hideCancel:false ,title:'确认接受申请吗？',okText:'确认',onOk: ()=>{
            APPLICATION.accept(this.form.regNum).then(value =>  {
              // location.reload()
              showMessage(value)
              this.findAll()
            }).catch(reason => showMessage(reason))
          }})
      }

      this.drawerBoolean =false
    },
  },

}
</script>

<style>

</style>