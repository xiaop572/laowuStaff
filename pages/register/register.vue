<template>
	<view class="register">
		<u-form :model="form" ref="uForm" label-align="left" label-width="140" class="form">
			<u-form-item label="手机号码">
				<u-input v-model="form.mobile" />
			</u-form-item>
			<u-form-item label="验证码">
				<u-input v-model="form.captcha" />
				<view class="wrap">
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<u-button @tap="getCode">{{tips}}</u-button>
				</view>
			</u-form-item>
		</u-form>
		<u-button type="primary" class="submitBtn" @click="rhome">提交</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					captcha: ''
				},
				form1: {
					realname: "",
					money_card: "",
					card_name: "",
					card_user: ""
				},
				tips: '',
				// refCode: null,
				seconds: 60,
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (!this.form.mobile) {
					this.$refs.uToast.show({
						title: '请填写手机号',
						type: 'error',
						position: 'top'
					})
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					req('/api/sms/send', {
						method: 'POST',
						data: {
							event: 'auth',
							mobile: this.form.mobile
						}
					}).then(res => {
						if(res.data.code===0){
							this.$refs.uToast.show({
								title: res.data.msg,
								type: 'error',
								position: 'top'
							})
							uni.hideLoading();
							return;
						}
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast('验证码已发送');
							this.$refs.uCode.start();
						}, 2000);
					})

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
			},
			rhome() {
				if (!this.form.mobile) {
					this.$refs.uToast.show({
						title: '请填写手机号',
						type: 'error',
						position: 'top'
					})
				}
				req('/api/user/bindMobile', {
					method: 'POST',
					data: {
						mobile: this.form.mobile,
						event: 'auth',
						captcha: this.form.captcha
					}
				}).then(res => {
					if (res.data.code === 1) {
						this.$refs.uToast.show({
							title: '绑定成功',
							type: 'success',
							position: 'top'
						})
						uni.navigateTo({
							url: '../home/home'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
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
