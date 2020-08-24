<template>
  <div id="app">
    <div class = 'head_bar'>
      <div class = 'route_path'>
        <router-link class = 'path_text' to = '/'> ホーム</router-link>
        <router-link class = 'path_text' to = '/characters'>キャラクター設定</router-link>
        <router-link class = 'path_text' to = '/roles'>役職設定</router-link>
      </div>
      <div class = 'member_num_info'>{{ joinMemberNumText }}</div>
      <div class = 'camp_info'>
        <div class = 'camp_text'>{{ campText('村人陣営') }}</div>
        <div class = 'camp_text'>{{ campText('人狼陣営') }}</div>
        <div class = 'camp_text'>{{ campText('妖狐陣営') }}</div>
        <div class = 'camp_text'>{{ campText('その他陣営') }}</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import joinCharacter from './components/JoinCharacter'
export default {
  name: 'App',
  computed: {
    joinMemberNumText () {
      const joinMemberNum = this.$store.getters.jinroMembers.length
      let aliveMemberNum = this.$store.getters.jinroMembers.filter( (member) => !member.death).length
      return `生存人数： ${aliveMemberNum}人 / ${joinMemberNum}人`
    }
  },
  methods: {
    campText (campName) {
      const campNum = this.$store.getters.jinroRoles.filter( (role) => role.camp === campName ).length
      return `${campName}：${campNum}`
    }
  }
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  background:radial-gradient(circle at center, #006600, #003300)
}

#app {
  width: 100%;
  height: 100%;
}

.head_bar {
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: rgb(209, 214, 240);
}

.path_text {
  margin: 0 5px;
}
.camp_info {
  display: flex;
}

.camp_text {
  margin: 0 5px;
}
</style>
