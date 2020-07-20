<template>
  <div class = 'characters__area'>
    <div v-for = "character in characters" :key = "character">
    <character-button :character-file-name = "character"></character-button>
    </div>
  </div>
</template>

<script>
import CharacterButton from './CharacterButton'
export default {
  computed: {
    characters() {
      return this.$store.getters.characters;
    }
  },
  components: {
    'character-button': CharacterButton
  }
}
</script>

<style scoped>
.characters__area {
  display: flex;
}


</style>