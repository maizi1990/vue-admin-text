import { reactive } from "@vue/composition-api"
export function paginationHook() {
	const pageData = reactive({
		currentPage: 1, //当前页码
		pageSize: 2, //每页条数
		total: 0, //总条数
		pageSizes: [2, 3, 4],
	})

	const handleSizeChange = (val) => {
		pageData.pageSize = val
	}
	const handleCurrentChange = (val) => {
		pageData.currentPage = val
	}
	return {
		pageData,
		handleSizeChange,
		handleCurrentChange,
	}
}
