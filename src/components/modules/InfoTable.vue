<template>
  <div class = 'table_info'>
    <p class = 'table_title'>{{ roleName }}</p>
    <table class = 'table' border="1">
      <tr>
        <td>CO</td>
        <td v-for = 'n in maxDay' :key = 'n'> {{ n + 1 }}日目</td>
      </tr>
      <tr v-for = "(character, index) in tableRows" :key = 'index'>
        <td class = 'table_cell'> <img class = 'cell_image' :src = 'imagePath(character.name, character.imageFileName)' /></td>
        <table-cell :ref = 'character.name' v-for = 'n in maxDay' :key = 'n' :clickActive = 'clickActive' :tableName = 'roleName' :rowName = 'character.name' :columnIndex = 'n' @setActive = 'setActive'></table-cell>
      </tr>
    </table>
  </div>
</template>

<script>
import tableCell from './TableCell'
export default {
  props: [
    'roleName',
    'clickActive',
    'maxDay',
  ],
  components: {
    'table-cell': tableCell
  },
  computed: {
    tableRows () {
      return this.$store.getters.jinroMembers.filter( (member) => this.roleName === member.co)
    }
  },
  methods: {
    imagePath (characterName, imageFileName) {
      return require(`@/assets/characters/${characterName}/${imageFileName}`)
    },
    setActive (clickActive) {
      this.$emit('setActive', clickActive)
    },
    setCharacterData (characterData) {
      const rowName = this.clickActive.value.rowName
      const index = this.clickActive.value.columnIndex - 1
      this.$refs[rowName][index].setCharacterData(characterData)

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

.cell_image {
  width: 50px;
}
</style>