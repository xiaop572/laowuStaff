<template>
	<view>
		<view class="reBlock">
			<image :src="baseUrl+data.logo_image" mode="widthFix"></image>
			<text  class="name">{{data.name}}</text>
			<text class="time">{{data.intro}}</text>
		</view>
		
		<view class="content">
			<view v-html="data.content"></view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../util/config.js'
	import {
		req
	} from '../../util/request.js'
	import tabBar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				data: {

				},
				baseUrl
			}
		},
		onLoad(options) {
			req('/api/article/info', {
				data: {
					id: options.id
				}
			}).then(res => {
				console.log(res)
				this.data = res.data.data;
			})
		}
	}
</script>

<style lang="less">
	page {
		background: #f2f2f2;
	}

	.reBlock {
		height: 190rpx;
		position: relative;
		width: 100%;
		background: #FFFFFF;
		border-bottom: 1px solid #eee;
		color: #666;
	
		image {
			width: 100rpx;
			position: absolute;
			top: 50rpx;
			left: 30rpx;
		}
	
		.name {
			position: absolute;
			top: 50rpx;
			left: 160rpx;
		}
	
		.time {
			position: absolute;
			left: 160rpx;
			top: 100rpx;
			font-size: 26rpx;
		}
	}
	.content{
		background: #fff;
		margin-top: 40rpx;
		padding: 40rpx;
		font-size: 32rpx;
	}
</style>
