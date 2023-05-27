<template>
  <section class="container-fluid">
    <MyPageHeader icon="icon-calendar" text="通告烂">
      <template #icon>
        <icon-live-broadcast class="me-3"/>
      </template>
    </MyPageHeader>
    <div class="px-5">

      <a-space class="d-flex justify-content-center" direction="vertical" size="large">
        <a-row justify="center">
          <a-col :span="14">
            <a-input/>
          </a-col>
        </a-row>
        <a-space class="d-flex justify-content-center" direction="horizontal" size="large" wrap>

          <a-select :allow-clear="true" :allow-search="true" :style="{width:'314px'}"
                    default-active-first-option
                    placeholder="发布人">
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


      <ListItem :ComponentType="'notification'" :listData="data"/>
    </div>
  </section>
</template>

<script>
import {h, reactive, ref} from "vue";
import {Modal} from "@arco-design/web-vue";
import ListItem from "@/components/ListItem";
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "NotificationView",
  components: {MyPageHeader, ListItem},

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
    OpenNotificationDetails(idx) {
      console.log(idx)
      Modal.info({
        title: "Notification Details", simple: true,
        content: () => h('div', {class: 'info-modal-content'}, [
          h('span', {style: 'margin-bottom: 10px;'}, 'This is an info message'),
        ])
      })
    }
  }
}
</script>

<style scoped>

</style>