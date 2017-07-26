import SmartGrid from './SmartGrid'
import SmartGridColumn from './SmartGridColumn'
import SmartGridPagination from './SmartGridPagination'

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
  Vue.component(SmartGrid.name, SmartGrid)
  Vue.component(SmartGridColumn.name, SmartGridColumn)
  Vue.component(SmartGridPagination.name, SmartGridPagination)

  if (options) {
    config = Object.assign({}, config, options)
  }
}

export default {
  install
}
