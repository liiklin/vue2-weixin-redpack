<template lang="pug">
transition(name="modal")
  .modal-mask(@click="handleClick")
    .modal-wrapper
      .modal-container
        img.bg(src="~assets/shareBg.png")
        .content 请点击右上方分享按钮
</template>

<script>
  export default {
    name: "redpack",
    methods: {
  		handleClick(evt) {
  			this.$emit('click', evt)
  		}
  	}
  }
</script>

<style scoped lang="stylus">
@import '../stylus/components/shareModal'
</style>
