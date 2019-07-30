import SmartGrid from './SmartGrid'
import SmartGridColumn from './SmartGridColumn'
import SmartGridPagination from './SmartGridPagination'
import locale from '../locale'

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
  locale.use(options.locale)
  locale.i18n(options.i18n)
  Vue.component(SmartGrid.name, SmartGrid)
  Vue.component(SmartGridColumn.name, SmartGridColumn)
  Vue.component(SmartGridPagination.name, SmartGridPagination)

  if (options) {
    config = Object.assign({}, config, options)
  }
}

export default {
  locale: locale.use,
  i18n: locale.i18n,
  install
}
