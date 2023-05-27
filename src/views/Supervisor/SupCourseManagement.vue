<template>
  <section class="">
    <MyPageHeader text="课程管理">
      <template #icon>
        <icon-book/>
      </template>
      <template #extra>
        <a-button class="px-3 " status="normal" @click="EditOperation({},1)" type="primary">添加课程</a-button>
      </template>
    </MyPageHeader>

    <div class="container-fluid">
      <div class="">
        <a-form @submit="submitSearch" size="large" :model="searchForm" layout="inline">
          <a-row class="w-100" wrap align="center" justify="start" :gutter="16">
            <a-col :sm="24" :md="12" :lg="5" flex   >
              <a-form-item field="courseNo">
                <a-input placeholder="课程编号" allow-clear v-model="searchForm.courseNo" />
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12" :lg="5" flex >
              <a-form-item field="courseName">
                <a-input placeholder="课程名称" allow-clear v-model="searchForm.courseName" />
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12" :lg="5" flex >
              <a-form-item field="courseAttr">
                <a-select placeholder="课程名称" allow-clear v-model="searchForm.courseAttr">
                  <a-option label="必修" value="01" />
                  <a-option label="选修" value="02" />
                  <a-option label="实践" value="03" />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12" :lg="5" flex >
              <a-form-item field="courseCollege">
                <a-input placeholder="课程学院" allow-clear v-model="searchForm.courseCollege" />
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
        <h6 class="fw-bolder my-3" >课程列表</h6>
        <a-table  :pagination-props="{'hide-on-single-page':true, defaultPageSize: 1,total:data.length,}" show-header :data="data" :scrollbar="true" stripe :sticky-header="true" size="large" :pagination="{}">
          <template #columns>
            <a-table-column fixed :width="150" title="课程编号" data-index="courseNo" />
            <a-table-column    title="课程名称" data-index="courseName" />
            <a-table-column  :width="100"  title="课程类型" data-index="courseAttr" >
<!--              <template #cell="record">-->
<!--                <a-tag bordered :color="'#1c75d4'"  size="large" :visible="record.record.courseAttr === '01'" >必修</a-tag>-->
<!--                <a-tag bordered :color="'#eedb20'"  size="large"  :visible="record.record.courseAttr === '02'" >选修</a-tag>-->
<!--                <a-tag bordered :color="'#f60ca3'"  size="large"  :visible="record.record.courseAttr === '03'" >实践</a-tag>-->
<!--              </template>-->
            </a-table-column>
            <a-table-column   title="课程学院" data-index="courseCollege" />
            <a-table-column title="操作" :width="300">
              <template #cell="{ record }">
                <a-button-group class="text-end" size="mini" status="normal" type="text">
                  <a-button @click="EditOperation(record,0)">编辑</a-button>
                  <a-button @click="ViewOperation(record)">查看</a-button>
                  <a-button status="danger" disabled @click="DeleteOperation(record)">删除</a-button>
<!--                  <a-button @click="$notification.info({ title:'Name', content:record.courseName})">view</a-button>-->
                </a-button-group>

              </template>
            </a-table-column>
          </template>


        </a-table>
      </div>
    </div>

    <a-modal ref="modalRef"
             :visible="ViewOperationBoolean === true" width="auto" align-center
             closable esc-to-close ok-text="关闭"
             hide-cancel mask mask-closable simple title-align="center"
             unmount-on-close @ok="ViewOperationBoolean =false">
      <div style="min-width: 70vw">
        <a-page-header :show-back="false"
                       :style="{ background: 'var(--color-bg-2)' }"
                       title="Details of the course">
        </a-page-header>
        <div class="mt-3 mx-auto w-100">
          <a-descriptions :bordered="true"  :column="2" :size="size" layout="inline-vertical" title="Basic Details">
            <a-descriptions-item  label="课程编号" :span="1" >{{this.detailsItem.courseNo}}</a-descriptions-item>
            <a-descriptions-item  label="课程名称" :span="1" >{{this.detailsItem.courseName}}</a-descriptions-item>
            <a-descriptions-item label="课程类型" :span="1" >{{this.detailsItem.courseAttr}}
<!--              <a-tag bordered :color="'#1c75d4'" size="large" :visible="this.detailsItem.courseAttr === '01'" >必修</a-tag>-->
<!--              <a-tag bordered :color="'#eedb20'" size="large"   :visible="this.detailsItem.courseAttr === '02'" >选修</a-tag>-->
<!--              <a-tag bordered :color="'#f60ca3'" size="large"   :visible="this.detailsItem.courseAttr === '03'" >实践</a-tag>-->
              </a-descriptions-item>
            <a-descriptions-item   label="课程学院" :span="1" >{{this.detailsItem.courseCollege}}</a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-modal>
    <a-drawer :closable="true" :visible="drawerBoolean" esc-to-close mask-closable
              :height="400" placement="bottom" render-to-body @cancel="drawerBoolean =false"
              width="50%" @ok="ValidateEdit" ok-text="提交">
      <template #header>课程信息</template>

      <div class="container">
        <a-form size="large" :wrapper-col-props="{span:8}" :label-col-props="{span:8}" v-model:model="form" layout="horizontal">
          <a-form-item  label="编号" field="courseNo">
            <a-input readonly  placeholder="编号" v-model="form.courseNo" />
          </a-form-item>
          <a-form-item  label="课程名称" field="courseName">
            <a-input placeholder="课程名称" allow-clear v-model="form.courseName" />
          </a-form-item>
          <a-form-item  label="课程名称" field="courseAttr">
            <a-select placeholder="课程名称" allow-clear v-model="form.courseAttr">
              <a-option label="必修" value="01" />
              <a-option label="选修" value="02" />
              <a-option label="实践" value="03" />
            </a-select>
          </a-form-item>
          <a-form-item  label="课程学院" field="courseCollege">
            <a-input placeholder="课程学院" allow-clear v-model="form.courseCollege" />
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>

  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {reactive, ref,toRaw} from "vue";
import {Message,Modal} from "@arco-design/web-vue";
import {College, Course} from "@/api/admin_API";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
  name: "SupCourseManagement",
  components: {MyPageHeader},
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
      addOrEdit:0,
      ViewOperationBoolean: false,
      data:ref([]),
      searchForm:{
            courseNo: undefined,
            courseName: undefined,
            courseAttr: undefined,
            courseCollege: undefined,
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
      Course.findAll().then(response => {
        this.data = response.data.items
      })
    },
    submitSearch(data){
      if (this.searchForm.courseNo==='')
        this.searchForm.courseNo=undefined

      if (this.searchForm.courseAttr==='')
        this.searchForm.courseAttr=undefined

      if (this.searchForm.courseCollege==='')
        this.searchForm.courseCollege=undefined

      if (this.searchForm.courseName==='')
        this.searchForm.courseName=undefined

      if (this.searchForm !== {}){
        Course.search(data.values).then(response=>this.data = response.data.items)
      }
    },

    ViewOperation(record){
      this.detailsItem = record
      this.ViewOperationBoolean = true
    },
    AddOperation(){
      // this.detailsItem = record
      // this.ViewOperationBoolean = true
      Course.addOne(this.form).then(value => {
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
          Course.deleteOne(record).then(value => showNotification(value)).catch(reason => showNotification(reason))
        }, cancelText:'放弃'})
    },
    ValidateEdit(){
      if (this.addOrEdit === 0 && this.form !== {}){
        Modal.info({ title:'确认修改课程信息',okText:'确认',onOk: ()=>{
            Course.updateOne(this.form).then(value => showNotification(value)).catch(reason => showNotification(reason))
          }})
      }else{
        this.AddOperation()
      }
      this.drawerBoolean =false
    },
  },
  setup() {
  //   const data = ref([
  //   {
  //     id:0,
  //     courseNo: 'Socrates',
  //     courseName: '123-1234-1234',
  //     courseAttr: 'Beijing',
  //     courseCollege: 'Beijing',
  //   }
  // ]);
    const size = ref('large');

    return {
      // data,
      size
    }
  },
}
</script>

<style scoped>

</style>