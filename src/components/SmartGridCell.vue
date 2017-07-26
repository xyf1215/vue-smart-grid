<script>
import {getObjDeepVal, isEmptyObject} from 'libs/lang'

export default {
  name: 'smart-grid-cell',
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
    templateSlotFn: Function
  },
  render(h, context) {
    let $template = null
    if (context.props.templateSlotFn) {
      $template = context.props.templateSlotFn({
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
      $template = (<span>{rowVal}</span>)
    }
    return (<div>{$template}</div>)
  }
}
</script>
