<template>
  <a-layout class="layout-demo">

    <!--    <a-layout>-->
    <a-layout-header class="bg-white d-flex flex-row" style=" height: 64px">

      <div class="p-3  brand">
        <span class="logo bg-secondary px-3 py-2 m-3" style="width: 10px"/>
        <span class="h6"> Teacher </span>
      </div>
      <a-menu :defaultSelectedKeys="defaultSelectedKey || ['dashboard']" :selected-keys="defaultSelectedKey" accordion
              class="flex-grow-1"
              mode="horizontal" size="large"
      >
        <a-menu-item key="dashboard" @click="onClickMenuItem(dashboard)">
          <template #icon>
            <IconDashboard/>
          </template>
          Dashboard
        </a-menu-item>

        <a-sub-menu v-for="link in adminSideBarLinks" :key="link.key" :selectable="true" :title="link.title">
          <!--  THE LINKS ON THE SIDEBAR WITHOUT SUB-ELEMENTS-->
          <!--            <template v-if="link.subItems.length === 0" #expand-icon-right />-->
          <!--            <templatev-if="link.subItems.length === 0" #expand-icon-down />-->
          <!--  END-->

          <!--  THE LINKS ON THE SIDEBAR WHICH HAVE SUB-ELEMENTS-->
          <template #icon>
            <component :is="link.icon"/>
          </template>
          <a-menu-item v-for="item in link.subItems" :key="item.key" @click="onClickMenuItem(item)">
            {{ item.title }}
            <template #icon class="fw-bolder">
              <!--                <component :is="item.icon" />-->
              -
            </template>
          </a-menu-item>
          <!--  END-->
        </a-sub-menu>

      </a-menu>
    </a-layout-header>
    <a-layout-content class="p-3">
      <a-tabs :active-key="defaultSelectedKey[0] || ['dashboard']" :editable="true" :lazy-load="true"
              :show-add-button="false"
              animation justify position="top"
              size="large"
              type="capsule" @change="changeLinkAndTab" @delete="handleDelete">
        <template #extra>
          <a-button status="default" type="primary">Refresh</a-button>
        </template>
        <a-tab-pane v-for="item of data" :key="item.key" :closable="item.closable" :title="item.title"
                    class="bg-white">
          <a-layout-content class="p-4" style="min-height: fit-content; height: max-content">
            <transition appear mode="out-in" name="fade">
              <keep-alive>
                <component :is="item.content" :key="item.key" ref="Tabpane"/>
              </keep-alive>
            </transition>
          </a-layout-content>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
    <!--        <a-layout-footer>Footer</a-layout-footer>-->
  </a-layout>
  <!--  </a-layout>-->
</template>
<script>
import {ref, shallowRef} from 'vue';
import {Spin} from '@arco-design/web-vue';
import {
  IconApps,
  IconCalendar,
  IconCaretLeft,
  IconCaretRight,
  IconDashboard,
  IconHome,
  IconMessage,
  IconStorage,
  IconUser,
  IconUserGroup,
} from '@arco-design/web-vue/es/icon';
import AdminDashBoard from "../Admin/AdminDashBoard.vue";
import ListItem from "../../components/ListItem.vue";
import StatisticComp from "../../components/StatisticComp.vue";
import AdminNotificationView from "../Admin/AdminNotificationView.vue";

export default {
  name: "TeacherBasicLayout",
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
  setup($refs, useRef) {
    /**
     * VARIABLES
     */

    const marginBar = ref(`200px`)
    const Tabpane = ref([])

    const collapsed = ref(false);    // sidebar collapse
    let defaultSelectedKey = shallowRef(['dashboard'])     //default key for the sidebar
    const dashboard = {
      key: 'dashboard',
      title: 'Dashboard',
      icon: IconDashboard,
      content: AdminDashBoard,
      closable: false,
      subItems: []
    }
    const adminSideBarLinks = [
      {
        key: 'student',
        title: '学生管理',
        icon: IconUserGroup,
        content: ListItem,
        closable: true,
        subItems: [
          {
            key: 'allStudents',
            title: '全部学生',
            icon: IconCalendar,
            content: StatisticComp,
            closable: true,
            subItems: []
          },
          {
            key: 'searchStudents',
            title: '搜索学生',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
        ]
      },
      {
        key: 'teacher',
        title: '老师管理',
        icon: IconUser,
        content: ListItem,
        closable: true,
        subItems: [
          {
            key: 'allTeacher',
            title: '全部老师',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
          {
            key: 'searchTeacher',
            title: '搜索老师',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },

        ]
      },
      {
        key: 'event',
        title: '活动管理',
        icon: IconCalendar,
        content: ListItem,
        closable: true,
        subItems: [
          {
            key: 'allEvents',
            title: '活动主页',
            icon: IconCalendar,
            content: AdminNotificationView,
            closable: true,
            subItems: []
          },
        ]
      },
      {
        key: 'notifications',
        title: '消息管理',
        icon: IconMessage,
        content: Spin,
        closable: true,
        subItems: [
          {
            key: 'allNotification',
            title: '消息主页',
            icon: IconCalendar,
            content: AdminNotificationView,
            closable: true,
            subItems: []
          },
        ]
      },
      {
        key: 'xuexiao_guanli',
        title: '学院管理',
        icon: IconApps,
        content: ListItem,
        closable: true,
        subItems: [
          {
            key: 'academy',
            title: '学院管理',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
          {
            key: 'course',
            title: '课程管理',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
          {
            key: 'classes',
            title: '班级管理',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
          {
            key: 'buildings',
            title: '教学楼管理',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
          {
            key: 'permissions',
            title: '权限管理',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
        ]
      },
      {
        key: 'shuzhu_gongneng',
        title: '辅助功能',
        icon: IconStorage,
        content: ListItem,
        closable: true,
        subItems: [
          {
            key: 'timetable_concurrent',
            title: '检查排课冲突',
            icon: IconCalendar,
            content: ListItem,
            closable: true,
            subItems: []
          },
        ]
      },
    ]    // Array of all ROUTES and TABS Data fo the sidebar

    const data = shallowRef([dashboard]);     //  Array of the current TABS CONTENT INFORMATIONS

    /**
     * Handle Adding new Tab to the List of opened tabs
     */
    const handleAdd = (Tab) => {
      data.value = data.value.concat(Tab)
    };
    /** Synchronize the sidebar Route change and the CurrentTab change  */
    const changeLinkAndTab = function (key) {
      defaultSelectedKey.value.pop();
      defaultSelectedKey.value = defaultSelectedKey.value.concat(key);

      console.log(Tabpane)
      // Tabpane.value[Tabpane.value.length -1].$forceUpdate()
      // console.log(data.value.filter(value => value.key === key))
      // console.log(Tabpane.value.filter((value,index,array) => {
      //   if (value['active'] === true){
      //     console.log(value)
      //     console.log(array[index])
      //     return value
      //   }
      //     return null
      // }))
    }

    /** handle delete a tab event */
    const handleDelete = (key) => {
      data.value = data.value.filter(item => item.key !== key)
      changeLinkAndTab(data.value[data.value.length - 1].key)
    };

    //check if a tab exists in the opened tabs by the given key
    const handleCheckTabExists = (keys) => {
      return data.value.filter((value) => value.key === keys).length
    };

    //Responsive reaction of the sidebar
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
      // Message.normal({content: `Sidebar is collapsed : ${collapsed.value}`})
      (collapsed.value === true) ? marginBar.value = `50px` : marginBar.value = `200px`
    };

    //Click on a Sidebar menu item
    const onClickMenuItem = function (link) {

      console.log(link)
      // Message.info({ content: `The tab ${link.key} exists : ` + handleCheckTabExists(link.key), showIcon: true });
      // //VERIFY IF THE TAB EXISTS OR ITS OPEN
      changeLinkAndTab(link.key);

      //OPEN THE CORRESPONDED TAB AND CHANGE THE SELECTED KEY
      (handleCheckTabExists(link.key) === 0) ?
          handleAdd(link) :
          changeLinkAndTab(link.key);
    }
    return {
      data, adminSideBarLinks, marginBar, Tabpane,
      handleAdd, dashboard,
      handleDelete,
      collapsed, defaultSelectedKey,
      onCollapse, onClickMenuItem,
      changeLinkAndTab
    };
  },
}
</script>
<style>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.arco-menu-inner, .arco-menu-overflow-wrap {
  height: 100%;
  padding: 0 !important;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
}

.arco-menu-item, .arco-menu-pop {
  height: 45px !important;
  display: flex !important;
  align-items: center;
}

.arco-menu-selected-label {
  position: absolute;
  right: 12px;
  bottom: -5px;
  left: 12px;
  height: 3px;
  background-color: rgb(var(--primary-6));
}
</style>
