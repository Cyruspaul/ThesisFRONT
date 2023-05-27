<template>
  <section class="container pb-3">
    <a-space direction="vertical" fill size="medium">

      <a-typography-title :heading="5" bold class="fw-bolder" >
        <a-button size="mini" type="text" @click="back">
          <IconCaretLeft/>
        </a-button>
        通告
      </a-typography-title>
      <div v-if="!operation" class="image-area">
        <a-image alt="arco-design" class="" fit="cover" height="100" show-loader src="https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/5cc3cd1d994b7ef9db6a1f619a22addd.jpg~tplv-49unhts6dw-image.image"
                 width="100%"/>
      </div>
      <a-descriptions :label-style="{fontSize: '16px'}" :column="{xs:1, md:2, lg:3}" size="large">

        <a-descriptions-item label="题目">
          <a-input v-if="operation" placeholder="题目" size="large" v-model="form.atitle" />
          <p  v-else class="p-0 m-0 fw-bolder"> {{this.form.atitle}} </p>
        </a-descriptions-item>
        <a-descriptions-item label="主任">
          <a-input   v-if="operation"  placeholder="主任" size="large" v-model="form.ahost" />
          <p  v-else class="p-0 m-0 fw-bolder"> {{this.form.ahost}} </p>
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          <a-input   v-if="operation"  placeholder="地址" size="large" v-model="form.alocation" />
          <p  v-else class="p-0 m-0 fw-bolder"> {{this.form.alocation}} </p>
        </a-descriptions-item>
        <a-descriptions-item label="时间">
          <a-date-picker    v-if="operation"  size="large"  placeholder="时间" v-model="form.adate" />
          <p  v-else class="p-0 m-0 fw-bolder"> {{this.form.adate}} </p>
        </a-descriptions-item>
        <a-descriptions-item label="类型">
          <a-input   v-if="operation" size="large"  placeholder="类型" v-model="form.atopic" />
            <a-tag :color="'#3f86f1'" class="me-1" v-else v-for="top in this.form.atopic">{{top}}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item v-if="operation" label="是否允许评论">
          <a-switch     :checked-value="true" size="large" :unchecked-value="false"   v-model="form.allowComment" />
        </a-descriptions-item>
        <a-descriptions-item label="文件">
          <a-upload  v-if="operation"
              ref="uploadRef"
              :auto-upload="false"
              :custom-request="submitNone"
              :limit="1"
              :multiple="false"
              :show-cancel-button="false"
              :show-link="false"
              :show-preview-button="true"
              :show-retry-button="false"
              accept=".doc, .docx, .pdf, .xls, .xlsx"
              action="/"
              name="file"
              @change="onChange"
          >
            Upload
          </a-upload>
          <p  v-else class="p-0 m-0 fw-bolder"> Document </p>
        </a-descriptions-item>
        <a-descriptions-item  v-if="!operation" label="发布时间">
          <a-tag >2023-03-17 10:15:48</a-tag>
        </a-descriptions-item>
        <a-descriptions-item  v-if="!operation" label="浏览人数">
          <a-tag>{{this.form.aviews}}</a-tag>
        </a-descriptions-item>
      </a-descriptions>


      <MdEditor v-model="this.form.acontent" :codeTheme="'atom'" :footers="['markdownTotal', '=', 'scrollSwitch']"
                :htmlPreview="false"
                :language="'en-US'"
                :preview="!operation"
                :previewOnly="!operation" :previewTheme="'github'" :toolbars="toolbars" noKatex
                placeholder="Write Something"
                theme="light" @onError="onError" @onHtmlChanged="HtmlChange"
                @onSave="changeSave" @onUploadImg="onUploadImg"
      />
      <a-button v-if="operation" @click="submit" status="normal" size="large" type="primary">
        <icon-plus class="me-1"/>
        发布
      </a-button>
    <div class="container">
      <a-space fill direction="vertical" size="medium">
        <div>
          <h6 class="fw-bolder">文件</h6>
          <a-divider direction="horizontal" :margin="0" type="dashed" />
          <a-link size="large" target="_blank" status="danger" v-if="this.form.alink !== undefined" :href="this.form.alink">
            <template #icon>
              <icon-file />
            </template>
            点击这下载附件 {{this.form.alink.substring(94)}}

          </a-link>
        </div>
        <div>
          <h6 class="fw-bolder">评论</h6>
          <a-divider direction="horizontal" :margin="0" type="dashed" />
          <a-comment  v-if="this.form.allowComment === true"
                      v-for="comment in commentList"
                      :author="comment.comauthor"
                      :content="comment.comcontent"
                      :datetime="comment.gmtCreate"
          >
            <template #avatar>
              <a-avatar color="blue" shape="square" :size="45" auto-fix-font-size >{{comment.comauthor}}</a-avatar>
            </template>
          </a-comment>
          <span v-else class="text-muted small" > 不允许写评论</span>
        </div>
      </a-space>

    </div>
    </a-space>
  </section>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import router from "@/router";
import MyPageHeader from "@/components/MyPageHeader";
import {ref, shallowRef} from "vue";
import {COMMENTS, DOCUMENT, PUBLICATIONS} from "@/api/admin_API";
import {Message} from "@arco-design/web-vue";
import {showNotification} from "@/utils/DefinedMessageNotification";

export default {
  name: "supNotificationCreate",
  components: {MdEditor, MyPageHeader},
  data() {
    return {
      toolbars: [
        'bold',
        'underline',
        'italic',
        '-',
        'title',
        'strikeThrough',
        'sub',
        'sup',
        'quote',
        'unorderedList',
        'orderedList',
        'task',
        '-',
        'codeRow',
        'code',
        'link',
        '-',//image
        'table',
        // 'mermaid',
        // 'katex',
        '-',
        'revoke',
        'next',

        '=',
        // 'pageFullscreen',
        // 'fullscreen',
        // 'save',
        'preview',
        // 'htmlPreview',
        // 'catalog',
        // 'github'
      ],
      eventdetails: ref({}),
      event: router.currentRoute.value.params.event,
      form:{
        adate:"",
        ahost:"SUSE",
        allowComment:"",
        alocation:"Dorm",
        atitle:"Title",
        atopic:'Mainly Focus on Me',
        acontent:'The content',
        link:undefined
      },
      files:undefined,
      operation: this.op === 'create' || this.op === 'edit',
      commentList:[]
    }
  },
  props:['edit','op','id'],
  methods: {

    changeSave(string, prom) {
      // console.log(string)
      prom.then(value => {
        console.log(value)
      })
    },
    onError(err) {
      Message.error(err.message);
    },
    HtmlChange(string) {

    },
    async onUploadImg(files, callback) {
      console.log(files)
      const res = await Promise.all(
          files.map((file) => {
            return new Promise((rev, rej) => {
              const form = new FormData();
              form.append('file', file);

              // axios
              //     .post('/api/img/upload', form, {
              //       headers: {
              //         'Content-Type': 'multipart/form-data'
              //       }
              //     })
              //     .then((res) => rev(res))
              //     .catch((error) => rej(error));

            });
          })
      );

      callback(res.map((item) => item.data.url));
    },
    back() {
      router.back();
    },
    EditorChange(string) {
      this.form.acontent=string
      console.log(string)
    },
    submit() {
      console.log(this.form)

      if (this.op === 'edit'){
        console.log("------------------------------")
        PUBLICATIONS.updateOne(this.form).then(res=>{
          if (res.code===2000){
            showNotification(res)
            // router.push({name:'supervisor_announcements'})
          }
        })
      }
      else{
        console.log(this.files === undefined)
        if (this.files === undefined ){
          console.log("===========")
          PUBLICATIONS.create(this.form).then(res=>{
            if (res.code===2000){
              showNotification(res)
              // router.push({name:'supervisor_announcements'})
            }
          })
        }
        else{
          this.submitOne().then(response=>{
            if (response.data !== undefined || response.data !== null){
              console.log("++++++++++++++++++++++++++")
              this.form.alink = response.data.url
              PUBLICATIONS.create(this.form).then(res=>{
                if (res.code===2000){
                  showNotification(res)
                  // router.push({name:'supervisor_announcements'})
                }
              })
            }
          })
        }
      }
    },
    submitOne (){
      console.log(this.files)
      const file = {"file":this.files}
      return DOCUMENT.create(file)
    },

    submitNone (){
     Message.info('发布新通告可以')
    },
    onChange (fileList){
      if (fileList.length !== 0){
        this.files =fileList[0].file
      }
      else{
        this.files = undefined
      }
      console.log(this.files )

    }
  },
  mounted() {
    // console.log(this.op === 'create')

  },
  created() {

    if(this.op !== 'create'){
      PUBLICATIONS.getOne({id: this.id}).then(res=>{
        // console.log(res.data)
        this.form = res.data
        if (this.op !== 'edit')
          this.form.atopic = this.form.atopic.split(',')
        if (this.form.allowComment === true){
          COMMENTS.findAll({id:this.id}).then(res=>{
            this.commentList = res.data
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>