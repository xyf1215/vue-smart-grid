<template>
  <div>
    <div class="smart-grid-pagination clearfix">
    <div class="pull-left">
      <span class="total">{{handler.totalElements}}</span>entries, 
      show
      <select class="form-control" @change="handler.handleSizeChange">
        <option v-for="item in handler.sizes" :value="item">{{item}}</option>
      </select> entries
    </div>
    <div v-show="handler.pages.length" class="pull-right">
      <ul class="pages list-unstyled">
        <li><button type="button" :disabled="handler.start === handler.number" @click="handler.handleNumberChange(0)"><strong>|&lt;</strong></button></li>
        <li><button type="button" :disabled="handler.start === handler.number" @click="handler.handleNumberChange(number - 1)"><strong>&lt;</strong></button></li>
        <li v-for="page in handler.pages"><button type="button" :disabled="page === handler.number" :class="{active: page === handler.number}" @click="handler.handleNumberChange(page)">{{page + 1}}</button></li>
        <li><button type="button" :disabled="handler.end - 1 === handler.number" @click="handler.handleNumberChange(handler.number + 1)"><strong>&gt;</strong></button></li>
        <li><button type="button" :disabled="handler.end - 1 === handler.number" @click="handler.handleNumberChange(handler.totalPages - 1)"><strong>&gt;|</strong></button></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    handler: Object
  }
}
</script>
