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
  watch: {
    // 'data.size'(size, oldSize) {
    //   console.log('watch-' + size, oldSize)
    // },
    // 'data.number'(number) {
    //   this.data = {
    //     content: [
    //       {
    //         name: '张三',
    //         sex: '男',
    //         age: 33
    //       },
    //       {
    //         name: '李四',
    //         sex: '女',
    //         age: 23
    //       },
    //       {
    //         name: '王五',
    //         sex: '女',
    //         age: 17
    //       }
    //     ],
    //     size: 10,
    //     totalPages: 11,
    //     totalElements: 108,
    //     number
    //   }
    //   console.log('watch-' + number)
    // }
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
