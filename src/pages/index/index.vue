<template>
  <div class="home-container">
    <view class="home-panel">
      <i-steps direction="vertical">
        <i-step v-for="(item, index) in lineList" :key="item.value">
          <view slot="title">
            {{item.title}}
          </view>
          <view slot="content">
            {{item.desc}}
          </view>
        </i-step>
      </i-steps>
    </view>
    <i-message id="message" />
  </div>
</template>

<script>
import card from '@/components/card'

const {$Message} = require('../../../static/iview/base/index')

export default {
  data () {
    return {
      verticalCurrent: 2,
      lineList: [
        {
          title: '1994年 | 出生',
          desc: '1994年,我出生在一个普通的农村家庭,对于这个世界的探索之旅从这里开始'
        },
        {
          title: '2002年 | 小学',
          desc: '2002年,跟随父母在郑州读小学, 郑州也承载了我童年全部的回忆'
        },
        {
          title: '2006年 | 初中',
          desc: '回老家县初中,读完了苦逼的初中,从步入初中开始,我慢慢知道自己有很多东西需要学习'
        },
        {
          title: '2009年 | 高中',
          desc: '监狱般的高中生活,除了学习还是学习,好在高考正常发挥,超了一本线10分'
        },
        {
          title: '2012年 | 大学',
          desc: '自由的大学生活,让我有了更多的独立思考时间,我不断在问自己,我要成为一个什么样的人?'
        },
        {
          title: '2016年 | 毕业',
          desc: '开始了我人生的一份工作,软件开发,打心里说我还是挺喜欢这工作,这行业的'
        }],
      switchValue: true,
      switchValue1: true,
      switchValue2: true,
      buttonType: 'error',
      buttonValue: '关机',
      userInfo: {},
      currentInfo: 'common',
      currentCount: 1,
      currentRoom: '常用'
    }
  },
  components: {
    card
  },
  created () {
    this.handleChange()
  },
  methods: {
    handleChange (data) {
      if (data) {
        this.currentInfo = data.mp.detail.key
      } else {
        this.currentInfo = 'common'
      }
      this.currentRoom = this.getCurrentRoom(this.currentInfo)
      if (this.currentInfo === 'nearby' || this.currentInfo === 'setting') {
        this.deviceList = []
        return
      }

      let deviceList = [
        {
          title: '智能灯泡',
          image: '/static/image/device_list_yeelight_real.png',
          isSwitch: true,
          label: '已开灯',
          value: true
        },
        {
          title: '米家台灯',
          image: '/static/image/pms1.jpg',
          isSwitch: true,
          label: '已关灯',
          value: false
        },
        {
          title: '米家电饭煲',
          image: '/static/image/pms2.png',
          label: '设备在线'
        },
        {
          title: '小米空气净化器',
          image: '/static/image/pms3.png',
          label: '设备离线'
        },
        {
          title: '米家扫地机器人',
          image: '/static/image/pms4.jpg',
          label: '设备在线'
        },
        {
          title: '米家恒温电水壶',
          image: '/static/image/pms5.jpg',
          label: '设备在线'
        },
        {
          title: '小米盒子3',
          image: '/static/image/pms6.jpg',
          label: '热播大片:归去来'
        }
      ]
      let countSize = Math.random() * deviceList.length
      let tempDeviceList = []
      for (let i = 0; i <= Math.floor(countSize / 2); i++) {
        let count = Math.random() * deviceList.length
        var index = Math.floor(count)
        tempDeviceList.push(deviceList[index])
      }
      this.deviceList = tempDeviceList
    },
    handleChangeDevice (device) {
      device.value = !device.value
      this.getStatus(device)
    },
    getStatus (device) {
      let status = ''
      if (!device) {
        device.label = status
        return
      }
      if (device.isSwitch) {
        if (device.value) {
          status = '已开灯'
        } else {
          status = '已关灯'
        }
      }
      device.label = status
    },
    getCurrentRoom (roomType) {
      let rooomInfo = {
        common: '常用',
        bedroom: '卧室',
        living: '客厅',
        kitchen: '厨房',
        nearby: '附近',
        setting: '设置'
      }
      return rooomInfo[roomType]
    },
    handleClick () {
      if (this.buttonType === 'success') {
        $Message({content: '电视已开机', type: 'success'})
        this.buttonValue = '关机'
        this.buttonType = 'error'
      } else if (this.buttonType === 'error') {
        $Message({content: '电视已关机', type: 'success'})
        this.buttonValue = '开机'
        this.buttonType = 'success'
      }
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  }
}
</script>

<style scoped>

  .home-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .home-panel{
    padding: 20px;
  }

</style>
