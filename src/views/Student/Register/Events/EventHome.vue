<template>
  <section class="h-100 w-100">
    <MyPageHeader text="活动"/>
    <a-space class=" container" direction="vertical" fill size="large" wrap>
      <a-carousel
          :style="{
      width: '100%',
      height: '300px',
    }"
          indicator-class="d-none"
          indicator-position="bottom"
          indicator-type="line"
          show-arrow="always"
      >
        <a-carousel-item v-for="image in images">
          <a-image
              :src="image"
              description="description"
              fit="cover"
              footerPosition="inner"
              height="100%"
              title="title"
              width="100%"
          >
            <template #extra>
              time
            </template>
          </a-image>
          <!--          <img -->
          <!--              :src="image"-->
          <!--              :style="{-->
          <!--          width: '100%',-->
          <!--        }"-->
          <!--           :alt="image"/>-->
        </a-carousel-item>
      </a-carousel>
      <a-input-search :style="{width:'100%'}" class="my-3" placeholder="Search..." search-button>
        <template #button-icon>
          <icon-search/>
        </template>
        <template #button-default>
          Search
        </template>
      </a-input-search>

      <a-list :bordered="false" :bottom-offset="15" :hoverable="true" :pagination-props="{'hide-on-single-page':true, defaultPageSize: 5,total:10,}"
              size="small">
        <a-list-item v-for="idx in 10" :key="idx"
                     :max-height="400" action-layout="vertical" style="cursor: pointer" @click="eventDetails(idx)">

          <template #actions>

            <a-space direction="horizontal" fill size="small" wrap>
              <small>2023-12-23</small>
              <small>LA3-212</small>
              <small>300 Views</small>
            </a-space>
          </template>
          <template #extra>
            <div class="image-area">
              <a-image alt="arco-design" class="" fit="cover" height="80" show-loader
                       src="https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/5cc3cd1d994b7ef9db6a1f619a22addd.jpg~tplv-49unhts6dw-image.image" style="height: 65px; width:auto "
                       width="90"/>
            </div>
          </template>

          <a-list-item-meta>
            <!--            <template #avatar>-->
            <!--              <a-tag size="mini" >{{idx}}</a-tag>-->
            <!--            </template>-->
            <template #title>
              <a-tag size="mini">{{ idx }}</a-tag>
              统学院2022-2023-1专业课（20、21级学生）补考安排
            </template>
            <template #description>
              <small>Hosted by:
                <a-tag color="blue" size="mini">@WuLiangYe</a-tag>
              </small>

            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-space>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import router from "@/router";
// import {recent_event_list_api_call} from "@/api/events_api";
import {ref} from "vue";

export default {
  name: "EventHome",
  components: {MyPageHeader},
  data() {
    return {
      recent_event: ref([]),
      carousel_event: ref([]),
      images: [
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
      ],
      indicatorType: 'dot',
      indicatorPosition: 'bottom',
    };
  },
  methods: {
    eventDetails(idx) {
      router.push({name: 'eventDetails', params: {event: idx}})
    },
    updateType(type) {
      this.indicatorType = type;
    },
    updatePosition(position) {
      this.indicatorPosition = position;
    },
  },
  mounted() {
    //POUR CAROUSEL IL FAUT FAIRE UNE RECHERCHE
    // recent_event_list_api_call(null)
    //     .then(response => {
    //       if (response.data.length === 0) {
    //
    //       } else {
    //         this.recent_event.value = response.data.length
    //       }
    //     })
  }
}
</script>

<style scoped>

</style>