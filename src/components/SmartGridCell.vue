<script>
export default {
  props: {
    label: String,
    code: String,
    rowData: {
      type: Object,
      default() {
        return {}
      }
    },
    defaultSlotFn: Function
  },
  methods: {
    renderCell(h) {
      if (this.defaultSlotFn) {
        return this.defaultSlotFn({row: this.rowData, label: this.label, code: this.code})
      } else {
        return (<span>{this.rowData[this.code]}</span>)
      }
    }
  },
  render(h) {
    return (
      <div>{this.renderCell(h)}</div>
    )
  }
}
</script>
