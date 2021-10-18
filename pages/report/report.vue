<template>
	<view>
		<text class="caption">
			您有什么问题或者建议想对我们说？
		</text>
		<textarea v-model="content" placeholder="您的意见是我们的动力!" class="textarea" />
		<button type="primary" class="Btn" @click="submit">提交</button>
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
				content: ""
			};
		},
		methods: {
			submit() {
				req('/api/report/index', {
					method:'POST',
					data: {
						content: this.content
					}
				}).then(res => {
					if (res.data.code === 1) {
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success',
							position: 'top'
						})
						this.content=""
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.caption {
		margin: 60rpx auto 10rpx auto;
		display: block;
		width: 90%;
		color: #2B85E4;
	}

	.textarea {
		border: 1px solid #ccc;
		border-radius: 10rpx;
		margin: auto;
		width: 90%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.Btn {
		width: 90%;
		margin: 60rpx auto 0 auto;
	}
</style>
