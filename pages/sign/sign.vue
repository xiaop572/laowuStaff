<template>
	<view  class="word">
		<text class="caption" v-if="show">签约前请先完善银行卡信息</text>
		<button type="primary" class="btn" v-if="show" @click="rEditInfo">去完善</button>
		<view v-html="word"></view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
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
				word: "",
				userInfo: {
				
				},
				show:false
			}
		},
		methods:{
			rEditInfo(){
				uni.redirectTo({
					url:'../editInfo/editInfo'
				})
			}
		},
		onLoad() {
			req('/api/index/sign').then(res => {
				console.log(res)
				this.word = res.data.data
			})
			req('/api/user/getUserInfo').then(res=>{
				if(res.data.code===1){
					this.userInfo=res.data.data;
					if(!this.userInfo.money_card){
						this.show=true;
					}
				}
			})
		}
	}
</script>

<style lang="less">
	page {
		background: url('../../static/tuijianBg.jpg') no-repeat;
		background-attachment: fixed;
		background-size: 100% 100%;
	}
	.caption {
		margin: 10rpx auto;
		display: block;
		width: 90%;
		color: #2B85E4;
	}
	.word{
		padding: 40rpx;
		background: #FFFFFF;
		width: 90%;
		margin:60rpx auto;
		border-radius: 10rpx;
	}
	.btn{
		margin-bottom: 20rpx;
	}
</style>
