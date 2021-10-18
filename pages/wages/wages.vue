<template>
	<view class="wages">
		<view class="header">
			<view class="cxsj">查询时间</view>
			<view class="time" @click="show=true">{{nowDate}}</view>
			<view class="heji">合计:{{data && data.curr_money?data.curr_money:''}}</view>
		</view>
		<table border="1">
			<tr>
				<td>出勤时数</td>
				<td>{{data && data.work_number?data.work_number:''}}</td>
			</tr>
			<tr>
				<td>出勤天数</td>
				<td>{{data && data.work_day?data.work_day:''}}</td>
			</tr>
			<tr>
				<td>工时合计</td>
				<td>{{data && data.work_hour?data.work_hour:''}}</td>
			</tr>
			<tr>
				<td>计件量</td>
				<td>{{data && data.work_count?data.work_count:''}}</td>
			</tr>
			<tr>
				<td>小时工资（元/小时）</td>
				<td>{{data && data.hour_money?data.hour_money:''}}</td>
			</tr>
			<tr>
				<td>计件单价</td>
				<td>{{data && data.money_single?data.money_single:''}}</td>
			</tr>
			<tr>
				<td>计时工资</td>
				<td>{{data && data.hour_count?data.hour_count:''}}</td>
			</tr>
			<tr>
				<td>计件工资</td>
				<td>{{data && data.number_count?data.number_count:''}}</td>
			</tr>
			<tr>
				<td>餐补</td>
				<td>{{data && data.food?data.food:''}}</td>
			</tr>
			<tr>
				<td>产能绩效</td>
				<td>{{data && data.work_add?data.work_add:''}}</td>
			</tr>
			<tr>
				<td>部门奖惩</td>
				<td>{{data && data.work_float?data.work_float:''}}</td>
			</tr>
			<tr>
				<td>夜班补贴</td>
				<td>{{data && data.work_night?data.work_night:''}}</td>
			</tr>
			<tr>
				<td>安全奖</td>
				<td>{{data && data.safe?data.safe:''}}</td>
			</tr>
			<tr>
				<td>岗位补贴</td>
				<td>{{data && data.work_type_money?data.work_type_money:''}}</td>
			</tr>
			<tr>
				<td>在岗奖励</td>
				<td>{{data && data.work_stay_money?data.work_stay_money:''}}</td>
			</tr>
			<tr>
				<td>旷工扣款</td>
				<td>{{data && data.work_reduce?data.work_reduce:''}}</td>
			</tr>
			<tr>
				<td>水电费</td>
				<td>{{data && data.life?data.life:''}}</td>
			</tr>
			<tr>
				<td>住宿费</td>
				<td>{{data && data.saty?data.saty:''}}</td>
			</tr>
			<tr>
				<td>扣款合计</td>
				<td>{{data && data.reduce_count?data.reduce_count:''}}</td>
			</tr>
			<tr>
				<td>缓发</td>
				<td>{{data && data.slow_count?data.slow_count:''}}</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>{{data && data.remark?data.remark:''}}</td>
			</tr>
			<tr>
				<td>其它</td>
				<td>{{data && data.other?data.other:''}}</td>
			</tr>
			<tr>
				<td>应发工资</td>
				<td>{{data && data.count_money?data.count_money:''}}</td>
			</tr>
			<tr>
				<td>实发工资</td>
				<td>{{data && data.curr_money?data.curr_money:''}}</td>
			</tr>
		</table>
		<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker>
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
				nowDate: "",
				params: {
					year: true,
					month: true
				},
				show: false,
				data: {
					curr_money:"",
					work_number:"",
					work_day:"",
					work_hour:"",
					work_count:"",
					hour_money:"",
					money_single:"",
					hour_count:"",
					number_count:"",
					food:"",
					work_add:"",
					work_float:"",
					work_night:"",
					safe:"",
					work_type_money:"",
					work_stay_money:"",
					work_reduce:"",
					life:"",
					saty:"",
					reduce_count:"",
					slow_count:"",
					remark:"",
					other:"",
					count_money:""
				}
			}
		},
		mounted() {
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
				}).then(res => {
					if(res.data.code===1){
						this.data=res.data.data
					}
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
		border-collapse: collapse;
		font-size: 32rpx;
		background: #FFFFFF;
	}

	tr th {
		width: 50%;
		height: 60rpx;
	}

	tr td {
		width: 50%;
		height: 60rpx;
	}
</style>
