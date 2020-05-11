import Vue from "vue"
import VueCompositionApi from "@vue/composition-api"
import App from "./App.vue"
import router from "./router"
import "./router/premit.js" //路由导航守卫
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUI)
//全局注册svgIcon组件,抽离出去
import "./icons/index.js"
//全局注册方法、函数
// import global from "./utils/global.js"
// Vue.use(global)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
