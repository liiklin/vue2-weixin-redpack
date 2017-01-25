<template lang="pug">
div
	#header
		#title
			span(v-text="article.title")
		#subTitle
			span(v-text="article.created")
			span(v-text="article.menu")
			span(v-text="article.wxmp")
	#number
		span.font(v-text="article.num")
		div
		div
		div
		div
	#body
		#img
			img(src="~assets/bg.png")
		#description
			div 焰火缤纷，琴曲欢快，春回大地，万物复苏。
			div 过去的一年，是一路（16）同行的一年；
			div 未来的一年，是一起（17）成长的一年。
			div 琴琴有压岁钱一份奉上，抢不到红包别伤心哦。
			div 当然作为一个有“节操”的知识产权生态平台公众号，
			div 小主们需要涨涨春节姿势，才能拿到这个福利哦。
			div
				img.bg1(src="~assets/contentBg1.png")
			div
				span 最早的压岁钱其实是钱币状的辟邪品，相传是为了吓跑一个叫“祟”的身黑手白小妖。
				span 看来这货妖力不足，比某城里的饕餮弱的多了。
			div 大门的“福”可不能倒贴。水缸，垃圾箱以及柜子才需要倒贴福字，这样就不会再倒水和倒垃圾的时候把家里的福气倒走啦，柜子也能吸引来很多的财气。
			div
				img.bg2(src="~assets/contentBg2.png")
			div 我们为您准备了随机的现金红包，
			div 大年三十到元宵节，记得呼朋唤友一起来抢哦。
			div 长按扫描关注七弦琴，即可领取。
			div
				img.bg3(src="~assets/contentBg3.png")
			div
				span 七弦琴国家平台致力于打造以知识产权服务与交易为核心，覆盖创新产业、创新产品和泛创新人群，以“让创新者先富起来”为战略使命，打造属于脑力劳动者的知识家园和收益平台。新的篇章即将奏起，我们在探索中勇往直前，独行的节拍太单调，七弦琴邀您一起出发。
	#footer
		img(src="~assets/detail-footer.jpg")
	#fixed-bottom
		.button(@click.capture="doGetRedpacket")
			span 一起抢
	//-未获得红包
	Modal(v-show="showRedPackModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="!hasRedpack"
		v-bind:cashNum="cashNum"
		v-bind:redpacketConfig="redpacketConfig"
		@click="closeRedPack"
		)
		span(slot="button" @click="openRedpacket") 抢
	//-获得红包
	Redpack(v-show="showRedPackResultGetModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="hasRedpack"
		v-bind:cashNum="cashNum"
		v-bind:robbed="'1002'"
		v-bind:redpacketConfig="redpacketConfig"
		@click="closeRedPackGetResult"
		)
		span(slot="share" @click="share") 邀请好友一起抢
	//-已经获得红包
	Redpack(v-show="showRedPackResultGotModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="hasRedpack"
		v-bind:cashNum="cashNum"
		v-bind:robbed="robbed"
		v-bind:redpacketConfig="redpacketConfig"
		@click="closeRedPackGotResult"
		)
		span(slot="share" @click="share") 邀请好友一起抢
	//-分享按钮
	ShareModal(v-show="showShare"
		@click="showShare = false"
		)
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'

import {
	MessageBox,
	Indicator
} from 'mint-ui'

import {
	wxShareConfig,
	makeAuthUrl
} from '../util/util'
import wx from 'wx'

import Modal from '../components/modal'
import ShareModal from '../components/shareModal'
import Redpack from '../components/redpack'

const queryString = require('query-string')

async function fetchUserInfo(store, wxId) {
	return store.dispatch('getUserInfo', {
		wxId
	})
}

async function fetchRepackConfig(store, wxId) {
	return store.dispatch('getRedpacketConfig', {
		wxId
	})
}

async function fetchHasRepack(store, wxId) {
	return store.dispatch('getHasRedpack', {
		wxId
	})
}

export default {
	components: {
		Modal,
		Redpack,
		ShareModal,
	},
	data() {
		return {
			article: {
				title: "关注七弦琴服务号 - 领取现金红包",
				created: "2017-01-26",
				menu: "",
				wxmp: "七弦琴",
				num: 30,
				content: "文章正文",
				img: "~assets/bg.png",
			},
			userInfo: {},
			redpacketConfig: {},
			cashNum: '',
			showRedPackModal: false,
			showRedPackResultGetModal: false,
			showRedPackResultGotModal: false,
			status: 0,
			hasRedpack: false,
			robbed: '', //红包状态
			canLoad: true,
			showShare: false
		}
	},
	computed: {
		...mapGetters([
			'getUserInfo',
			'getRedpacket',
			'getHasRedpack',
			'getRedpacketConfig',
		]),
		...mapActions([

		])
	},
	methods: {
		async openRedpacket() {
			let self = this,
				wxId = self.userInfo.id

			console.log(`self.canLoad==>${self.canLoad}`)
			if (!self.canLoad) { //防止重复提交
				return
			}
			self.canLoad = false
			Indicator.open('正在抢红包...')
			try {
				await self.$store.dispatch('getRedpacket', {
					wxId
				})
				// console.log(`hasRedpack==>${self.hasRedpack}`)
				let result = self.$store.getters.getRedpacket,
				// let result = {
				// 		"success": true,
				// 		"msg": "1002",
				// 		"data": {
				// 			"result_code": "SUCCESS",
				// 			"total_amount": 1.07,
				// 			"mch_id": "1325285501",
				// 			"err_code": "SUCCESS",
				// 			"mch_billno": "1325285501201701251815003114",
				// 			"send_listid": "1000041701201701253000112625272",
				// 			"wxappid": "wx788bea80b7764d78",
				// 			"return_msg": "发放成功",
				// 			"err_code_des": "发放成功",
				// 			"re_openid": "ot5hAwk0kFP5vdbo1QVYVr_YeMjE",
				// 			"return_code": "SUCCESS"
				// 		},
				// 		"rowcount": 0
				// 	},
					status = result.success,
					code = result.msg

				self.robbed = code
				Indicator.close()
					// code = '1008' //调试
				if (code == '1002') { // 获得红包
					console.log(`获得红包`)
					self.cashNum = Number(result.data.total_amount).toFixed(2)
					self.closeRedPack()
					self.showRedPackResultGet()
				} else if (code == '1001') { // 已经抢过
					self.closeRedPack()
					self.showRedPackResultGot()
						// MessageBox('提示', `${result.data.return_msg || result.msg}`)
				} else if (code == '1007') {
					self.canLoad = true
						// self.closeRedPack()
					MessageBox('提示', `${result.data.return_msg || result.msg}`)
				} else {
					self.closeRedPack()
					self.showRedPackResultGot()
				}
			} catch (e) {
				Indicator.close()
				self.canLoad = true
				console.error(`e=>>${e}`)
				MessageBox('提示', '网络似乎有点问题，请重新再试。')
			}
		},
		async doGetRedpacket() {
			Indicator.open('加载中...')
			let self = this
			try {
				await fetchHasRepack(self.$store, self.userInfo.id)
					self.robbed = self.$store.getters.getHasRedpack
				// self.robbed = '' //调试
				Indicator.close()
				if (self.robbed == '1007') { //异常
					MessageBox('提示', '获取红包失败，请重试。')
					return
				} else if (self.robbed == '') { //可以抢红包
					self.hasRedpack = false
				} else { //已经抢
					self.hasRedpack = true
				}
				// console.log(`doGetRedpacket==>${self.hasRedpack}`)
				if (self.hasRedpack) {
					self.showRedPackResultGot()
				} else {
					self.showRedPack()
				}
			} catch (e) {
				Indicator.close()
				console.error(`e=>>${e}`)
				MessageBox('提示', '网络似乎有点问题，请重新再试。')
			}
		},
		showRedPack() {
			this.showRedPackModal = true
		},
		showRedPackResultGet() {
			this.showRedPackResultGetModal = true
		},
		showRedPackResultGot() {
			this.showRedPackResultGotModal = true
		},
		closeRedPack() {
			this.showRedPackModal = false
		},
		closeRedPackGetResult() {
			this.showRedPackResultGetModal = false
		},
		closeRedPackGotResult() {
			this.showRedPackResultGotModal = false
		},
		closeShare() {
			this.showRedPackResultGotModal = false
		},
		share() {
			// this.closeRedPackGotResult()
			this.showShare = true
		}
	},
	computed: {},
	async mounted() {},
	async beforeMount() {
		// Indicator.open('加载中...')
		let self = this,
			search = queryString.parse(location.search),
			wxId = self.$route.query.id || search.id,
			paperId = self.$route.query.paperId

		// await Promise.all([fetchUserInfo(self.$store, wxId), fetchRepackConfig(self.$store, wxId)])
		await fetchUserInfo(self.$store, wxId)
		await fetchRepackConfig(self.$store, wxId)

		// console.log(self.$store.getters.getUserInfo)
		self.userInfo = self.$store.getters.getUserInfo
		self.redpacketConfig = self.$store.getters.getRedpackConfig
		let title = `${self.userInfo.name}邀请您一起抢红包`,
			// desc = '七弦琴国家知识产权平台祝您身体健康，阖家幸福！大年三十到元宵节，记得呼朋唤友一起来抢哦。',
			desc = '七弦琴祝您身体健康，阖家幸福！大年三十到元宵节，17场红包雨，记得呼朋唤友一起来抢哦...',
			// link = makeAuthUrl('weixin/redpack/index.html#/'),
			link = `weixin.7ipr.com/app/weixin/qrcode/index.html#/?id=${self.userInfo.id}`,
			imgUrl = 'http://weixin.7ipr.com/app/weixin/static/shareRedpack.jpg'
		wxShareConfig({
				title,
				desc,
				link,
				imgUrl
			})
			//移除loading
			// Indicator.close()
	}
}
</script>

<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
