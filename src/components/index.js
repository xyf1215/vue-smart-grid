import SmartGrid from './SmartGrid.vue'
import SmartGridColumn from './SmartGridColumn.vue'

export let config = {
  dataNode: 'content',
  pageSize: 'pageSize',
  totalPages: 'totalPages',
  totalElements: 'totalElements',
  number: 'number'
}
SmartGrid.install = function(Vue, options) {
  Vue.mixin({
    components: {
      'smart-grid': SmartGrid,
      'smart-grid-column': SmartGridColumn
    }
  })
  if (options) {
    config = Object.assign({}, config, options)
  }
}
export default SmartGrid
