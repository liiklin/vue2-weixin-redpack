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
						img(src="~assets/redpack01.png")
					.user-icon
						img(:src="userInfo.wxPhoto")
					.button-circle
						slot(name="button") &nbsp;
</template>

<script>
import propsync from '../mixins/propsync' //引入mixin文件

export default {
	name: "modal",
	mixins: [propsync],//声明使用propsync的mixin
	props: {
		showRedPackModal: {
			type: Boolean,
		},
	},
	data() {
		return {
			userInfo: {
				"wxPhoto": "http://wx.qlogo.cn/mmopen/D9auvJbDV7eMu4NNibU4o3DPlVI9wZnt1cGr5FGFho6tHY1OYBQ7q5hOR0gyLibKRZdq41DiaPynr5VsuJS2hO32v68yu5fmmSK/0"
			}
		}
	},
	methods: {
		close() {
			console.log("close")
			this.p_showRedPackModal = false
		},
		catchRedPack(){
			console.log("catchRedPack")
		},
		handleClick(evt) {
			this.$emit('click', evt)
		}
	}
}
</script>

<style scoped lang="stylus" src="../stylus/components/modal.styl"></style>
