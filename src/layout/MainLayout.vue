<template>
  <a-layout class="layout-demo " style="height: 100vh;
    /*background:url('https://www.icloud.com/system/icloud.com/current/static/wallpaper.webp') no-repeat center;*/
    background-size: cover; background-color:rgba(227,227,227,0.47) !important;">
    <a-layout-sider
        :collapsed="collapsed"
        :collapsed-width="56"
        :width="220"
        breakpoint="md"
        collapsible
        theme="dark" class="bg-dark"
        @collapse="collapsed = !collapsed"
    >

      <a-menu :collapsed="collapsed" accordion :collapsed-width="56" :defaultSelectedKeys="defaultSelectedKey || ['dashboard']" :selected-keys="defaultSelectedKey"
              :width="220" theme="dark"
              breakpoint="md" class="bg-dark shadow-none border-0 centered" mode="vertical">

        <template v-for="link in adminSideBarLinks">
          <!--@click="onClickMenuItem(link)" -->
          <a-menu-item v-if="link.subItems.length === 0" :key="link.key"
                       @click="onClickMenuItem(link)">
            <template #icon>
              <component :is="link.icon"/>
            </template>
            <!--            <router-link :to="{name:'dashboard'}" class="position-absolute start-0 top-0 bottom-0 end-0"-->
            <!--                         @click="onClickMenuItem(link)"-->
            <!--            ></router-link>-->
            {{ link.title }}
          </a-menu-item>

          <!--  THE LINKS ON THE SIDEBAR WHICH HAVE SUB-ELEMENTS-->
          <a-sub-menu v-else :key="link.key" :selectable="true" :title="link.title">
            <template #icon>
              <component :is="link.icon"/>
            </template>
            <a-menu-item v-for="item in link.subItems" :key="item.key"
                         @click="onClickMenuItem(item)">
              {{ item.title }}
              <template #icon class="fw-bolder">
                <component :is="item.icon"/>
              </template>
              <!--              <router-link :to="{name:'dashboard'}" class="position-absolute start-0 top-0 bottom-0 end-0"-->
              <!--                           @click="onClickMenuItem(item)"-->
              <!--              ></router-link>-->
            </a-menu-item>

            <!--  END-->
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>


    <a-layout style="height:100%;/* background-color:#ffffff;*/" class="bg-light">
      <a-layout-header style="height: 60px" class=" bg-white border-0 shadow-sm  mb-4 d-flex justify-content-between align-items-center">
        <div class="d-flex flex-row px-3 justify-content-center align-items-center h-100 brand">
            <img src="https://edu-systembase.oss-cn-beijing.aliyuncs.com/2023/05/21/129d6047fc6e4413be4165f8da5a151ffavicon.jpg"
                 style="height: 35px; width: 35px" class="rounded shadow img-fluid" alt="logo">
        </div>
        <a-dropdown class="" hide-on-select trigger="hover" @select="select">
          <div :style="{cursor: 'pointer' }" class="d-flex m-2 align-items-center bg-light py-1 px-2 me-md-4 ">
            <a-avatar :size="25" :style="{ backgroundColor: '#3370ff', }" class="me-2 p-2" shape="square">
              <icon-settings/>
            </a-avatar>
            <small class="small">Settings</small>
          </div>
          <template #content style="z-index: 1000">


            <a-doption key="0_0" class="px-4 py-1" value="1">
              <template #icon>
                <icon-export/>
              </template>
              退出
            </a-doption>

          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="px-1 bg-transparent">
        <router-view v-slot="{ Component }">
<!--          <keep-alive>-->

                <div class="bg-transparent" style=" height: 100%">
<!--                  <transition mode="out-in" name="fade">-->
                  <component :is="Component" class="animate__animated animate__fadeIn  px-3 py-0 "/>
<!--                  </transition>-->
                </div>
<!--          </keep-alive>-->
        </router-view>
      </a-layout-content>
      <a-layout-footer class=" bg-transparent border-0 d-flex justify-content-center align-items-center p-2">
        <span class="text-muted small m-0">Liu Xue Sheng Jiao Wu Guan li Xi Tong</span>
      </a-layout-footer>
    </a-layout>


  </a-layout>
</template>

<script>
import {shallowRef} from "vue";
import router, {convertRoleCode} from "../router";
import {Message} from "@arco-design/web-vue";
import store from "@/store";
import {studentLinks, supervisorSideBarLinks, teacherSideBarLinks} from "@/router/routerLinks";

export default {
  name: "MainLayout",
  data() {
    return {
      defaultSelectedKey: ['dashboard'],
      collapsed: shallowRef(false),
      adminSideBarLinks: shallowRef([]),
    }
  },
  // props:['links'],
  methods: {
    select(item) {

      if (item === '0') {
        router.push({path: 'account'})
      } else {
        store.commit('cleanRoutes')
        store.commit('cleanUserInfo')
        router.push({name: 'home'})
        Message.info("Disconnected")
      }

    },


    changeLinkAndTab(key) {

      this.defaultSelectedKey.pop();
      this.defaultSelectedKey.push(key);

    },
    handleCheckTabExists(keys) {
      return this.adminSideBarLinks.filter((value) => value.key === keys).length
    },
    onClickMenuItem(link) {
      //OPEN THE CORRESPONDED TAB AND CHANGE THE SELECTED KEY
      this.changeLinkAndTab(link.key)
      router.push({name: link.key})
    },

  },
  created() {
    //ADDING THE ROUTES OPTIONS
    // router.currentRoute.value.meta.links.forEach((value) => {
    //   this.adminSideBarLinks.push(value)
    // })
    if (store.getters.getuserInfo.role === undefined){
      router.push("/")
    }else{
      const role = convertRoleCode(store.getters.getuserInfo.role)
      if (role === undefined){
        router.push("/")
      }else{
        switch (role) {
          case "ADMIN":
            this.adminSideBarLinks = supervisorSideBarLinks
                break
          case "STUDENT":
            this.adminSideBarLinks = studentLinks
            break
          case "TEACHER":
            this.adminSideBarLinks = teacherSideBarLinks
            break
          default:
            break
          }
        }
      }



    // store.getters.getsidebarLinks.forEach(value => {
    //   this.adminSideBarLinks.push(value)
    // })

    this.changeLinkAndTab(router.currentRoute.value.name)
  },
  mounted() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },
  updated() {
    console.log("ROUTER LINK NAME: ",router.currentRoute.value.name)
    this.defaultSelectedKey.pop();
    this.defaultSelectedKey.push(router.currentRoute.value.name)
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
</script>

<style lang="scss">
.arco-tabs-nav-type-capsule .arco-tabs-nav-tab:not(.arco-tabs-nav-tab-scroll) {
  justify-content: flex-start !important;
}

.arco-tabs-nav-type-capsule .arco-tabs-nav-tab-list {
  background-color: white !important;

  & .arco-tabs-tab-active {
    //color: red !important;
    //border-top: 1px solid blue;
    border-bottom: 1px solid blue;
    background-color: rgb(47, 92, 205) !important;
    color: white !important;
    //transition: all ease 0ms;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.centered {
  margin-top: 57px;
}
.arco-menu{
  font-size: 15px !important;
  letter-spacing: 1px;

}
.arco-menu-selected {
  transition: all ease-in-out 10ms;
  font-weight: bold !important;
  font-size: 14.5px !important;
  //padding: 15px 15px !important;
}

//.arco-menu-title {
//  padding-right: 10px;
//}

//.arco-menu-inner,.arco-menu-overflow-wrap {
//  height: 64px !important;
//  padding: 0 !important;
//  display: flex;
//  align-items: center;
//}

.layout2 {
  min-height: calc(100vh - 200px) !important;
  height: fit-content;
}
.arco-menu-inline-header arco-menu-selected arco-menu-has-icon{
  //color:#fff !important;
}
.arco-tabs-nav-vertical {
  width: 200px;

  & .arco-tabs-nav-tab {
    width: inherit;
  }
}

.arco-menu-dark .arco-menu-inline-header.arco-menu-selected .arco-icon, .arco-menu-dark .arco-menu-inline-header.arco-menu-selected .arco-menu-icon,
.arco-menu .arco-menu-inline-header.arco-menu-selected{
  color:coral !important;
  transition: all ease-in-out 10ms;
  font-weight: bold !important;
  font-size: 14.5px !important;
}
</style>