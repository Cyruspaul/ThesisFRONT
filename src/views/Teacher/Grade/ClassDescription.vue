<template>
  <section class="container-fluid">
    <MyPageHeader :backbutton="true" icon="icon-calendar" text="Class Details">
      <!--      <template #extra>-->
      <!--        <a-button size="medium" status="default" type="primary">-->
      <!--          <icon-edit class="me-3"/>-->
      <!--          Edit Files-->
      <!--        </a-button>-->
      <!--      </template>-->
    </MyPageHeader>
    <div class="px-3">
      <a-table :columns="columns" :data="data">
        <template #optional="{ record }">
          <a-button @click="$modal.info({ title:'Name', content:record.name })">view</a-button>
        </template>
      </a-table>
      <a-table :data="data" style="margin-top: 30px">
        <template #columns>
          <a-table-column title="Name">
            <a-table-column data-index="first" title="First Name"></a-table-column>
            <a-table-column data-index="last" title="Last Name"></a-table-column>
          </a-table-column>
          <a-table-column data-index="salary" title="Salary"></a-table-column>
          <a-table-column data-index="address" title="Address"></a-table-column>
          <a-table-column data-index="email" title="Email"></a-table-column>
          <a-table-column title="Optional">
            <template #cell="{ record }">
              <a-button @click="$modal.info({ title:'Name', content:record.name })">view</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>

    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";

export default {
  name: "CourseDescription",
  components: {MyPageHeader},
  setup() {
    const show = ref(true)

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Salary',
      dataIndex: 'salary',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Optional',
      slotName: 'optional'
    }];
    const data = [{
      key: '1',
      name: 'Jane Doe',
      first: 'Jane',
      last: 'Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      first: 'Alisa',
      last: 'Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      first: 'Kevin',
      last: 'Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      first: 'Ed',
      last: 'Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      first: 'William',
      last: 'Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }];

    return {
      columns,
      data,
      show
    }
  },
}
</script>

<style scoped>

</style>