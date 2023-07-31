<template>
    <section class="h-auto" style="/*background-color: #f8f9fa;*/">
        <MyPageHeader :backbutton="true"  text="学生管理">
            <template #icon>
                <icon-book/>
            </template>
            <template #extra>
                <AButton v-if="$router.currentRoute.value.name.includes('edit') === false" size="large" @click="$router.push({name:'supervisor_student_edit', params:{id:studentInfo.uid}})">Edit</AButton>
            </template>
        </MyPageHeader>
        
        <div v-if="studentInfo.uid !== undefined" class="px-5 pb-5 bg-white">
            <a-typography class="mb-3 fs-5 fw-bold" >Student Infos</a-typography>
            <a-descriptions v-if="$router.currentRoute.value.name.includes('edit') === false" :label-style="{fontSize: '16px'}" :bordered="false" :value-style="{fontSize: '16px'}"
             size="large" :column="{xs:1,md:2, xl:2}" layout="horizontal" >
                <a-descriptions-item label="学号"   >{{ studentInfo.stuNumber }}</a-descriptions-item>
                <a-descriptions-item label="姓名"   >{{ studentInfo.stuName }}</a-descriptions-item>
                <a-descriptions-item label="手机号"   >{{ studentInfo.phone}}</a-descriptions-item>
                <a-descriptions-item label="护照"   >{{ studentInfo.passport}}</a-descriptions-item>
                <a-descriptions-item label="国家"   >{{ studentInfo.country}}</a-descriptions-item>
                <a-descriptions-item label="所学专业"   >{{ studentInfo.major}}</a-descriptions-item>
                <a-descriptions-item label="所在班级"   >{{ studentInfo.classId}}</a-descriptions-item>
                <a-descriptions-item label="学籍编号"   >{{ studentInfo.enrollmentNumber}}</a-descriptions-item>
                <a-descriptions-item label="创建时间"   >{{ studentInfo.gmtCreate}}</a-descriptions-item>
                <a-descriptions-item label="更新时间"   >{{ studentInfo.gmtModified}}</a-descriptions-item>
                <a-descriptions-item label="备注" :span="3" >{{ studentInfo.remarks}}</a-descriptions-item>
            </a-descriptions>
            <div v-else-if="$router.currentRoute.value.name.includes('edit') === true">
                <a-descriptions  :label-style="{fontSize: '16px'}" :bordered="false" :value-style="{fontSize: '16px'}"
                size="large" :column="{xs:1,md:2, xl:2}" layout="horizontal" >
                    <a-descriptions-item label="学号"   >
                        <AInput readonly disabled v-model="studentInfo.stuNumber"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="姓名"   >
                        <AInput v-model="studentInfo.stuName"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="手机号"   >
                        <AInput v-model="studentInfo.phone"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="护照"   >
                        <AInput v-model="studentInfo.passport"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="国家"   >
                        <AInput v-model="studentInfo.country"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="班级"   >
                        <a-select v-model="studentInfo.classId">
                          <a-option v-for="item in classList"
                                    :value="item.id"  :label="item.classname"/>
                        </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item  label="学籍编号"   >
                        <AInput readonly disabled v-model="studentInfo.enrollmentNumber "/>
                    </a-descriptions-item>
                    <a-descriptions-item label="籍编号"   >
                        <AInput readonly disabled v-model="studentInfo.major "/>
                    </a-descriptions-item>
                    <a-descriptions-item label="备注" :span="2" >
                        <a-textarea type="textarea" v-model="studentInfo.remarks"/>{{ studentInfo.remarks}}</a-descriptions-item>
                </a-descriptions>
                <AButton status="warning" type="primary" class="mt-3" @click="update"  >Update</AButton>
            </div>
        </div>
        <NotFound v-else />
    </section>
</template>

<script setup>
import {CLASS, College, STUDENT} from '@/api/admin_API';
import MyPageHeader from '@/components/MyPageHeader.vue';
import router from '@/router';
import {  showNotification } from '@/utils/DefinedMessageNotification';
import NotFound from '@/views/NotFound.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

const studentInfo = ref({})


const update = function () {
    STUDENT.updateOne(studentInfo.value).then(res=>{
        showNotification(res)
        if(res.code === 2000){
            setTimeout(() => {
                router.push({name:'supervisor_student_management'})
            }, 1500);
        }
        })
}
let classList = []

let studentExist = false
onMounted(()=>{
    STUDENT.getOne(router.currentRoute.value.params.id).then(value=>{
        studentInfo.value = value.data.student
        studentExist= true

      const sql ={"majorId":studentInfo.value.major}
      console.log(sql)
      CLASS.search(sql).then(res=>{
        console.log(res)
        if (res.code === 2000)
          classList = res.data.items
      })
    })



    // if(router.currentRoute.value.name.includes('edit')){
    //     College.findAll().then(collegeList=>{
    //
    //     })
    // }
})
</script>

<style>
</style>