<template>
    <transition name="fade">
        <div class="modalx" v-show="options.show">
            <div class="modal-container" @click.self="closeModal()">
                <div class="modal-content" :style="{ width: options.width + 'px' }">
                    <div v-if="options.showCloseIcon" class="modal-close" @click.stop="options.show = false">&times;</div>
                    <div v-if="options.showHead" class="modal-head" >
                        <h4 class="modal-title">{{options.title}}</h4>
                    </div>
                    <div v-if="options.showBody" class="modal-body">
                        <slot></slot>
                    </div>
                    <div v-if="options.showFooter" class="modal-foot">
                        <button v-if="options.showOk" class="btn" :class="{ 'btn-primary': options.theme == 'primary',
						'btn-danger': options.theme == 'danger',
						'btn-success': options.theme == 'success',
						'btn-warning': options.theme == 'warning',
						'btn-default': options.theme == 'default',
						 'btn-info': options.theme == 'info' }"
                                @click.stop="options.onOkHandler()">{{options.okText}}</button>
                        <button class="btn btn-default" @click.stop="options.onCancleHandler()">{{options.cancleText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="stylus" scoped>
.modalx
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index 999
  overflow auto
  text-align center
  background fade(#2d323d, 75%)
  &.confirm
    .modal-body
      padding 36px 20px
      p
        margin-bottom 30px
      .buttons
        position absolute
        bottom 12px
        left 0
        right 10px
        text-align right
        button
          margin-right 2px
.modal-container
  width 100%
  display inline-block
  position relative
  text-align initial
.modal-content
  position relative
  box-shadow 0 3px 9px rgba(0,0,0,.5)
  border 1px solid #999
  outline 0
  background #f8f7fa
  left 50%
  top 40px
  margin-bottom 40px
  transform translate(-50%, 0)
.modal-head
  line-height 100%
  border-bottom 1px solid #e5e7ee
  border-top-left-radius 3px
  border-top-right-radius 3px
  background #fff
  min-height 90px
.modal-title
  font-size 24px
  text-align center
  color #373b4b
  line-height 40px
  padding 20px
.modal-tabs
  height 48px
  position relative
  bottom -1px
  background #fff
  li
    float left
    height 100%
    padding 0 20px
    margin 0 20px
    color #9ca2a9
    font-size 16px
    line-height 46px
    position relative
    cursor pointer
    bottom -1px
    &.active
      cursor default
      color #373b4b
      padding-bottom 0
      border-bottom 2px solid #33b38a
    i
      margin-right 8px
.modal-body
  padding 30px 45px
.modal-foot
  padding 15px
  text-align right
  border-top 1px solid #e5e5e5
  background #fff
  border-bottom-left-radius 3px
  border-bottom-right-radius 3px
  button
    margin-right 5px
.modal-close
  position absolute
  top -18px
  right -28px
  width 32px
  height 32px
  color #d5dae9
  font-size 22px
  font-family Tahoma
  line-height 32px
  text-align center
  cursor pointer
  &:hover
    color #fff
.btn
  display inline-block
  padding 6px 12px
  margin-bottom 0
  font-size 14px
  font-weight 400
  line-height 1.42857143
  text-align center
  white-space nowrap
  vertical-align middle
  touch-action manipulation
  cursor pointer
  user-select none
  background-image none
  border 1px solid transparent
  border-radius 4px
  &.btn-default
    color #333
    background-color #fff
    border-color #ccc
  &.btn-danger
    color #fff
    background-color #d9534f
    border-color #d43f3a
  &.btn-primary
    color #fff
    background-color #337ab7
    border-color #2e6da4
  &.btn-success
    color #fff
    background-color #5cb85c
    border-color #4cae4c
  &.btn-warning
    color #fff
    background-color #f0ad4e
    border-color #eea236
  &.btn-info
    color #fff
    background-color #5bc0de
    border-color #46b8da
</style>

<script>
	'use strict';
	export default {
		name: 'ModalX',
		props: {
			options: {
				type: Object,
				default: {}
			}
		},
		data () {
			return {
				defOpts: {
					show: false,
					title: 'Modal Title',
					width: '500',
					backdrop: 'normal',
					showCloseIcon: false,
					showOk: true,
					okText: 'OK',
					cancleText: 'Cancle',
					showBody: true,
					showFooter: true,
					showHead: true,
					onCancleHandler () {
						this.show = false
					},
					onOkHandler () {
						this.show = false
					},
					theme: 'primary'
				}
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._extend()
				document.body.appendChild(this.$el)
			})
		},
		destroyed: function () {
			this.$nextTick(function () {
			})
		},
		methods: {
			_extend () {
				let _opt = this.options
				let _def = this.defOpts
				for (let key in _def) {
					if (!(key in _opt)) {
						_opt[key] = _def[key]
					}
				}
			},
			closeModal () {
				if (this.options.backdrop === 'normal') {
					this.options.show = false
				}
			}
		},
		watch: {
		}
	}
</script>
