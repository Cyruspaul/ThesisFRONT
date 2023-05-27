<template>
  <div>

    <a-page-header :ghost="false" sub-title=".." title="Notifications">

      <template #extra>
        <a-button key="1" type="primary"><i class="bi bi-recycle me-3"/> Refresh</a-button>
      </template>
      <a-row class="content align-items-end">
        <span class="text-secondary h5">上午好，天野远子，休息一会儿吧</span>
        <div class="flex-grow-1"></div>
        <a-row type="flex">
          <a-statistic :value="10" :value-style="{ color: '#3f8600' }" title="New notifications">
            <template #prefix><i class=" bi bi-arrow-down-up"/></template>
          </a-statistic>
          <!--            <a-statistic title="Total notifications" value="50"  :value-style="{width:'100px', color: '#111d87' }">-->
          <!--             <template #prefix><i class=" bi bi-list-task" /></template>-->
          <!--            </a-statistic>-->
          <!--            <a-statistic title="Deleted" value="0"  :value-style="{width:'100px', color: '#c60707' }">-->
          <!--             <template #prefix><i class=" bi bi-trash" /></template>-->
          <!--            </a-statistic>-->
        </a-row>
      </a-row>
    </a-page-header>

    <a-card class=" mt-3">
      <div class="d-flex align-items-center justify-content-between">
        <a-form :model="formState" layout="inline">
          <a-form-item label="Filter">
            <a-radio-group v-model:value="formState.layout" button-style="solid">
              <a-radio class="me-1" value="all">All Notifications</a-radio>
              <a-radio value="part">Not read Yet</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>

        <a-form :model="formState" layout="inline">
          <a-form-item>
            <a-input v-model:value="formState.fieldB" placeholder="input placeholder"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary">Search</a-button>
          </a-form-item>
        </a-form>
      </div>


      <a-divider/>

      <div>
        <a-list :data-source="data" :pagination="pagination" item-layout="horizontal">
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
      </div>
    </a-card>

  </div>
</template>

<script>
import {h, ref} from "vue";
import {Modal} from '@arco-design/web-vue';

export default {
  name: "AdminNotificationView",
  data() {
    return {}
  },
  setup() {
    const formState = ref({
      layout: 'part',
      fieldA: '',
      fieldB: '',
    });
    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    };
    const data = [{
      title: 'Ant Design Title 1',
    }, {
      title: 'Ant Design Title 2',
    }, {
      title: 'Ant Design Title 3',
    }, {
      title: 'Ant Design Title 4',
    }];

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
    return {formState, data, pagination, Openmodal}
  },

  updated() {
    // Message.info({
    //   closable:true,
    //   content:"Welcome ADMIN NOTIFICATION "
    // })
    console.log("_-------------------------ADMIN NOTIFICATION UPDATED----------------")
  }
}
</script>

<style scoped>

.ant-list-item {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
</style>