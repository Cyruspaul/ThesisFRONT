<template>
  <section class="">
    <a-space direction="vertical" fill size="large" wrap>
      <MyPageHeader icon="icon-calendar" text="通告烂">
        <template #icon>
          <icon-live-broadcast class="me-3"/>
        </template>
      </MyPageHeader>
      <div class="container">
        <a-input-search button-text="Search" class="mb-4 px-4" placeholder="Search..." search-button>
          <template #button-icon>
            <icon-search/>
          </template>
        </a-input-search>
        <!--          <a-row   :gutter="20" wrap justify="center">-->
        <!--            <a-col :lg="8" :span="12"  >-->
        <!--              <a-select default-active-first-option :allow-clear="true" :allow-search="true"-->
        <!--                        placeholder="发布人">-->
        <!--                <a-option>All</a-option>-->
        <!--                <a-option>International School</a-option>-->
        <!--                <a-option>My Department</a-option>-->
        <!--                <a-option>Outside</a-option>-->
        <!--              </a-select>-->
        <!--            </a-col>-->
        <!--            -->
        <!--            <a-col :lg="8" :span="24" >-->
        <!--              <a-date-picker  v-model:picker-value="birthtime" v-model:model-value="birthtime"  default-picker-value="2023-04-24"  style="width: 100%;"   placeholder="Date" >-->
        <!--              </a-date-picker>-->
        <!--            </a-col>-->

        <!--            <a-col  :lg="8"  :span="12" >-->
        <!--              <a-input-search  placeholder="Please enter something" search-button>-->
        <!--                <template #button-icon>-->
        <!--                  <icon-search/>-->
        <!--                </template>-->
        <!--              </a-input-search>-->
        <!--            </a-col>-->
        <!--          </a-row>-->
        <p class="small fw-bolder">Latest news</p>
        <ListItem :ComponentType="'notification'" :listData="12"/>
      </div>
    </a-space>
  </section>
</template>

<script>


import ListItem from "@/components/ListItem";
import MyPageHeader from "@/components/MyPageHeader";
import {ref} from "vue";

export default {
  name: "AnnouncementPage",
  components: {
    MyPageHeader,
    ListItem
  },
  data() {
    return {
      recent_anouncements: ref({}),
      birthtime: ref()
    }
  },
  methods: {},

  mounted() {
    // recentAnnouncemnts(null)
    //     .then(response => {
    //       if (response.data === undefined) {
    //
    //       } else {
    //         this.recent_anouncements.value = response.data.length
    //       }
    //     })
  }

}
</script>

<style scoped>

</style>