<template>
<div id="app">
  <smart-grid :data="data" @reload="reload" :event-hub="eventHub" :loading="loading" @pagination-change="query" @size-change="handleSizeChange" @page-change="handlePageChange" @all-select="handleAllSelect" @select="handleSelect" @dblclick="handleDbClick">
      <smart-grid-column label="性别" code="sex" width="120px" align="right"></smart-grid-column>
      <smart-grid-column label="年龄" code="age" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="班级" code="clazz.name" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="姓名" code="name">
        <template scope="props">
            <span>{{props.row.name}}</span>
            <span>{{props.row.sex}}</span>
            <span>{{props.row.age}}</span>
            <span>{{title}}</span>
          </tempate>
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
      console.log(size)
    },
    handlePageChange(page) {
      console.log(page)
      this.data = {
        content: [
          {
            name: '张三',
            sex: '男',
            clazz: {
              id: 1,
              name: '三班'
            },
            age: Math.random()
          },
          {
            name: '李四',
            sex: '女',
            clazz: {
              id: 2,
              name: '四班'
            },
            age: Math.random()
          },
          {
            name: '王五',
            sex: '女',
            clazz: {
              id: 3,
              name: '五班'
            },
            age: Math.random()
          }
        ],
        size: 10,
        totalPages: 15,
        totalElements: 108,
        number: page
      }
    },
    query({size, number}) {
      console.log('query', size, number)
    },
    handleAllSelect(select) {
      console.log(select)
    },
    handleSelect(row, select) {
      console.log(row, select)
    },
    handleDbClick(row) {
      console.log(row)
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
            clazz: {
              id: 1,
              name: '三班'
            }
          },
          {
            name: '李四',
            sex: '女',
            age: 23,
            clazz: {
              id: 2,
              name: '四班'
            }
          },
          {
            name: '王五',
            sex: '女',
            age: 17,
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
      this.loading = false
    }, 2000)
  }
}
</script>
