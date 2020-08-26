<template>
  <td :class = '{info_cell: true, active: active}' @click.left = 'activeClick' @click.right.prevent = 'nonActive'>
    <template v-if = 'roleInfoData.length > 0'>
      <img class = 'cell_image' :src = 'imagePath(roleInfoData[0].character)' />
      <p class = 'result_text'>{{ roleInfoData[0].result }}</p>
    </template>
  </td>
</template>

<script>
export default {
  props: [
    'clickActive',
    'row',
    'day'
  ],
  computed: {
    kindValue: () => 'info',
    rowName () {
      return typeof this.row === 'string' ? this.row : this.row.name
    },
    activeData () {
      return {
        kind: this.kindValue,
        value: {
          rowName: this.rowName,
          day: this.day
        }
      }
    },
    active () {
     return this.clickActive !== null && this.clickActive === this.activeData
    },
    roleInfoData () {
      if( this.rowName === '襲撃' ) {
        return this.$store.getters.attackInfo.filter( (data) => data.day === this.day)
      }else if( this.rowName === '処刑' ) {
        return this.$store.getters.hangInfo.filter( (data) => data.day === this.day)
      } else {
        return this.row.info.filter( (data) => data.day === this.day)
      }
    }
  },
  methods: {
    imagePath (character) {
      return require(`@/assets/characters/${character.name}/${character.imageFileName}`)
    },
    activeClick () {
      if( this.clickActive === null || this.clickActive.kind === this.kindValue ) {
        this.$emit('setActive', this.activeData)
      } else if(this.clickActive.kind === 'character') {
        const infoData = {
          day: this.day,
          targetCharacter: this.clickActive.value,
          roleName: this.rowName
        }
        console.log(this.rowName)
        this.$store.dispatch('setInfo', {infoData: infoData})
      }
    },
    nonActive () {
      this.$emit('setActive', null)
    }
  }
}
</script>

<style scoped>
.info_cell {
  width: 50px;
  height: 80px;
}
.cell_image {
  width: 50px;
}
.active {
  outline: solid 2px red;
}
.result_text {
  margin: 0;
  font-size: 10px;
  text-align: center;
}
</style>