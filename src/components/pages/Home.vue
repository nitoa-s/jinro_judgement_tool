<template>
  <div class = 'top_area'>
    <div class = 'join_member_area'>
      <div class = 'member_row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
        <img class = 'member_image' v-for = '(character, index) in characterRow' :key = 'index' :src = 'imagePath(character.name, character.imageIndex)'/>
      </div>
    </div>
  </div>
</template>

<script>
import characterData from '@/assets/characterData.json'
export default {
  data () {
    return {
      characterData,
      characters: this.$store.getters.jinroMembers,
      sliceNum: 5
    }
  },
  computed: {
    groupCharacters () {
      const arrayLength = this.characters.length
      const groupedArray = []
      for( let index = 0; index < Math.ceil(arrayLength / this.sliceNum); index++ ) {
        let groupedFirstIndex = index * this.sliceNum;
        groupedArray.push(this.characters.slice(groupedFirstIndex, groupedFirstIndex + this.sliceNum))
      }
      return groupedArray
    }
  },
  methods: {
    imagePath (memberName, imageIndex) {
      let imageName = null
      for( let index = 0; index < this.characterData.length; index++)
        if( this.characterData[index].name === memberName )
          imageName = this.characterData[index].image[imageIndex]
      return require(`@/assets/characters/${memberName}/${imageName}`)
    }
  }
}
</script>

<style scoped>
.top_area {
  padding: 10px;
}

.join_member_area {
  padding: 0 5px;
}

.member_row_area {
  display: flex;
  margin: 5px 0;
  height: 80px;
  flex-direction: row;
}

.member_image {
  margin: 1px;
  width: 80px;
  height: 80px;
  user-select: none;
}
</style>