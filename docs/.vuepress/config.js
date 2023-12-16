module.exports = {
  title: '喜鹊DesignUI',
  base:'/xiquess-design/',
  description: '基于vue2的组件库，专门提供一些常见组件库中没有的特殊组件',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    //导航
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/componentDocs/' },
      { text:'更新日志',link:'/update/index' },
      { text: '喜鹊声声官网', link: 'https://www.xiquess.com' },
    ],
    sidebar: {
      '/componentDocs/': [
        {
          title: '简介',
          path:'/componentDocs/'
        },
        {
          title: '快速开始',
          path:'/componentDocs/start'
        },
        {
          title: '视频播放器',
          path:'/componentDocs/videoPlayer'
        },
        {
          title: '富文本输入框',
          path:'/componentDocs/Editor'
        },
        {
          title: '微信表情包',
          path:'/componentDocs/Emoji'
        },
        {
          title: '验证码',
          path:'/componentDocs/Captcha'
        },
        {
          title: '图片预览',
          path:'/componentDocs/ImgPreviewer'
        },
        {
          title: '可拖拽标签页',
          path:'/componentDocs/Tabs'
        },
        {
          title: '标签',
          path:'/componentDocs/Tag'
        },
        {
          title: '多选选择器',
          path:'/componentDocs/Select'
        },
      ]
    }
  }
}
