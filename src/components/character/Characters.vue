<template>
  <div class = 'characters__area'>
    <character-button character-file-name = 'アーニー.png'></character-button>
    <character-button character-file-name = 'アンナ.png'></character-button>
    <character-button character-file-name = 'エマ.png'></character-button>
  </div>
</template>

<script>
import CharacterButton from './CharacterButton'
export default {
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