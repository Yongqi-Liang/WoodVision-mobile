// pages/Img2Class/home/index.js
Page({

  /**
   * 方法
   */
  handleTakePhoto() {
    // 1. 弹出选择菜单（拍照 or 相册）
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? ['camera'] : ['album']; // 0=拍照，1=相册
        
        // 2. 调用选择图片接口
        wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: sourceType, // 动态传入来源
          camera: 'back', // 仅拍照时生效
          success: (res) => {
            const tempFilePath = res.tempFiles[0].tempFilePath;
            console.log('选择成功，临时路径:', tempFilePath);
            
            // 跳转到结果页
            wx.navigateTo({
              url: `/pages/Img2Class/detail/index?image=${encodeURIComponent(tempFilePath)}`,
            });
          },
          fail: (err) => {
            console.error('选择图片失败:', err);
            wx.showToast({ title: '选择图片失败', icon: 'none' });
          }
        });
      },
      fail: (err) => {
        console.error('用户取消选择:', err);
        // 用户点击取消时不提示
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