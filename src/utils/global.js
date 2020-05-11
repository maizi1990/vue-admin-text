/**
 * global 全局工具类
 * confirm  --  弹出框确定/取消
 */
import { MessageBox, Message } from "element-ui"
import { reactive, ref } from "@vue/composition-api"
export function global() {
	const confirm = (options) => {
		MessageBox.confirm(options.tipsTxt || "确定删除这一条信息吗", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: options.type || "warning",
		})
			.then(() => {
				/**
				 * 点击确认后，触发的方法(options.fn 是传递过来的方法)
				 */
				//如果有fn，执行该函数
				if (options.fn) {
					options.fn(options.id)
				}
				Message({
					type: "success",
					message: "删除成功!",
				})
			})
			.catch(() => {
				/**
				 * 点击取消后，执行此处
				 */
				if (options.catchFn) {
					options.catchFn()
				}
				Message({
					type: "info",
					message: "已取消删除",
				})
			})
	}
	return {
		confirm,
	}
}
