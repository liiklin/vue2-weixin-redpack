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
			span(v-text="article.content")
	#footer
		.button(@click="getRedpacket")
			span 一起去抢
	Modal(v-show="showRedPackModal" @click="closeRedPack")
		span(slot="button" @click="openRedpacket") 抢
	Redpack(v-show="showRedPackResultGetModal"
		v-bind:user-info="userInfo"
		v-bind:hasGot="!hasGot"
		v-bind:cashNum="cashNum"
		@click="closeRedPackGetResult"
		)
		span(slot="share" @click="share") 邀请好友一起抢
	Redpack(v-show="showRedPackResultGotModal"
		v-bind:user-info="userInfo"
		v-bind:hasGot="hasGot"
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

async function fetchArticleList(store) {
	return store.dispatch('getArticleList')
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
			userInfo: {
				"name": "创业小秘",
				"wxPhoto": "http://wx.qlogo.cn/mmopen/D9auvJbDV7eMu4NNibU4o3DPlVI9wZnt1cGr5FGFho6tHY1OYBQ7q5hOR0gyLibKRZdq41DiaPynr5VsuJS2hO32v68yu5fmmSK/0"
			},
			cashNum: "6.80",
			showRedPackModal: false,
			showRedPackResultGetModal: false,
			showRedPackResultGotModal: false,
			status: 0,
			hasGot: false
		}
	},
	computed: {
		...mapGetters([
			'getArticleList',
		])
	},
	methods: {
		openRedpacket() {
			this.closeRedPack()
			this.showRedPackResultGot()
		},
		getRedpacket() {
			if (this.hasGot) {
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
	async mounted() {
		console.log('mounted')
	}
}
</script>

<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
