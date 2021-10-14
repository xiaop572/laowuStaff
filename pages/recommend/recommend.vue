<template>
	<view>
		<view class="qrimg">
			<text>{{nickname}}的内荐二维码</text>
			<tki-qrcode ref="qrcode" :val="url" :onval="true" :size="400" :lv="1" class="qr" />
			<text>长按二维码分享</text>
		</view>
	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				url: "",
				nickname: ""
			}
		},
		methods: {},
		components: {
			tkiQrcode,
		},
		onLoad() {
			this.nickname = uni.getStorageSync("userInfo").nickname;
			req('/api/user/invite').then(res => {
				this.url = res.data.data;
			})
		}
	}
</script>

<style lang="less">
	page {
		background: url("../../static/tuijianBg.jpg") no-repeat;
		background-size: 100% 100%;
		height: 100%;
	}

	.qrimg {
		width: 80%;
		margin: auto;
		background-color: #FFFFFF;
		text-align: center;
		padding: 30rpx 0 60rpx 0;
		border-radius: 40rpx;
		position: relative;
		top: 140rpx;
		text {
			font-size: 40rpx;
		}
		.qr {
			margin: 40rpx 0;
		}
	}
</style>
