import { GetCategory, GetCategoryAll } from "./info"
import { reactive } from "@vue/composition-api"
/**
 * 获取分类信息列表
 */
export function common() {
	const categroyList = reactive({
		list: [],
	})
	//获取一级分类---下拉列表用
	const getCategory = () => {
		GetCategory({})
			.then((result) => {
				categroyList.list = result.data.data.data
			})
			.catch((err) => {})
	}
	//获取全部分类---分类树形目录用
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
