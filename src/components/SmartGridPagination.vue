<template>
  <div class="pagination clearfix">
    <div class="pull-left">
      共<span class="total">{{totalElements}}</span>条数据，每页显示
      <select class="form-control" v-model="size" @change="handleChangeSize">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>条记录
    </div>
    <div v-show="pages.length" class="pull-right">
      <ul class="pages list-unstyled">
        <li><button type="button" :disabled="start === number" @click="handleChangeNumber(0)"><strong>|&lt;</strong></button></li>
        <li><button type="button" :disabled="start === number" @click="handleChangeNumber(number - 1)"><strong>&lt;</strong></button></li>
        <li v-for="page in pages"><button type="button" :disabled="page === number" :class="{active: page === number}" @click="handleChangeNumber(page)">{{page + 1}}</button></li>
        <li><button type="button" :disabled="end - 1 === number" @click="handleChangeNumber(number + 1)"><strong>&gt;</strong></button></li>
        <li><button type="button" :disabled="end - 1 === number" @click="handleChangeNumber(totalPages - 1)"><strong>&gt;|</strong></button></li>
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
      size: 0,
      totalPages: 0,
      totalElements: 0,
      number: 0
    }
  },
  mounted() {
    this.initData()
  },
  watch: {
    pagination() {
      this.initData()
    }
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
      let start = 0
      let end = this.totalPages
      // let showPages = 10
      // if (this.totalPages > showPages) {
      //   start = this.number
      //   end = start + 1
      //   showPages--
      //   while (showPages) {
      //     console.log(showPages)
      //     if (showPages && end !== this.totalPages - 1) {
      //       end++
      //       showPages--
      //     }
      //     if (showPages && start !== 0) {
      //       start--
      //       showPages--
      //     }
      //   }
      // }
      this.start = start
      this.end = end
      while (start !== end) {
        this.pages.push(start)
        start++
      }
    },
    handleChangeSize() {
      const newSize = parseInt(this.size, 10)
      // const {size} = config
      this.size = newSize
      // this.pagination[size] = newSize
      this.$emit('size-change', newSize)
      this.calcShowPages()
    },
    handleChangeNumber(newNumber) {
      // const {number} = config
      this.number = newNumber
      // this.pagination[number] = newNumber
      this.$emit('page-change', newNumber)
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
          opacity: .8;
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
