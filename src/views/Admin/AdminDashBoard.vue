<template>
  <section class="container-fluid">
    <div class="my-3">
      <h5 class="text-start fw-bold ms-1">Dashboard</h5>
      <!--      <a-alert class="text-start p-3 text-muted" show-icon closable close-text="Close" message="Welcome Dear Admin to the Dashboard" type="warning">-->
      <!--        <template #icon>-->
      <!--          <i class="bi bi-hand-thumbs-up" />-->
      <!--        </template>-->
      <!--      </a-alert>-->

    </div>

    <AdminStatistic class="mb-3"/>


    <a-row :gutter="20" class=" text-start">

      <a-col :lg="12" :sm="12" :xs="24">
        <a-card style="min-height: 300px; height: 100%" title="Non read Notifications">
          <template #extra>
            <router-link class="text-decoration-none" to="/admin/notifications" type="link">Check notifications <i
                class="ms-3 bi bi-arrow-right"/></router-link>
          </template>
          <a-list :data-source="data" gutter="1">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta class="text-start"
                                  description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                  <template #title>
                    {{ item.title }}
                  </template>
                  <template #avatar>
                    <a-avatar shape="square" src="/images/man-1.png"/>
                  </template>
                </a-list-item-meta>
                <template #actions>
                  <a-button key="list-loadmore-more" @click="Openmodal(item)">Open</a-button>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>


      <a-col :lg="12" :sm="12" :xs="24">
        <a-card style="min-height: 300px; height: 100%" title="Upcoming Events">
          <template #extra>
            <a-button href="/admin" type="dashed"><i class="bi bi-plus"/> Post New Event</a-button>
          </template>
          <a-list
              :data-source="data"
              :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card :title="item.title">Card content</a-card>
              </a-list-item>
            </template>
          </a-list>

        </a-card>
      </a-col>


      <a-col :lg="24" :sm="24" :xs="24" class="mt-3">
        <a-card style="min-height: fit-content; height: 100%" title="Announcements">
          <template #extra>
            <a-button href="/admin" type="dashed"><i class="bi bi-plus"/> Publish new</a-button>
          </template>
          <a-list
              :data-source="data"
              :grid="{ gutter: 5, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2, xxxl: 2}"
          >
            <template #renderItem="{ item }">
              <a-list-item class="w-100">
                <a-tag class="p-2  w-100 ">{{ item.title }}</a-tag>
              </a-list-item>
            </template>
          </a-list>

        </a-card>
      </a-col>

    </a-row>


  </section>
</template>

<script>
import AdminStatistic from '/src/components/AdminStatistic.vue';
import {h, ref} from "vue";
import {Modal} from '@arco-design/web-vue';

export default {
  name: "AdminDashBoard",
  components: {AdminStatistic},
  setup() {
    let data = ref([])

    data.value.push({title: "One piece"})
    data.value.push({title: "Puss in boot"})
    data.value.push({title: "Puss in boot"})
    const Openmodal = function (item) {
      Modal.info({
        title: 'This is a notification message',
        content: h('div', {}, [
          h('small', 'From Student  / Teacher XXXXXXXXX'),

          h('p', item.title),
        ]),
        onOk() {
          console.log('ok');
        },
        width: 600,
        centered: true
      });

      console.log(item)
    }

    return {data, Openmodal}
  }
}
</script>

<style scoped>

</style>