<template>
</template>

<script>
export default {
  props: {
    label: String,
    code: String,
    width: String,
    align: String
  },
  mounted() {
    this.$parent.addHeader(this)
  }
}
</script>
