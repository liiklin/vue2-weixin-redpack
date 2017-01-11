<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container
				.modal-close(@click="handleClick")
					i.iconfont.icon-guanbi
				.modal-content
					.content-bg
						img(src="~assets/redpack02.png")
					div(slot="result")
					.user-result-get(v-if="!hasGot")
						.user-result-get-top
							span 七弦琴国家平台
							span 恭喜您！
						.user-result-get-bottom
							span 抢到了
							span(v-text="cashNum")
							span 元红包
					.user-result-got(v-if="hasGot")
						.user-result-got-top
							span 幸运的 {{ userInfo.name }}，
						.user-result-got-bottom
							span 红包已经给你抢走了！
					.user-icon
						img(:src="userInfo.wxPhoto")
					.user-button
						slot(name="share") &nbsp;
</template>

<script>
// import propsync from '../mixins/propsync' //引入mixin文件

export default {
	name: "redpack",
	// mixins: [propsync],//声明使用propsync的mixin
	props: {
		hasGot: {
			type: Boolean,
		},
		cashNum: {
			type: String,
		},
		userInfo: {

		}
	},
	data() {
		return {
		// 	userInfo: {
		// 		"name":"创业小秘",
		// 		"wxPhoto": "http://wx.qlogo.cn/mmopen/D9auvJbDV7eMu4NNibU4o3DPlVI9wZnt1cGr5FGFho6tHY1OYBQ7q5hOR0gyLibKRZdq41DiaPynr5VsuJS2hO32v68yu5fmmSK/0"
		// 	},
		// 	cashNum:6.80
		}
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		}
	}
}
</script>

<style scoped lang="stylus" src="../stylus/components/redpack.styl"></style>
