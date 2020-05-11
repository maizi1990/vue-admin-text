/**
 * 信息管理接口
 */
//引入拦截器
import service from "@/utils/request.js"
/**
 * 添加一级分类
 */
export function AddFirstCategory(data) {
	return service.request({
		method: "post",
		url: "/news/addFirstCategory/",
		data: data,
	})
}
/**
 * 添加子级分类
 */
export function AddChildrenCategory(data) {
	return service.request({
		method: "post",
		url: "/news/addChildrenCategory/",
		data: data,
	})
}
/**
 * 获取信息分类列表
 */
export function GetCategory(data) {
	return service.request({
		method: "post",
		url: "/news/getCategory/",
		data: data,
	})
}
/**
 * 获取信息分类列表（全部，包含子级）
 */
export function GetCategoryAll(data) {
	return service.request({
		method: "post",
		url: "/news/getCategoryAll/",
		data: data,
	})
}
/**
 * 获取信息分类列表--有子级分类
 */
export function getCategoryAll(data) {
	return service.request({
		method: "post",
		url: "/news/getCategoryAll/",
		data: data,
	})
}
/**
 * 删除分类
 */
export function DeleteCategory(data) {
	return service.request({
		method: "post",
		url: "/news/deleteCategory/",
		data: data,
	})
}
/**
 * 编辑分类
 */
export function EditCategory(data) {
	return service.request({
		method: "post",
		url: "/news/editCategory/",
		data: data,
	})
}
