<template>
  <div class="container-fluid">
    <MyPageHeader icon="icon-calendar" text="活动">
      <template #icon>
        <icon-calendar class="me-3"/>
      </template>
    </MyPageHeader>

    <div class="px-5">

      <a-space class="d-flex justify-content-center" direction="vertical" size="large">
        <a-row justify="center">
          <a-col :span="14">
            <a-input/>
          </a-col>
        </a-row>
        <a-space class="d-flex justify-content-center p-0 m-0" direction="horizontal" size="large" wrap>

          <a-select :allow-clear="true" :allow-search="true" :style="{width:'314px'}"
                    default-active-first-option
                    placeholder="Please select Event type ...">
            <a-option>All</a-option>
            <a-option>International School</a-option>
            <a-option>My Department</a-option>
            <a-option>Outside</a-option>
          </a-select>
          <a-range-picker :style="{width:'314px'}">
          </a-range-picker>
          <a-button shape="square" status="default" type="primary" value="mini">Search</a-button>
        </a-space>
      </a-space>

      <ListItem :ComponentType="'event'" :list-data="item"/>
    </div>


    <!--  MODAL-->
    <a-modal :visible="modalViewBoolean === true" align-center esc-to-close
             fullscreen hide-cancel mask ok-text="Close" simple title="Notification Details"
             title-align="center" @ok="changeModal">
      <div>
        <a-page-header :show-back="false"
                       :style="{ background: 'var(--color-bg-2)' }"
                       title="数统学院2022-2023-1专业课（20、21级学生）补考安排">
          <template #subtitle>
            <a-space>
              <span>发布人</span>
              <a-tag color="red" size="large">学院教学管理</a-tag>
            </a-space>
          </template>
          <template #extra>
            <a-space class="mt-2">
              <a-descriptions :column="{xs:1, md:3, lg:4}" size="large">

                <a-descriptions-item label="发布时间">
                  <a-tag>2023-03-17 10:15:48</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="浏览人数">
                  <a-tag>381381</a-tag>
                </a-descriptions-item>
              </a-descriptions>
            </a-space>
          </template>
          <p>
            For other uses, see Design
          </p>
          <p>
            A design is a plan or specification for the construction of an object or system or for the
            implementation of an activity or process, or the result of that plan or specification in the
            form of a prototype, product or process. The verb to design expresses the process of
            developing a design. In some cases, the direct construction of an object without an explicit
            prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
            considered to be a design activity. The design usually has to satisfy certain goals and
            constraints, may take into account aesthetic, functional, economic, or socio-political
            considerations, and is expected to interact with a certain environment. Major examples of
            designs include architectural blueprints,engineering drawings, business processes, circuit
            diagrams, and sewing patterns.Major examples of designs include architectural
            blueprints,engineering drawings, business processes, circuit diagrams, and sewing patterns.
          </p>

          <div class="mt-3">
            <a-collapse :active-key="['1']" :bordered="false" accordion show-expand-icon>
              <a-collapse-item key="1" header="附加文件">
                <a-link title="link">
                  <a-avatar :size="30" auto-fix-font-size class="me-2 bg-danger"
                            shape="square">.pdf
                  </a-avatar>
                  Beijing Toutiao Technology Co., Ltd.
                </a-link>
              </a-collapse-item>
            </a-collapse>

          </div>
        </a-page-header>
      </div>
    </a-modal>
  </div>


</template>

<script>
import {ref} from "vue";
import MyPageHeader from "@/components/MyPageHeader";
import ListItem from "@/components/ListItem";

export default {
  name: "EventMessageView",
  components: {ListItem, MyPageHeader},
  data() {
    return {
      item: 110
    }
  },
  setup() {
    const customStyle = {
      borderRadius: '6px',
      marginBottom: '18px',
      border: 'none',
      overflow: 'hidden',
    }
    let modalViewBoolean = ref(false)
    const OpenNotificationDetails = function (idx) {
      modalViewBoolean.value = true
    }
    const changeModal = function () {
      modalViewBoolean.value = false
    }

    return {
      modalViewBoolean,
      OpenNotificationDetails,
      customStyle, changeModal,
    }
  },

  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>
.arco-tabs-nav-type-capsule .arco-tabs-nav-tab:not(.arco-tabs-nav-tab-scroll) {
 /*flex-direction: row-reverse !important;*/
  justify-content: flex-start !important;
}


</style>