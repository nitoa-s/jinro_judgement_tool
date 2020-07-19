<template>
  <div class = 'characters__area'>
    <div v-for = "path in filePath" :key = "path">
      <character-button :character-file-name = "path"></character-button>
    </div>
  </div>
</template>

<script>
import CharacterButton from './CharacterButton'
export default {
  data () {
    return {
      filePath: [
        'アーニー.png',
        'アンナ.png',
        'エマ.png'
      ]
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