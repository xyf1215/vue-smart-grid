<template>
  <div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    code: String
  },
  mounted() {
    this.$parent.addHeader(this)
  }
}
</script>

<style lang="less" scoped>

</style>
