import Vue from "vue"
import SvgIcon from "./SvgIcon.vue"
//注册组件  SvgIcon
Vue.component("SvgIcon", SvgIcon)

/**
require.context(‘./svg’, false, /\.svg$/) 参数说明：
第一个：目标文件夹
第二个：是否遍历子级目录
第三个：定义遍历文件规则
 * 
 */
const req = require.context("./svg", false, /\.svg$/)
const requireAll = requireContext => {
	return requireContext.keys().map(requireContext)
}
requireAll(req)
