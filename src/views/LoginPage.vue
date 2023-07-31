<template>
  <section id="home" :key="key"
           class="w-100 animate__animated animate__fadeIn h-100 d-flex flex-row bg-white justify-content-center align-items-center px-5 "
               style="background:url('https://www.icloud.com/system/icloud.com/current/static/wallpaper.webp') no-repeat center;
        background-size: cover;">


    <!--    <span style="backdrop-filter: blur(10px); top: 0; bottom: 0; left: 0;right: 0; position: absolute;"></span>-->

    <div class="bg-white p-5 rounded ">
      <div class="bg-transparent" style="height: fit-content;width: inherit; min-width: 20vw; z-index: 10000">
        <a-typography-title class="text-center" :heading="5"> <img src="https://edu-systembase.oss-cn-beijing.aliyuncs.com/2023/05/21/129d6047fc6e4413be4165f8da5a151ffavicon.jpg"
                                              style="width: 20%" class="rounded shadow mb-4 img-fluid" alt="logo"></a-typography-title>
        <a-form :model="form" layout="vertical" size="large" @submit="handleSubmit">
          <a-form-item asterisk-position="end" field="username">
            <a-input v-model="form.username"
                     allow-clear
                     placeholder="学号/邮政..."
            />
          </a-form-item>
          <a-form-item field="password">
            <a-input-password v-model="form.password" allow-clear html-type="password" placeholder="密码..."/>
          </a-form-item>
          <!--            <a-form-item field="isRead">-->
          <!--              <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>-->
          <!--            </a-form-item>-->
          <a-form-item>
            <a-button html-type="submit" long status="normal" type="primary">Log In</a-button>
          </a-form-item>
        </a-form>
        <div class="w-100 d-flex justify-content-end py-4">
<!--          <a-button :hoverable="false" href="/recover" type="text">密码找回</a-button>-->
          <a-button type="text" @click="visible =true"  :hoverable="false"   >注册</a-button>
<!--          this.$router.push({name:'register'})-->
        </div>
      </div>
    </div>

    <a-drawer width="100%" simple  esc-to-close mask   ok-text="Register" :footer="false" hide-cancel  render-to-body v-model:visible="visible"
              title="Registration Form" @cancel="visible=false" >
      <div class="h-100 d-flex flex-column justify-content-center align-items-center">
        <a-form ref="registerFormRef" v-on:submit="handleOk" :model="registerForm" class="container"  layout="vertical" label-align="right">
          <a-form-item feedback required  field="email"  label="Email">
            <a-input type="email" html-type="email"  v-model:model-value="registerForm.email" />
          </a-form-item>
          <a-form-item feedback required field="name" label="Name">
            <a-input  v-model:model-value="registerForm.name" />
          </a-form-item>
          <a-form-item required field="passport" label="Passport">
            <a-input v-model:model-value="registerForm.passport" />
          </a-form-item>
          <a-form-item label="Birth Date">
            <a-date-picker  allow-clear required  v-model="registerForm.birthday" />
          </a-form-item>
          <a-form-item label="Gender">
            <a-radio-group direction="horizontal" required   v-model="registerForm.gender" >
              <a-radio   v-model="registerForm.gender" label="" value="0" >Male</a-radio>
              <a-radio  v-model="registerForm.gender" label="" value="1" >Female</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Major">
            <a-input allow-clear v-model="registerForm.major" required  placeholder="Major"/>
          </a-form-item>
          <a-form-item label="Country">
            <a-input allow-clear v-model="registerForm.country" required  placeholder="Country"/>
          </a-form-item>
          <a-form-item label="Phone">
            <a-input allow-clear v-model="registerForm.phone" required  placeholder="Phone"/>
          </a-form-item>

          <a-form-item required field="age" label="Age">
            <a-input-number v-model:model-value="registerForm.age" />
          </a-form-item>
          <a-form-item required field="degree" label="Degree">
              <a-select placeholder="Degree" :model-value="registerForm.degree"  v-model="registerForm.degree" >

                <a-option  label="Chinese" value="0" />
                <a-option  label="Bsc" value="1" />
                <a-option  label="Master" value="2" />
              </a-select>
          </a-form-item>
          <a-form-item required field="password" label="Password"
                       :rules="[{minLength:6,message:'must be greater than 6 characters'}]"
                       :validate-trigger="['change','input']">
            <a-input-password invisible-button v-model:model-value="registerForm.password" />
          </a-form-item>
          <a-form-item required field="password2" label="Password Verification"
                       :validate-trigger="['change','input']">
            <a-input-password invisible-button v-model:model-value="registerForm.password2" />
          </a-form-item>
<!--          <a-form-item required field="code" label="Code">-->
<!--            <a-input v-model:model-value="registerForm.code_verif" />-->
<!--            <CapchaCodeComponent :width="150" :heigth="30" @click="getCode()"  :captcha="registerForm.code"  />-->
<!--          </a-form-item>-->
          <a-form-item>
            <a-space size="normal">
              <a-button type="primary" status="normal" html-type="reset" >Reset</a-button>
              <!--               <a-button type="primary" status="warning" html-type="cancel" >Cancel </a-button>-->
              <a-button type="primary" status="success" html-type="submit" >Register</a-button>
            </a-space>
          </a-form-item>
          <!--            {{registerForm}}-->
        </a-form>
      </div>
    </a-drawer>

  </section>
</template>

<script>
import CapchaCodeComponent from "@/components/CapchaCodeComponent";
import {reactive, ref,} from "vue";
import {showMessage} from "@/utils/DefinedMessageNotification";
import store from "@/store";
import {user_login} from "@/api/api";
import router, {convertRoleCode} from "@/router";
import {Message} from "@arco-design/web-vue";
import {studentLinks, supervisorSideBarLinks, teacherSideBarLinks} from "@/router/routerLinks";
import {applicant_login, applicant_register} from "@/api/applicant_api";
import {generateStringForCaptcha} from "@/utils/CaptchaStringGenerator";

export default {
  name: "LoginPage",
  components: {CapchaCodeComponent},
  data() {
    return {
      key:'',
      // form: reactive({
      //   username: '13700000001',
      //   password: '123456',
      //   isRead: false,
      // })
    }
  },
  mounted() {


  },
  setup() {
    //LOGIN INFORMATIONS
    const form = reactive({
      username: '13700000001',
      password: '123456',
      isRead: false,
    });
    const handleSubmit = (data) => {
      // console.log(form)
      if (form.username.includes("@")){
        applicant_login(form)
            .then((response)=>{
              console.log(response)
              showMessage(response)
              if (response.code === 2000){
                store.commit('setuserInfo',response.data)
                router.push({name:"registration"})
              }
            })
            .catch((response)=>{
              console.log(response)
              Message.error({
                content: "Login Information Error !!",
                closable:true
              })
            })
      }
    };

    //REGISTRATION INFOS
    const visible = ref(false);
    const registerFormRef = ref();
    const registerForm = reactive({
      name: 'Christian Paul',
      email: 'koutoua1@mail.com',
      passport: '16SD61035',
      password: '123456',
      password2:"123456",
      code: '',
      code_verif: '',
    });
    //GET CAPTCHA
    const getCode = function (){
      let captcha = generateStringForCaptcha(4);
      console.log("NEW CAPTCHA----   "+captcha)
      registerForm.code = captcha
      return captcha
    }

    //SELF DEFINE VALIDATION RULES
    const handleBeforeOk = function (values){
      let verification = true
      if(values.errors === undefined){
        // if (registerForm.code_verif!==registerForm.code){
        //   registerFormRef.value.setFields({
        //     code:{
        //       status:"error",
        //       message:'Captcha Code Error'
        //     }
        //   })
        //   verification = false
        // }
        if(registerForm.password !== registerForm.password2){
          registerFormRef.value.setFields({
            password2:{
              status:"error",
              message:'password does not match'
            }
          })
          verification = false
        }
      }
      // console.log(values)

      return verification;
    }

    const handleOk = function (values){
      if (handleBeforeOk(values)){
        applicant_register(registerForm)
            .then((response)=>{
              console.log(response)
              showMessage(response)
              visible.value=false
              registerForm.email=registerForm.code=registerForm.code_verif=registerForm.name=registerForm.passport=registerForm.password2=registerForm.password=""
            }).catch((response)=>{
          showMessage(response)
        })
      }
    }


    return {
      registerForm,visible,registerFormRef,
      form,handleOk,handleBeforeOk,
      handleSubmit,getCode
    };
  },

  watch: {
    this(value){
      console.log(value)
    },

    visible(value) {
      if (value === true) {
        this.getCode()
      } else {
        this.registerForm.email = this.registerForm.code = this.registerForm.code_verif = this.registerForm.name = this.registerForm.passport = this.registerForm.password2 = this.registerForm.password = ""
      }
    }
  },

  methods:{
    updatePage(){
      this.$forceUpdate()
      this.key++
    },
    handleSubmit(data){
      user_login(this.form)
          .then((response) => {
            // console.log(response)
            if (response.code === 2000) {
              const userRole = convertRoleCode(response.data.role)
              console.log("USERROLE",userRole)
              if (userRole === undefined){
                Message.error({
                  content:'Your account may have been compromised . PLease contact the admin!'
                })
              }else{
                store.commit('setuserInfo', response.data)
                Message.success({
                  content:'Connected !'
                })
               setTimeout(()=>{
                 switch (userRole) {
                   case "ADMIN":
                     store.commit('setsidebarLinks', supervisorSideBarLinks)
                     router.push({name:'supervisor_dashboard'})
                     break
                   case "STUDENT":
                     store.commit('setsidebarLinks', studentLinks)
                     router.push({name:'student_dashboard'})
                     break
                   case "TEACHER":
                     store.commit('setsidebarLinks', teacherSideBarLinks)
                     router.push({name:'teacher_dashboard'})
                     break
                   case "APPLICANT":
                     setTimeout(args => {
                       router.push({name:'register'})
                     }, 800)
                     break
                 }
               },1500)
              }
            }
          })
      // this.$forceUpdate()
      // router.push("/jwxt/dashboard")
    }
  },

  created() {
    // console.log("OKAY")
  },
}
</script>

<style scoped>

</style>