<script>
	import {wxAuthorize} from './util/util.js'
	import {req,verifyToken,getAuthentication} from './util/request.js'
	export default {
		onLaunch:async function() {
			let status=await verifyToken();
			if(!status){
				let result=await getAuthentication();
				let url=result.data.data;
				window.location.href = url;
			}
			wxAuthorize()
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>