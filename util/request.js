import {baseUrl} from './config.js'

export function req(url,params){
	return new Promise((resolve,reject)=>{
		let token=uni.getStorageSync('token');
		console.log(token)
		uni.request({
			url:baseUrl+url,
			header:{
				token
			},
			...params,
			success:res=>{
				resolve(res)
			}
		})
	})
}
/**
 * 验证token是否过期
 */
export async function verifyToken(){
	return new Promise((resolve,reject)=>{
		let token=uni.getStorageSync('token');
		if(!token){
			resolve(false);
		}
		uni.request({
			url:baseUrl+'/api/token/check',
			method:'GET',
			data:{
				token
			},
			success:res=>{
				if(res.data.code===1){
					refreshToken()
				}else{
					resolve(false);
				}
				resolve(res)
			}
		})
	})
}
/**
 * 刷新token
 */
export async function refreshToken(){
	let token=uni.getStorageSync('token');
	uni.request({
		url:baseUrl+'/api/token/refresh',
		method:'GET',
		data:{
			token
		},
		success:res=>{
			if(res.data.code===1){
				uni.setStorageSync("token",res.data.data.token);
			}
		}
	})
}
/**
 * 获取鉴权url
 */
export function getAuthentication(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/index/index',
			method:'GET',
			success:res=>{
				resolve(res)
			}
		})
	})
}