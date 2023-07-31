import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {markRaw, shallowRef} from "vue";
import router from "@/router";
import axios from "axios";

const store = createStore({
    devtools: true,
    plugins: [
        createPersistedState({storage: window.localStorage, key: "userInfo"})
    ],
    state: {
        userInfo: {
            token: undefined
        },
        routes: markRaw([]),
        baseUrl: '',
        sidebarLinks:shallowRef([]),
        currentMessage: undefined

    },
    getters: {
        getuserInfo: (state) => {
            return state.userInfo
        },
        getcurrentMessage: (state) => {
            return state.currentMessage
        },
        
        getsidebarLinks: (state) => {
            return state.sidebarLinks
        },
        getRoutes: (state) => {
            return state.routes
        },
        getbaseUrl: (state) => {
            return state.baseUrl
        }
    },
    mutations: {
        setuserInfo: ((state, payload) => {
            // axios.interceptors.request.use(config => {
            //     config.headers.setAuthorization("Bearer "+store.getters.getuserInfo.token)
            // })

            state.userInfo = payload
        }),

        setbaseUrl: ((state, payload) => {
            state.baseUrl = payload
        }),
        setcurrentMessage: ((state, payload) => {
            state.currentMessage = payload
        }),
        setsidebarLinks: ((state, payload) => {
            state.sidebarLinks = payload
        }),

        cleanUserInfo: ((state, payload) => {
            window.sessionStorage.clear()
            state.userInfo = {
                token: undefined
            }
        }),
        setRoutes: ((state, payload) => {
            state.routes = payload
            state.routes.forEach(value => {
                router.addRoute(value)
            })
        }),
        cleanRoutes: ((state, payload) => {
            window.sessionStorage.clear()
            state.routes = markRaw([])
        }),
        cleancurrentMessage: ((state, payload) => {
            window.sessionStorage.clear()
            state.currentMessage = undefined
        }),
        cleanbaseUrl: ((state, payload) => {
            window.sessionStorage.clear()
            state.baseUrl = ''
        }),
        cleanbsidebarLinks: ((state, payload) => {
            window.sessionStorage.clear()
            state.sidebarLinks = markRaw([])
        })
    },
    actions: {
        logout:((state, payload) => {
            state.commit('cleanUserInfo')
            state.commit('cleanRoutes')
            state.commit('cleanbaseUrl')
            state.commit('cleanbsidebarLinks')
            setTimeout(()=>{
                router.push('/')
            },2000)
        })
    }
})
export default store
