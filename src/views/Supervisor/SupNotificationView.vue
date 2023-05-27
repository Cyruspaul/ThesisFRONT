<template>
  <section class="container-fluid">
    <MyPageHeader icon="icon-calendar" text="通告烂">
      <template #icon>
        <icon-live-broadcast class="me-3"/>
      </template>
      <template #extra>
        <a-button @click="$router.push({name:'supervisor_announcements_operation',params:{op:'create'}})" status="normal" type="primary">
          <icon-plus class="me-1"/>
          发布新通告
        </a-button>
      </template>
    </MyPageHeader>
    <div class="px-lg-5" >

      <a-space fill class="d-flex justify-content-center" direction="vertical" size="large">
        <a-row justify="center">
          <a-col :xs="20" :lg="10" :span="16">
            <a-input placeholder="通告题目" v-model="searchForm.text"/>
          </a-col>
        </a-row>
        <a-space class="d-flex justify-content-center" direction="horizontal" size="large" wrap>
          <a-date-picker placeholder="通告发布时间范围"  v-model="searchForm.time" :style="{width:'314px'}">
          </a-date-picker>
          <a-button shape="square" status="default" @click="submitSearch" type="primary" value="mini">Search</a-button>
        </a-space>

      </a-space>
      <h6 class="fw-bolder">最近</h6>
      <a-divider direction="horizontal" :margin="0" type="dashed" />
      <a-list :bordered="false" :bottom-offset="15" :hoverable="false"
              :pagination="{'hide-on-single-page':true, defaultPageSize: 15,total:this.publications.length,}"
              class="container-fluid">
        <a-list-item v-for="(idx,index) in publications" :key="index"  action-layout="horizontal">
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
            <a-button size="mini" type="secondary" @click="OpenNotificationDetails(idx,0)">
              <template #icon>
                <icon-eye/>
              </template>
              打开
            </a-button>
            <a-button size="mini" type="secondary" status="warning" @click="OpenNotificationDetails(idx,1)">
              <template #icon>
                <icon-edit/>
              </template>
              编辑
            </a-button>
            <a-button size="mini" type="secondary" status="danger" @click="OpenNotificationDetails(idx,2)">
              <template #icon>
                <icon-delete/>
              </template>
              删除
            </a-button>
          </template>
        </a-list-item>
      </a-list>

    </div>
  </section>
</template>

<script>
import {h, reactive, ref} from "vue";
import {Modal} from "@arco-design/web-vue";
import ListItem from "@/components/ListItem";
import MyPageHeader from "@/components/MyPageHeader";
import {PUBLICATIONS} from "@/api/admin_API";
import router from "@/router";
import {showMessage} from "@/utils/DefinedMessageNotification";

export default {
  name: "SupNotificationView",
  components: {MyPageHeader, ListItem},
  data(){
    return{
      publications: [],
    searchForm:{

    }
    }
  },
  mounted() {
    PUBLICATIONS.recent().then(value => {
      // console.log(value)
      if (value.data !== undefined)
        this.publications = value.data
    })
  },
  setup() {
    const data = 5
    const modalRef = reactive({})
    let modalViewBoolean = ref(false)
    const OpenNotificationDetails = function (idx) {
      modalViewBoolean.value = true
    }
    const changeModal = function () {
      modalViewBoolean.value = false
    }
    console.log(modalRef)
    return {
      modalRef, data,
      modalViewBoolean,
      OpenNotificationDetails, changeModal
    }
  },
  methods: {
    submitSearch(){
      console.log(this.searchForm)
      PUBLICATIONS.search(this.searchForm).then(res=>{
        if (res.data !== undefined)
          this.publications = res.data
        else
          this.publications = []
      })
    },
    OpenNotificationDetails(idx,op) {
      switch (op) {
        case 0:{
          router.push({name:'supervisor_announcements_edit',params:{op:'view',id:idx.anid}})
          break
        }
        case 1:{
          router.push({name:'supervisor_announcements_edit',params:{op:'edit',id:idx.anid}})
          break
        }
        case 2:{
          PUBLICATIONS.deleteOne(idx).then(res=>{
            showMessage(res)
            if (res.code === 2000){
              PUBLICATIONS.recent().then(value => {
                console.log(value)
                if (value.data !== undefined)
                  this.publications = value.data
              })
            }
          })
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>