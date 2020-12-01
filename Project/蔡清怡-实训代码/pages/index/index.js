//index.js  
//获取应用实例  
const app = getApp()  
Page({  
  data: {  
    movies:[  
    {url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3465660090,452828630&fm=26&gp=0.jpg'} ,  
    {url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2181628311,3480430109&fm=26&gp=0.jpg'} ,  
    {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=219442927,3690937730&fm=26&gp=0.jpg'} ,  
    {url:'https://s3.ax1x.com/2020/11/26/DwQpXn.jpg'}   
    ]  
  },  
  onLoad: function () {  
  },
  gotoPage1:function(){
    wx.navigateTo({
      url: '/pages/indexchild/get/get',
    })
  },
  gotoPage2:function(){
    wx.navigateTo({
      url: '/pages/indexchild/post/post',
    })
  },
  gotoPage3:function(){
    wx.navigateTo({
      url: '/pages/indexchild/select/select',
    })
  }
})  