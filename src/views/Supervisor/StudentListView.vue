<template>
  <section>
    <a-tabs :header-padding="true" animation default-active-key="1" direction="horizontal" lazy-load position="top"
            size="large"
            type="capsule">

      <a-tab-pane key="1">
        <template #title>
          <span class="px-3"><icon-export/> 新生 </span>
        </template>
        <div class="p-2 pt-0" style="min-height: fit-content">
          <StudentListView :columns="columns" :operation="1" :studentlist-data="data"/>
        </div>
      </a-tab-pane>

      <a-tab-pane key="2">
        <template #title>
          <span class="px-3"><icon-export/> 在读  </span>
        </template>
        <div class="p-2 pt-0" style="min-height: fit-content">
          <StudentListView :columns="columns" :operation="2" :studentlist-data="data"/>
        </div>
      </a-tab-pane>

      <a-tab-pane key="3">
        <template #title>
          <span class="px-3"><icon-export/> 请假 </span>
        </template>
        <div class="p-2 pt-0" style="min-height: fit-content">
          <StudentListView :columns="columns" :operation="3" :studentlist-data="data"/>
        </div>
      </a-tab-pane>

      <a-tab-pane key="4">
        <template #title>
          <span class="px-3"><icon-export/> 毕业 </span>
        </template>
        <div class="p-2 pt-0" style="min-height: fit-content">
          <StudentListView :columns="columns" :operation="4" :studentlist-data="data"/>
        </div>
      </a-tab-pane>

      <a-tab-pane key="5">
        <template #title>
          <span class="px-3"><icon-export/> 开出 </span>
        </template>
        <div class="p-2 pt-0" style="min-height: fit-content">
          <StudentListView :columns="columns" :operation="5" :studentlist-data="data"/>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-table :bordered="true" :columns="columns" :data="studentlistData" :pagination="{}" hoverable show-header
             table-layout-fixed>
      <template #name="{ rowIndex,item }">

        <a-avatar :size="30" :style="{ backgroundColor: '#14a9f8',marginRight:'10px' }" shape="square">
          {{ studentlistData[rowIndex].name[0] }}
        </a-avatar>
        <a-typography-text>{{ studentlistData[rowIndex].name }}</a-typography-text>

      </template>
      <template #operation="{ rowIndex }">

        <!-- NEW STUDENT OPERATIONS -->
        <a-button-group v-if="operation === 1" size="small" type="text">
          <a-button status="normal" @click="drawerBoolean =true">查看</a-button>
          <a-button status="success" @click="modalViewBoolean =true">分配到班级</a-button>
        </a-button-group>

        <!-- CURRENT STUDENT OPERATIONS -->
        <a-button-group v-if="operation === 2" size="small" type="text">
          <a-button status="normal" @click="drawerBoolean =true">查看</a-button>
          <a-button status="warning" @click="modalViewBoolean =true">请假</a-button>
          <a-button status="danger" @click="modalViewBoolean =true">开出</a-button>
        </a-button-group>

        <!-- ASKED FOR LEAVE STUDENT OPERATIONS -->
        <a-button-group v-if="operation === 3" size="small" type="text">
          <a-button status="normal" @click="drawerBoolean =true">查看</a-button>
          <a-button status="success" @click="modalViewBoolean =true">复课</a-button>
        </a-button-group>

        <!-- GRADUATED STUDENT OPERATIONS -->
        <a-button-group v-if="operation === 4" size="small" type="text">
          <a-button status="normal" @click="drawerBoolean =true">查看</a-button>
        </a-button-group>

        <!-- EXPELLED STUDENT OPERATIONS -->
        <a-button-group v-if="operation === 5" size="small" type="text">
          <a-button status="normal" @click="drawerBoolean =true">查看</a-button>
        </a-button-group>
      </template>
    </a-table>


    <a-modal ref="modalRef" :closable="false"
             :visible="modalViewBoolean" :width="700" esc-to-close
             mask mask-closable
             title="数统学院2022-2023-1专业课（20、21级学生）补考安排" title-align="center" unmount-on-close
             @cancel="load_Data_By_Direction" @ok="load_Data_By_Direction">
      <div>
        Content has to be here
      </div>
    </a-modal>
    <a-drawer :closable="true" :visible="drawerBoolean" esc-to-close
              mask-closable unmount-on-close width="50%" @cancel="drawerBoolean =false" @ok="drawerBoolean =false">

      <template #header>Header one</template>

      <div class="container">
      </div>

    </a-drawer>
  </section>
</template>

<script>

import {reactive} from "vue";

export default {
  name: "StudentListView",
  props: ['studentlistData', 'columns', 'operation'],
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
    }
  }, methods: {
    load_Data_By_Direction() {
      this.modalViewBoolean = false
    }
  },
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        slotName: 'name'
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Operations',
        dataIndex: 'operation',
        width: 200,
        slotName: 'operation'
      },
    ];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);

    return {
      columns,
      data
    }
  },
}
</script>

<style scoped>

</style>