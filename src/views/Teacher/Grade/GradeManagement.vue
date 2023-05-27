<template>
  <section class="container-fluid">
    <MyPageHeader text="成绩管理">
      <template #icon>
        <icon-bar-chart/>
      </template>
    </MyPageHeader>
    <div class="px-5">
      <a-collapse accordion>
        <a-collapse-item key="1" class="bg-white" header="Algorithm and Advanced Research">
          <template #extra>
            <icon-copy/>
          </template>
          <a-list :bordered="false" class="" hoverable split>
            <a-list-item>
              <a-link class="text-dark bg-transparent p-2" status="primary"
                      @click.prevent="getvalidation(2019)">
                2019 - Software Engineering Class - Semester 1
                <a-tag :color="'#e5bc27'" class="ms-5" size="mini" visible>Processing</a-tag>
              </a-link>
            </a-list-item>
            <a-list-item>
              <a-link class="text-dark bg-transparent p-2" status="primary"
                      @click.prevent="getvalidation(2020)">
                2020 - Software Engineering Class - Semester 2
                <a-tag :color="'#12e516'" class="ms-5" size="mini" visible>Done</a-tag>
              </a-link>
            </a-list-item>
            <a-list-item>
              <a-link class="text-dark bg-transparent p-2" status="primary"
                      @click.prevent="getvalidation(2022)">
                2022 - Software Engineering Class - Semester 2
                <a-tag :color="'#892e11'" class="ms-5" size="mini" visible>Not Yet</a-tag>
              </a-link>
            </a-list-item>
          </a-list>
        </a-collapse-item>
        <a-collapse-item :key="2" header="Cloud Computing">
          <a-list :bordered="false" :data="[2]" class="" hoverable split>
            <a-list-item>
              <a-link class="text-dark bg-transparent p-2" status="primary"
                      @click.prevent="getvalidation(2019)">
                2019 - Software Engineering Class - Semester 1
                <a-tag :color="'#e5bc27'" class="ms-5" size="mini" visible>Processing</a-tag>
              </a-link>
            </a-list-item>
          </a-list>
        </a-collapse-item>
      </a-collapse>
    </div>

    <a-drawer :closable="false" :header="false" :height="600" :mask="true" :mask-closable="true"
              :visible="visible" placement="bottom" @cancel="visible=false" @close="visible=false" @ok="visible =false">

      <a-page-header :show-back="false" title="Teacher Grade management">
        <template #subtitle>
          <a-space>
            <span>2020 - Software Engineering Class - Semester 2 Grade Management</span>
          </a-space>
        </template>
      </a-page-header>

      <div class="position-relative container h-75">
        <div class="h-75">
          <a-upload
              ref="uploadRef"
              :auto-upload="false"
              :custom-request="submitOne"
              :limit="1"
              :multiple="false"
              :show-cancel-button="false"
              :show-link="false"
              :show-preview-button="false"
              :show-retry-button="false"
              accept=".xlsx, .xls"
              action="/"
              draggable
              list-type="text"
              name="Select the File to upload"
              @change="onChange"
          >

          </a-upload>
        </div>
        <a-alert :banner="true" :show-icon="true" class="text-muted   bottom-0 start-0 end-0 " title="Attention"
                 type="info">
          This is the helper for the class grade upload. please upload a document in accordance with the fields in
          this template document.
        </a-alert>
      </div>
    </a-drawer>
  </section>
</template>

<script lang="js">
import MyPageHeader from "@/components/MyPageHeader";
import {ref, shallowRef} from "vue";
import xlsx, {utils} from 'xlsx'

export default {
  name: "GradeManagement",
  components: {MyPageHeader},
  data() {
    return {
      visible: false
    }
  },
  async setup() {
    //SHETJS https://docs.sheetjs.com/docs/demos/local/file/#binary-data https://docs.sheetjs.com/docs/demos/frontend/vue#installation
    const uploadRef = shallowRef();
    const files = ref([]);
    let wb = shallowRef()

    const submitOne = (e) => {
      e.onProgress();
      e.onSuccess();
      console.log(e)
      console.log(files.value)
    };

    const onChange = async (fileList) => {
      files.value = fileList;

      const reader = new FileReader();

      reader.onloadstart = ((ev) => {
        console.log("______________LOAD STARTED________________")
      })
      reader.onloadend = ((file) => {
        console.log("______________LOAD ENDED________________")
        //GET JSON FROM FILE
        let workBook = xlsx.read(file.target.result);
        const u8 = xlsx.write(workBook, {type: "buffer", bookType: "xlsx"});
        const blob = new Blob([u8], {type: "application/vnd.ms-excel",});
        const data = utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
        wb.value = data

        console.log("FIle Data As Json", data)
        //GET FILE FROM JSON
        // const worksheet = xlsx.utils.json_to_sheet(data);
        // const workbook = xlsx.utils.book_new();
        // xlsx.utils.book_append_sheet(workbook, worksheet, "Dates");
        // xlsx.writeFile(workbook, "Presidents.xlsx", { compression: true });
        // console.log(worksheet)
        // console.log(workbook)
      })

      if (files.value.length === 0) {
        console.log("NO FILE")
      } else if (files.value.length > 1) {
        console.log("DOUBLE FILE")
      } else {
        console.log("VALID")
        reader.readAsArrayBuffer(files.value[0].file);
      }


      // console.log(uploadRef)
    };

    return {
      wb,
      files,
      submitOne,
      onChange, uploadRef
    }

  },
  async mounted() {
  },
  methods: {
    getvalidation(index) {
      console.log(index)
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>