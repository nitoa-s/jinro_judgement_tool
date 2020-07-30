<template>
  <button class = 'role_button'>
      <img class = 'role__image' :src = "require(`@/assets/roles/${camp}/${roleData.name}.png`)" />
  </button>
</template>

<script>
export default {
  props: ['roleData', 'camp']
}
</script>

<style scoped>
.role_button {
  display: inline-block;
  padding: 0;
  border: 0;
  height: auto;
}
.role__image {
  width: 100px;
  height: auto;
  object-fit: contain;
}
</style>