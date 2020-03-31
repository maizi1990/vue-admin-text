import axios from "axios"
import { Message } from "element-ui"

//自定义拦截器
//手把手官网 http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === "development" ? "/api" : ""
//自定义配置新建一个 axios 实例
var service = axios.create({
	baseURL: BASEURL,
	timeout: 15000 // 超时
})
/*添加请求拦截器*/
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		config.headers["AAA"] = "1111111111111111"
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

/*添加响应------------------------拦截器*/
service.interceptors.response.use(
	response => {
		// 在发送请求之前做些什么
		const { resCode, message } = response.data
		if (resCode !== 0) {
			Message.error(message)
		}
		return response
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)
export default service
