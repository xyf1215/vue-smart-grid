<template>
<div id="app">
  <smart-grid
  :data="data"
  @reload="reload"
  :event-hub="eventHub"
  :show-pages="5"
  :loading="loading"
  :sizes="[10, 20, 50, 60]"
  :hidden-columns="hiddenColumns"
  @pagination-change="query"
  @size-change="handleSizeChange"
  @page-change="handlePageChange"
  @sort-change="handleSortChange"
  @all-select="handleAllSelect"
  @select="handleSelect"
  @dblclick="handleDblClick"
  @click="handleClick">
      <smart-grid-column label="性别" :sort="true" code="sex" width="120px" align="right"></smart-grid-column>
      <smart-grid-column label="年龄" :sort="true" code="age" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="类型" :sort="true" code="type" :valueset="{1: '牛', 2: '不牛'}" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="班级" code="clazz.name" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="姓名" code="name">
        <template scope="props">
            <span>{{props.row.name}}</span>
            <span>{{props.row.sex}}</span>
            <span>{{props.row.age}}</span>
            <span>{{title}}</span>
          </template>
      </smart-grid-column>
      <div slot="empty">没有数据...</div>
    </smart-grid>
    <button type="button" @click="toReload">reload</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      title: 'ABC',
      loading: true,
      data: {},
      hiddenColumns: ['age'],
      eventHub: new Vue()
    }
  },
  methods: {
    toReload() {
      this.eventHub.$emit('reload')
    },
    reload(params) {
      console.log('reload', params)
    },
    handleSizeChange(size) {
      // console.log(size)
    },
    handlePageChange(page) {
      // console.log(page)
    },
    query(params) {
      console.log('query', params)
    },
    handleAllSelect(select) {
      console.log(select)
    },
    handleSelect(row, select) {
      console.log(row, select)
    },
    handleDblClick(row) {
      console.log('dblclick', row)
    },
    handleClick(row) {
      console.log('click', row)
    },
    handleSortChange(params) {
      console.log('sort', params)
    }
  },
  created() {
    setTimeout(() => {
      this.data = {
        content: [
          {
            name: '张三',
            sex: '男',
            age: 33,
            type: 1,
            clazz: {
              id: 1,
              name: '三班'
            }
          },
          {
            name: '李四',
            sex: '女',
            age: 23,
            type: 2,
            clazz: {
              id: 2,
              name: '四班'
            }
          },
          {
            name: '王五',
            sex: '女',
            age: 17,
            type: 1,
            clazz: {
              id: 3,
              name: '五班'
            }
          }
        ],
        size: 10,
        totalPages: 15,
        totalElements: 108,
        number: 0
      }
      this.hiddenColumns.push('name')
      this.loading = false
    }, 1000)
  }
}
</script>
