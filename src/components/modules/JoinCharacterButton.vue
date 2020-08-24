<template>
  <div class = 'character_button' @click.left = 'join' @click.right.prevent = 'remove'>
    <img :class = '{ character_image: true, active: isActive }' :src = 'imagePath'/>
    <p class = 'character_name'> {{ characterData.name }} </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageIndex: 0,
      isActive: false,
    }
  },
  computed: {
    imagePath () {
      return require(`@/assets/characters/${this.characterData.name}/${this.characterData.image[this.imageIndex]}`)
    }
  },
  props: ['characterData'],
  methods: {
    join () {
      if( !this.isActive ) {
        this.isActive = true
      } else {
        this.imageIndex++
        if( this.imageIndex === this.characterData.image.length ) this.imageIndex = 0
      }
      this.$store.dispatch('addMember', {
        characterData: {
          name: this.characterData.name,
          imageFileName: this.characterData.image[this.imageIndex]
        }
      })
    },
    remove () {
      this.isActive = false
      this.$store.dispatch('removeMember', { characterName: this.characterData.name })
      this.imageIndex = 0
    }
  },
  created () {
    const jinroMember = this.$store.getters.jinroMembers.filter( (member) => member.name === this.characterData.name )
    if(jinroMember.length > 0) {
      this.isActive = true
      this.imageIndex = this.characterData.image.indexOf(jinroMember[0].imageFileName)
    }
  }
}
</script>

<style scoped>

.character_button {
  position: relative;
  display: inline-block;
  margin: 4px 2px;
}

.character_image {
  margin: 1px;
  width: 100px;
  height: 100px;
  user-select: none;
}

.active {
  outline: solid 2px red;
}
.active:focus {
  outline: none;
}

.character_name {
  position: absolute;
  margin: 0;
  width: 100%;
  color: white;
  bottom: 5px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  pointer-events: none;
}
</style>