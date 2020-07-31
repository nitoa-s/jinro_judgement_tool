<template>
  <div class = 'top_area'>
    <div class = 'join-Character_area'>
      <div v-for = 'character in joinCharacter' :key = 'character'>
        <img class = 'character_image' :src = "require(`@/assets/characters/${character}.png`)" @click.left = 'check'/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      joinCharacter: JSON.parse(localStorage.getItem('jinroMembers'))
    }
  },
  methods: {
    check () {
      console.log('テスト')
    }
  }
}
</script>

<style scoped>
.top_area {
  padding: 10px;
}

.join-Character_area {
  width: 500px;
  display: flex;
}
.character_image {
  width: 100px;
  height: auto;
}
</style>