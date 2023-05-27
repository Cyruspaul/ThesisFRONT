<template>
  <section class="">
    <MyPageHeader text="学院管理">
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

    <div class="container-fluid">
          <div class="d-flex flex-row justify-content-between" style="width: 100%">
            <a-form  :model="form" size="large" layout="inline">
              <a-row class="w-100" wrap align="center" justify="start" :gutter="0">
                <!--            <a-col :sm="24" :md="12" :lg="6" flex   >-->
                <!--              <a-form-item field="collegeNo">-->
                <!--                <a-input placeholder="学院编号" allow-clear v-model="searchForm.collegeNo" />-->
                <!--              </a-form-item>-->
                <!--            </a-col>-->
                <a-col :sm="24" :md="12" :lg="10" flex >
                  <a-form-item field="collegeName">
                    <a-input placeholder="搜索学院名称" allow-clear v-model="searchFormDept" />
                  </a-form-item>
                </a-col>
<!--                <a-col :sm="24" :md="12" :lg="4" flex >-->
<!--                  <a-form-item field="submit">-->
<!--                    <a-button status="primary" size="large" type="outline"  html-type="submit" >Search</a-button>-->
<!--                  </a-form-item>-->
<!--                </a-col>-->
              </a-row>
            </a-form>
            <a-button disabled type="outline">添加学院</a-button>
          </div>
          <h6 class="fw-bolder my-3" >学院列表</h6>
          <div class="">
            <a-collapse  accordion>
<!--              <a-list size="small" scrollbar :gridProps="{ gutter: 0,span:24 }" :bordered="true">-->
  <!--              <a-list-item >-->
                    <a-collapse-item v-for="college in collegeList" :key="college.id">
                      <template #header>
                        <div class="d-flex flex-row justify-content-between">
                          <p class="p-0 m-0">
                            {{college.collegeName}}
                          </p>
                          <!--                    <a-link status="text" @click="$notification.info(college.collegeName)"><icon-edit /></a-link>-->
                        </div>
                      </template>
                      <a-list :gridProps="{ gutter: 0,xs:24, sm:24,md:6, lg:4 }" :hoverable="true" :bordered="false" size="small" class="bg-transparent p-0 m-0" scrollbar>
                        <a-list-item  class="bg-transparent border-end" v-for="majors in college.majorsList" :key="majors.id"> {{majors.majorName}}</a-list-item>
                      </a-list>
                    </a-collapse-item>
<!--              </a-list>-->
            </a-collapse>

                <!--            <a-list size="small" scrollbar>-->
                <!--              <template #header>-->
                <!--                <div class="d-flex flex-row justify-content-between">-->
                <!--                  <p class="p-0 m-0">-->
                <!--                    {{college.collegeName}}-->
                <!--                  </p>-->
                <!--                  <a-link status="text" @click="$notification.info(college.collegeName)"><icon-edit /></a-link>-->
                <!--&lt;!&ndash;                  <a-popover>&ndash;&gt;-->
                <!--&lt;!&ndash;                    <icon-edit />&ndash;&gt;-->
                <!--&lt;!&ndash;                    <template #content >&ndash;&gt;-->
                <!--&lt;!&ndash;                      <a-button-group class="p-0 m-0">&ndash;&gt;-->
                <!--&lt;!&ndash;                        <a-button type="outline" status="warning" >删除专业</a-button>&ndash;&gt;-->
                <!--&lt;!&ndash;                        <a-button type="outline" >添加专业</a-button>&ndash;&gt;-->
                <!--&lt;!&ndash;                      </a-button-group>&ndash;&gt;-->
                <!--&lt;!&ndash;                    </template>&ndash;&gt;-->
                <!--&lt;!&ndash;                  </a-popover>&ndash;&gt;-->
                <!--                </div>-->
                <!--              </template>-->
                <!--              <a-list-item v-for="majors in college.majorsList" :key="majors.id"> {{majors.majorName}}</a-list-item>-->
                <!--            </a-list>-->
<!--              </a-list-item>-->
          </div>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {College, Course, Majors} from "@/api/admin_API";
export default {
  name: "SupCollegeManagement",
  components: {MyPageHeader},
  data(){
    return{
      form:{},
      searchFormDept:'',
      collegeList:[],
    }
  },
  watch:{
    searchFormDept(newV, old){
      console.log(old)
      console.log(newV)
      this.collegeList = this.collegeList.filter(value =>value.collegeName.includes(this.searchFormDept))
    }
  },
  methods:{

  },
  mounted() {
    College.findAll().then(value => {
      console.log(value.data)
      this.collegeList = value.data.items
    })
  }
}
</script>

<style >
.arco-collapse-item-content{
  background-color: #fff !important;
}
/*.arco-list-header{*/
/*  background-color: rgba(215, 215, 215, 0.55) !important;*/
/*}*/
.arco-collapse-item-content.arco-collapse-item-content-expend{
  background-color: rgba(234, 233, 233, 0.55) !important;
  padding: 0;
  margin: 0;
}
</style>