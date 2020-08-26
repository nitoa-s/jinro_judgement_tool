<template>
  <div class = 'table_info'>
    <p class = 'table_title'>結果</p>
    <table class = 'table' border="1">
      <tr>
        <td></td>
        <td v-for = 'n in maxDay + 1' :key = 'n'> {{ n }}日目</td>
      </tr>
      <tr v-for = "(rowName, index) in tableRows" :key = 'index'>
        <td class = 'table_cell'> {{ rowName }}</td>
        <table-cell
          :ref = 'rowName'
          v-for = 'n in maxDay + 1'
          :key = 'n'
          :clickActive = 'clickActive'
          :row = 'rowName'
          :day = 'n'
          @setActive = 'setActive' />
      </tr>
    </table>
  </div>
</template>

<script>
import tableCell from './TableCell'
export default {
  data () {
    return {
      tableRows: ['処刑', '襲撃']
    }
  },
  props: [
    'clickActive',
    'maxDay',
  ],
  components: {
    'table-cell': tableCell
  },
  methods: {
    setActive (clickActive) {
      this.$emit('setActive', clickActive)
    }
  }
}
</script>

<style scoped>
.table_info {
  margin: 0;
  margin-bottom: 10px;
}

.table_title {
  margin: 0;
  color: white;
  font-size: 12px;
}

.table {
  background: white;
}

.table_cell {
  width: 50px;
  height: 60px;
}
</style>