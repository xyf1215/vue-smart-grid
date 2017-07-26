# vue-smart-grid

> 基于Vue2开发的表格组件
> Custom Pagination beta!!!
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
  <smart-grid
  ref="grid"
  :data="data"
  seq="name"
  @reload="reload"
  :event-hub="eventHub"
  :show-pages="5"
  :loading="loading"
  :sizes="[10, 20, 50, 60]"
  :show-rows="2"
  @pagination-change="query"
  @size-change="handleSizeChange"
  @page-change="handlePageChange"
  @sort-change="handleSortChange"
  @all-select="handleAllSelect"
  @select="handleSelect"
  @dblclick="handleDblClick"
  @click="handleClick">
      <smart-grid-column label="性别" :sort="true" :hidden="sexShow" code="sex" width="120px" align="right"></smart-grid-column>
      <smart-grid-column label="年龄" :sort="true" code="age" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="类型" :sort="true" code="type" :valueset="{1: '牛', 2: '不牛'}" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="班级" code="clazz.name" width="120px" align="center"></smart-grid-column>
      <smart-grid-column label="姓名" code="name">
        <template scope="props">
          <span>{{props.row.name}}</span>
          <span>{{props.row.sex}}</span>
          <span>{{props.row.age}}</span>
          <span>{{title}}</span>
          <span>{{props.rowIndex}}{{props.cellIndex}}</span>
        </template>
      </smart-grid-column>
      <smart-grid-pagination>
        <template scope="props">
            <div class="smart-grid-pagination clearfix">
            {{props}}
            <div class="pull-left">
              共<span class="total">{{props.totalElements}}</span>条数据，每页显示
              <select class="form-control" @change="props.handleSizeChange">
                <option v-for="item in props.sizes" :value="item">{{item}}</option>
              </select>条记录
            </div>
            <div v-show="props.pages.length" class="pull-right">
              <ul class="pages list-unstyled">
                <li><button type="button" :disabled="props.start === props.number" @click="props.handleNumberChange(0)"><strong>|&lt;</strong></button></li>
                <li><button type="button" :disabled="props.start === props.number" @click="props.handleNumberChange(number - 1)"><strong>&lt;</strong></button></li>
                <li v-for="page in props.pages"><button type="button" :disabled="page === props.number" :class="{active: page === props.number}" @click="props.handleNumberChange(page)">{{page + 1}}</button></li>
                <li><button type="button" :disabled="props.end - 1 === props.number" @click="props.handleNumberChange(props.number + 1)"><strong>&gt;</strong></button></li>
                <li><button type="button" :disabled="props.end - 1 === props.number" @click="props.handleNumberChange(props.totalPages - 1)"><strong>&gt;|</strong></button></li>
              </ul>
            </div>
          </div>
      </template>
      </smart-grid-pagination>
      <div slot="empty">没有数据...</div>
    </smart-grid>
    <button type="button" @click="handleReload">reload</button>
    <button type="button" @click="handleCheckedRows">checked rows</button>

  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      title: 'ABC',
      loading: false,
      data: {
        content: [{
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
        },
        {
          name: '赵六',
          sex: '男',
          age: 1,
          type: 1,
          clazz: {
            id: 3,
            name: '五班'
          }
        },
        {
          name: '啊六',
          sex: '男',
          age: 1,
          type: 1,
          clazz: {
            id: 3,
            name: '五班'
          }
        }],
        totalElements: 11,
        totalPages: 2,
        last: true,
        number: 0,
        size: 20,
        sort: null,
        numberOfElements: 11,
        first: true
      },
      eventHub: new Vue(),
      sexShow: true
    }
  },
  methods: {
    handleReload() {
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
    },
    handleCheckedRows() {
      console.log(this.$refs.grid.getCheckedRows())
    }
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
### hoverable:Boolean
是否一个悬停，默认为true

### selectable:Boolean
是否可选择，默认为true

### seq:String
用户提升性能，避免更少的渲染，一般为"id"

### show-rows:Number
显示多少条，更多的通过显示更多显示

### inline-rows:Number
将row横向展示

### multiple:Boolean
是否为多选，默认为true

### show-pages:Number
分页默认展示的条数

### event-hub:Vue
触发vue-smart-gird事件时使用

### border:String
表格样式，默认'xy'，可取值：'xy','x','y','none'
'xy':x与y都会有边栏
x与y同理

### loading:Boolean
是否显示加载动画，默认为false

### hidden-column:Boolean
是否隐藏表头，默认为false

### sizes:Array
分页条数，默认"[10, 20, 50, 60]"

## 事件
### size-change
改变条数时会出发
可用pagination-change事件代替

### page-change
改变页数时会出发
可用pagination-change事件代替

### pagination-change
改变页数或条数时都会出发

### sort-change
触发排序时触发

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
### label:String
列的名称

### code:String
列的代码

### width:String
列的宽度

### align:String
对齐方式

### sort:Boolean
是否开启排序

### valueset:Object
代码集对象

### hidden
是否隐藏

## 方法
### getCheckedRows
获取当前选中的行
