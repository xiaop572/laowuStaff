<template>
	<view class="wages">
		<view class="header">
			<view class="cxsj">查询时间</view>
			<view class="time" @click="show=true">{{nowDate}}</view>
			<view class="heji">合计:{{data.curr_money}}</view>
		</view>
		<table border="1">
			<tr><td>出勤时数</td><td>{{data.work_number}}</td></tr>
			<tr><td>出勤天数</td><td>{{data.work_day}}</td></tr>
			<tr><td>工时合计</td><td>{{data.work_hour}}</td></tr>
			<tr><td>计件量</td><td>{{data.work_count}}</td></tr>
			<tr><td>小时工资（元/小时）</td><td>{{data.hour_money}}</td></tr>
			<tr><td>计件单价</td><td>{{data.money_single}}</td></tr>
			<tr><td>计时工资</td><td>{{data.hour_count}}</td></tr>
			<tr><td>计件工资</td><td>{{data.number_count}}</td></tr>
			<tr><td>餐补</td><td>{{data.food}}</td></tr>
			<tr><td>产能绩效</td><td>{{data.work_add}}</td></tr>
			<tr><td>部门奖惩</td><td>{{data.work_float}}</td></tr>
			<tr><td>夜班补贴</td><td>{{data.work_night}}</td></tr>
			<tr><td>安全奖</td><td>{{data.safe}}</td></tr>
			<tr><td>岗位补贴</td><td>{{data.work_type_money}}</td></tr>
			<tr><td>在岗奖励</td><td>{{data.work_stay_money}}</td></tr>
			<tr><td>旷工扣款</td><td>{{data.work_reduce}}</td></tr>
			<tr><td>水电费</td><td>{{data.life}}</td></tr>
			<tr><td>住宿费</td><td>{{data.saty}}</td></tr>
			<tr><td>扣款合计</td><td>{{data.reduce_count}}</td></tr>
			<tr><td>缓发</td><td>{{data.slow_count}}</td></tr>
			<tr><td>备注</td><td>{{data.remark}}</td></tr>
			<tr><td>其它</td><td>{{data.other}}</td></tr>
			<tr><td>应发工资</td><td>{{data.count_money}}</td></tr>
			<tr><td>实发工资</td><td>{{data.curr_money}}</td></tr>
		</table>
		<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	export default {
		data() {
			return {
				nowDate: "",
				params: {
					year: true,
					month: true
				},
				show: false,
				data:{
					
				}
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
				req('/api/money/info', {
					data: {
						time: this.nowDate
					}
				}).then(res=>{
					this.data=res.data.data
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f2f2f2;
	}

	.header {
		.cxsj {
			width: 30%;
			background: #2B85E4;
			color: #fff;
			height: 60rpx;
			line-height: 60rpx;
			float: left;
			text-align: center;
		}

		.time {
			text-align: center;
			width: 35%;
			text-align: center;
			float: left;
			background: #fff;
			height: 60rpx;
			line-height: 60rpx;
		}

		.heji {
			text-align: center;
			width: 35%;
			float: left;
			height: 60rpx;
			line-height: 60rpx;
			background: #2B85E4;
			color: #FFFFFF;
		}
	}
	table {
		width: 100%;
		text-align: center;
		border-collapse:collapse;
		font-size: 32rpx;
		background: #FFFFFF;
	}
	
	tr th {
		width: 50%;
		height: 60rpx;
	}
	tr td{
		width: 50%;
		height: 60rpx;
	}
</style>
