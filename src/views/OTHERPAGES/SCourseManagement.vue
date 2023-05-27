<template>
  <section class="">
    <MyPageHeader text="Course Management">
      <template #icon>
        <icon-book/>
      </template>
      <!--      <template #subtitle>-->
      <!--        <a-typography-text>-->
      <!--          计算机科学与工程学院 - {{ major1 }}-->
      <!--        </a-typography-text>-->
      <!--      </template>-->
      <template #extra>
        <a-button class="px-3 " status="normal" type="primary">Add new Course</a-button>
      </template>
    </MyPageHeader>

    <div class="">
      <div class="main-content px-3">
        <a-tabs :header-padding="true" animation default-active-key="1" direction="horizontal" lazy-load
                position="top" type="capsule">
          <a-tab-pane key="1" title="2019 Class">
            <div class="p- pt-0" style="min-height: fit-content">
              <!--              <div class="w-100 d-flex justify-content-end mb-3">-->
              <!--                -->
              <!--              </div>-->
              <a-collapse :default-active-key="['1']" accordion class="">
                <a-collapse-item key="1" class="bg-white" header="Semester 1">
                  <template #extra>
                    <a-badge :color="'#145684'" text="1"/>
                  </template>
                  <a-list :bordered="false" class="" hoverable split>
                    <a-list-item>
                      <div class="w-100 d-flex justify-content-between">
              <span>
                <a-badge :color="'#145684'" class="me-3" text="1"/>
              <span> Algorithm and Advanced Research</span>
              </span>
                        <a-button-group class="text-end" size="mini" status="normal" type="text">
                          <a-button @click="drawerBoolean =true">Edit</a-button>
                          <a-button @click="ViewOperationBoolean =true">View</a-button>
                          <a-button>Delete</a-button>
                        </a-button-group>
                      </div>
                    </a-list-item>
                  </a-list>
                </a-collapse-item>
              </a-collapse>
              <a-collapse :default-active-key="['1']" accordion class="">
                <a-collapse-item key="1" class="bg-white" header="Semester 1">
                  <template #extra>
                    <a-badge :color="'#145684'" text="1"/>
                  </template>
                  <a-list :bordered="false" class="" hoverable split>
                    <a-list-item>
                      <div class="w-100 d-flex justify-content-between">
              <span>
                <a-badge :color="'#145684'" class="me-3" text="1"/>
              <span> Algorithm and Advanced Research</span>
              </span>
                        <a-button-group class="text-end" size="mini" status="normal" type="text">
                          <a-button @click="drawerBoolean =true">Edit</a-button>
                          <a-button @click="ViewOperationBoolean =true">View</a-button>
                          <a-button>Delete</a-button>
                        </a-button-group>
                      </div>
                    </a-list-item>
                  </a-list>
                </a-collapse-item>
              </a-collapse>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" title="2020 Class">
            <div class="p-2 pt-0" style="min-height: fit-content">

              <div class="w-100 d-flex justify-content-end mb-3">
                <a-button class="px-3 " status="normal" type="primary">Add new Course</a-button>
              </div>
              <a-collapse :default-active-key="['1']" accordion class="">
                <a-collapse-item key="1" class="bg-white" header="Semester 1">
                  <template #extra>
                    <a-badge :color="'#145684'" text="1"/>
                  </template>
                  <a-list :bordered="false" class="" hoverable split>
                    <a-list-item>
                      <div class="w-100 d-flex justify-content-between">
              <span>
                <a-badge :color="'#145684'" class="me-3" text="1"/>
              <span> Algorithm and Advanced Research</span>
              </span>
                        <a-button-group class="text-end" size="mini" status="normal" type="text">
                          <a-button @click="drawerBoolean =true">Edit</a-button>
                          <a-button @click="ViewOperationBoolean =true">View</a-button>
                          <a-button>Delete</a-button>
                        </a-button-group>
                      </div>
                    </a-list-item>
                  </a-list>
                </a-collapse-item>
              </a-collapse>
              <a-collapse :default-active-key="['1']" accordion class="">
                <a-collapse-item key="1" class="bg-white" header="Semester 1">
                  <template #extra>
                    <a-badge :color="'#145684'" text="1"/>
                  </template>
                  <a-list :bordered="false" class="" hoverable split>
                    <a-list-item>
                      <div class="w-100 d-flex justify-content-between">
              <span>
                <a-badge :color="'#145684'" class="me-3" text="1"/>
              <span> Algorithm and Advanced Research</span>
              </span>
                        <a-button-group class="text-end" size="mini" status="normal" type="text">
                          <a-button @click="drawerBoolean =true">Edit</a-button>
                          <a-button @click="ViewOperationBoolean =true">View</a-button>
                          <a-button>Delete</a-button>
                        </a-button-group>
                      </div>
                    </a-list-item>
                  </a-list>
                </a-collapse-item>
              </a-collapse>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>


    <a-modal ref="modalRef"
             :visible="modalViewBoolean === true" :width="700" align-center
             closable esc-to-close
             hide-cancel mask mask-closable simple title-align="center"
             unmount-on-close @ok="load_Data_By_Direction">
      <div>
        <a-page-header :show-back="false"
                       :style="{ background: 'var(--color-bg-2)' }"
                       title="数统学院2022-2023-1专业课（20、21级学生）补考安排">
          <div class="mt-3 mx-auto w-100 d-flex justify-content-center">
            <a-radio-group v-model="major1" :max="1">
              <a-radio v-for="radio in ['BACHELOR', 'MASTER']" :value="radio">
                <template #radio="{checked}">
                  <a-tag :checked="checked" :class="[checked===true? 'bg-danger text-white': '']" bordered
                         checkable
                         class="p-5 fs-6 rounded"
                         size="large"
                  >{{ radio }}
                  </a-tag>
                </template>
              </a-radio>

            </a-radio-group>
          </div>
        </a-page-header>
      </div>
    </a-modal>

    <a-modal ref="modalRef"
             :visible="ViewOperationBoolean === true" :width="1500" align-center
             closable esc-to-close
             hide-cancel mask mask-closable simple title-align="center"
             unmount-on-close @ok="ViewOperationBoolean =false">
      <div>
        <a-page-header :show-back="false"
                       :style="{ background: 'var(--color-bg-2)' }"
                       title="Details of the course">
        </a-page-header>
        <div class="mt-3 mx-auto w-100">
          <a-descriptions :bordered="true" :column="4" :data="data" :size="size" layout="inline-vertical"
                          title="Basic Details"/>
        </div>
      </div>
    </a-modal>


    <a-drawer :closable="true" :visible="drawerBoolean" esc-to-close mask-closable
              unmount-on-close
              width="50%" @cancel="drawerBoolean =false"
              @ok="drawerBoolean =false">
      <template #header>Header one</template>

      <div class="container">
        <a-form :model="form">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value1" label="Value 1" label-col-flex="80px">
                <a-input v-model="form.value1" placeholder="please enter..."/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value2" label="Value 2" label-col-flex="80px">
                <a-input v-model="form.value2" placeholder="please enter..."/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="Value 3" label-col-flex="80px">
                <a-input v-model="form.value3" placeholder="please enter..."/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value4" label="Value 4" label-col-flex="80px">
                <a-input v-model="form.value4" placeholder="please enter..."/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value5" label="Value 5" label-col-flex="80px">
                <a-input v-model="form.value5" placeholder="please enter..."/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        {{ form }}
      </div>
    </a-drawer>

  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";
import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";

export default {
  name: "SCourseManagement",
  components: {MyPageHeader},
  data() {
    return {
      modalViewBoolean: false,
      drawerBoolean: false,
      ViewOperationBoolean: false,
      major1: ref(),
      form: reactive({
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
      })
    }
  },
  methods: {
    load_Data_By_Direction() {
      if (this.major1 === undefined) {
        Message.error({
          content: "Please Choose on major direction before moving !!!!!"
        })
      } else {
        this.modalViewBoolean = false
      }

    }
  },
  setup() {
    const size = ref('medium');

    const data = [{
      label: 'Name',
      value: 'Socrates',
    }, {
      label: 'Mobile',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];

    return {
      data,
      size
    }
  },
}
</script>

<style scoped>

</style>