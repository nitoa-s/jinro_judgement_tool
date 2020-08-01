<template>
  <div class = 'top_page'>
    <div class = 'jinro_info'>
      <div class = 'join_member_area'>
        <div class = 'member_row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
          <img class = 'member_image' v-for = '(character, index) in characterRow' :key = 'index' :src = 'imagePath(character.name, character.imageIndex)'/>
        </div>
      </div>
      <div class = 'role_area'>
        <button class = 'role_button' v-for = '(role, index) in roles' :key = 'index'>
          {{ role.name }}
        </button>
      </div>
    </div>
    <div class = 'role_info'>

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
      roles: this.$store.getters.jinroRoles.sort( (a,b) => {
        if(a.id>b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      }),
      sliceNum: 5,
      activeRole: null
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
    },
    setActiveRole (roleName) {
      this.activeRole = roleName
    }
  }
}
</script>

<style scoped>
.top_page {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.jinro_info {
  width: 420px;
  height: 100%;
  background-color: rosybrown;
}

.role_info {
  width: 200px;
  background-color: royalblue;
}
.join_member_area {
  width: 100%;
  counter-reset: member_row;
  height: 340px;
}

.member_row_area {
  display: flex;
  margin: 1px 0;
  counter-increment: member_row;
}

.member_image {
  margin: 0 1px;
  width: 80px;
  height: 80px;
}

.role_area {
  display: inline;
}

.role_button {
  margin: 1px;
  position: relative;
  display: inline-block;
  padding: 4px 8px;
  text-decoration: none;
  color: #FFF;
  background: #e00;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -10px 0 rgba(0, 0, 0, 0.05);
  font-weight: bold;
  border: solid 2px rgb(245, 179, 25);
}

.role_button:active {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>