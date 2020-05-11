import { MessageBox, Message } from "element-ui"
//注册vue全局函数
export default {
	install(Vue) {
		Vue.prototype.confirm = (options) => {
			MessageBox.confirm(options.tipsTxt || "确定删除这一条信息吗", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: options.type || "warning",
			})
				.then(() => {
					if (options.fn) {
						options.fn(options.id)
					}

					Message({
						type: "success",
						message: "删除成功!",
					})
				})
				.catch(() => {
					Message({
						type: "info",
						message: "已取消删除",
					})
				})
		}
	},
}
