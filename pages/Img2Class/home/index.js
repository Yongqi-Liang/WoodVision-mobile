// pages/Img2Class/home/index.js
Page({

  /**
   * 方法
   */
  handleTakePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'], // 强制调起摄像头
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        console.log('拍照成功，临时路径:', tempFilePath);
        
        // 跳转到结果页，携带图片临时路径
        wx.navigateTo({
          url: `/pages/Img2Class/detail/index?image=${encodeURIComponent(tempFilePath)}`,
        });
      },
      fail: (err) => {
        console.error('拍照失败:', err);
        wx.showToast({ title: '拍照失败', icon: 'none' });
      }
    });
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})