<template>
  <div class="pagination clearfix">
    <div class="pull-left">
      共<span class="total">{{pagination[config.totalElements]}}</span>条数据，每页显示
      <select class="form-control" v-model="pagination[config.size]" @change="handleSizeChange">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>条记录
    </div>
    <div v-show="pages.length" class="pull-right">
      <ul class="pages list-unstyled">
        <li><button type="button" :disabled="start === pagination[config.number]" @click="handleNumberChange(0)"><strong>|&lt;</strong></button></li>
        <li><button type="button" :disabled="start === pagination[config.number]" @click="handleNumberChange(pagination[config.number] - 1)"><strong>&lt;</strong></button></li>
        <li v-for="page in pages"><button type="button" :disabled="page === pagination[config.number]" :class="{active: page === pagination[config.number]}" @click="handleNumberChange(page)">{{page + 1}}</button></li>
        <li><button type="button" :disabled="end - 1 === pagination[config.number]" @click="handleNumberChange(pagination[config.number] + 1)"><strong>&gt;</strong></button></li>
        <li><button type="button" :disabled="end - 1 === pagination[config.number]" @click="handleNumberChange(pagination[config.totalPages] - 1)"><strong>&gt;|</strong></button></li>
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
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      pages: [],
      config
    }
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
      this.calcShowPages()
    },
    calcShowPages() {
      this.pages = []
      let showPages = 10
      let start = 0
      let end = this.pagination[config.totalPages]
      if (showPages < end) {
        start = end = this.pagination[config.number]
        let isCalcStart = true
        while (showPages) {
          if (isCalcStart) {
            if (start) {
              start--
            } else {
              end++
            }
          } else {
            if (end < this.pagination[config.totalPages]) {
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
      const newSize = parseInt(this.pagination[config.size], 10)
      this.pagination[config.size] = newSize
      // size改变后将页数重置
      this.pagination[config.number] = 0
      this.$emit('size-change', newSize)
      this.handlePaginationChange({size: newSize, number: this.pagination[config.number]})
    },
    handleNumberChange(newNumber) {
      this.pagination[config.number] = newNumber
      this.$emit('page-change', newNumber)
      this.handlePaginationChange({size: this.pagination[config.size], number: newNumber})
    },
    handlePaginationChange(params) {
      this.$emit('pagination-change', params)
      this.calcShowPages()
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  font-size: 12px;
  margin-top: 10px;
  select {
    padding: 3px 6px;
    text-align: center;
    margin: 0 5px;
    outline: 0;
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
