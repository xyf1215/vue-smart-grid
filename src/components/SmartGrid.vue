<template>
  <div class="smart-grid">
    <div class="hidden">
      <slot></slot>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers">{{header.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in innerData">
          <td v-for="cell in row.cells">
            <smart-grid-cell :row-data="row.rowData" :code="cell.code" :label="cell.label" :default-slot-fn="cell.defaultSlotFn"></smart-grid-cell>
          </td>
        </tr>
      </tbody>
    </table>
    <smart-grid-pagination v-if="pageable"></smart-grid-pagination>
  </div>
</template>

<script>
import SmartGridCell from './SmartGridCell'
import SmartGridPagination from './SmartGridPagination'

export default {
  props: {
    data: [Object, Array],
    pageable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headers: {},
      innerData: []
    }
  },
  mounted() {
    this.translateData()
  },
  methods: {
    translateData() {
      if (this.data.length) {
        this.innerData = this.data.map(row => {
          return {
            rowData: row,
            cells: Object.keys(row).map(code => this.headers[code])
          }
        })
      }
    },
    addHeader(header) {
      const {label, code} = header
      this.headers[code] = {
        code,
        label,
        defaultSlotFn: header.$scopedSlots ? header.$scopedSlots.default : null
      }
    }
  },
  components: {
    SmartGridCell,
    SmartGridPagination
  }
}
</script>

<style lang="less" scoped>
.hidden {
  display: none;
  visibility: hidden;
}

table {
  width: 100%;
}
</style>
