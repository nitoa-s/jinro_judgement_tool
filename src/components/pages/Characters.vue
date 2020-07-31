<template>
  <div class = 'character_area'>
    <div class = 'row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
      <character-button v-for = 'character in characterRow' :key = 'character.id' :characterData = 'character'></character-button>
    </div>
  </div>
</template>

<script>
import CharacterButton from '../modules/CharacterButton'
import characterData from '@/assets/characterData.json'
export default {
  data () {
    return {
      characterData,
      sliceNum: 6
    }
  },
  computed: {
    groupCharacters () {
      const arrayLength = characterData.length
      const groupedArray = []
      for( let index = 0; index < Math.ceil(arrayLength / this.sliceNum); index++ ) {
        let groupedFirstIndex = index * this.sliceNum;
        groupedArray.push(characterData.slice(groupedFirstIndex, groupedFirstIndex + this.sliceNum))
      }
      return groupedArray
    }
  },
  components: {
    'character-button': CharacterButton
  }
}
</script>

<style scoped>

.character_area {
  padding: 0 5px;
}

.row_area {
  display: flex;
  flex-direction: row;
}
</style>