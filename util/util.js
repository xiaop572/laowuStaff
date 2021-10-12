import {baseUrl} from './config.js'
import qs from 'qs'
function wxAuthorize() {
    let link = window.location.href;
	let params=getRequest();
	if(params.code){
		
	}
	if (uni.getStorageSync('token')) return;
}
/**
 * 获取url参数
 */
export {
	wxAuthorize
};