<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container
				.modal-close(@click="handleClick")
					i.iconfont.icon-guanbi
						//-slot(name="close") &nbsp;
				.modal-content
					.content-bg
						img(src="~assets/redpack011.png")
					.user-icon
						img(:src="userInfo.wxPhoto")
					.button-circle
						slot(name="button") &nbsp;
</template>

<script>
export default {
	name: "modal",
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

<style scoped lang="stylus" src="../stylus/components/modal.styl"></style>
