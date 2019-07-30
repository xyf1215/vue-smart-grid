// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSmartGrid from './package'
import VueI18n from 'vue-i18n'
import App from './App'
Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en'//, // set locale
  // messages: {
  //   'en': require('./locale/lang/en.js'),
  //   'th': require('./locale/lang/th.js'),
  //   'cn': require('./locale/lang/zh-CN.js')
  // }
})
// VueSmartGrid.i18n((key, value) => i18n.t(key, value))
Vue.use(VueSmartGrid, {dataNode: 'content'})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  i18n
})
