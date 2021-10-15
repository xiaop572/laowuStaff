<template>
	<view class="wages">
		<view class="details">工时核对详情</view>
		<table border="1">
			<tr>
				<td>出勤次数</td>
				<td>{{data.work_number}}</td>
			</tr>
			<tr>
				<td>出勤天数</td>
				<td>{{data.work_day}}</td>
			</tr>
			<tr>
				<td>工时合计</td>
				<td>{{data.work_hour}}</td>
			</tr>
			<tr>
				<td>计件量</td>
				<td>{{data.work_count}}</td>
			</tr>
			<tr>
				<td>餐补</td>
				<td>{{data.food}}</td>
			</tr>
			<tr>
				<td>产能绩效</td>
				<td>{{data.work_add}}</td>
			</tr>
			<tr>
				<td>部门奖惩</td>
				<td>{{data.work_float}}</td>
			</tr>
			<tr>
				<td>夜班补贴</td>
				<td>{{data.work_night}}</td>
			</tr>
			<tr>
				<td>安全奖</td>
				<td>{{data.safe}}</td>
			</tr>
			<tr>
				<td>旷工扣款</td>
				<td>{{data.work_reduce}}</td>
			</tr>
			<tr>
				<td>水电费</td>
				<td>{{data.life}}</td>
			</tr>
			<tr>
				<td>住宿费</td>
				<td>{{data.saty}}</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>{{data.remark}}</td>
			</tr>
			<tr>
				<td>其它</td>
				<td>{{data.other}}</td>
			</tr>
		</table>
		<view class="header">
			<view class="cxsj borderBottm">工时日期</view>
			<view class="time borderBottm">{{time}}</view>
			<view class="cxsj ">状态</view>
			<view class="time ">
				<u-radio-group v-model="value">
					<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="textarea">
				<u-input v-model="question" placeholder="疑问描述" :type="type" :border="border" :height="height" :auto-height="autoHeight" />
			</view>
			<u-button class="affirm" @click="submit">工时确认</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	import moment from 'moment'
	export default {
		computed:{
			time(){
				return moment(this.data.createtime*1000).format('YYYY-MM')
			}
		},
		data() {
			return {
				nowDate: "",
				data: {

				},
				list: [{
						name: '已确认',
						disabled: false,

					},
					{
						name: '有疑问',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '',
				question: '',
				type: 'textarea',
				border: true,
				height: 200,
				autoHeight: true,
			}
		},
		onLoad() {
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			this.nowDate = `${year}-${month}`;
			this.getWags()
		},
		methods: {
			confirm(res) {
				this.nowDate = `${res.year}-${res.month}`;
				this.getWags();
			},
			getWags() {
				req('/api/money/hour', {
					data: {
						time: this.nowDate
					}
				}).then(res => {
					this.data = res.data.data
				})
			},
			submit() {
				if (!this.value) {
					this.$refs.uToast.show({
						title: '请选择状态',
						type: 'error',
						position: 'top'
					})
				}
				let params = {
					hour_id: this.data.id,
					status: this.value === '已确认' ? 1 : -1,
					question: this.question
				}
				req('/api/money/confirmHour', {
					method: 'POST',
					data: {
						...params
					}
				}).then(res => {
					console.log(res)
					this.$refs.uToast.show({
						title: res.data.msg,
						type: 'error',
						position: 'top'
					})
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f2f2f2;
	}

	.details {
		height: 100rpx;
		line-height: 100rpx;
		background: #2B85E4;
		color: #FFFFFF;
		text-align: center;
	}

	.header {
		margin-top: 40rpx;

		.cxsj {
			width: 30%;
			background: #2B85E4;
			color: #fff;
			height: 80rpx;
			line-height: 80rpx;
			float: left;
			text-align: center;
			font-size: 34rpx;
		}

		.time {
			text-align: center;
			width: 70%;
			text-align: center;
			float: left;
			background: #fff;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 34rpx;
		}

		.heji {
			text-align: center;
			width: 35%;
			float: left;
			height: 80rpx;
			line-height: 80rpx;
			background: #2B85E4;
			color: #FFFFFF;
		}

		.borderBottm {
			border-bottom: 1px solid #eee;
		}
	}

	table {
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		font-size: 34rpx;
		background: #FFFFFF;
		border-color: #ccc;
		border: none;
	}

	tr th {
		width: 50%;
		height: 60rpx;
	}

	tr td {
		width: 50%;
		height: 80rpx;

	}

	.textarea {
		background-color: #FFFFff;

		input {
			font-size: 50rpx;
		}

		;
	}

	.affirm {
		width: 92%;
		height: 100rpx;
		background: #2B85E4;
		line-height: 100rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
		margin: 40rpx auto;
	}
</style>
