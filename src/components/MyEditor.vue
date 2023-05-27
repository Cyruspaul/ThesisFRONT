<template>
  <MdEditor v-model="valueData" :codeTheme="'atom'" :footers="['markdownTotal', '=', 'scrollSwitch']"
            :htmlPreview="false"
            :language="'en-US'"
            :preview="!editorMode"
            :previewOnly="!editorMode" :previewTheme="'github'" :toolbars="toolbars" noKatex
            placeholder="Write Something"
            theme="light" @onError="onError" @onHtmlChanged="HtmlChange"
            @onSave="changeSave" @onUploadImg="onUploadImg"
  />
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {Message} from "@arco-design/web-vue";
import {ref} from "vue";

export default {
  name: "MyEditor",
  components: {MdEditor},
  props: ['editorMode', 'data'],
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
      valueData: this.data,
    }
  },
  watch: {

  },
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
      // this.valueData =  string
      // console.log(string)
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
    }
  },
  mounted() {
    this.$forceUpdate()
  }

}
</script>

<style scoped>

</style>