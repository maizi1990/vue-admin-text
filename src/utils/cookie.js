import cookie from "cookie_js"
/**
 * 存储信息
 */
//token
export function setToken(token) {
	return cookie.set("token", token)
}
//username
export function setUsername(username) {
	return cookie.set("username", username)
}
/**
 * 获取信息
 */
//token
export function getToken() {
	return cookie.get("token")
}
//username
export function getUsername() {
	return cookie.get("username")
}
