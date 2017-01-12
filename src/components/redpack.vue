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
					.user-result-get(v-if="!hasRedpack")
						.user-result-get-top
							span 七弦琴国家平台
							span 恭喜您！
						.user-result-get-bottom
							span 抢到了
							span(v-text="cashNum")
							span 元红包
					.user-result-got(v-if="hasRedpack")
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
export default {
	name: "redpack",
	props: {
		hasRedpack: {
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
