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
			img(:src="article.img")
		#description
			span(v-html="redpacketConfig.memo")
	#footer
		.button(@click="doGetRedpacket")
			span 一起去抢
	Modal(v-show="showRedPackModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="!hasRedpack"
		v-bind:cashNum="cashNum"
			@click="closeRedPack"
		)
		span(slot="button" @click="openRedpacket") 抢
	Redpack(v-show="showRedPackResultGetModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="!hasRedpack"
		v-bind:cashNum="cashNum"
		@click="closeRedPackGetResult"
		)
		span(slot="share" @click="share") 邀请好友一起抢
	Redpack(v-show="showRedPackResultGotModal"
		v-bind:user-info="userInfo"
		v-bind:hasRedpack="hasRedpack"
		v-bind:cashNum="cashNum"
		@click="closeRedPackGotResult"
		)
		span(slot="share" @click="share") 邀请好友一起抢
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'

import Modal from '../components/modal'
import Redpack from '../components/redpack'

const queryString = require('query-string')

async function fetchUserInfo(store, wxId) {
	return store.dispatch('getUserInfo', {
		wxId
	})
}

async function fetchRepackConfig(store) {
	return store.dispatch('getRedpacketConfig')
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
	},
	data() {
		return {
			article: {
				title: "关注七弦琴公众号 - 领取现金红包",
				created: "2017-01-04",
				menu: "灵通琴",
				wxmp: "七弦琴资讯",
				num: 30,
				content: "文章正文",
				img: "",
			},
			userInfo: {},
			redpacketConfig: {},
			cashNum: '',
			showRedPackModal: false,
			showRedPackResultGetModal: false,
			showRedPackResultGotModal: false,
			status: 0,
			hasRedpack: false,
			canLoad: true,
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

			if (!self.canLoad) {
				return
			}
			self.canLoad = false

			try {
				await self.$store.dispatch('getRedpacket', {
					wxId
				})
				let result = self.$store.getters.getRedpacket,
					status = result.success
				if (status) { // 获得红包
					self.cashNum = `${result.data.total_amount}`
					self.hasRedpack = true
					self.closeRedPack()
					self.showRedPackResultGet()
				} else {
					self.canLoad = true
					alert(result.data.return_msg || result.msg)
				}
			} catch (e) {
				self.canLoad = true
				console.log(`e=>>${e}`)
				alert('网络似乎有点问题，请重新再试')
			}
		},
		doGetRedpacket() {
			if (this.hasRedpack) {
				this.showRedPackResultGot()
			} else {
				this.showRedPack()
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
		share() {
			console.log('share')
		}
	},
	computed: {},
	async mounted() {

	},
	async beforeMount() {
		let self = this,
			search = queryString.parse(location.search),
			wxId = self.$route.query.id || search.id,
			paperId = self.$route.query.paperId

		await fetchUserInfo(self.$store, wxId)
		await fetchHasRepack(self.$store, wxId)
		await fetchRepackConfig(self.$store)

		self.hasRedpack = self.$store.getters.getHasRedpack
		self.userInfo = self.$store.getters.getUserInfo
		self.redpacketConfig = self.$store.getters.getRedpackConfig
	}
}
</script>

<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
