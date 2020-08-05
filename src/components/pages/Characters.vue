<template>
  <div class = 'character_area'>
    <div class = 'join_num'>
      <p> 参加人数：{{ joinNum }}人 </p>
    </div>
    <div class = 'row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
      <join-character-button v-for = 'character in characterRow' :key = 'character.id' :characterData = 'character'></join-character-button>
    </div>
  </div>
</template>

<script>
import joinCharacterButton from '../modules/JoinCharacterButton'
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
    },
    joinNum () {
      return this.$store.getters.jinroMembers.length
    }
  },
  components: {
    joinCharacterButton
  }
}
</script>

<style scoped>
.join_num {
  color: white;
  font: 20px;
  font-weight: bold;
}
.character_area {
  padding: 0 5px;
}

.row_area {
  display: flex;
  margin: 5px 0;
  height: 100px;
  flex-direction: row;
}
</style>