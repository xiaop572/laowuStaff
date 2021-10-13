<template>
	<view class="field">
		<image src="../../static/contact.png" mode="widthFix" class="banner"></image>
		<table border="1">
				<tr>
					<th>驻场名称</th>
					<th>联系电话</th>
				</tr>
				<tr v-for="(item, index) in fieldList" :key="item.id">
					<td>{{item.name}}</td>
					<td>{{item.mobile}}</td>
				</tr>
		</table>

	</view>
</template>

<script>
	import {
		req
	} from '../../util/request.js'
	export default {
		data() {
			return {
				fieldList: []
			}
		},
		methods: {

		},
		onLoad() {
			req('/api/factory/index').then(res => {
				if (res.data.code === 1) {
					this.fieldList = res.data.data;
				}
			})
		}
	}
</script>

<style lang="less">
	.banner{
		width:100%;
	}
	table {
		width: 100%;
		text-align: center;
		border-collapse:collapse;
		font-size: 32rpx;
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
