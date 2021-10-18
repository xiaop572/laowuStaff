<template>
	<view class="register">
		<view class="warning">
			<u-icon name="info-circle-fill" color="#f49928" size="60" top="10"></u-icon>
			<text>以下为重要信息,请如实填写...</text>
		</view>
		<u-form :model="form1" ref="uForm" label-align="left" label-width="200" class="form">
			<u-form-item label="真实姓名">
				<u-input v-model="form1.realname" />
			</u-form-item>
			<u-form-item label="开户行名称">
				<u-input v-model="form1.card_name" />
			</u-form-item>
			<u-form-item label="开户人姓名">
				<u-input v-model="form1.card_user" />
			</u-form-item>
			<u-form-item label="银行卡号">
				<u-input v-model="form1.money_card" />
			</u-form-item>
		</u-form>
		<u-button type="primary" class="submitBtn" @click="submit">提交</u-button>
		<u-toast ref="uToast" />
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
				form1: {
					realname: "",
					money_card: "",
					card_name: "",
					card_user: ""
				},
				tips: '',
				// refCode: null,
				seconds: 10,
			}
		},
		methods: {
			getUserInfo() {
				req('/api/user/getUserInfo').then(res => {
					console.log(res)
					if (res.data.code === 1) {
						this.form1 = {
							realname: res.data.data.realname,
							money_card: res.data.data.money_card,
							card_name: res.data.data.card_name,
							card_user: res.data.data.card_user
						}
					}
				})
			},
			submit() {
				console.log(this.form1)
				req('/api/user/profile', {
					method: 'POST',
					data: {
						...this.form1
					}
				}).then(res => {
					if (res.data.code === 1) {
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success',
							position: 'top'
						})
						return;
					}
					this.$refs.uToast.show({
						title: '修改失败',
						type: 'error',
						position: 'top'
					})

				})
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}
	/deep/ .uni-tabbar-bottom{
		display: block !important;
	}
	.register {
		background: #f2f2f2;
		height: 100%;

		.warning {
			background: #f3eee2;
			line-height: 80rpx;
			height: 80rpx;
			padding: 0 60rpx;

			text {
				font-size: 30rpx;
				color: #f49928;
				display: inline-block;
				line-height: 80rpx;
				padding-left: 20rpx;
			}
		}

		.form {
			padding: 0 20rpx;
			background: #fff;
			margin-top: 40rpx;
		}

		.form1 {
			padding: 0 20rpx;
			background: #fff;
		}

		.caption {
			color: #666;
			background: #fff;
			display: block;
			padding: 0 20rpx;
			height: 60rpx;
			line-height: 60rpx;
		}

		.submitBtn {
			margin-top: 40rpx;
		}
	}
</style>
