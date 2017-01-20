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
            <smart-grid-cell ref="cell" :row-data="row.rowData" :code="cell.code" :label="cell.label" :default-slot-fn="cell.defaultSlotFn"></smart-grid-cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SmartGridCell from './SmartGridCell'
export default {
  props: {
    data: [Object, Array]
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
            cells: Object.keys(row).map(code => {
              const header = this.headers[code]
              const cell = {
                code,
                label: header.label
              }
              if (header && header.scopedSlots.default) {
                cell.defaultSlotFn = header.scopedSlots.default
              }
              return cell
            })
          }
        })
      }
    },
    addHeader(header) {
      const {label, code} = header
      this.headers[code] = {
        code,
        label,
        scopedSlots: header.$scopedSlots
      }
    }
  },
  components: {
    SmartGridCell
  }
}
</script>

<style lang="less" scoped>
.hidden {
  // display: none;
  // visibility: hidden;
}
</style>
