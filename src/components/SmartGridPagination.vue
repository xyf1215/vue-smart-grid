

<script>
import {isEmptyObject, isObject} from 'libs/lang'
import {config} from './index'
export default {
  name: 'smart-grid-pagination',
  props: {
    customTemplate: {
      type: Boolean,
      default: true
    },
    templateSlotFn: Function,
    pagination: {
      type: Object,
      default() {
        return {}
      }
    },
    eventHub: {
      type: Object,
      default() {
        return {}
      }
    },
    innerEventHub: {
      type: Object,
      default() {
        return {}
      }
    },
    showPages: {
      type: Number,
      default: 10
    },
    sizes: {
      type: Array,
      default() {
        return [10, 20, 50]
      }
    }
  },
  watch: {
    pagination() {
      this.initData()
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      pages: [],
      size: 0,
      totalPages: 0,
      totalElements: 0,
      number: 0
    }
  },
  created() {
    this.eventHub.$on && this.eventHub.$on('reload', this.handleReload)
    this.innerEventHub.on && this.innerEventHub.on('sort-change', this.handleSortChange)
  },
  mounted() {
    if (this.customTemplate) {
      this.$parent.addCustomPagination(this)
    } else {
      this.initData()
    }
  },
  methods: {
    createDefaultTemplate() {
      let $pages = null
      if (this.pages.length) {
        $pages = (
          <div class="pull-right">
            <ul class="pages list-unstyled">
              <li><button type="button" disabled={this.start === this.number} on-click={() => this.handleNumberChange(0)}><strong>|&lt;</strong></button></li>
              <li><button type="button" disabled={this.start === this.number} on-click={() => this.handleNumberChange(this.number - 1)}><strong>&lt;</strong></button></li>
              {this.pages.map(page => (<li><button type="button" disabled={page === this.number} class={{active: page === this.number}} on-click={() => this.handleNumberChange(page)}>{page + 1}</button></li>))}
              <li><button type="button" disabled={this.end - 1 === this.number} on-click={() => this.handleNumberChange(this.number + 1)}><strong>&gt;</strong></button></li>
              <li><button type="button" disabled={this.end - 1 === this.number} on-click={() => this.handleNumberChange(this.totalPages - 1)}><strong>&gt;|</strong></button></li>
            </ul>
          </div>
        )
      }
      return (
        <div class="smart-grid-pagination clearfix">
          <div class="pull-left">
            共<span class="total">{this.totalElements}</span>条数据，每页显示
            <select class="form-control" on-change={e => {
              this.sync('size', e.target.value)
              this.handleSizeChange()
            }}>
              {this.sizes.map(item => (<option value={item}>{item}</option>))}
            </select>条记录
          </div>
          {$pages}
        </div>
      )
    },
    sync(prop, value) {
      this[prop] = value
    },
    initData() {
      if (!this.pagination) {
        return
      }
      if (isObject(this.pagination) && isEmptyObject(this.pagination)) {
        return
      }
      this.parseData()
      this.calcShowPages()
    },
    parseData() {
      const {size, totalPages, totalElements, number} = config
      this.size = this.pagination[size]
      this.totalPages = this.pagination[totalPages]
      this.totalElements = this.pagination[totalElements]
      this.number = this.pagination[number]
    },
    calcShowPages() {
      this.pages = []
      let showPages = this.showPages
      let start = 0
      let end = this.totalPages
      if (showPages < this.totalPages) {
        start = end = this.number
        let isCalcStart = true
        while (showPages) {
          if (isCalcStart) {
            if (start) {
              start--
            } else {
              end++
            }
          } else {
            if (end < this.totalPages) {
              end++
            } else {
              start--
            }
          }
          isCalcStart = !isCalcStart
          showPages--
        }
      }
      this.start = start
      this.end = end
      while (start < end) {
        this.pages.push(start)
        start++
      }
    },
    handleSizeChange() {
      const {size, number} = config
      const newSize = parseInt(this.size, 10)
      this.size = this.pagination[size] = newSize
      // size改变后将页数重置
      this.number = this.pagination[number] = 0
      this.$emit('size-change', newSize)
      this.handlePaginationChange({size: newSize, number: this.number})
    },
    handleNumberChange(newNumber) {
      const {number} = config
      this.number = this.pagination[number] = newNumber
      this.$emit('page-change', newNumber)
      this.handlePaginationChange({size: this.size, number: newNumber})
    },
    handlePaginationChange(params) {
      if (typeof params.number !== undefined) {
        params.page = params.number
      }
      this.$emit('pagination-change', params)
      this.calcShowPages()
    },
    handleSortChange() {
      this.number = this.pagination[number] = 0
      const {size, number} = this
      const params = {size, number, page: number}
      this.$emit('sort-change', params)
      this.calcShowPages()
    },
    handleReload() {
      const {size, number} = this
      const params = {size, number, page: number}
      this.$emit('reload', params)
    }
  },
  render(h) {
    let $template = null
    if (this.templateSlotFn) {
      $template = this.templateSlotFn({
        totalElements: this.totalElements,
        size: this.size,
        sizes: this.sizes,
        number: this.number,
        start: this.start,
        end: this.end,
        page: this.page,
        handleSizeChange: this.handleSizeChange,
        handleNumberChange: this.handleNumberChange
      })
    } else {
      $template = this.createDefaultTemplate()
    }
    return (<div>{$template}</div>)
  }
}
</script>