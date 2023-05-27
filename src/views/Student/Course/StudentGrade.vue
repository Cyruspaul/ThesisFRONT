<template>
  <section>
    <MyPageHeader text="Course Plan">
      <template #icon>
        <icon-bar-chart/>
      </template>
    </MyPageHeader>
    <a-space align="vertical" class="container" direction="vertical" fill size="large" wrap>
      <div class="w-100 d-flex justify-content-center">
        <a-form ref="formRef" v-model:model="searchForm" :wrapper-col-props="{md:16,lg:16}"
                auto-label-width class="mx-auto d-flex justify-content-end justify-content-lg-center" label-align="top" layout="inline">
          <a-form-item field="year" label="Year" tooltip="Enter a Year">
            <a-select default-active-first-option placeholder="Year">
              <a-option label="All" value="all"/>
              <a-option label="2018-2019" value="year1"/>
              <a-option label="2019-2020" value="year2"/>
              <a-option label="2020-2021" value="year3"/>
            </a-select>
          </a-form-item>
          <a-form-item field="semester" label="Semester" tooltip="Choose a semester">
            <a-select default-active-first-option placeholder="Semester">
              <a-option label="All" value="0"/>
              <a-option label="Semester 1" value="1"/>
              <a-option label="Semester 2" value="2"/>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" size="medium" status="default" type="secondary">Search</a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table :bordered="true" :columns="colummsItem" :data="data" :sticky-header="true" column-resizable show-header
               size="default" table-layout-fixed>
        <template #empty>
          <small class="text-muted">Search...</small>
        </template>
        <template #footer>
          <a-button v-if="data.length !== 0" type="text">打印成绩单</a-button>
        </template>
      </a-table>
    </a-space>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "StudentGrade",
  components: {MyPageHeader},
  data() {
    return {
      searchForm: {},
      data: [],
      colummsItem: [
        {
          title: '课程编号',
          dataIndex: 'cid',
        },
        {
          title: '课程名称',
          dataIndex: 'ctype',
        },
        {
          title: '课程性质',
          dataIndex: 'cname',
        },
        {
          title: '学分',
          dataIndex: 'ccode',
        },
        {
          title: '平时成绩',
          dataIndex: 'pscj',
        },
        {
          title: '考勤成绩',
          dataIndex: 'kqcj',
        },
        {
          title: '考试成绩',
          dataIndex: 'kscj',
        },
        {
          title: '总成绩',
          dataIndex: 'chengji',
        },
        {
          title: '补考',
          dataIndex: 'bukao',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>