<template>
  <div class = 'table_info'>
    <p class = 'table_title' :style = '{color: role.color}'>{{ role.name }}</p>
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
          :row = 'character'
          :day = 'n + 1'
          @setActive = 'setActive'
          />
      </tr>
    </table>
  </div>
</template>

<script>
import tableCell from './TableCell'
export default {
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
      return this.$store.getters.jinroMembers.filter( (member) => member.co && member.co.name === this.role.name)
    },
    rowInfo () {
      const infoData = []
      this.tableRows.forEach(element => {
        infoData.push({ name: element.name, value: element.info})
      });
      return infoData
    }
  },
  methods: {
    imagePath (characterName, imageFileName) {
      return require(`@/assets/characters/${characterName}/${imageFileName}`)
    },
    setActive (clickActive) {
      this.$emit('setActive', clickActive)
    },
  },
  watch: {
    //TODO: 呪われの可能性でい同じ人を二回占う可能性を考慮
    rowInfo (infoData) {
      if( infoData.length > 0) {
        const characters = this.$store.getters.jinroMembers
        characters.forEach((c) => {
          let characterColor = [0, 0]
          infoData.forEach((rowInfo) => {
            if( rowInfo.value.some((data) => data.character.name === c.name && data.result === '白') ) {
              characterColor[0]++
            } else if( rowInfo.value.some((data) => data.character.name === c.name && data.result === '黒') ) {
              characterColor[1]++
            }
          })
          if( characterColor[0] > 0 && characterColor[1] > 0 ) {
            c.state = 'パンダ'
          } else if( characterColor[0] === infoData.length ) {
            c.state = '白'
          } else if( characterColor[1] === infoData.length ) {
            c.state = '黒'
          } else if( characterColor[0] > 0 ) {
            c.state = '片白'
          } else if( characterColor[1] > 0 ) {
            c.state = '片黒'
          }
        })
      }
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