<template>
  <a-layout-content class="h-100 w-100">

    <section class="d-flex justify-content-center align-items-center">
      <a-space class="container-fluid" direction="vertical" wrap>
        <MyPageHeader text="Dashboard">
          <template #icon>
            <IconHome/>
          </template>
        </MyPageHeader>

        <div class="container">
          <a-row :gutter="70" :wrap="true" justify="center">
            <a-col :md="7" :span="24" :xl="5" :xxl="4" class="w-100 mb-3 h-100">
              <a-statistic :value="recent_event" title="This Semester Course">
                <template #suffix>
                  <router-link :to="{name:'student_course'}" class="ms-3" href="course" shape="circle" size="mini" status="normal" type="text">
                    <IconCaretRight />
                  </router-link>
                </template>
              </a-statistic>
            </a-col>
            <a-col :md="7" :span="24" :xl="5" :xxl="4" class="w-100 mb-3 h-100">
              <a-statistic :value="recent_anouncements" title="Recent Announcements">
                <template #suffix>
                  <router-link :to="{name:'student_publications'}" class="ms-3" href="publications" shape="circle" size="mini" status="warning" type="text">
                    <IconCaretRight/>
                  </router-link>
                </template>
              </a-statistic>
            </a-col>
            <a-col :md="7" :span="24" :xl="5" :xxl="4" class="w-100 mb-3 h-100">
              <a-statistic :value="3" title="Today Classes"/>
            </a-col>
          </a-row>
          <h6 class="p-2">
            Hi !
            <a-typography-text bold underline>{{ currentuserName }}</a-typography-text>
          </h6>
          <!--          <a-alert banner closable type="normal"> Welcome to the 22nd of April !!</a-alert>-->
          <MyPageHeader text="TimeTable">
            <template #extra>
              <a-tag class="text-muted" default-checked>{{ todayDate }}</a-tag>
            </template>
          </MyPageHeader>

          <div class="mb-5">
            <a-list :bordered="false" size="mini">
              <template #empty>
                <div class="d-flex justify-content-center">
                  <a-typography-text class="text-muted">
                    Cool You don't have any class today !!!
                  </a-typography-text>
                </div>
              </template>
              <a-list-item v-for="(value, index) in timetableData" :key="index"
                           :hoverable="true" :style="{ minWidth: 'fit-content', width: 'auto' }">
                <a-card :bordered="false" class="card-demo "
                        hoverable>
                  <div>
                    <a-descriptions :column="{xs:1,lg:3 }" :data="value" align="left"/>
                  </div>
                </a-card>
              </a-list-item>
            </a-list>
          </div>
        </div>
<!--        <div class="h-75">-->
<!--          <a-upload-->
<!--              ref="uploadRef"-->
<!--              :auto-upload="false"-->
<!--              :custom-request="submitOne"-->
<!--              :limit="1"-->
<!--              :multiple="false"-->
<!--              :show-cancel-button="false"-->
<!--              :show-link="false"-->
<!--              :show-preview-button="false"-->
<!--              :show-retry-button="false"-->
<!--              accept=".xlsx, .xls"-->
<!--              action="/"-->
<!--              draggable-->
<!--              list-type="text"-->
<!--              name="Select the File to upload"-->
<!--              @change="onChange"-->
<!--          >-->

<!--          </a-upload>-->
<!--        </div>-->
      </a-space>
    </section>

  </a-layout-content>
</template>
<script setup>
import store from "@/store";
import {onMounted, ref, shallowRef} from "vue";
import MyPageHeader from "@/components/MyPageHeader.vue";
import xlsx, {utils} from "xlsx";

const todayDate = new Date().toDateString()
const timetableData = [
  [{
    label: '课程',
    value: '数据结构',
  }, {
    label: '地点',
    value: 'Beijing'
  }, {
    label: '时间',
    value: '8h45 - 10h30 ',
    span: 2
  },
  ],
  [{
    label: '课程',
    value: '数据结构'
  }, {
    label: '地点',
    value: 'Beijing'
  }, {
    label: '时间',
    value: '8h45 - 10h30 ',
    span: 2
  },
  ], [{
    label: '课程',
    value: '数据结构',
  }, {
    label: '地点',
    value: 'Beijing'
  }, {
    label: '时间',
    value: '8h45 - 10h30 ',
    span: 2
  },
  ]
]
// const currentuserName = store.getters.getuserInfo.name
const currentuserName = store.getters.getuserInfo.username
const recent_event = ref(0)
const recent_anouncements = ref(0)
onMounted(() => {

  //API CALLS FOR INSTANTIATION OF THE HOMEPAGE
  // recent_event_list_api_call(null)
  // .then(response=>{
  //   if (response.data.length === 0){
  //
  //   }else {
  //     recent_event.value = response.data.length
  //   }
  // })
  //
  // recentAnnouncemnts(null)
  //     .then(response=>{
  //       if (response.data.length === 0){
  //
  //       }else {
  //         recent_anouncements.value = response.data.length
  //       }
  //     })
})

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

</script>
<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
  width: auto;
}
</style>
