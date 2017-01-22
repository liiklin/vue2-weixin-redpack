import wx from 'wx'

// 微信分享配置
export const wxShareConfig = ({
  title,
  desc,
  link,
  imgUrl
}, success, fail) => {
  console.log('wxShare Config')
  wx.ready(() => {
    // “分享给朋友”
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: success,
        fail: fail
      })
      // “分享到朋友圈”
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })

    // 分享到QQ
    wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: success,
        fail: fail
      })
      // 分享到腾讯微博
    wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: success,
        fail: fail
      })
      // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })
  })
}

export const makeAuthUrl = (baseUrl) => {
  let callBackUrl = encodeURIComponent(`http://weixin.7ipr.com/app/WxBus/auth?url=${baseUrl}`)
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx788bea80b7764d78&redirect_uri=${callBackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
