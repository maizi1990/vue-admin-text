/**
 * 登录页面------所有接口
 */
//引入拦截器
import service from "@/utils/request.js"
/**
 * 注册-获取验证码
 */
export function GetSms(data) {
	return service.request({
		method: "post",
		url: "/getSms/",
		data: data
	})
}
/**
 * 注册
 */
export function Register(data) {
	return service.request({
		method: "post",
		url: "/register/",
		data: data
	})
}
/**
 * 登录
 */
export function Login(data) {
	return service.request({
		method: "post",
		url: "/login/",
		data: data
	})
}
