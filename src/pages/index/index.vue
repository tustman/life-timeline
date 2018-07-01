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
          title: '中考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
        },
        {
          title: '高考毕业',
          desc: '我自认为考的很不错,结果确一般般,我自认为考的很不错,结果确一般般'
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
