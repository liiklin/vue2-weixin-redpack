<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container
				.modal-close(@click="handleClick")
					i.iconfont.icon-guanbi
				.modal-content
					.content-bg
						img(src="~assets/redpack021.png")
					div(slot="result")
					.user-result-get(v-if="!hasRedpack")
						.user-result-get-top
							span 七弦琴国家平台
							//-span 恭喜您！
						.user-result-get-bottom
							span 恭喜您！抢到
							span(v-text="cashNum")
							span 元红包
					.user-result-got(v-if="hasRedpack")
						.user-result-got-top
							span {{ robbed | getNick(userInfo.name)}}
						.user-result-got-bottom(v-if="robbed == 1000")
							span 今天红包被抢光了，请明天再来...
						.user-result-got-bottom(v-if="robbed == 1001")
							//-span 红包已经给你抢走了！
							span 您绝对是抢红包高手
							br
							span(style="color:#f12528;") 3次机会已用完咯！
						.user-result-got-bottom(v-if="robbed == 1003")
							span 活动未开始！
							br
							span 活动时间：年三十至年初十五
						.user-result-got-bottom(v-if="robbed == 1004")
							span 活动已经结束！
							br
						.user-result-got-bottom(v-if="robbed == 1005")
							span 活动未开始！
							br
							span 活动时间：{{ redpacketConfig.begTimeEachDay }} 到 {{ redpacketConfig.endTimeEachDay }}
						.user-result-got-bottom(v-if="robbed == 1006")
							span 今天活动已结束！
							br
							span 活动时间：{{ redpacketConfig.begTimeEachDay }} 到 {{ redpacketConfig.endTimeEachDay }}
						.user-result-got-bottom(v-if="robbed == 1008")
							span 您今天已经领过了，请明天再来！
					.user-icon
						img(:src="userInfo.wxPhoto")
					.user-button
						slot(name="share") &nbsp;
</template>

<script>
export default {
	name: "redpack",
	props: {
		hasRedpack: {
			type: Boolean,
		},
		robbed:{
			type: String,
		},
		cashNum: {
			type: String,
		},
		redpacketConfig: {
			type: Object,
		},
		userInfo: {
			type: Object,
		}
	},
	data() {
		return {
		}
	},
	computed:{
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		}
	}
}
</script>

<style scoped lang="stylus" src="../stylus/components/redpack.styl"></style>
