# vue-smart-grid

> 基于Vue2开发的表格组件

可基于源码二次开发
[github](https://github.com/xyf1215/vue-smart-grid)

## 使用
``````
import VueSmartGrid from 'vue-smart-grid'
import 'vue-smart-grid/dist/default.css'

Vue.use(VueSmartGrid)
``````
默认基于spring-data的分页参数，可以在install时传入options自定义
``````
Vue.use(VueSmartGrid, {
  dataNode: 'content', // 分页时的存放数据数组的名称
  size: 'size', // 每页显示多少条数据 默认10，20，50
  totalPages: 'totalPages', // 总页数
  totalElements: 'totalElements', // 总数量
  number: 'number' // 当前第几页，从0开始
})
``````
## 例子
``````
<template>
<div id="app">
  <smart-grid :data="data" @reload="reload" :event-hub="eventHub" :loading="loading" @pagination-change="query" @size-change="handleSizeChange" @page-change="handlePageChange" @all-select="handleAllSelect" @select="handleSelect" @dblclick="handleDblClick" @click="handleClick">
      <smart-grid-column label="性别" code="sex" width="120px" align="right"></smart-grid-column>
      <smart-grid-column label="年龄" code="age" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="类型" code="type" :valueset="{1: '牛', 2: '不牛'}" width="120px" align="center"></smart-grid-column>
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
    handleDblClick(row) {
      console.log('dblclick', row)
    },
    handleClick(row) {
      console.log('click', row)
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
      this.loading = false
    }, 2000)
  }
}
</script>

``````

## Smart-grid API
### data
支持两种格式，一种是普通数组格式，一种是带分页格式，上面例子为分页格式，数组格式如下：
``````
data: {
  {
    name: '张三',
    sex: '男',
    age: 33
  },
  {
    name: '李四',
    sex: '女',
    age: 23
  },
  {
    name: '王五',
    sex: '女',
    age: 17
  }
}
``````
### hoverable
是否一个悬停，默认为true

### selectable
是否可选择，默认为true

### multiple
是否为多选，默认为true

### show-pages
分页默认展示的条数

### event-hub
触发vue-smart-gird事件时使用

### border
表格样式，默认'xy'，可取值：'xy','x','y'
'xy':x与y都会有边栏
x与y同理

### loading
是否显示加载动画，默认为false

### hidden-column
是否隐藏表头，默认为false

## 事件
### size-change
改变条数时会出发

### page-change
改变页数时会出发

### pagination-change
改变页数或条数时都会出发

### dblclick
双击行时触发

### click
单击行时触发

### reload
重载（将会带当前的分页信息）

### select
选中、取消选中是会触发

### all-select
选中、取消全选时会触发

## Smart-grid-column API
### label
列的名称

### code
列的代码

### width
列的宽度

### align
对齐方式

### valueset
代码集对象
