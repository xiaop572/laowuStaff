<script>
	import {
		baseUrl
	} from './util/config.js'
	import qs from 'qs'
	import {
		req,
		verifyToken,
		getAuthentication
	} from './util/request.js'
	export default {
		onLaunch: async function() {
			let params=qs.parse(location.search.split("?")[1]);//获取url参数
			if(params.code){//code跳转到登录页面
			window.location.href=`${baseUrl}/api/user/login?code=${params.code}&state=${params.state}&uid=${params.uid}`;
			return;
			}
			if(params.token){//url参数带token 设置token。否则验证现在有token是否过期
				uni.setStorageSync('token',params.token);
				uni.navigateTo({
					url:'./pages/index/index'
				})
				return;
			}else{
				let status=await verifyToken();
				if(!status){
					let result=await getAuthentication();
					let url=result.data.data;
					window.location.href = url;
				}
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
