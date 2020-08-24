<template>
  <div class = 'table_info'>
    <p class = 'table_title' :style = '{color: roleColor}'>{{ role.name }}</p>
    <table class = 'table' border="1">
      <tr>
        <td>CO</td>
        <td v-for = 'n in maxDay' :key = 'n'> {{ n + 1 }}日目</td>
      </tr>
      <tr v-for = "(character, index) in tableRows" :key = 'index'>
        <td class = 'table_cell'> <img class = 'cell_image' :src = 'imagePath(character.name, character.imageFileName)' /></td>
        <table-cell
          :ref = 'character.name'
          v-for = 'n in maxDay'
          :key = 'n'
          :clickActive = 'clickActive'
          :tableName = 'role.name'
          :rowName = 'character.name'
          :columnIndex = 'n'
          @setActive = 'setActive'
          @changeInfo = 'changeInfo'
          />
      </tr>
    </table>
  </div>
</template>

<script>
import tableCell from './TableCell'
export default {
  data () {
    return {
      info: {}
    }
  },
  props: [
    'role',
    'clickActive',
    'maxDay',
  ],
  components: {
    'table-cell': tableCell
  },
  computed: {
    tableRows () {
      const rows = this.$store.getters.jinroMembers.filter( (member) => this.role.name === member.co)
      const transferInfo = {}
      for( var row of rows ) {
        console.log(row)
        transferInfo[row.name] = this.info[row.name] || {white: [], black: []}
        console.log(transferInfo)
      }
      this.info = transferInfo
      return rows
    },
    roleColor () {
      return this.role.color || 'white'
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
      this.setActive(null)
    },
    changeInfo (rowCharacter, targetCharacter, iro) {
      if( iro === 'gray') {
        const index = this.info[rowCharacter].black.indexOf(targetCharacter.name)
        this.info[rowCharacter].black.splice(index, 1)
      } else if( iro === 'white' ){
        this.info[rowCharacter][iro].push(targetCharacter.name)
        targetCharacter.state = '片白'
        // if( this.isDefinitlyColor(targetCharacter.name, 'white') ) targetCharacter.state = '白'
        // if( this.isPanda(targetCharacter, 'black') ) targetCharacter.state = 'パンダ'
      } else {
        this.info[rowCharacter][iro].push(targetCharacter.name)
        targetCharacter.state = '片黒'
        // if( this.isDefinitlyColor(targetCharacter.name, 'black') ) targetCharacter.state = '黒'
        // if( this.isPanda(targetCharacter, 'white') ) targetCharacter.state = 'パンダ'
      }
      console.log(this.info)
    },
    isPanda (targetCharacter, targetColor) {
      for( var rowInfo of this.info )
        if( rowInfo[targetColor].indexOf(targetCharacter) < 0 ) return true
      return false
    },
    isDefinitlyColor(targetCharacter, targetColor) {
      for( var rowInfo of this.info )
        if( rowInfo[targetColor].indexOf(targetCharacter) < 0 ) return false
      return true
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