<template>
  <div class = 'join_member' @click.left = 'click' @click.right.prevent = 'nonActive' @dblclick =  'deleteCO'>
    <div class = 'member'>
      <img :class = '{member_image: true, active: active}' :src = 'imagePath' />
      <p class = 'member_name'> {{ characterData.name }} </p>
      <p v-if = 'characterData.death' :class = '{retire: characterData.death}'>×</p>
    </div>
    <p class = 'co_text' v-show = 'characterData.co' > {{ comingOut }}CO</p>
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
      } else if( this.clickActive.kind === 'info') {
        this.$emit('setInfo', this.characterData)
      }
    },
    nonActive () {
      if( this.clickActive !== null && this.active ) {
        this.$emit('setActive', null)
      }
    },
    deleteCO () {
      this.characterData.co = ''
    }
  }
}
</script>

<style scoped>
.join_member {
  position: relative;
  display: inline-block;
  margin: 2px;
  width: 80px;
  height: 100px;
  text-align: center;
  font-size: 12px;
}

.member {
  position: relative;
  height: 80px;
}

.member_image {
  height: 80px;
}

.active {
  outline: solid 2px red;
}
.member_name {
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
.co_text {
  --color: white;
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: var(--color)
}

.retire {
  position: absolute;
  margin: 0;
  color: red;
  font-size: 100px;
  top: -40px;
  left: 0;
}

</style>