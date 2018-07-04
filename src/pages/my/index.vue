<template>
  <div class="my-container">
    <view @click="handlerAvatarClick" class="head-panel">
      <i-avatar class="my-avatar" src="../../../static/image/avatar.jpg" size="large"></i-avatar>
      <div class="nickname">王一宁</div>
      <div class="intro">简介: 软件开发,爱看书,爱思考</div>
    </view>

    <i-panel class="cell-panel-demo">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">性别</view>
        </view>

        <view class="weui-cell__bd">
          <picker @change="bindSexPickerChange" :value="userInfo.gender" :range="array">
            <view class="weui-input">{{array[userInfo.gender]}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">生日</view>
        </view>
        <view class="weui-cell__bd">
          <picker mode="date" @change="bindBirthDateChange" :value="userInfo.birthDate" start="2015-09-01" end="2017-09-01">
            <view class="weui-input">{{userInfo.birthDate}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">家乡</view>
        </view>
        <view class="weui-cell__bd">
          <picker @change="bindHomePickerChange" :value="userInfo.native_address" :range="provinceList">
            <view class="weui-input">{{provinceList[userInfo.native_address]}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">所在地</view>
        </view>
        <view class="weui-cell__bd">
          <picker @change="bindAddressPickerChange" :value="userInfo.live_address" :range="provinceList">
            <view class="weui-input">{{provinceList[userInfo.live_address]}}</view>
          </picker>
        </view>
      </view>
    </i-panel>

    <i-panel class="cell-panel-demo">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">当前版本</view>
        </view>
        <view class="weui-cell__bd">
          <view class="weui-input">1.2.3</view>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">关于我们</view>
        </view>
        <view class="weui-cell__bd">
          <view class="weui-input"></view>
        </view>
      </view>
    </i-panel>
   <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">使用微信个人信息</button>
   <button @tap="handleClick">保存个人信息</button>
    <i-message id="message" />
    <i-toast id="toast" />

  </div>
</template>

<script>
import card from '@/components/card'
import utils from '@/utils'
// const { $Message } = require('../../../static/iview/base/index')
export default {
  data () {
    return {
      array: ['男', '女'],
      provinceList: [
        '北京',
        '天津',
        '河北',
        '山西',
        '内蒙古',
        '辽宁',
        '吉林',
        '黑龙江',
        '上海',
        '江苏',
        '浙江省',
        '安徽',
        '福建',
        '江西',
        '山东',
        '河南',
        '湖北',
        '湖南',
        '广东',
        '广西',
        '海南',
        '重庆',
        '四川',
        '贵州',
        '云南',
        '西藏',
        '陕西',
        '甘肃省',
        '青海',
        '宁夏',
        '新疆',
        '台湾',
        '香港特别行政区',
        '澳门'
      ],
      userInfo: {
        nick_name: '',
        avatar_url: '',
        gender: 0,
        birthDate: '2018-07-01',
        native_address: 0,
        live_address: 0,
        language: '',
        city: '',
        country: '',
        province: ''
      }
    }
  },

  components: {
    card
  },

  methods: {
    onGotUserInfo (data) {
      if (data.mp.detail.userInfo) {
        let wxUserInfo = data.mp.detail.userInfo
        console.log(wxUserInfo)
        this.userInfo.nick_name = wxUserInfo.nickName
        this.userInfo.avatar_url = wxUserInfo.avatarUrl

        this.userInfo.language = wxUserInfo.language
        this.userInfo.city = wxUserInfo.city
        this.userInfo.country = wxUserInfo.country
        this.userInfo.province = wxUserInfo.province

        this.userInfo.gender = wxUserInfo.gender - 1
        this.userInfo.live_address = this.provinceList.indexOf(wxUserInfo.province)
        this.userInfo.native_address = this.provinceList.indexOf(wxUserInfo.province)
      }
    },
    bindSexPickerChange (data) {
      this.userInfo.gender = data.mp.detail.value
    },
    bindHomePickerChange (data) {
      this.userInfo.native_address = data.mp.detail.value
    },
    bindAddressPickerChange (data) {
      this.userInfo.live_address = data.mp.detail.value
    },
    bindBirthDateChange (data) {
      this.userInfo.birthDate = data.mp.detail.value
    },
    handlerAvatarClick () {
      wx.navigateTo({
        url: '/pages/my/person/main'
      })
    },
    handleVoice () {
      wx.navigateTo({
        url: '/pages/my/voice/main'
      })
    },
    handleChange (data) {
      this.currentInfo = data.mp.detail.key
    },
    handleClick () {
      let userInfoDate = utils.deepClone(this.userInfo)
      console.log('========>', userInfoDate)
      userInfoDate.gender++
      userInfoDate.native_address = this.provinceList[userInfoDate.native_address]
      userInfoDate.live_address = this.provinceList[userInfoDate.live_address]
      console.log('========>', JSON.stringify(userInfoDate))

      // wx.request({
      //   url: 'https://qcs9kals.qcloud.la/weapp/save', // 仅为示例，并非真实的接口地址
      //   data: {userId: 1},
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   method: 'POST',
      //   success: function (res) {
      //     console.log(res.data)
      //     $Message({ content: res.data.data.user.home_province, type: 'success' })
      //   }
      // })
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
  }
}
</script>

<style scoped>
@import "../../../static/css/weui.wxss";
.head-panel {
  background-color: #3c3c3c;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.nickname {
  margin-top: 10px;
  font-size: 16px;
  color: #f2f2f2;
}

.intro {
  margin-top: 10px;
  font-size: 12px;
  color: #f2f2f2;
}
.cell-panel-demo {
  display: block;
  margin-top: 10px;
}
.my-avatar {
  height: 100px;
  width: 100px;
}
.my-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}

.my-title-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-title-info-more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 150px;
  color: #7f7f7f;
}

.address {
  font-size: 12px;
}

.weather_info_text {
  font-size: 12px;
  color: #7f7f7f;
}
.grid-image {
  transform: scale(0.8);
}
.grid-text {
  font-size: 12px;
}
</style>
