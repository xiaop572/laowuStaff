<template>
	<view>工资</view>
</template>

<script>
	import {req} from '../../util/request.js'
	export default{
		onLoad() {
			req('/api/money/hour',{
				time:'2021-10',
				page:'1'
			}).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style>
</style>
