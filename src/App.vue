<template>
  <div id="app">
    <smart-grid :data="data">
      <smart-grid-column label="姓名" code="name">
        <template scope="props">
          <div>{{props.row.name}}</div>
          <div>{{props.label}}</div>
          <div>{{title}}</div>
        </tempate>
      </smart-grid-column>
      <smart-grid-column label="性别" code="sex">
        
      </smart-grid-column>
    </smart-grid>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'ABC',
      data: [
        {
          name: '张三',
          sex: '男'
        },
        {
          name: '李四',
          sex: '女'
        }
      ]
    }
  },
  created() {
    // setTimeout(() => {
    //   this.title = '11'
    // }, 5000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
