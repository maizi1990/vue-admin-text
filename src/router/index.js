import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		redirect: "/login"
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login/index.vue")
	},
	/**
	 * 控制台
	 */
	{
		path: "/index",
		name: "Index",
		redirect: "/console",
		meta: {
			name: "控制台",
			icon: "console"
		},
		component: () => import("../views/Layout/index.vue"),
		children: [
			{
				path: "/console",
				name: "Console",
				meta: {
					name: "首页"
				},
				component: () => import("../views/Console/index.vue")
			}
		]
	},
	/**
	 * 信息管理
	 */
	{
		path: "/info",
		name: "Info",
		meta: {
			name: "信息管理",
			icon: "info"
		},
		redirect: "/lists",
		component: () => import("../views/Layout/index.vue"),
		children: [
			{
				path: "/lists",
				name: "Lists",
				meta: {
					name: "信息列表"
				},
				component: () => import("../views/Info/Lists.vue")
			},
			{
				path: "/category",
				name: "Category",
				meta: {
					name: "信息分类"
				},
				component: () => import("../views/Info/Category.vue")
			},
			{
				path: "/details",
				name: "Details",
				meta: {
					name: "信息详情"
				},
				component: () => import("../views/Info/Details.vue")
			}
		]
	},
	/**
	 * 用户管理
	 */
	{
		path: "/user",
		name: "User",
		meta: {
			name: "用户管理",
			icon: "user"
		},
		redirect: "/userlists",
		component: () => import("../views/Layout/index.vue"),
		children: [
			{
				path: "/userlists",
				name: "UserLists",
				meta: {
					name: "用户列表"
				},
				component: () => import("../views/User/index.vue")
			}
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
