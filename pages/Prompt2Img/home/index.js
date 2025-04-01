// pages/Prompt2Img/home/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    messageList: [
      {
        id: 0,
        role: 'assistant',
        content: '你好！我是生图助手，有什么可以帮你的吗？',
        picture: ''
      }
    ],
    classDictionary: {
      "红松": "生长轮明显，早晚材渐变。早材管胞呈现为方形及多边形，壁薄腔大。晚材管胞为长方形及方形，壁厚腔小，排列较整齐。",
      "水曲柳": "生长轮明显，环孔材，早材至晚材急变。早材管孔中至略大，单管孔，卵圆形，壁薄，部分含侵填体。晚材管孔略少，甚小，单管孔或径列复管孔，散生或斜列。",
    }
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  sendMessage() {
    const content = (this.data.inputValue || '').toString().trim();
    if (!content) return;
  
    // 添加用户消息
    const newMessageList = [...this.data.messageList];
    const userMsg = {
      id: newMessageList.length,
      role: 'user',
      content: content,
      picture: ''
    };
    newMessageList.push(userMsg);
  
    this.setData({
      messageList: newMessageList,
      inputValue: ''
    });
  
    // 检测树种关键词
    const treeTypes = Object.keys(this.data.classDictionary);
    
    // 查找匹配的树种
    const matchedTree = treeTypes.find(item => content.includes(item));

    setTimeout(() => {
      if (matchedTree) {
        // 生成回复消息
        const assistantMsg = {
          id: newMessageList.length + 1,
          role: 'assistant',
          content: `好的，这就为你生成${matchedTree}的横切面显微图像\n显著特征：\n${this.data.classDictionary[matchedTree]}`,
          picture: this.genpic(matchedTree)
        };
        
        newMessageList.push(assistantMsg);
        this.setData({
          messageList: newMessageList
        });
      } else {
        // 默认回复
        const defaultMsg = {
          id: newMessageList.length + 1,
          role: 'assistant',
          content: '我没有识别到您询问的树种信息',
          picture: ''
        };
        newMessageList.push(defaultMsg);
        this.setData({
          messageList: newMessageList
        });
      }
    }, 1000);
    
  },

  genpic(type) {
    const picapi = 'http://ec2-44-212-8-132.compute-1.amazonaws.com:8080/picture/';
    var randomv = Math.floor(Math.random() * 10) + 1;
    var typepinyin;

    if (type === '红松') {
      typepinyin = 'hongsong';
    } else if (type === '水曲柳') {
      typepinyin = 'shuiquliu';
    } 

    var result = picapi + typepinyin + randomv + '.jpg';
    console.log(result);
    return result;
  },

  // 生命周期函数保持不变
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
});