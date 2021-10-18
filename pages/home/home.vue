<template>
	<view class="Home">
		<image src="../../static/zpInfo.png" alt="" mode="widthFix" class="zpInfo" @click="rZp">
			<view class="list">
				<view @click="rWages">
					<image src="../../static/gongzi.png" mode="widthFix"></image>
					<text>工资查询</text>
				</view>
				<view>
					<image src="../../static/tuijian.png" mode="widthFix" @click="rRecommend"></image>
					<text>员工内荐</text>
				</view>
				<view @click="rMyRecommend">
					<image src="../../static/zhaopin.png" mode="widthFix"></image>
					<text>我的内荐</text>
				</view>
				<view @click="rCheck">
					<image src="../../static/gongshi.png" mode="widthFix"></image>
					<text>工时核对</text>
				</view>
			</view>
			<image src="../../static/sign.png" mode="widthFix" class="signBtn" @click="rSign"></image>
			<tab-bar></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../components/tabbar/tabbar.vue'
	export default {
		components: {
			tabBar
		},
		methods: {
			rWages() {
				uni.navigateTo({
					url: "../wages/wages"
				})
			},
			rRecommend() {
				uni.navigateTo({
					url: "../recommend/recommend"
				})
			},
			rMyRecommend() {
				uni.navigateTo({
					url: '../myRecommend/myRecommend'
				})
			},
			rCheck() {
				uni.navigateTo({
					url: '../check/check'
				})
			},
			rZp() {
				uni.navigateTo({
					url: '../recruit/recruit'
				})
			},
			rSign() {
				uni.navigateTo({
					url: '../sign/sign'
				})
			}
		}
	}
</script>

<style lang="less">
	.list {
		clear: both;
		overflow: hidden;
		margin-top: 80rpx;

		view {
			width: 25%;
			float: left;
			text-align: center;

			image {
				width: 60%;

			}

			text {
				display: block;
				font-size: 32rpx;
			}
		}
	}

	.zpInfo {
		width: 100%;
		margin: 0 auto 0 auto;
		display: block;
	}

	.signBtn {
		width: 92%;
		margin: 60rpx auto 0 auto;
		display: block;
		border-radius: 10rpx;
	}
</style>
