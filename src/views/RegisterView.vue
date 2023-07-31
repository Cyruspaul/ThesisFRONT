<template>
  <section class=" w-100 h-100 ">
    <div class="menu-demo shadow-sm">
      <a-menu :default-selected-keys="['1']" class="d-flex align-items-center" mode="horizontal" theme="white">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
              :style="{
            width: '80px',
            height: '30px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
          />
        </a-menu-item>
        <a-menu-item key="1">Application</a-menu-item>

      </a-menu>
    </div>
    <div class="container-fluid pt-4 animate__animated animate__fadeIN" style="height: fit-content; min-width: 50vw; padding-bottom: 100px">
      <a-page-header :show-back="false" class=" border-bottom" title="Student Registration Page">
        <template #extra>
          <a-button @click="$router.back()">Back</a-button>
        </template>
      </a-page-header>
      <a-tabs  class=" w-100 mx-auto" size="large" default-active-key="1" animation type="text" lazy-load>
        <a-tab-pane class=""  key="1" >
          <div class="p-5" style="min-width: 300px;">
            <a-form :wrapper-col-props="{span:18}" size="large" :model="studentRegisterForm" @submit="studentSubmit" layout="horizontal">
              <a-row wrap :gutter="10">

                <a-col :xs="24" :md="12">
                  <a-form-item   tooltip="Use it to login"  label="Passport ID">
                    <a-input allow-clear v-model="studentRegisterForm.passport"  required placeholder="passport"/>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :md="12">
                  <a-form-item label="Eng. Name">
                    <a-input  allow-clear v-model="studentRegisterForm.name"  required placeholder="Name"/>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :md="12">
                  <a-form-item label="Birth Date">
                    <a-date-picker  allow-clear required  v-model="studentRegisterForm.birthday" />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-form-item label="Age">
                    <a-input-number allow-clear v-model="studentRegisterForm.age" required  placeholder="0"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-form-item label="Gender">
                    <a-radio-group direction="horizontal" required   v-model="studentRegisterForm.gender" >
                      <a-radio   v-model="studentRegisterForm.gender" label="" value="0" >Male</a-radio>
                      <a-radio  v-model="studentRegisterForm.gender" label="" value="1" >Female</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :md="12">
                  <a-form-item label="Email">
                    <a-input allow-clear v-model="studentRegisterForm.email" required  placeholder="Email"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-form-item label="Country">
                    <a-input allow-clear v-model="studentRegisterForm.country" required  placeholder="Country"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-form-item label="Major">
                    <a-input allow-clear v-model="studentRegisterForm.major"  required placeholder="Major"/>
                    <a-select v-model="studentRegisterForm.major"  >
                        <a-option v-for="option in majorList" value="option" />
                    </a-select>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :md="12">
                  <a-form-item label="Phone">
                    <a-input allow-clear v-model="studentRegisterForm.phone" required  placeholder="Phone"/>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :md="12">
                  <a-form-item  label="Password">
                    <a-input-password  allow-clear v-model="studentRegisterForm.password" required  placeholder="****"/>
                  </a-form-item>
                </a-col>
                <a-col class="mt-3 container gap-4"  :span="24" >
                      <a-button  type="primary" html-type="submit" class="me-3"  status="default">Register</a-button>
                      <a-button  type="primary" html-type="reset" status="warning">Reset</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-tab-pane>

      </a-tabs>
    </div>



  </section>

</template>

<script>

import {showNotification} from "@/utils/DefinedMessageNotification";
import {APPLICATION} from "@/api/admin_API";
import {Majors} from "@/api/http/schoolAPI";
import {applicant_getMAjors} from "@/api/applicant_api";
import axios from "axios";

export default {
  name: "RegisterView",
  data(){
    return{
        studentRegisterForm: {
          status: -1,
          major: '',
          name: 'Name',
          email: '',
          country: '',
          passport: '',
          username: '',
          gender:'',
          age: 0,
          phone: '',
          birthday: "",
          level: '',
          otherinfos: '',
          degree: ''
        },
        orgRegisterForm:{},
      majorList:[]
    }
  },
  methods:{
    studentSubmit(form){
      console.log(form)
      APPLICATION.create(this.studentRegisterForm).then(res=>{
        showNotification(res)
        console.log(res)
      }).catch(er=>console.log(er))
    },
  },
  mounted() {
    // axios.get('https://localhost:8085/api/school/majors/findAll').then(res=>{
    //   console.log(res)
    // })
  }
}
</script>

<style scoped>

</style>