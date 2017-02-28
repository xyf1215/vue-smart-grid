<template>
</template>

<script>
export default {
  props: {
    label: String,
    code: String,
    width: String,
    align: String,
    valueset: Object
  },
  mounted() {
    this.$parent.addHeader(this)
  }
}
</script>
