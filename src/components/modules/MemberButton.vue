<template>
  <div class = 'join_member' @click.left = 'click' @click.right.prevent = 'nonActive'>
    <img :class = '{member_image: true, active: active}' :src = 'imagePath' />
    <p class = 'co_text' v-show = 'characterData.co'> {{ comingOut }}CO</p>
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
    },
    active () {
      return this.clickActive !== null && this.clickActive.kind === 'character' && this.clickActive.value.name === this.characterData.name
    },
    comingOut () {
      return  this.$store.getters.jinroMembers.filter( (member) => this.characterData.name === member.name)[0].co
    }
  },
  methods: {
    click () {
      if( this.clickActive === null || this.clickActive.kind === 'character') {
        this.$emit('setActive', { kind: 'character', value: this.characterData})
      } else if( this.clickActive.kind == 'role') {
        this.characterData.co = this.clickActive.value.name
      }
    },
    nonActive () {
      if( this.clickActive !== null && this.active ) {
        this.$emit('setActive', null)
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

.active {
  outline: solid 2px red;
}
.co_text {
  --color: white;
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: var(--color)
}

</style>