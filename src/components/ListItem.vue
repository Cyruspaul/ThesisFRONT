<template>
  <a-list :bordered="false" :bottom-offset="15" :hoverable="false"
          :pagination="{'hide-on-single-page':true, defaultPageSize: 15,total:listData.length,}" :size="size!==null?size:'default'"
          class="container">
    <a-list-item v-for="(idx,index) in listData" :key="index" :max-height="maxheight" action-layout="horizontal">
      <a-list-item-meta>
        <template #description>
          <a-typography-text :ellipsis="false" class="p-0 m-0">{{idx.atitle}}</a-typography-text>
        </template>
        <template #avatar>
          <a-space size="mini">
            <!--            <a-tag size="medium" >{{idx}}</a-tag>-->
            <a-tag color="red" class="text-uppercase" size="mini">{{idx.ahost}}</a-tag>
          </a-space>
        </template>
      </a-list-item-meta>
      <template #actions>
        <a-button size="mini" type="secondary" @click="OpenNotificationDetails(idx)">
          <template #icon>
            <icon-eye/>
          </template>
          打开
        </a-button>
      </template>
    </a-list-item>
  </a-list>

  <!--  <a-modal v-if="ComponentType === 'event'" title="Event Details" :visible="modalViewBoolean === true" fullscreen-->
  <!--           align-center esc-to-close mask simple @ok="changeModal" hide-cancel-->
  <!--           title-align="center"  ok-text="Close" >-->
  <!--    <div>-->
  <!--      <a-page-header :show-back="false"-->
  <!--                     :style="{ background: 'var(&#45;&#45;color-bg-2)' }"-->
  <!--                     title="数统学院2022-2023-1专业课（20、21级学生）补考安排">-->
  <!--        <template #subtitle>-->
  <!--          <a-space>-->
  <!--            <span>发布人</span>-->
  <!--            <a-tag color="red" size="large">学院教学管理</a-tag>-->
  <!--          </a-space>-->
  <!--        </template>-->
  <!--        <template #extra>-->
  <!--          <a-space class="mt-2">-->
  <!--            <a-descriptions size="large" :column="{xs:1, md:3, lg:4}">-->

  <!--              <a-descriptions-item label="发布时间">-->
  <!--                <a-tag>2023-03-17 10:15:48 </a-tag>-->
  <!--              </a-descriptions-item>-->
  <!--              <a-descriptions-item label="浏览人数">-->
  <!--                <a-tag>381381</a-tag>-->
  <!--              </a-descriptions-item>-->
  <!--            </a-descriptions>-->
  <!--          </a-space>-->
  <!--        </template>-->
  <!--        <p>-->
  <!--          For other uses, see Design-->
  <!--        </p>-->
  <!--        <p>-->
  <!--          A design is a plan or specification for the construction of an object or system or for the-->
  <!--          implementation of an activity or process, or the result of that plan or specification in the-->
  <!--          form of a prototype, product or process. The verb to design expresses the process of-->
  <!--          developing a design. In some cases, the direct construction of an object without an explicit-->
  <!--          prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be-->
  <!--          considered to be a design activity. The design usually has to satisfy certain goals and-->
  <!--          constraints, may take into account aesthetic, functional, economic, or socio-political-->
  <!--          considerations, and is expected to interact with a certain environment. Major examples of-->
  <!--          designs include architectural blueprints,engineering drawings, business processes, circuit-->
  <!--          diagrams, and sewing patterns.Major examples of designs include architectural-->
  <!--          blueprints,engineering drawings, business processes, circuit diagrams, and sewing patterns.-->
  <!--        </p>-->

  <!--        <div class="mt-3">-->
  <!--          <a-collapse :active-key="['1']" :bordered="false"  show-expand-icon accordion>-->
  <!--            <a-collapse-item header="附加文件" key="1">-->
  <!--              <a-link title="link"><a-avatar   shape="square" :size="30" auto-fix-font-size-->
  <!--                                               class="me-2 bg-danger">.pdf-->
  <!--              </a-avatar>Beijing Toutiao Technology Co., Ltd.</a-link>-->
  <!--            </a-collapse-item>-->
  <!--          </a-collapse>-->

  <!--        </div>-->
  <!--      </a-page-header>-->
  <!--    </div>-->
  <!--  </a-modal>-->
  <!--  <a-modal  v-if="ComponentType === 'notification'" title="Notification Details" :visible="modalViewBoolean === true"-->
  <!--           @ok="changeModal"   unmount-on-close :width="1000"-->
  <!--           hide-cancel closable-->
  <!--           align-center esc-to-close mask simple mask-closable-->
  <!--           title-align="center"  ok-text="Close" ref="modalRef" >-->
  <!--    <div>-->
  <!--      <a-page-header :show-back="false"-->
  <!--                     :style="{ background: 'var(&#45;&#45;color-bg-2)' }"-->
  <!--                     title="数统学院2022-2023-1专业课（20、21级学生）补考安排"-->
  <!--      >-->
  <!--        <template #subtitle>-->
  <!--          <a-space>-->
  <!--            <span>发布人</span>-->
  <!--            <a-tag color="red" size="large">学院教学管理</a-tag>-->
  <!--          </a-space>-->
  <!--        </template>-->
  <!--        <template #extra>-->
  <!--          <a-space class="mt-2">-->
  <!--            <a-descriptions size="large" :column="{xs:1, md:3, lg:4}">-->

  <!--              <a-descriptions-item label="发布时间">-->
  <!--                <a-tag>2023-03-17 10:15:48 </a-tag>-->
  <!--              </a-descriptions-item>-->
  <!--              <a-descriptions-item label="浏览人数">-->
  <!--                <a-tag>381381</a-tag>-->
  <!--              </a-descriptions-item>-->
  <!--            </a-descriptions>-->
  <!--          </a-space>-->
  <!--        </template>-->
  <!--        <p>-->
  <!--          For other uses, see Design-->
  <!--        </p>-->
  <!--        <p>-->
  <!--          A design is a plan or specification for the construction of an object or system or for the-->
  <!--          implementation of an activity or process, or the result of that plan or specification in the-->
  <!--          form of a prototype, product or process. The verb to design expresses the process of-->
  <!--          developing a design. In some cases, the direct construction of an object without an explicit-->
  <!--          prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be-->
  <!--          considered to be a design activity. The design usually has to satisfy certain goals and-->
  <!--          constraints, may take into account aesthetic, functional, economic, or socio-political-->
  <!--          considerations, and is expected to interact with a certain environment. Major examples of-->
  <!--          designs include architectural blueprints,engineering drawings, business processes, circuit-->
  <!--          diagrams, and sewing patterns.Major examples of designs include architectural-->
  <!--          blueprints,engineering drawings, business processes, circuit diagrams, and sewing patterns.-->
  <!--        </p>-->

  <!--        <div class="mt-3">-->
  <!--          <a-collapse :active-key="['1']" :bordered="false"  show-expand-icon accordion>-->
  <!--            <a-collapse-item header="附加文件" key="1">-->
  <!--              <a-link title="link"><a-avatar   shape="square" :size="30" auto-fix-font-size-->
  <!--                                               class="me-2 bg-danger">.pdf-->
  <!--              </a-avatar>Beijing Toutiao Technology Co., Ltd.</a-link>-->
  <!--            </a-collapse-item>-->
  <!--          </a-collapse>-->

  <!--        </div>-->
  <!--      </a-page-header>-->
  <!--    </div>-->
  <!--  </a-modal>-->
</template>

<script>
import {IconDelete, IconEdit} from '@arco-design/web-vue/es/icon'
import {ref} from "vue";
import router from "@/router";

export default {
  name: "ListItem",
  components: {
    IconEdit, IconDelete
  },
  props: ['ComponentType', 'listData', 'maxheight', 'size'],
  created() {
    // Message.info("LIST ITEM CREATED")
  },
  setup() {
    let modalViewBoolean = ref(false)
    const OpenNotificationDetails = function (idx) {
      // router.push({name: 'pubDetails', params: {idx: idx}})
      router.push({name:'supervisor_announcements_operation',params:{op:idx.anid}})
      // modalViewBoolean.value = true
    }
    const changeModal = function () {
      modalViewBoolean.value = false
    }

    return {
      modalViewBoolean,
      OpenNotificationDetails,
      changeModal,
    }
  }
}
</script>

<style scoped>

</style>