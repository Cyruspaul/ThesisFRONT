<template>
  <section class="container pb-3">
    <a-space direction="vertical" fill size="medium">

      <a-typography-title :heading="5" bold>
        <a-button size="mini" type="text" @click="back">
          <IconCaretLeft/>
        </a-button>
        统学院2022-2023-1专业课（20、21级学生）补考安排 {{ event }}
      </a-typography-title>
      <div class="image-area">
        <a-image alt="arco-design" class="" fit="cover" height="100" show-loader src="https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/5cc3cd1d994b7ef9db6a1f619a22addd.jpg~tplv-49unhts6dw-image.image"
                 width="100%"/>
      </div>
      <a-descriptions :column="{xs:1, md:2, lg:4}" size="large">
        <a-descriptions-item label="发布时间">
          <a-tag>2023-03-17 10:15:48</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="浏览人数">
          <a-tag>381381</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="发布时间">
          <a-tag>2023-03-17 10:15:48</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="浏览人数">
          <a-tag>381381</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <MyEditor :data="eventdetails.edetails" :editor-mode="false"/>
    </a-space>
  </section>
</template>

<script>
import router from "@/router";
import MyPageHeader from "@/components/MyPageHeader";
import MyEditor from "@/components/MyEditor";

import {ref} from "vue";

export default {
  name: "EventDetail",
  components: {MyEditor, MyPageHeader},
  data() {
    return {
      eventdetails: ref({}),
      event: router.currentRoute.value.params.event
    }
  },
  methods: {
    back() {
      router.back();
    }
  },
  mounted() {
    // event_list_api_call(null)
    //     .then(response => {
    //       const item = response.data
    //       console.log(item[0])
    //       this.eventdetails = item[0]
    //     })
  }
}
</script>

<style scoped>

</style>