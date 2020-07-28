<template>
  <div id="app">
    <div class = 'head__bar'>
      <router-link to = '/characters'>キャラクター設定</router-link>
      <router-link to = '/roles'>役職設定</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import joinCharacter from './components/JoinCharacter'
import Characters from './components/pages/Characters'
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
