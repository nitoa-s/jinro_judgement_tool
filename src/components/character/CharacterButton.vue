<template>
  <button class = 'character__button' :class = "{ active: isActive }" @click.left = 'join' @click.right = 'remove'>
    <img class = 'character__image' :src = "require(`@/assets/characters/${characterName}.png`)" />
  </button>
</template>

<script>
export default {
  data () {
    return {
      name: this.characterName,
      isActive: false
    }
  },
  props: [ 'characterName' ],
  methods: {
    join () {
      const jinroMembers = JSON.parse(localStorage.getItem('jinroMembers'));
      const index = jinroMembers.indexOf(this.name);
      if (index == -1) {
        this.isActive = true;
        this.$store.dispatch('addMember', {member: this.name});
      }
    },
    remove () {
      const jinroMembers = JSON.parse(localStorage.getItem('jinroMembers'));
      const index = jinroMembers.indexOf(this.name);
      if (index >= 0) {
        this.isActive = false;
        this.$store.dispatch('removeMember', {member: this.name});
      }
    }
  },
  created() {
    const jinroMembers = JSON.parse(localStorage.getItem('jinroMembers'));
    const index = jinroMembers.indexOf(this.name);
    this.isActive = index >= 0 ? true : false;
  }
}
</script>

<style scoped>
.character__button {
  width: 100px;
  height: 100px;
  border: 0;
  padding: 0;
}

.character__image {
  width: 100%;
  height: 100%;
}

.active {
  border: solid 1px red;
}
.active:focus {
  outline: none;
}
</style>