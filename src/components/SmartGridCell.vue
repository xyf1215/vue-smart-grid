<script>
import {getObjDeepVal, isEmptyObject} from 'libs/lang'

export default {
  functional: true,
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
    rowIndex: Number,
    cellIndex: Number,
    defaultSlotFn: Function
  },
  render(h, context) {
    let $cell = null
    if (context.props.defaultSlotFn) {
      $cell = context.props.defaultSlotFn({
        row: {...context.props.rowData},
        rawRow: context.props.rowData,
        valueset: context.props.valueset,
        rowIndex: context.props.rowIndex,
        cellIndex: context.props.cellIndex
      })
    } else {
      let rowVal = getObjDeepVal(context.props.rowData, context.props.code)
      if (!isEmptyObject(context.props.valueset)) {
        rowVal = context.props.valueset[rowVal]
      }
      $cell = (<span>{rowVal}</span>)
    }
    return (<div>{$cell}</div>)
  }
}
</script>
