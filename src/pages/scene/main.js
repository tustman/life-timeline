import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'usingComponents': {
      'i-button': '../../static/iview/button/index',
      'i-tabs': '../../static/iview/tabs/index',
      'i-tab': '../../static/iview/tab/index',
      'i-message': '../../static/iview/message/index',
      'i-tab-bar': '../../static/iview/tab-bar/index',
      'i-tab-bar-item': '../../static/iview/tab-bar-item/index',
      'i-row': '../../static/iview/row/index',
      'i-col': '../../static/iview/col/index',
      'i-grid': '../../static/iview/grid/index',
      'i-grid-item': '../../static/iview/grid-item/index',
      'i-grid-icon': '../../static/iview/grid-icon/index',
      'i-grid-label': '../../static/iview/grid-label/index',
      'i-avatar': '../../static/iview/avatar/index',
      'i-cell-group': '../../static/iview/cell-group/index',
      'i-cell': '../../static/iview/cell/index',
      'i-panel': '../../static/iview/panel/index',
      'i-toast': '../../static/iview/toast/index'
    },
    navigationBarTitleText: '智能场景',
    navigationBarBackgroundColor: '#FFF',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'black'
  }
}