<template>
  <button class = 'role_button' @click.left = 'click'>
    {{ role.name }}
  </button>
</template>

<script>
export default {
  props: [ 'role' ],
  methods: {
    click () {
      this.$emit('click', {kind: 'role', value: this.role})
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

.role_button:active {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>