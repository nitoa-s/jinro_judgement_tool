<template>
  <td :class = '{info_cell: true, active: active}' @click.left = 'click' @click.right.prevent = 'rightClick'>
    <img class = 'cell_image' v-if = 'characterData' :src = 'imagePath()' />
    <p class = 'result_text'>{{ resultText }}</p>
  </td>
</template>

<script>
export default {
  data () {
    return {
      kind: 'info',
      siro: false,
      kuro: false,
      roleName: null,
      characterData: null,
    }
  },
  props: [
    'clickActive',
    'rowName',
    'columnIndex'
  ],
  computed: {
    active () {
      return this.clickActive !== null && this.clickActive.kind === this.kind && this.clickActive.value.rowName === this.rowName && this.clickActive.value.columnIndex === this.columnIndex
    },
    resultText () {
      if( this.roleName !== null ) return this.roleName
      if( this.siro ) return '白'
      if( this.kuro ) return '黒'
    }
  },
  methods: {
    imagePath () {
      return require(`@/assets/characters/${this.characterData.name}/${this.characterData.imageFileName}`)
    },
    click () {
      if( this.clickActive === null || this.clickActive.kind === 'info') {
        this.$emit('setActive', {kind: this.kind, value: {rowName: this.rowName, columnIndex: this.columnIndex}})
      } else if( this.clickActive.kind === 'character' ) {
        if( this.characterData !== null && (this.rowName === '襲撃' || this.rowName === '処刑')) this.characterData.death = false
        this.characterData = this.clickActive.value
        if( this.rowName === '襲撃' || this.rowName === '処刑' ) this.characterData.death = true
      }
    },
    rightClick () {
      if( this.characterData !== null ) {
        if( !this.siro && !this.kuro ) {
          this.siro = true
        } else if( this.siro ) {
          this.siro = false
          this.kuro = true
        } else {
          this.kuro = false
        }
      }
      if( this.clickActive !== null && this.active ) {
        this.$emit('setActive', null)
      }
    },
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