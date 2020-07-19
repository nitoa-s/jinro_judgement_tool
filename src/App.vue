<template>
  <div id="app">
    <div class = 'head__bar'>

    </div>
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

.head__bar {
  width: 100%;
  height: 30px;
  background-color: aqua;
}
</style>
