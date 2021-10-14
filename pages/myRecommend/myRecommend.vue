<template>
	<view class="myRecommend">
		<view class="BtnLine">
			<view class="Btn last" @click="last">上一页</view>
			<view class="Btn" @click="next">下一页</view>
		</view>
		<view class="reBlock" v-for="item in recommandList" :key="item.id">
			<image :src="item.avatar" mode="widthFix"></image>
			<text class="name">{{item.username}}</text>
			<text
				class="time">成为内荐时间:{{new Date(item.createtime*1000).getFullYear()}}-{{new Date(item.createtime*1000).getMonth()+1}}{{new Date(item.createtime*1000).getDate()}}</text>
		</view>
	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				recommandList: [],
				total:0
			}
		},
		methods: {
			last() {
				if(this.page>1){
					this.page--;
					this.getdata()
				}
			},
			next() {
				if(this.page<this.total/this.limit){
					this.page++;
					this.getdata()
				}
			},
			getdata(){
				req('/api/user/inviteList', {
					data: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					this.total=res.data.data.total;
					this.recommandList=res.data.data.data;
				})
			}
		},
		onLoad() {
			this.getdata()
		}
	}
</script>

<style lang="less">
	page {
		background: #f2f2f2;
	}
	.Btn {
		width: 50%;
		float: left;
		text-align: center;
		border-bottom: 1px solid #999;
		background: #FFFFFF;
		height: 60rpx;
		line-height: 60rpx;
		box-sizing: border-box;
	}

	.last {
		border-right: 1px solid #999;
	}

	.BtnLine {
		clear: both;
		overflow: hidden;
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
		}
	}
</style>
