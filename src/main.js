import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress'
import 'nprogress/nprogress.css'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';
import {set_cptable} from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
import 'qalendar/dist/style.css'
import 'animate.css';

set_cptable(cptable);

const app = createApp(App)

app
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(store)
    .use(router)

app.mount('#app')