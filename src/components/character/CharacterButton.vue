<template>
  <button class = 'character__button' :class = "{ active: isActive }" @click = 'onclick'>
    <img class = 'character__image' :src = "require(`@/assets/characters/${characterFileName}`)" />
  </button>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  props: [ 'characterFileName' ],
  methods: {
    onclick () {
      this.isActive = true;
    }
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