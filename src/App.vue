<template>
  <div id="app">
    <div class = 'join__character__area'>
      <joinCharacter></joinCharacter>
    </div>
  </div>
</template>

<script>
import joinCharacter from './components/JoinCharacter'
export default {
  name: 'App',
  components: {
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
