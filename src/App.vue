<template>
  <div id="app">
    <div class = 'head__bar'>
      <router-link to = '/'> ホーム</router-link>
      <router-link to = '/characters'>キャラクター設定</router-link>
      <router-link to = '/roles'>役職設定</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import joinCharacter from './components/JoinCharacter'
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  background:radial-gradient(circle at center, #006600, #003300)
}

.head__bar {
  width: 100%;
  height: 30px;
  background-color: aqua;
}
</style>
