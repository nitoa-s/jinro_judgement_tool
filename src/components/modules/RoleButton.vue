<template>
  <button :class = '{role_button: true, active: active}' @click.left = 'click' @click.right.prevent = 'nonActive'>
    {{ role.name }}
  </button>
</template>

<script>
export default {
  data () {
    return {
      kind: 'role'
    }
  },
  props: [
    'role',
    'clickActive'
  ],
  computed: {
    active () {
      return this.clickActive !== null && this.clickActive.kind === this.kind && this.clickActive.value.name === this.role.name
    }
  },
  methods: {
    click () {
      if( this.clickActive === null || this.clickActive.kind === this.kind ) {
      this.$emit('setActive', {kind: this.kind, value: this.role})
      } else if( this.clickActive.kind === 'character' ) {
        this.$emit('setCO', this.clickActive.value, this.role)
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
.role_button {
  margin: 1px;
  position: relative;
  display: inline-block;
  padding: 4px 8px;
  text-decoration: none;
  color: #FFF;
  background: #e00;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -10px 0 rgba(0, 0, 0, 0.05);
  font-weight: bold;
  border: solid 2px rgb(245, 179, 25);
}

.active {
  background-color: orange;
}
</style>