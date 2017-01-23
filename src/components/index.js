import SmartGrid from './SmartGrid'
import SmartGridColumn from './SmartGridColumn'

export let config = {
  dataNode: 'content',
  size: 'size',
  totalPages: 'totalPages',
  totalElements: 'totalElements',
  number: 'number'
}

const install = function(Vue, options) {
  if (install.installed) {
    return
  }
  Vue.component('smart-grid', SmartGrid)
  Vue.component('smart-grid-column', SmartGridColumn)
  if (options) {
    config = Object.assign({}, config, options)
  }
}

export default {
  install
}
