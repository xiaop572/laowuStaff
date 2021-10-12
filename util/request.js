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
export function 