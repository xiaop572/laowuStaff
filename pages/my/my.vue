<template>
	<view class="my">
		<view class="myHeader">
			<img :src="userInfo.avatar" alt="" class="avatar">
			<text>{{userInfo.nickname}}</text>
		</view>
		<u-cell-group>
			<u-cell-item  title="个人信息" @click="rEditInfo"></u-cell-item>
			<u-cell-item  title="联系驻场" @click="rContact"></u-cell-item>
			<u-cell-item  title="投诉建议" @click="report"></u-cell-item>
			
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {

				}
			}
		},
		methods:{
			rContact(){
				uni.navigateTo({
					url:"../contactField/contactField"
				})
			},
			report() {
				uni.navigateTo({
					url: '/pages/report/report'
				})
			},
			rEditInfo(){
				uni.navigateTo({
					url:'/pages/editInfo/editInfo'
				})
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo");
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background: #f2f2f2;
	}

	.myHeader {
		height: 300rpx;
		position: relative;
		background: #fff;

		text {
			position: absolute;
			left: 300rpx;
			top: 100rpx;
			font-size: 40rpx;
			margin: auto;
			color: #666;
		}
	}

	.avatar {
		border-radius: 50%;
		width: 200rpx;
		position: absolute;
		left: 40rpx;
		top: 40rpx;
	}
</style>
