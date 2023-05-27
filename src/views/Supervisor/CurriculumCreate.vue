<template>

  <section>
    <div>
      <MyPageHeader text="新教学计划" :backbutton="true">
        <template #icon>
          <icon-book/>
        </template>
      </MyPageHeader>
    </div>
    <div class="px-5">

      <p class="fs-5" > 专业： {{this.$props.majorNo}} <br>
          学位： {{this.$props.studyLevel}}
      </p>
      <a-form :model="form" :rules="{require:true}" size="large" @submit="submitData" :style="{width:'70vw'}">

        <a-form-item  :rules="{require:true}" :validate-trigger="['blur']" class="container"  v-for="(post,index) of form.posts" :label-col-props="{span:0}"
                     :wrapper-col-props="{span:24}" :field="`posts[${index}].course`" >
          <a-space direction="horizontal" size="large">

            <a-space style="width: 100px" direction="vertical">
              <small class="fade">    ----</small>
              <small>课程-{{index}}</small>
            </a-space>

            <a-space direction="vertical">
              <small>课程</small>
            <a-select :style="{width:'230px'}" :allow-search="true" placeholder="课程" v-model="post.course" >
              <a-option v-for="course in data" :label="course.courseName" :value="course.courseNo.toString()" />
            </a-select>
            </a-space>

            <a-space direction="vertical">
              <small>老师</small>
            <a-select :style="{width:'150px'}" :allow-search="true" placeholder="老师" v-model="post.teacher" >
              <a-option  v-for="teacher in teacherList" :label="teacher.teacherName" :value="teacher.teacherNo.toString()" />
            </a-select>
            </a-space>

            <a-space direction="vertical">
              <small> 学期</small>
              <a-select :style="{width:'100px'}"   placeholder="学期" v-model="post.semester" >
                <a-option v-for="item in (10/this.$props.studyLevel + 10%this.$props.studyLevel)" :label="item.toString()" :value="item" />
              </a-select>
            </a-space>

              <a-space direction="vertical">
               <small> 课程时间（小时)</small>
                <a-input :style="{width:'120px'}"  placeholder="" v-model="post.classHour" />
              </a-space>

            <a-space direction="vertical">
              <small> 学分</small>
               <a-input :style="{width:'120px'}" placeholder="学分" v-model="post.credit" />
            </a-space>
            <a-space direction="vertical">
              <small> 课程类型</small>
            <a-select :style="{width:'120px'}"  placeholder="课程类型" v-model="post.courseAttr" >
              <a-option  label="主修" value="01" />
              <a-option  label="选修" value="02" />
              <a-option  label="实践" value="03" />
            </a-select>
            </a-space>
            <a-space direction="vertical">
              <small class="fade">    ----</small>
            <a-button type="primary" status="danger" :style="{width:'50px'}" @click="handleDelete(index)">删除</a-button>
            </a-space>
          </a-space>
        </a-form-item>

        <a-form-item class="mt-4 container" label="" :label-col-props="{span:0}">
          <a-space direction="horizontal" fill size="large">
            <a-button size="large" type="outline"   status="warning"  @click="handleAdd">添加选项</a-button>
            <a-button    status="primary" style="width: 100px" type="primary"  html-type="submit" >提交</a-button>
<!--            :disabled="this.form.posts.length <= 10" -->
          </a-space>
        </a-form-item>
      </a-form>
      <div>
      </div>
<!--      {{ form }}-->
    </div>

  </section>

</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {Course, Curriculum, Majors, TEACHER} from "@/api/admin_API";
import {reactive} from "vue";
import router from "@/router";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
name: "CurriculumCreate",
  components: { MyPageHeader},
  watch:{
    form(newValue, old){
      console.log(newValue)
    }
  },
  props:['majorNo', 'studyLevel'],
  setup() {
    const form = reactive({
      majorNo: '',studyLevel:'',
      posts: [{course: undefined, semester:undefined,classHour:undefined, credit:undefined,courseAttr:undefined,teacher:undefined,}]
    })
    const handleAdd = () => {
      form.posts.push({
        course: undefined,
        semester: undefined,
        teacher:undefined,
        classHour:undefined,
        credit:undefined,
        courseAttr:undefined
      })
    };

    const handleDelete = (index) => {
      form.posts.splice(index, 1)
    }

    return {
      form,
      handleAdd,
      handleDelete
    }
  },

  data(){
  return{
    majorList: [],
    data:[],
    value:[],
    teacherList:[],
  }
  },

  mounted(){
    // Majors.findAll().then(value => {
    //   console.log(value.data)
    //   this.majorList = value.data.items
    // })

    Course.findAll().then(response => {
        this.data = response.data.items
      })

    TEACHER.findAll().then(response=>{
      this.teacherList = response.data.items
    })
    this.form.majorNo= this.$props.majorNo
    this.form.studyLevel =this.$props.studyLevel

  },

  methods:{
    submitData(data){
      console.log(data.values)
      Curriculum.addOne(data.values).then(value => {
        showMessage(value)
        router.back()
      }).catch(reason => showMessage(reason))
    }
  }
}
</script>

<style scoped>

</style>