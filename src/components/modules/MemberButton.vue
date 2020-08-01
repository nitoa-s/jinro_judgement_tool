<template>
  <div class = 'join_member' @click.left = 'click'>
    <img class = 'member_image' :src = 'imagePath' />
    <p class = 'co_text'> {{ characterData.co }} </p>
  </div>
</template>

<script>
export default {
  props: [
    'characterData',
    'activeRoleName'
  ],
  computed: {
    imagePath () {
      return require(`@/assets/characters/${this.characterData.name}/${this.characterData.imageFileName}`)
    }
  },
  methods: {
    click () {
      if( this.activeRoleName != null) this.characterData.co = `${this.activeRoleName}CO`
    }
  }
}
</script>

<style scoped>
.join_member {
  position: relative;
  display: inline-block;
  margin: 0 1px;
}

.member_image {
  width: 80px;
  height: 80px;
}

.co_text {
position: absolute;
  width: 100%;
  color: white;
  top: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
}
</style>