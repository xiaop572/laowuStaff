<template>
	<view class="content">
	</view>
</template>

<script>
	import {req} from '../../util/request.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			req('/api/user/getUserInfo').then(res=>{
				if(res.data.code===1){
					let data=res.data.data;
					console.log(data)
					uni.setStorageSync("userInfo",{
						avatar:data.avatar,
						nickname:data.nickname
					})
					if(!res.data.data.mobile){
						uni.redirectTo({
							url:'../register/register'
						})
					}else{
						uni.switchTab({
							url:'../home/home'
						})
					}
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
