<template>
  <table border = 1>
    <tr>
      <td> COキャラ</td>
      <td v-for = 'day in 8' :key = 'day'> {{ day + 1 }}日目</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: [
    'roleName',
    'coCharacter'
  ]
}
</script>

<style scoped>
</style>