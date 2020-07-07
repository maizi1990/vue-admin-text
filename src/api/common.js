import { GetCategory, GetCategoryAll } from "./info"
import { reactive } from "@vue/composition-api"
import service from "@/utils/request.js"
/**
 * 获取分类信息列表
 */
export function common() {
	const categroyList = reactive({
		list: [],
	})
	/**
	 * 获取一级分类---下拉列表用
	 */

	const getCategory = () => {
		GetCategory({})
			.then((result) => {
				categroyList.list = result.data.data.data
			})
			.catch((err) => {})
	}
	/**
	 * 获取全部分类---分类树形目录用
	 */

	const getCategoryAll = () => {
		GetCategoryAll({})
			.then((result) => {
				categroyList.list = result.data.data
			})
			.catch((err) => {})
	}
	return {
		categroyList,
		getCategory,
		getCategoryAll,
	}
}

/**
 * 封装table表格---获取表格数据(必须放在公共文件里，多个表格都会用到)
 * 
 * @param {
 *  requestData:请求数据对象    type:Object 
 * }

 */

export function GetTableData(requestData) {
	return service.request({
		url: requestData.url, //请求接口地址
		method: requestData.method || "post", //请求方式
		data: requestData.data || {}, //传参
	})
}
/**
 * 获取省份---获取数据
 * 
 * @param {
 *  requestData:请求数据对象    type:Object 
 * }

 */

export function GetCityPicker(requestData) {
	return service.request({
		url: "/cityPicker/", //请求接口地址
		method: "post", //请求方式
		data: requestData,
	})
}
