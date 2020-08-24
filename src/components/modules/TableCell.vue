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
    'tableName',
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
        this.$emit('setActive', {
          kind: this.kind,
          value: {
            tableName: this.tableName,
            rowName: this.rowName,
            columnIndex: this.columnIndex
          }
        })
      } else if( this.clickActive.kind === 'character' ) {
        this.setCharacterData(this.clickActive.value)
      }
    },
    rightClick () {
      if( this.isResultTable() ) {
        this.$emit('setActive', null)
        return
      }
      if( this.characterData !== null ) {
        if( !this.siro && !this.kuro ) {
          this.siro = true
          this.$emit('changeInfo', this.rowName, this.characterData, 'white')
        } else if( this.siro ) {
          this.siro = false
          this.kuro = true
          this.$emit('changeInfo',  this.rowName, this.characterData, 'black')
        } else {
          this.kuro = false
        }
      }
      if( this.clickActive !== null && this.active ) {
        this.$emit('setActive', null)
      }
    },
    setCharacterData (characterData) {
      if( this.characterData && this.isResultTable() && this.characterData.death )
        this.characterData.death = false
      this.characterData = characterData
      if ( this.isResultTable() )
        this.characterData.death = true
    },
    isResultTable () {
      return ['襲撃', '処刑'].includes(this.rowName)
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