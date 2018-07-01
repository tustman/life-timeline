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
          <picker @change="bindSexPickerChange" :value="index" :range="array">
            <view class="weui-input">{{array[selectSex]}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">生日</view>
        </view>
        <view class="weui-cell__bd">
          <picker mode="date" @change="bindBirthDateChange" :value="birthDate" start="2015-09-01" end="2017-09-01">
            <view class="weui-input">{{birthDate}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">家乡</view>
        </view>
        <view class="weui-cell__bd">
          <picker @change="bindHomePickerChange" :value="selectProvince" :range="province">
            <view class="weui-input">{{province[selectHomeProvince]}}</view>
          </picker>
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd">
          <view class="weui-label">所在地</view>
        </view>
        <view class="weui-cell__bd">
          <picker @change="bindAddressPickerChange" :value="selectProvince" :range="province">
            <view class="weui-input">{{province[selectAddressProvince]}}</view>
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

    <i-message id="message" />
    <i-toast id="toast" />

  </div>
</template>

<script>
import card from '@/components/card'
const {$Message} = require('../../../static/iview/base/index')
export default {
  data () {
    return {
      array: ['男', '女'],
      selectSex: 0,
      birthDate: '2018-07-01',
      province: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江省', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃省', '青海', '宁夏', '新疆', '台湾', '香港特别行政区', '澳门'],
      selectHomeProvince: 0,
      selectAddressProvince: 0,
      buttonType: 'error',
      buttonValue: '关机',
      userInfo: {},
      currentInfo: 'homepage'
    }
  },

  components: {
    card
  },

  methods: {
    bindSexPickerChange (data) {
      this.selectSex = data.mp.detail.value
    },
    bindHomePickerChange (data) {
      this.selectHomeProvince = data.mp.detail.value
    },
    bindAddressPickerChange (data) {
      this.selectAddressProvince = data.mp.detail.value
    },
    bindBirthDateChange (data) {
      this.birthDate = data.mp.detail.value
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
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  @import "../../../static/css/weui.wxss";
  .head-panel{
    background-color: #3c3c3c;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .nickname {
    margin-top: 10px;
    font-size: 16px;
    color: #F2F2F2;
  }

  .intro {
    margin-top: 10px;
    font-size: 12px;
    color: #F2F2F2;
  }
  .cell-panel-demo{
    display: block;
    margin-top: 10px;
  }
  .my-avatar{
    height: 100px;
    width: 100px;
  }
  .my-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
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
    color: #7F7F7F;
  }

  .address {
    font-size: 12px;
  }

  .weather_info_text {
    font-size: 12px;
    color: #7F7F7F;
  }
  .grid-image{
    transform: scale(0.8);
  }
  .grid-text{
    font-size: 12px;
  }
</style>
