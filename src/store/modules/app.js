import { Login } from "@/api/login.js"
import { setToken, setUsername } from "@/utils/cookie.js"
const state = {
	isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
	token: "",
	username: "",
}
/**
 * getters 计算属性computed
 */
const getters = {
	isCollapse(state) {
		return state.isCollapse
	},
}

//mutations => 修改state，类似于事件函数
const mutations = {
	SET_ISCOLLAPSE(state) {
		state.isCollapse = !state.isCollapse
		//本地存储状态isCollapse--防止页面刷新，状态丢失
		sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
	},
	SET_TOKEN(state, data) {
		state.token = data.token
	},
	SET_USERNAME(state, data) {
		state.username = data.username
	},
}

const actions = {
	login({ state, commit }, requestData) {
		return new Promise((resolve, reject) => {
			//接口
			Login(requestData)
				.then((response) => {
					resolve(response)
					const data = response.data.data
					//更新vuex
					commit("SET_TOKEN", data)
					commit("SET_USERNAME", data)
					setToken(data.token)
					setUsername(data.username)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	exit({ commit }) {
		return new Promise((resolve, reject) => {
			setToken("")
			setUsername("")
			commit("SET_TOKEN", "")
			commit("SET_USERNAME", "")
			resolve()
		})
	},
}

export default {
	//命名空间--防止命名冲突
	//调用时候-- root.$store.commit('app/SET_ISCOLLAPSE');
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
