<script>
export default {
  props: {
    label: String,
    code: String,
    width: String,
    align: String,
    valueset: Object,
    hidden: Boolean,
    sort: Boolean
  },
  watch: {
    hidden(val) {
      this.$parent.setHeaderHidden(this, val)
    }
  },
  mounted() {
    this.$parent.addHeader(this)
  },
  render(h) {
    return null
  }
}
</script>
