<template>
  <td :class = '{info_cell: true, active: active}' @click.left = 'activeClick' @click.right.prevent = 'nonActive'>
    <template v-if = 'includeInfo'>
      <img class = 'cell_image' :src = 'imagePath' />
      <p class = 'result_text'>{{ resultText }}</p>
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
    includeInfo () {
      return this.row.info.some( (infoData) => infoData.day === this.day)
    },
    resultText () {
      const index = this.row.info.findIndex( (infoData) => infoData.day === this.day)
      return index !== -1 ? this.row.info[index].result : ''
    },
    imagePath () {
      const index = this.row.info.findIndex( (infoData) => infoData.day === this.day)
      return index !== -1 ? require(`@/assets/characters/${this.row.info[index].character.name}/${this.row.info[index].character.imageFileName}`) : ''
    }
  },
  methods: {
    activeClick () {
      if( this.clickActive === null || this.clickActive.kind === this.kindValue ) {
        this.$emit('setActive', this.activeData)
      } else if(this.clickActive.kind === 'character') {
        console.log('test')
        const infoData = {
          day: this.day,
          targetCharacter: this.clickActive.value,
          result: null,
          roleName: this.rowName
        }
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