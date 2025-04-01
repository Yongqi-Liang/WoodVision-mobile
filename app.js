// app.js
App({
  onLaunch() {
    // ===== 新增：强制关闭 vConsole 调试模式 =====
    if (typeof wx.setEnableDebug === 'function') {
      wx.setEnableDebug({
        enableDebug: false // 关闭调试模式
      });
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})