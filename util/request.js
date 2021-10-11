import {baseUrl} from './config.js'
export function req(url,params){
	let token=uni.getStorageInfoSync('token');
	uni.request({
		url:baseUrl+url,
		header:{
			token
		},
		...params
	})
}
export async function verifyToken(){
	let token=uni.getStorageSync('token');
	if(!token)return false;
	uni.request({
		url:baseUrl+'/api/token/check',
		method:'GET',
		data:{
			token
		},
		success:res=>{
			console.log(res)
		}
	})
}

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