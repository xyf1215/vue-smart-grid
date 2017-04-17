<template>
  <div class="smart-grid-pagination clearfix">
    <div class="pull-left">
      共<span class="total">{{totalElements}}</span>条数据，每页显示
      <select class="form-control" v-model="size" @change="handleSizeChange">
        <option v-for="item in sizes" :value="item">{{item}}</option>
      </select>条记录
    </div>
    <div v-show="pages.length" class="pull-right">
      <ul class="pages list-unstyled">
        <li><button type="button" :disabled="start === number" @click="handleNumberChange(0)"><strong>|&lt;</strong></button></li>
        <li><button type="button" :disabled="start === number" @click="handleNumberChange(number - 1)"><strong>&lt;</strong></button></li>
        <li v-for="page in pages"><button type="button" :disabled="page === number" :class="{active: page === number}" @click="handleNumberChange(page)">{{page + 1}}</button></li>
        <li><button type="button" :disabled="end - 1 === number" @click="handleNumberChange(number + 1)"><strong>&gt;</strong></button></li>
        <li><button type="button" :disabled="end - 1 === number" @click="handleNumberChange(totalPages - 1)"><strong>&gt;|</strong></button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {isEmptyObject, isObject} from 'libs/lang'
import {config} from './index'
export default {
  props: {
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
    this.initData()
  },
  methods: {
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
  }
}
</script>
<style lang="less">
.smart-grid-pagination {
  font-size: 12px;
  margin-top: 10px;
  select {
    padding: 3px 6px;
    text-align: center;
    margin: 0 5px;
    outline: 0;
    border-radius: 4px;
  }
  .total {
    color: #f33;
    padding: 0 5px;
  }
  .pages {
    display: inline-block;
    li {
      display: inline-block;
      margin: 2px;
      button {
        outline: 0;
        padding: 0;
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e5e5e5;
        background-color: #fafafa;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 14px;
        color: #666;
        transition: all .3s;
        &[disabled] {
          opacity: .6;
          cursor: not-allowed;
        }
        &:hover:not([disabled]) {
          border-color: #f24f44;
          color: #f24f44;
        }
        &.active {
          border-color: #f24f44!important;
          background-color: #f48565!important;
          color: #fff!important;
        }
      }
    }
  }
}
</style>
