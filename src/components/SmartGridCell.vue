<script>
import {getObjDeepVal} from 'libs/lang'
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
        return this.defaultSlotFn({row: Object.assign({}, this.rowData), rawRow: this.rowData})
      } else {
        const rowVal = getObjDeepVal(this.rowData, this.code)
        return (<span>{rowVal}</span>)
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
