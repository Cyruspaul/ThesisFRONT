<template>
  <section class="">
    <MyPageHeader :backbutton="true" text="课表管理">
      <template #icon>
        <icon-book/>
      </template>
      <template #subtitle>
        {{ classInfo.classname }}
      </template>
    </MyPageHeader>

    <div class="container">
      <div v-if="classInfo.timetable==='NONE'" class="w-75 mx-auto">
        <a-typography-title>上传课表</a-typography-title>
        <a-divider/>

          <div class=" mb-5" >
            <a-tabs default-active-key="1" lazy-load>
              <a-tab-pane key="1" title="连接上传">
                <a-space size="large" direction="vertical" fill>
                  <a-upload class="border"
                            ref="uploadRef"
                            :auto-upload="false"
                            tip="课表文档只是支持 .pdf"
                            :custom-request="submitNone"
                            :limit="1"
                            :multiple="false"
                            :show-cancel-button="false"
                            :show-link="false"
                            :show-preview-button="true"
                            :show-retry-button="false"
                            accept=".pdf"
                            action="/"
                            :draggable="true"
                            name="file"
                            @change="onChange"
                  >
                    Upload
                  </a-upload>
                  <div class="">
                    <a-typography-title>步骤</a-typography-title>
                    <a-divider/>
                    <a-steps  :current="current" @change="setCurrent">
                      <a-step description="在本地选文档...">选文档</a-step>
                      <a-step description="按右边开始上传文档">上传文档</a-step>
                      <a-step description="上传结果">上传结果</a-step>
                      <a-step description="">数据更新</a-step>

                    </a-steps>
                  </div>
                </a-space>
              </a-tab-pane>
              <a-tab-pane key="2" title="文件上传">
                <a-form ref="formRef"  :model="filelink" class="w-75 mx-auto" layout="vertical" @submit="submit" @submit-success="linkSubmit">
                  <a-form-item :rules="[{required:true},{type:'url',message:'连接格式不对！'}, {empty:false}]"  label="文档">
                    <a-input required size="large" v-model="filelink.address" />
                  </a-form-item>
                  <a-form-item>
                    <a-button html-type="submit"  type="primary">上传文档</a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>

          </div>



      </div>

<!--      PDF READER-->
      <div v-else class="text-center">
        <object
            :data='this.classInfo.timetable'
            type="application/pdf"
            class=""
            style="height: calc(100vh - 200px); width: 100%"
        >

        </object>
<!--                  <iframe-->
<!--                      src='{{this.classInfo.timetable}}'-->
<!--                      width="500"-->
<!--                      height="678"-->
<!--                  >-->
<!--                    <p>This browser does not support PDF!</p>-->
<!--                  </iframe>-->
      </div>
    </div>

<!--    {{ classInfo }}-->
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {CLASS, DOCUMENT} from "@/api/admin_API";
import router from "@/router";
import {Message} from "@arco-design/web-vue";
import {showMessage, showNotification} from "@/utils/DefinedMessageNotification";

export default {
  name: "SupTimeTable",
  components: {MyPageHeader},
  data() {
    return {
      classInfo: {},
      current:0,
      files:{},
      filelink: {
        address: undefined
      }
    }
  },
  watch:{
    // current(old, value){
    //     console.log(old)
    // }
  },
  methods: {
    submit(form){
      console.log("==============FORM====================")
      console.log(form)

    },
    linkSubmit(){
      console.log("==================================")
      this.onNext()
    },
    onPrev() {
      this.current = Math.max(1, this.current - 1)
    },

    onNext() {
      this.current = Math.min(4, this.current + 1)
    },

    setCurrent(current) {
      this.current = current
    },
    submitNone() {
      //OSS
      console.log(this.files)
      const file = {"file":this.files}
      DOCUMENT.create(file).then(response=>{
        console.log(response)
        showNotification(response)
        if (response.code === 2000) {
          this.onNext()
          this.classInfo.timetable = response.data.url
          CLASS.update(this.classInfo).then(res=>{
            if (res.code === 2000){
              this.onNext()
              Message.success("文件上传和数据更新成功！！")
              setTimeout(()=>{
                router.back()
              },1000)
            }else{
              showMessage(res)
            }
          })
        }
      })

    },
    onChange(fileList) {
      if (fileList.length !== 0){
        console.log(fileList)
        this.files = fileList[0].file
        this.onNext()
      }else{
       this.current =0
      }
    }
  },
  mounted() {
    CLASS.getById(router.currentRoute.value.params.class).then(response => {
      this.classInfo = response.data.class;
    })
  }
}
</script>

<style scoped>

</style>