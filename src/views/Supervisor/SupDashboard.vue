<template>
  <section class="p-4">
    <ASpace class="w-100 h-100" size="large" direction="vertical"  fill >
      <a-row :gutter="50" class="  text-start">
        <a-col :lg="6" :sm="12" :xs="24">
          <a-card  size="large rowdashboard">
            <a-statistic animation :value="stats.student" :value-style="{ color: '#0a5a00'}" style="" title="所在校的学生">
              <template #prefix>
                <i class="bi bi-check2-square"/>
              </template>
            </a-statistic>
            <!--          <small class="text-end">Get to know all of them</small><span><router-link :to="{path:'/admin/students'}" >more</router-link></span>-->
          </a-card>
        </a-col>
        <a-col :lg="6" :sm="12" :xs="24">
          <a-card>
            <a-statistic :precision="0" :value="stats.teacher" :value-style="{ color: '#0339d2'}" title="老师">
              <template #prefix>
                <i class="bi bi-people"/>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :lg="6" :sm="12" :xs="24">
          <a-card>
            <a-statistic :precision="0" :value="stats.notification" :value-style="{ color: '#3f8600' }" style=""
                         suffix="" title="通告">
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :lg="6" :sm="12" :xs="24">
          <a-card class="w-100">
            <a-statistic :precision="0" :value="stats.application ||0" :value-style="{ color: '#cf1322' }"
                         class="demo-class w-100" suffix="" title="新生">
            </a-statistic>
          </a-card>
        </a-col>

      </a-row>
      <a-row :gutter="50" :wrap="true" justify="space-between">
        <!--        WELCOME BAR-->
        <a-col :md="18" :span="24" class="w-100 h-100">
          <!--          https://wallpapercave.com/wp/wp9505264.jpg-->
          <!--          https://hdqwalls.com/download/rock-mountains-landscape-colorful-illustration-minimalist-rz-1920x1080.jpg-->

          <!--          TIMETABLE-->
          <div class="w-100 h-100 bg-light">
            <a-image :show-loader="true" footer-class="image-footer"
                     src="https://wallpapercave.com/wp/wp9505264.jpg"
                     title='欢迎管理员  ！！'
                     :description="''"
                     width="100%"  height="150"
                     fit="cover"   style="filter: blur(0.4px)"
                     :preview-visible="false"
            >
              <template #extra>
                <p class="display-5">{{ date.toLocaleTimeString()}}</p>
              </template>
              <template #loader>
                <ASpin  dot />
              </template>

            </a-image>

            <a-card :bordered="false" class="w-100 h-100">
              <template #title>
                <span class="fw-bold">任务</span>
              </template>
              <template #extra>
                <a-tag class="text-muted" default-checked>{{date.toLocaleDateString()}}</a-tag>
              </template>
              <a-list :max-height="1000" bordered>
                <a-list-item v-for="idx in stats.taskList||[]">
                  <a-list-item-meta>
                    <!--                  <template #avatar>-->
                    <!--                    <a-checkbox @change="changeTaskState(idx)"> Go to school {{ idx[0].label }}</a-checkbox>-->
                    <!--                  </template>-->
                  </a-list-item-meta>
                  <template #extra>
                    <a-tag :color="'#352489'" size="mini">Pending</a-tag>
                  </template>
                </a-list-item>
              </a-list>
            </a-card>
          </div>

        </a-col>

        <!--          TASKS COLUMN-->
        <a-col :md="6" :span="24" class="w-100 h-100">
          <a-space size="large" direction="vertical" fill>
              <a-card>
                <a-statistic :precision="0" :value="stats.majors" :value-style="{ color: '#3f8600' }" style=""
                             suffix="" title="专业">
                </a-statistic>
              </a-card>
              <a-card class="w-100">
                <a-statistic :precision="0" :value="stats.course ||0" :value-style="{ color: '#ad13cf' }"
                             class="demo-class w-100" suffix="" title="课程">
                </a-statistic>
              </a-card>
              <a-card class="w-100">
                <a-statistic :precision="0" :value="stats.task ||0" :value-style="{ color: '#cf5e13' }"
                             class="demo-class w-100" suffix="" title="任务">
                </a-statistic>
              </a-card>
              <a-card class="w-100">
                <a-statistic :precision="0" :value="stats.classc ||0" :value-style="{ color: '#3513cf' }"
                             class="demo-class w-100" suffix="" title="班级">
                </a-statistic>
              </a-card>
              <a-card class="w-100">
                <a-statistic :precision="0" :value="stats.college ||0" :value-style="{ color: '#4bcf13' }"
                             class="demo-class w-100" suffix="" title="学院">
                </a-statistic>
              </a-card>
          </a-space>

        </a-col>
      </a-row>
    </ASpace>


  </section>
</template>

<script>

import {STATS} from "@/api/admin_API";

export default {
  name: "SupDashboard",
  data(){
    return{
      stats:{
        application:0,
        course: 0,
        majors: 0,
        notification: 0,
        student: 0,
        task: 0,
        classc: 0,
        college: 0,
        teacher: 0,
        taskList: []
  },
      date: new Date()
    }
  },
  mounted() {

    STATS.findAll().then(res=>{
      console.log(res)
        this.stats = res.data.stats || {}
    })
  }
}
</script>

<style >
.rowdashboard > *{
  font-size: 18px !important;
}
.arco-statistic > *{
  font-size: 18px !important;
}
.arco-statistic-content > *{
  font-size: 18px !important;
}
</style>