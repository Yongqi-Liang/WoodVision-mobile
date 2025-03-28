// pages/Img2Class/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    fileSize: '计算中...',
    predictedLabel: '计算中...',
    description: '',
  },

  // 计算文件大小
  calculateFileSize(filePath) {
    wx.getFileSystemManager().stat({
      path: filePath,
      success: (res) => {
        const size = res.stats.size;
        const formattedSize = this.formatFileSize(size);
        this.setData({ fileSize: formattedSize });
      },
      fail: (err) => {
        console.error('获取文件信息失败:', err);
        this.setData({ fileSize: '获取大小失败' });
      }
    });
  },

  // 格式化文件大小
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  },

  // 上传图片并获取预测结果
  uploadAndPredict(filePath) {
    wx.showLoading({
      title: '识别中...',
    });

    wx.uploadFile({
      url: 'http://ec2-44-212-8-132.compute-1.amazonaws.com:8080/predict',
      filePath: filePath,
      name: 'Image',
      formData: {},
      header: {
        'Content-Type': 'multipart/form-data'
      },
      success: (res) => {
        wx.hideLoading();
        try {
          const data = JSON.parse(res.data);
          if (data.predictedLabel) {
            this.setData({
              predictedLabel: data.predictedLabel,
              description: data.description
            });
          } else {
            this.setData({
              predictedLabel: '识别失败'
            });
            console.error('API返回数据格式异常:', data);
          }
        } catch (e) {
          this.setData({
            predictedLabel: '解析失败'
          });
          console.error('解析API响应失败:', e);
        }
      },
      fail: (err) => {
        wx.hideLoading();
        this.setData({
          predictedLabel: '请求失败'
        });
        console.error('API请求失败:', err);
        wx.showToast({
          title: '识别请求失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.image) {
      const imagePath = decodeURIComponent(options.image);
      this.setData({ imagePath });
      this.calculateFileSize(imagePath); // 直接使用局部变量
      this.uploadAndPredict(imagePath);
    }
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