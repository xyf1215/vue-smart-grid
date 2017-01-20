import SmartGrid from './SmartGrid.vue'
import SmartGridColumn from './SmartGridColumn.vue'

export default {
  install(Vue, options) {
    Vue.mixin({
      components: {
        'smart-grid': SmartGrid,
        'smart-grid-column': SmartGridColumn
      }
    })
  }
}
