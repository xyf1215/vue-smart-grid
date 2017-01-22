<template>
  <div class="pagination clearfix">
    <div class="pull-left">
      共<span class="total">{{totalElements}}</span>条数据，每页显示
      <select class="form-control" v-model="size" @change="$emit('size-change', size)">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>条记录
    </div>
    <div v-show="pages.length" class="pull-right">
      <ul class="pages list-unstyled">
        <li class="prev"><button type="button" :disabled="startPage === number" @click="$emit('page-change', number - 1)">&lt;</button></li>
        <li v-for="page in pages"><button type="button" :disabled="page === number" :class="{active: page === number}" @click="$emit('page-change', page)">{{page + 1}}</button></li>
        <li class="next"><button type="button" :disabled="endPage === number" @click="$emit('page-change', number + 1)">&gt;</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: Number,
    totalPages: Number,
    totalElements: Number,
    number: Number
  },
  data() {
    return {
      size: this.pageSize,
      startPage: 0,
      endPage: 0,
      pages: []
    }
  },
  mounted() {
    this.calcShowpPages()
  },
  watch: {
    number() {
      this.calcShowpPages()
    }
  },
  methods: {
    calcShowpPages() {
      let showPages = 10
      let startPage = 0
      let endPage = this.totalPages
      if (this.totalPages > showPages) {
        startPage = endPage = this.number
        showPages--
        while (showPages) {
          if (showPages && startPage !== 0) {
            startPage--
            showPages--
          }
          if (showPages && endPage !== this.totalPages - 1) {
            endPage++
            showPages--
          }
        }
      }
      this.startPage = startPage
      this.endPage = endPage
      while (startPage !== endPage) {
        this.pages.push(startPage)
        startPage++
      }
      this.$emit('page-change', 1)
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
    .prev, .next {
      button {
        font-weight: bold;
      }
    }
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
