<template>
<div id="app">
  <smart-grid :data="data" :loading="loading" :multiple="true"
  @size-change="handleSizeChange"
  @page-change="handlePageChange"
  @all-select="handleAllSelect"
  @select="handleSelect"
  >
    <smart-grid-column label="姓名" code="name">
      <template scope="props">
          <span>{{props.row.name}}</span>
          <span>{{props.label}}</span>
          <span>{{title}}</span>
        </tempate>
      </smart-grid-column>
      <smart-grid-column label="性别" code="sex" width="120px" align="right"></smart-grid-column>
      <div slot="empty">没有数据...</div>
    </smart-grid>
  </div>
</template>

<script>
export default {
  name: 'app',
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
      // this.data = [
      //   {
      //     name: '张三',
      //     sex: '男',
      //     age: 33
      //   },
      //   {
      //     name: '李四',
      //     sex: '女',
      //     age: 23
      //   },
      //   {
      //     name: '王五',
      //     sex: '女',
      //     age: 17
      //   }
      // ]
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
        pageSize: 10,
        totalPages: 10,
        totalElements: 98,
        number: 0
      }
      this.loading = false
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
