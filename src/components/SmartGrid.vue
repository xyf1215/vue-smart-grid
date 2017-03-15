<template>
  <div class="smart-grid" :class="{[border]: true, loading, hoverable, selectable, multiple}">
    <div class="hidden">
      <slot></slot>
    </div>
    <div class="layer"></div>
    <table>
      <thead v-if="!hiddenColumn">
        <tr>
          <th v-if="selectable && multiple" class="checkbox-cell">
            <label class="grid-checkbox">
              <span class="checkbox-wrap" :class="{checked: allChecked}" @click="handleAllCheck"></span>
            </label>
          </th>
          <th v-if="timeline" class="timeline"></th>
          <th v-for="header in headers" v-if="hiddenColumns.indexOf(header.code) === -1" :style="header.style" :class="{sort: header.sort, [header.sortDirection]: true}" @click="handleSort(header)">
            {{header.label}}
            <span class="sort-place"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in innerData"
          :key="key ? key : rowIndex"
          v-if="showAllMore || rowIndex < showRows"
          @click="handleRowCheck(row, true)"
          :class="{checked: row.$checked}"
          @dblclick="handleDblClick(row)">
          <td v-if="selectable && multiple" class="checkbox-cell">
            <label class="grid-checkbox">
              <span class="checkbox-wrap"
                :class="{checked: row.$checked}"
                @click.stop="handleRowCheck(row)"></span>
            </label>
          </td>
          <td v-if="timeline" class="timeline"></td>
          <td v-if="hiddenColumns.indexOf(cell.code) === -1 && cell" v-for="(cell, cellIndex) in row.cells" :style="cell.style">
            <smart-grid-cell
              :row-index="rowIndex"
              :cell-index="cellIndex"
              :row-data="row.rowData"
              :code="cell.code"
              :label="cell.label"
              :valueset="cell.valueset"
              :default-slot-fn="cell.defaultSlotFn"></smart-grid-cell>
          </td>
        </tr>
        <tr v-if="innerData.length >= showRows">
          <td :colspan="cellSize" @click="handleShowMore" class="show-more">{{showAllMore ? '收起更多' : '显示更多'}}</td>
        </tr>
        <tr v-if="cellSize && empty">
          <td :colspan="cellSize"><slot name="empty"></slot></td>
        </tr>
      </tbody>
    </table>
    <smart-grid-pagination v-if="pageable"
      :pagination="data"
      :event-hub="eventHub"
      :inner-event-hub="innerEventHub"
      :show-pages="showPages"
      :sizes="sizes"
      @sort-change="handleSortChange"
      @size-change="params => $emit('size-change', params)"
      @page-change="params => $emit('page-change', params)"
      @pagination-change="handlePaginationChange"
      @reload="handleReload">
    </smart-grid-pagination>
  </div>
</template>

<script>
import EventEmitter from 'event-emitter'
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
    timeline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    hiddenColumn: {
      type: Boolean,
      default: false
    },
    hiddenColumns: {
      type: Array,
      default() {
        return []
      }
    },
    showRows: {
      type: Number,
      default: 100
    },
    key: String,
    eventHub: Object,
    showPages: Number,
    sizes: Array
  },
  data() {
    return {
      pageable: false,
      headers: [],
      innerData: [],
      cellSize: 0,
      empty: false,
      showAllMore: false,
      innerEventHub: EventEmitter({})
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
      this.handleClick(row)
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
    handleClick(row) {
      this.$emit('click', row.rowData)
    },
    addHeader(header) {
      const {label, code, valueset, sort} = header
      this.headers.push({
        code,
        label,
        valueset,
        sort,
        sortDirection: '',
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
    },
    handleShowMore() {
      this.showAllMore = !this.showAllMore
    },
    handleSort(header) {
      if (!header.sort) {
        return
      }
      this.headers.forEach(item => {
        if (item.sort) {
          if (header.code === item.code) {
            header.sortDirection = header.sortDirection === '' ? 'desc' : header.sortDirection === 'desc' ? 'asc' : 'desc'
          } else {
            item.sortDirection = ''
          }
        }
      })
      this.innerEventHub.emit('sort-change')
    },
    fillEventParams(params) {
      if (!params) {
        return
      }
      const sortHeader = this.headers.filter(({sort, sortDirection}) => sort && sortDirection)[0]
      if (sortHeader) {
        const {code, sortDirection} = sortHeader
        params.sortCode = code
        params.sortDirection = sortDirection
      }
    },
    handleSortChange(params) {
      this.fillEventParams(params)
      this.$emit('sort-change', params)
    },
    handlePaginationChange(params) {
      this.fillEventParams(params)
      this.$emit('pagination-change', params)
    },
    handleReload(params) {
      this.fillEventParams(params)
      this.$emit('reload', params)
    }
  },
  components: {
    SmartGridCell,
    SmartGridPagination
  }
}
</script>

<style lang="less">
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
  &.none {
    td, th {
      border: none!important;
      border: none!important;
    }
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
    &.checkbox-cell {
      width: 30px;
      text-align: center;
    }
    &.timeline {
      width: 30px;
      text-align: center;
    }
    &:not(:first-child) {
      border-left: 0;
    }
    text-align: left;
  }
  th {
    background-color: #fbfaf7;
    border: 1px solid #e4e4dc;
    color: #333;
    font-size: 14px;
    .sort-place {
      display: none;
    }
    &.sort {
      cursor: pointer;
      transition: all .3s;
      &.asc, &.desc {
        background-color: #e7f6fd;
      }
      &.asc .sort-place {
        background: url(../assets/images/asc.png) no-repeat center center;
      }
      &.desc .sort-place {
        background: url(../assets/images/desc.png) no-repeat center center;
      }
      .sort-place {
        display: inline-block;
        position: relative;
        top: 2px;
        width: 14px;
        height: 14px;
        background: url(../assets/images/sort.png) no-repeat center center;
        transition: all .3s;
      }
    }
  }
  tr {
    &:first-child td {
      &.timeline::before {
        top: 50%;
      }
    }
    &:last-child td {
      border-bottom: 1px solid #f2f1ec;
      &.timeline::before {
        bottom: 50%;
      }
    }
  }
  td {
    color: #666;
    font-size: 12px;
    border: 1px solid #f2f1ec;
    border-bottom: 0;
    &>.empty-cell {
      display: inline-block;
      height: 14px;
      width: 14px;
    }
    &.show-more {
      text-align: center;
      cursor: pointer;
    }
    &.timeline {
      position: relative;
      &::before, &::after {
        content: ' ';
        position: absolute;
        display: inline-block;
      }
      &::before {
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-1.5px);
        width: 3px;
        background-color: #4db5e6;
      }
      &::after {
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transform: translate(-9px, -9px);
        border: 1px solid #fff;
        background-color: #4db5e6;
      }
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
    text-align: center;
  }
  &.loading {
    position: relative;
    .layer {
      transition: all .3s;
      z-index: 1;
      opacity: 1;
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
    border-radius: 4px;
    border: 1px solid #e4e4dc;
    overflow: hidden;
    .checkbox-wrap {
      display: inline-block;
      position: relative;
      background-color: #fff;
      height: 100%;
      width: 100%;
      &::before, &::after {
        content: " ";
        display: inline-block;
        opacity: 0;
      }
      &::before {
        position: absolute;
        width: 5px;
        height: 10px;
        top: -1px;
        right: 2.5px;
        transform: rotate(45deg) scale(.7);
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
      }
      &::after {
        background-color: #0c8fd3;
        height: 100%;
        width: 100%;
        cursor: pointer;
        border-radius: 2px;
      }
      &.checked {
        &::before, &::after {
          transition: all .15s;
          opacity: 1;
        }
      }
    }
  }
}
</style>
