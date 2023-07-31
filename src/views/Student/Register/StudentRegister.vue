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
        <a-menu-item key="3" style="float: right">
          <a-dropdown class="" hide-on-select style="" trigger="hover" @select="logout">
            <div :style="{cursor: 'pointer' }" class="d-flex m-0 align-items-center bg-light py-0 px-2 me-md-4 ">
              <a-avatar :size="25" :style="{ backgroundColor: '#3370ff', }" class="me-2" shape="square">
                <icon-settings class="mx-auto"/>
              </a-avatar>
              <small class="small">User Settings</small>
            </div>
            <template #content style="z-index: 1000">
              <a-doption key="0_0" class="px-4 py-1">
                <template #icon>
                  <icon-export/>
                </template>
                退出
              </a-doption>

            </template>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </div>

    <div class="container pt-4 animate__animated animate__fadeIN" style="height: fit-content; min-width: 50vw; padding-bottom: 100px">
      <a-page-header :show-back="false" class="mb-2 border-bottom" title="Application Portal">
        <!--        <template #subtitle>-->
        <!--          <a-tag size="medium" bordered v-if="form.appstatus==='Submitted'" :color="'#ffca52'" v-text="form.appstatus"></a-tag>-->
        <!--          <a-tag size="medium" bordered :color="'#0422fa'"  v-else v-text="form.appstatus"></a-tag>-->
        <!--        </template>-->
        <template #extra>
          <a-typography-text class="small text-muted">Registration Time : {{ formData.gmtCreate }}</a-typography-text>
        </template>
      </a-page-header>

      <a-space v-if="STATUS=== 0" class="pt-4 px-3 px-md-5" direction="vertical" fill size="large">
        <a-descriptions :bordered="false"
                        :column="2" align="left"
                        layout=""
                        size="large"
                        title="Basic Information">

          <!--          <a-descriptions-item label="Profile Picture : " :span="2">-->
          <!--            <a-upload tip="Picture" :auto-upload="false" :limit="1" :show-cancel-button="true"-->
          <!--                      list-type="picture"-->
          <!--                      action="/" -->
          <!--                      :file-list="fileList"-->
          <!--                      image-preview-->
          <!--                      @change="getFile"-->
          <!--            />-->
          <!--          </a-descriptions-item>-->
          <a-form ref="formRef" v-model:model="formData" :disabled="appstatusValid" layout="ltr" size="medium"
                  @submit-success="saveChanges">
            <a-form-item :span="2" :validate-trigger="['change','input']" field="name" label="English Name : "
                         required>
              <a-input v-model="formData.name" allow-clear placeholder="..."></a-input>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="country" label="Country : " required>
              <a-input v-model="formData.country" allow-clear placeholder="..."></a-input>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="passport" label="Passport Number : "
                         required>
              <a-input v-model="formData.passport" allow-clear placeholder="..."></a-input>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="email" label="Email : " required>
              <a-input v-model="formData.email" allow-clear placeholder="..."></a-input>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="age" label="Age:" required>
              <a-input-number v-model="formData.age" allow-clear></a-input-number>
            </a-form-item>
            <a-form-item :span="2" field="birthdate" label="Birth Date:">
              <a-date-picker v-model="formData.birthday" v-model:picker-value="formData.bthday"
                             :default-picker-value="formData.bthday" style="width: 100%;"/>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="phone" label="Mobile Number : "
                         required>
              <a-input v-model="formData.phone" allow-clear placeholder="..."></a-input>
            </a-form-item>
            <a-form-item :span="2" :validate-trigger="['change','input']" field="degree" label="Degree Level:" required>
              <a-select v-model="formData.degree" required>
                <a-option :value="0"  label="Chinese Language" />
                <a-option :value="1" label="Bachelor" />
                <a-option :value="2"  label="Master" />
              </a-select>
            </a-form-item>
            <a-form-item :span="2" field="major" label="Major : ">
              <a-select  :default-value="majorList.filter(value => {if (value.id === formData.majorid){return value.majorName}})" v-model="formData.major" required>
                <a-option v-for="major in majorList" :value="major.id" :label="major.majorName" />
              </a-select>
            </a-form-item>
            <a-form-item :span="2" field="other" label="Other">
              <a-textarea v-model="formData.otherinfos" :max-length="1000" allow-clear placeholder="Other infos"
                          show-word-limit/>
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" size="large" status="normal" type="primary">Save Changes</a-button>
            </a-form-item>
          </a-form>
        </a-descriptions>

      </a-space>
      <div v-else-if="STATUS=== 2" class="container">
        <a-result status="success">
          <template #title>
            <a-typography-title :heading="5">
              CONGRATULATIONS !!!
            </a-typography-title>
          </template>
          <template #subtitle>
            <div class="px-5">
              Your application to pursue your
              <a-typography-text bold mark>{{ formData.degree }} DEGREE</a-typography-text>
              at
              Sichuan University of Science and Engineering has been
              <a-typography-text bold mark>{{ formData.appstatus }}</a-typography-text>
            </div>
          </template>
          <div class="px-5">
            <a-typography style="background: var(--color-bg-1); padding: 24px;">
              <h6 class="text-dark fw-bolder mb-4">Student Informations</h6>
              <a-descriptions :column="4" layout="vertical" size="large" wrap>

                <a-descriptions-item :span="1" label="Name">
                  {{ formData.enname }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Degree">
                  {{ formData.degree }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Department">
                  {{ formData.deptid }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Major">
                  {{ formData.majorid }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Class">
                  {{ formData.classid }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="USERNAME">
                  {{ formData.username }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Dormitory ">
                  {{ formData.dorm }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="PASSWORD">
                  {{ formData.password }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" label="Chinese Name">
                  {{ formData.zhname }}
                </a-descriptions-item>
                <a-descriptions-item :span="2" label="Other Infos">
                  {{ formData.otherinfos }}
                </a-descriptions-item>
              </a-descriptions>
            </a-typography>
          </div>


        </a-result>
      </div>
      <div v-else-if="STATUS=== 1" class="container">
        <a-result status="info">
          <template #title>
            <a-typography-title :heading="5">
              Application Status
            </a-typography-title>
          </template>
          <template #subtitle>
            <div class="px-5">
              Your application to Sichuan University of Science and Engineering has been
              <a-typography-text bold mark>Submitted</a-typography-text>
              Wait patiently until the school processes your application.
            </div>
          </template>

        </a-result>
      </div>
      <div style="height: 300px" class=" w-100 row justify-content-center align-items-center" v-else>
<!--        <a-spin  :size="50" loading tip="Loading..." />-->
        Nothing
      </div>

    </div>
  </section>
</template>

<script>
import {ref, shallowRef, toRaw, watch} from 'vue';
import router from "@/router";
import store from "@/store";
import {applicant_infos, applicant_saveChanges} from "@/api/applicant_api";
import {showMessage, showNotification} from "@/utils/DefinedMessageNotification";
import {getAllmajors} from "@/api/api";
import {Message} from "@arco-design/web-vue";

export default {
  name: "StudentRegister",
  data() {
    return {
      majorList: [],
      STATUS:-1,
      formData:{}
    }
  },
  watch: {
    formData(newQuestion, oldQuestion) {
      console.log(newQuestion)
      console.log(oldQuestion)
      // if(form === undefined){
      //   this.appstatusValid = true
      // }
      // else if (form.status !== 0)
      //   this.appstatusValid = true
      // else{
      //   getAllmajors().then(res=>this.majorList = res.data.items)
      // }
    },
  },
  setup() {
    const level = ref('');
    const appstatusValid = ref(false);
    // const formData = {
    //   gmtCreate:''
    // }




    const form= ref({
      status: -1,
      majorid: '',
      enname: 'Name',
      email: '',
      country: '',
      passport: '',
      username: '',
      age: 0,
      phone: '',
      birthday: "",
      level: '',
      otherinfos: '',
      degree: ''
    })
    const formRef = ref()
    // watch(level, () => {
    //   form.level = level.value
    //   console.log(level.value)
    //   city.value = ''
    // })

    const fileList = []


    const logout = function () {
      //CLEAN THE CACHE IN THE VUEX DATA
      store.commit('cleanUserInfo')
      router.push("/login")

    }
    return {
      fileList,form,
      logout, formRef, appstatusValid,
    }
  },
  methods: {
    saveChanges(values) {
      // console.log(values)
      if (values.errors === undefined) {
        // if (form.value.enname!==verif_form.enname){
        //   formRef.value.setFields({
        //     enname:{
        //       status:"error",
        //       message:'Name Incorecxr'
        //     }
        //   })
        // }
        applicant_saveChanges(this.formData)
            .then(value => {
              console.log(value)
              showNotification(value)
              console.log(this.form)
              if (value.code === 2000) {
                this.STATUS = 1
              }
            })
      }

    },
  },
  mounted() {
      if (store.getters.getuserInfo.token!== undefined) {
        let promise = applicant_infos(store.getters.getuserInfo.username);
        promise.then(response => {
          this.formData = response.data
          this.STATUS = response.data.status
          console.log(this.formData)
        })
      } else {
        Message.warning('Token Invalid')
      }
    }

}
</script>

<style scoped>
*{

}
</style>