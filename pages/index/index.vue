<template>
	<view class="content">
		111
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
				console.log(res,"结果")
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
