<script>
import {getObjDeepVal, isEmptyObject} from 'libs/lang'

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
    valueset: {
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
        return this.defaultSlotFn({
          row: Object.assign({}, this.rowData),
          rawRow: this.rowData,
          valueset: this.valueset
        })
      } else {
        let rowVal = getObjDeepVal(this.rowData, this.code)
        if (!isEmptyObject(this.valueset)) {
          rowVal = this.valueset[rowVal]
        }
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
