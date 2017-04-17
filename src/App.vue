<template>
<div id="app">
  <smart-grid :data="data" :inline-rows="6" :loading="loading" :selectable="false" :hoverable="false" border="none" hidden-column @pagination-change="query">
      <smart-grid-column>
        <template scope="props">
          <span>{{props.row.name}}</span>
          <span>{{props.row.sex}}</span>
          <span>{{props.row.age}}</span>
          <span>{{title}}</span>
          <span>{{props.rowIndex}}{{props.cellIndex}}</span>
        </template>
      </smart-grid-column>
      <div slot="empty">没有数据...</div>
    </smart-grid>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
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
        totalPages: 1,
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
  }
}
</script>
