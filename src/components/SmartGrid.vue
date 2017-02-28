<template>
  <div class="smart-grid" :class="{[border]: true, loading, hoverable, selectable, multiple}">
    <div class="hidden">
      <slot></slot>
    </div>
    <div class="layer"></div>
    <table>
      <thead v-if="!hiddenColumn">
        <tr>
          <th v-if="selectable && multiple" class="checkbox-row">
            <label class="grid-checkbox"><span class="checkbox-wrap" :class="{checked: allChecked}" @click="handleAllCheck"></span></label>
          </th>
          <th v-for="header in headers">{{header.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in innerData" @click="handleRowCheck(row, true)" :class="{checked: row.$checked}" @dblclick="handleDblClick(row)">
          <td v-if="selectable && multiple" class="checkbox-row">
            <label class="grid-checkbox"><span class="checkbox-wrap" :class="{checked: row.$checked}" @click.stop="handleRowCheck(row)"></span></label>
          </td>
          <td v-if="cell" v-for="cell in row.cells" :style="cell.style">
            <smart-grid-cell :row-data="row.rowData" :code="cell.code" :label="cell.label" :default-slot-fn="cell.defaultSlotFn"></smart-grid-cell>
          </td>
        </tr>
        <tr v-if="cellSize && empty">
          <td :colspan="cellSize"><slot name="empty"></slot></td>
        </tr>
      </tbody>
    </table>
    <smart-grid-pagination v-if="pageable"
      :pagination="data"
      :event-hub="eventHub"
      @size-change="size => {$emit('size-change', size)}"
      @page-change="page => {$emit('page-change', page)}"
      @pagination-change="params => {$emit('pagination-change', params)}"
      @reload="params => {$emit('reload', params)}">
    </smart-grid-pagination>
  </div>
</template>

<script>
import '../assets/styles/main.less'
import {isEmptyObject, isObject} from 'libs/lang'
import {config} from './index'
import SmartGridCell from './SmartGridCell'
import SmartGridPagination from './SmartGridPagination'
export default {
  props: {
    data: [Object, Array],
    hoverable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    border: {
      type: String,
      default: 'xy'
    },
    loading: {
      type: Boolean,
      default: false
    },
    hiddenColumn: {
      type: Boolean,
      default: false
    },
    eventHub: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pageable: false,
      headers: [],
      innerData: [],
      cellSize: 0,
      empty: false
    }
  },
  computed: {
    allChecked() {
      return this.innerData.length && this.innerData.every(({$checked}) => $checked)
    }
  },
  created() {
    this.initData()
  },
  watch: {
    data(val) {
      this.initData()
    }
  },
  methods: {
    initData() {
      if (!this.data) {
        return
      }
      if (isObject(this.data) && isEmptyObject(this.data)) {
        return
      }
      this.parseData()
    },
    parseData() {
      let innerData = this.data
      if (isObject(innerData)) {
        this.pageable = true
        innerData = innerData[config.dataNode] || []
      }
      this.innerData = innerData.map(row => {
        return {
          rowData: row,
          $checked: false,
          cells: this.headers
        }
      })
      this.empty = !this.innerData.length
      this.calcExpandCellSize()
    },
    handleAllCheck() {
      const checked = !this.allChecked
      this.innerData.forEach(item => {
        item.$checked = checked
      })
      this.$emit('all-select', checked)
    },
    handleRowCheck(row, onlyChecked = false) {
      if (!this.selectable) {
        return
      }
      if (onlyChecked) {
        if (this.multiple) {
          return
        }
        this.innerData.forEach(item => {
          item.$checked = false
        })
      }
      row.$checked = !row.$checked
      this.$emit('select', row.rowData, row.$checked)
    },
    handleDblClick(row) {
      this.$emit('dblclick', row.rowData)
    },
    addHeader(header) {
      const {label, code} = header
      this.headers.push({
        code,
        label,
        style: this.extractHeaderStyle(header),
        defaultSlotFn: header.$scopedSlots ? header.$scopedSlots.default : null
      })
      this.cellSize ++
    },
    extractHeaderStyle(header) {
      const {width, align} = header
      const style = {}
      if (width) {
        style.width = width
      }
      if (align) {
        style.textAlign = align
      }
      return style
    },
    calcExpandCellSize() {
      if (this.selectable && this.multiple) {
        this.cellSize ++
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
.smart-grid {
  &.selectable:not(.multiple) {
    td {
      cursor: pointer;
    }
    tr.checked td {
      background-color: #eff7ff;
    }
  }
  &.hoverable tbody tr:hover td {
    transition: all .3s;
    background-color: #f5f4f1;
  }
  &.x {
    td, th {
      border-left: none!important;
      border-right: none!important;
    }
  }
  &.y {
    td, th {
      border-top: none!important;
      border-bottom: none!important;
    }
  }
  table {
    border-spacing: 0;
    width: 100%;
  }
  thead + tbody tr:first-child td {
    border-top: 0;
  }
  th, td {
    padding: 8px 12px;
    &.checkbox-row {
      width: 30px;
      text-align: center;
    }
  }
  th {
    background-color: #fbfaf7;
    border: 1px solid #e4e4dc;
    color: #333;
    font-size: 14px;
    &:not(:first-child) {
      border-left: 0;
    }
    &:not(:last-child) {
      border-right: 0;
    }
  }
  tr:last-child td {
    border-bottom: 1px solid #f2f1ec;
  }
  td {
    color: #666;
    font-size: 12px;
    border: 1px solid #f2f1ec;
    border-bottom: 0;
    &:not(:first-child) {
      border-left: 0;
    }
    &>.empty-cell {
      display: inline-block;
      height: 14px;
      width: 14px;
    }
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(../assets/images/loading.gif) no-repeat center center rgba(192, 192, 192, .5);
    z-index: -1;
    opacity: 0;
  }
  &.loading {
    position: relative;
    .layer {
      transition: all .3s;
      z-index: 1;
      opacity: 1;
    }
  }
}
.hidden {
  display: none;
  visibility: hidden;
}

.grid-checkbox {
  display: inline-block;
  height: 14px;
  width: 14px;
  line-height: 14px;
  overflow: hidden;
  .checkbox-wrap {
    display: inline-block;
    background-color: #fff;
    border: 1px solid #e4e4dc;
    height: 100%;
    width: 100%;
    &::after {
      background-color: #0c8fd3;
      content: " ";
      display: inline-block;
      margin: 1px;
      height: 10px;
      width: 10px;
      opacity: 0;
      cursor: pointer;
    }
    &.checked {
      &::after {
        transition: all .3s;
        opacity: 1;
      }
    }
  }
}
</style>
