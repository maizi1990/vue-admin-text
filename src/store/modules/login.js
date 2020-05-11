import { Login } from "@/api/login.js"

const state = {
	isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
}
/**
 * getters 计算属性computed
 */
const getters = {
	isCollapse(state) {
		return state.isCollapse
	}
}

//mutations => 修改state，类似于事件函数
const mutations = {
	SET_ISCOLLAPSE(state) {
		console.log("login")
		state.isCollapse = !state.isCollapse
		//本地存储状态isCollapse--防止页面刷新，状态丢失
		sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
	}
}

const actions = {
	login(context, requestData) {
		return new Promise((resolve, reject) => {
			//接口
			Login(requestData)
				.then(response => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
}

export default {
	//命名空间--防止命名冲突
	//调用时候-- root.$store.commit('app/SET_ISCOLLAPSE');
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
