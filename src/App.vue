<template>
  <div id="app">
    <characters></characters>
  </div>
</template>

<script>
import joinCharacter from './components/JoinCharacter'
import Characters from './components/character/Characters'
export default {
  name: 'App',
  components: {
    'characters': Characters,
    'joinCharacter': joinCharacter
  }
}
</script>

<style>
body {
  margin: 0;
  background-color:darkgrey;
}


.join__character__area {
  width: 200px;
  height: 100px;
  background-color: aqua;
}
</style>
