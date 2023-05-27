<template>
  <section class="p-4">

    <a-row :gutter="10" :wrap="true" justify="space-between">
      <!--        WELCOME BAR-->
      <a-col :md="12" :span="24" class="w-100 h-100">
        <!--          https://wallpapercave.com/wp/wp9505264.jpg-->
        <!--          https://hdqwalls.com/download/rock-mountains-landscape-colorful-illustration-minimalist-rz-1920x1080.jpg-->

        <!--          TIMETABLE-->
        <div class="w-100 h-100 bg-light">
          <!--            <a-image :show-loader="true" footer-class="image-footer"-->
          <!--                src="https://wallpapercave.com/wp/wp9505264.jpg"-->
          <!--                title='Welcome Dear teacher'-->
          <!--                :description="posts"-->
          <!--                width="100%"  height="150"-->
          <!--                fit="cover"   style="filter: blur(0.4px)"-->
          <!--                :preview-visible="false"-->
          <!--            >-->
          <!--              <template #extra>-->
          <!--                <p class="display-5">23%</p>-->
          <!--              </template>-->
          <!--              <template #loader>-->
          <!--                <ASpin  dot />-->
          <!--              </template>-->
          <!--              <template #error>-->
          <!--                123-->
          <!--              </template>-->
          <!--            </a-image>-->
          <a-card :bordered="false" :style="{ width: '100%', height:'100%' }" class=" h-100 w-100">
            <template #title>
              <span class="fw-bold">Today TimeTable</span>
            </template>
            <template #extra>
              <a-tag class="text-muted" default-checked>23 Jan. 23</a-tag>
            </template>
            <a-card-grid
                v-for="(value, index) in timetableData" :key="index"
                :hoverable="true" :style="{ minWidth: 'fit-content' }" class="col-4">
              <a-card :bordered="false" class="card-demo h-100 w-100"
                      hoverable>
                <div>
                  <a-descriptions :column="2" :data="value" align="left"/>
                </div>
              </a-card>
            </a-card-grid>
          </a-card>
        </div>

      </a-col>

      <!--          TASKS COLUMN-->
      <a-col :md="12" :span="24" class="w-100 h-100">
        <a-card :bordered="false" class="w-100 h-100">
          <template #title>
            <span class="fw-bold">Tasks</span>
          </template>
          <a-list :max-height="1000" bordered>
            <a-list-item v-for="idx in timetableData">
              <a-list-item-meta>
                <template #avatar>
                  <a-checkbox @change="changeTaskState(idx)"> Go to school {{ idx[0].label }}</a-checkbox>
                </template>
              </a-list-item-meta>
              <template #extra>
                <a-tag :color="'#352489'" size="mini">Pending</a-tag>
              </template>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <!--        EVENTS-->
    <a-row :gutter="20" :wrap="true" align="start" class="h-auto mt-3 flex-grow-1" justify="space-between">
      <a-col :md="12" :span="24">
        <a-card :bordered="false" class="w-100">
          <template #title>
            <span class="fw-bold">This Week Events</span>
          </template>
          <ListItem :ComponentType="'event'" :listData="2" :maxheight="400"/>
        </a-card>
      </a-col>
      <a-col :md="12" :span="24">
        <a-card :bordered="false" class="w-100">
          <template #title>
            <span class="fw-bold">Recent Announcements</span>
          </template>
          <ListItem :ComponentType="'notification'" :listData="6" :maxheight="300"/>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import {ref} from "vue";
import ListItem from "@/components/ListItem";

export default {
  name: "TeacherDashboard",
  components: {ListItem},
  data() {
    return {
      posts: ref(""),
      timetableData: [
        [{
          label: '课程',
          value: '数据结构',
        }, {
          label: '地点',
          value: 'Beijing'
        }, {
          label: '时间',
          value: '8h45 - 10h30 ',
          span: 2
        },
        ],
        [{
          label: '课程',
          value: '数据结构'
        }, {
          label: '地点',
          value: 'Beijing'
        }, {
          label: '时间',
          value: '8h45 - 10h30 ',
          span: 2
        },
        ], [{
          label: '课程',
          value: '数据结构',
        }, {
          label: '地点',
          value: 'Beijing'
        }, {
          label: '时间',
          value: '8h45 - 10h30 ',
          span: 2
        },
        ]
      ]
    }
  },
  async mounted() {
    // this.posts = await fetch('https://api.adviceslip.com/advice/23')
    //     .then(response => response.json())
    //     .then(json => unescape(json.slip.advice))
  },
  methods: {
    changeTaskState(item) {
      console.log(item)

    }
  }
}
</script>

<style>
.arco-image-footer-caption > .arco-image-footer-caption-title {
  font-size: large;
  font-weight: bold !important;
}

.arco-image-footer-caption > .arco-image-footer-caption-description {
  font-size: larger;
  font-weight: normal !important;
}

.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>