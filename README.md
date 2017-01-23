# vue-smart-grid

> 基于Vue>=2.1开发的表格组件

可直接编译运行
[github](https://github.com/xyf1215/vue-smart-grid "Title")

## 使用
``````
import VueSmartGrid from 'vue-smart-grid'
Vue.use(VueSmartGrid)
``````
默认基于spring-data的分页参数，可以在install时传入option自定义
``````
Vue.use(VueSmartGrid, {
  dataNode: 'content',
  size: 'size',
  totalPages: 'totalPages',
  totalElements: 'totalElements',
  number: 'number'
})
``````
## 例子
``````
<template>
<div id="app">
  <smart-grid :data="data" :loading="loading" @size-change="handleSizeChange" @page-change="handlePageChange" @all-select="handleAllSelect" @select="handleSelect">
      <smart-grid-column label="性别" code="sex" width="120px" align="right"></smart-grid-column>
      <smart-grid-column label="年龄" code="age" width="120px" align="center"></smart-grid-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'ABC',
      loading: true,
      data: {}
    }
  },
  methods: {
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
            age: Math.random()
          },
          {
            name: '李四',
            sex: '女',
            age: Math.random()
          },
          {
            name: '王五',
            sex: '女',
            age: Math.random()
          }
        ],
        size: 10,
        totalPages: 11,
        totalElements: 108,
        number: page
      }
    },
    handleAllSelect(select) {
      console.log(select)
    },
    handleSelect(row, select) {
      console.log(row, select)
    }
  },
  created() {
    setTimeout(() => {
      this.data = {
        content: [
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
        ],
        size: 10,
        totalPages: 11,
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

### border
表格样式，默认'xy'，可取值：'xy','x','y'
'xy':x与y都会有边栏
x与y同理

### loading
是否显示加载动画，默认为false

### hiddenColumn
是否隐藏表头，默认为false

## Smart-grid-column API
### label
列的名称

### code
列的代码

### width
列的宽度

### align
对齐方式
