<template>
	<view>
		<view v-for="item in dataList" :key="item.id" class="reBlock" @click="rParticulars(item.id)">
			<image :src="baseUrl+item.logo_image" mode="widthFix"></image>
			<text class="name">{{item.name}}</text>
			<text class="time">{{item.intro}}</text>
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
				dataList: [

				],
				baseUrl: baseUrl
			}
		},
		onLoad() {
			req('/api/article/index', {
				data: {
					limit: 99999,
					page: 1
				}
			}).then(res => {
				this.dataList = res.data.data.data
			})
		},
		methods:{
			rParticulars(id) {
				console.log(id)
				uni.navigateTo({
					url: '../recruitParticulars/recruitParticulars?id=' + id,
			
				})
			}
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
</style>
