import router from "./index.js"
import { getToken } from "../utils/cookie.js"
/**
 * 路由导航守卫--在页面跳转时执行
 */
//路由白名单
const whiteRouter = ["/login"]

router.beforeEach((to, from, next) => {
	if (getToken()) {
		next()
	} else {
		if (whiteRouter.indexOf(to.path) !== -1) {
			//在白名单里
			next()
		} else {
			//没有在白名单里
			next("/login")
		}
	}
})
