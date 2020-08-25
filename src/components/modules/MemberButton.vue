<template>
  <div class = 'join_member' @click.left = 'click' @click.right.prevent = 'nonActive' @dblclick =  'deleteCO'>
    <div class = 'member'>
      <img :class = '{member_image: true, active: active}' :src = 'imagePath' />
      <img class = 'state_image' v-if = 'characterData.state' :src = 'statePath' />
      <p class = 'member_name'> {{ characterData.name }} </p>
      <p v-if = 'characterData.death' :class = '{retire: characterData.death}'>×</p>
    </div>
    <p class = 'co_text'  v-if = 'characterData.co' :style = '{color: characterData.co.color}' > {{ characterData.co.name }}CO</p>
  </div>
</template>

<script>
export default {
  props: [
    'characterData',
    'clickActive'
  ],
  computed: {
    kindValue: () => 'character',
    activeData () {
      return {
        kind: this.kindValue,
        value: this.characterData
      }
    },
    imagePath () {
      return require(`@/assets/characters/${this.characterData.name}/${this.characterData.imageFileName}`)
    },
    statePath () {
      return require(`@/assets/${this.characterData.state}.png`)
    },
    active () {
      return this.clickActive !== null && this.clickActive === this.activeData
    }
  },
  methods: {
    click () {
      if( this.clickActive === null || this.clickActive.kind === this.kindValue) {
        this.$emit('setActive', this.activeData)
      } else if( this.clickActive.kind == 'role') {
        this.setCO(this.clickActive.value)
      } else if( this.clickActive.kind === 'info') {
        const infoData = {
          day: this.clickActive.value.day,
          targetCharacter: this.characterData,
          result: null,
          roleName: this.clickActive.value.rowName
        }
        this.$store.dispatch('setInfo', { infoData: infoData })
      }
    },
    setCO (role) {
      this.characterData.co = role
    },
    nonActive () {
      if( this.clickActive !== null && this.active ) {
        this.$emit('setActive', null)
      }
    },
    deleteCO () {
      this.characterData.co = null
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

.state_image {
  position: absolute;
  margin: 0;
  width: 15px;
  top: 0;
  right: 0;
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
  margin: 0;
  font-size: 13px;
  font-weight: 800;
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