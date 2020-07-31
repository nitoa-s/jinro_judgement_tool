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
      self: false
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
      this.$store.dispatch('addMember', { member: {name: this.characterData.name, imageIndex: this.imageIndex, self: false} })
    },
    remove () {
      this.isActive = false
      this.$store.dispatch('removeMember', { member: this.characterData.name })
      this.imageIndex = 0
    }
  },
  created () {
    const jinroMembers = this.$store.getters.jinroMembers
    for( let index = 0; index < jinroMembers.length; index++)
      if( jinroMembers[index].name === this.characterData.name) {
        this.isActive = true
        this.imageIndex = jinroMembers[index].imageIndex
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
  width: 100%;
  color: white;
  top: 50px;
  text-align: center;
  font: 16px;
  font-weight: bold;
  pointer-events: none;
}
</style>