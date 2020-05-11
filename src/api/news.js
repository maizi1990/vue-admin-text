//引入拦截器
import service from "@/utils/request.js"
/**
 * 新增信息
 */
export function AddInfo(data) {
	return service.request({
		method: "post",
		url: "/news/add/",
		data: data,
	})
}
/**
 * 修改信息
 */
export function EditInfo(data) {
	return service.request({
		method: "post",
		url: "/news/editInfo/",
		data: data,
	})
}
/**
 * 获取信息列表
 */
export function GetList(data) {
	return service.request({
		method: "post",
		url: "/news/getList/",
		data: data,
	})
}
/**
 * 删除信息
 */
export function DeleteInfo(data) {
	return service.request({
		method: "post",
		url: "/news/deleteInfo/",
		data: data,
	})
}
