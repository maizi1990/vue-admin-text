//引入拦截器
import service from "@/utils/request.js"
/**
 * 获取角色
 */
export function GetRole() {
	return service.request({
		method: "post",
		url: "/role/",
		data: {},
	})
}

/**
 * 用户添加
 */
export function UserAdd(data) {
	return service.request({
		method: "post",
		url: "/user/add/",
		data: data,
	})
}

/**
 * 用户删除
 */
export function UserDelete(data) {
	return service.request({
		method: "post",
		url: "/user/delete/",
		data: data,
	})
}
