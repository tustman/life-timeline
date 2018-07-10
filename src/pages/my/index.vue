<template>
  <div class="my-container">
    <div v-if="userInfoAuth">
      <view class="head-panel">

        <div v-if="login">
          <i-avatar class="my-avatar" :src="userInfo.avatar_url" size="large"></i-avatar>
          <div class="nickname">{{userInfo.nick_name}}</div>
        </div>
        <div v-else @click="handleLogin">
          <i-avatar class="my-avatar" src="../../../static/image/boy.png" size="large"></i-avatar>
          <div class="nickname">登录/注册</div>
        </div>

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
            <picker mode="date" @change="bindBirthDateChange" :value="userInfo.birthdate" start="1970-01-01" :end="nowDate">
              <view class="weui-input">{{userInfo.birthdate}}</view>
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

      <button v-if="login" style="background-color: #3c3c3c;color: #f2f2f2;" @click="handleLogout">退出登录</button>
    </div>
    <div v-else>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="handleGetUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import utils from '@/utils'
import http from '../../utils/http'
const dayjs = require('dayjs')
// const { $Message } = require('../../../static/iview/base/index')
export default {
  data () {
    return {
      userInfoAuth: false,
      array: ['未知', '男', '女'],
      login: false,
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
        birthdate: '2000-01-01',
        native_address: -1,
        live_address: -1,
        language: '',
        city: '',
        country: '',
        province: ''
      }
    }
  },
  computed: {
    nowDate () {
      return dayjs().format('YYYY-MM-DD')
    }
  },
  components: {
    card
  },

  methods: {
    handleGetUserInfo (data) {
      if (data.mp.detail.userInfo) {
        let wxUserInfo = data.mp.detail.userInfo
        this.userInfoAuth = true
        // 1. 根据用户信息回显个人信息
        this.handleUserInfoShow(wxUserInfo)
        // 2. 登录获取skey,并保存在本地,将个人信息保存在数据库
        this.handleLogin()
      }
    },
    saveUserInfo2DB () {
      http.request('/weapp/getOpenId')
    },
    handleUserInfoShow (wxUserInfo) {
      this.userInfo.nick_name = wxUserInfo.nickName
      this.userInfo.avatar_url = wxUserInfo.avatarUrl

      this.userInfo.language = wxUserInfo.language
      this.userInfo.city = wxUserInfo.city
      this.userInfo.country = wxUserInfo.country
      this.userInfo.province = wxUserInfo.province

      this.userInfo.gender = wxUserInfo.gender
      this.userInfo.live_address = this.provinceList.indexOf(wxUserInfo.province)
      this.userInfo.native_address = this.provinceList.indexOf(wxUserInfo.province)
    },
    bindSexPickerChange (data) {
      this.userInfo.gender = data.mp.detail.value
      let postData = {gender: this.userInfo.gender}
      let sessionKey = wx.getStorageSync('skey')
      http.request('/weapp/updateUserInfo', {skey: sessionKey, userInfo: JSON.stringify(postData)}).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
    bindHomePickerChange (data) {
      this.userInfo.native_address = data.mp.detail.value
      let postData = {native_address: this.userInfo.native_address}
      let sessionKey = wx.getStorageSync('skey')
      http.request('/weapp/updateUserInfo', {skey: sessionKey, userInfo: JSON.stringify(postData)}).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
    bindAddressPickerChange (data) {
      this.userInfo.live_address = data.mp.detail.value
      let postData = {live_address: this.userInfo.live_address}
      let sessionKey = wx.getStorageSync('skey')
      http.request('/weapp/updateUserInfo', {skey: sessionKey, userInfo: JSON.stringify(postData)}).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
    bindBirthDateChange (data) {
      this.userInfo.birthdate = data.mp.detail.value
      let postData = {birthdate: this.userInfo.birthdate}
      let sessionKey = wx.getStorageSync('skey')
      http.request('/weapp/updateUserInfo', {skey: sessionKey, userInfo: JSON.stringify(postData)}).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange (data) {
      this.currentInfo = data.mp.detail.key
    },
    handleLogout () {
      this.login = false
      this.userInfo = {}
      this.userInfoAuth = false
      wx.removeStorage({key: 'skey'})
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    handleLogin () {
      wx.showLoading({
        title: '登录中'
      })
      let that = this
      wx.login({
        success: function (res) {
          if (res.code) {
            let loginData = {code: res.code}
            if (that.userInfo.avatar_url) {
              loginData.userInfo = JSON.stringify(that.userInfo)
            }
            // 1. 登录成功, 获取skey, 并存入本地
            http.request('/weapp/login', loginData).then(response => {
              wx.setStorageSync('skey', response.data.data.skey)
              if (response.data.data.user) {
                let postData = response.data.data.user
                if (postData.birthdate) {
                  let realBirthdate = dayjs(postData.birthdate).format('YYYY-MM-DD')
                  postData.birthdate = realBirthdate
                }
                postData = utils.removeEmptyProperty(postData)
                Object.assign(that.userInfo, postData)
                that.userInfo = response.data.data.user
              }
              wx.hideLoading()
              that.login = true
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    handleGetUserInfoFromDb () {
    },
    checkLogin () {
      wx.showLoading({
        title: '登录中'
      })
      let that = this
      let sessionKey = wx.getStorageSync('skey')
      if (sessionKey) {
        wx.checkSession({
          // session_key 有效(未过期)
          success: function () {
            // 业务逻辑处理
            // 根据skey获取用户信息保存到本地
            http.request('/weapp/getUserInfo', {skey: sessionKey}).then(response => {
              that.login = true
              let postData = response.data.data.userInfo
              if (postData.birthdate) {
                let realBirthdate = dayjs(postData.birthdate).format('YYYY-MM-DD')
                postData.birthdate = realBirthdate
              }
              postData = utils.removeEmptyProperty(postData)
              Object.assign(that.userInfo, postData)
              wx.hideLoading()
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
            })
          },
          // session_key 过期
          fail: function () {
            // session_key过期，重新登录
            that.handleLogin()
          }
        })
      } else {
        // 无skey，作为首次登录
        // doLogin()
        that.handleLogin()
      }
    }
  },
  created () {
    let that = this
    this.checkLogin()
    wx.getSetting({
      success: (res) => {
        if (res.authSetting && res.authSetting['scope.userInfo']) {
          that.userInfoAuth = true
        }
      }
    })
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
