<template>
  <img class = 'role__image' :src = "require(`@/assets/roles/${roleName}.png`)" />
</template>

<script>
export default {
  props: ['roleName']
}
</script>

<style scoped>

.role__image {
  width: 100px;
  height: auto;
  object-fit: contain;
}
</style>