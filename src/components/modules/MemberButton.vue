<template>
  <div class = 'join_member' @click.left = 'click'>
    <img class = 'member_image' :src = 'imagePath' />
    <p class = 'co_text' v-show = 'characterData.co'> {{ characterData.co }}CO</p>
  </div>
</template>

<script>
export default {
  props: [
    'characterData',
    'clickActive'
  ],
  computed: {
    imagePath () {
      return require(`@/assets/characters/${this.characterData.name}/${this.characterData.imageFileName}`)
    }
  },
  methods: {
    click () {
      if( this.clickActive.kind == 'role') {
        this.characterData.co = this.clickActive.value.name
      }
    }
  }
}
</script>

<style scoped>
.join_member {
  display: inline-block;
  margin: 2px;
  width: 80px;
  height: 100px;
  text-align: center;
  font-size: 12px;
}

.member_image {
  display: block;
  height: 80px;
}

.co_text {
  --color: white;
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: var(--color)
}

</style>