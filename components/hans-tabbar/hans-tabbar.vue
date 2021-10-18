<template>
	<view class="weui-tabbar" :class="extClass">
		<!-- 选中的时候往weui-tabbar__item加class:weui-bar__item_on -->
		<view  @click="tabChange(index)" v-for="(item, index) in list" :key="index" class="weui-tabbar__item" :class="{'weui-bar__item_on':index === currents}">
			<view style="position: relative;display:inline-block;"><image :src="currents === index ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon"></image></view>
			<view class="weui-tabbar__label">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: function() {
				return []
			}
		},
		currents:{
			type:Number
		}
	},
	data() {
		return {
			extClass: '',
			current: 0
		};
	},
	methods: {
		tabChange(index) {
			if (index === this.currents) {
				return;
			}
			console.log(index)
			this.current = index;
			this.$emit('tabChange',index)
		}
	}
};
</script>

<style lang="scss" scoped >
.weui-tabbar {
	display: flex;
	position: relative;
	z-index: 500;
	background-color: #ffffff;
}
.weui-tabbar:before {
	content: ' ';
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1rpx solid rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.1);
}
.weui-tabbar__item {
	display: block;
	flex: 1;
	padding: 8px 0 4px;
	padding-bottom: calc(8px + constant(safe-area-inset-bottom));
	padding-bottom: calc(8px + env(safe-area-inset-bottom));
	font-size: 0;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-tabbar__item:first-child {
	padding-left: constant(safe-area-inset-left);
	padding-left: env(safe-area-inset-left);
}
.weui-tabbar__item:last-child {
	padding-right: constant(safe-area-inset-right);
	padding-right: env(safe-area-inset-right);
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
	color: #1296db;
}
.weui-tabbar__icon {
	display: inline-block;
	width: 28px;
	height: 28px;
	margin-bottom: 2px;
}
i.weui-tabbar__icon,
.weui-tabbar__icon > i {
	font-size: 24px;
	color: rgba(0, 0, 0, 0.5);
}
.weui-tabbar__icon image {
	width: 100%;
	height: 100%;
}
.weui-tabbar__label {
	color: #bfbfbf;
	font-size: 10px;
	line-height: 1.4;
}
</style>
