import { reactive } from "@vue/composition-api"
import { GetTableData } from "@/api/common.js"
/**
 * 获取表格数据
 */
export function getData() {
	const tableData = reactive({
		item: [],
		total: 0,
	})
	/**
	 * 获取table接口数据
	 */
	const getTableData = (requestData) => {
		GetTableData(requestData)
			.then((result) => {
				const responseData = result.data.data.data
				tableData.item = responseData
				tableData.total = result.data.data.total
			})
			.catch((err) => {})
	}

	return {
		tableData,
		getTableData,
	}
}
