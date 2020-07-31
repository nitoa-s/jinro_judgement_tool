<template>
  <div class = 'role_button' @click.left = 'join' @click.right.prevent = 'remove'>
    <img class = 'role_image' :src = 'imagePath' />
    <div class = 'role_count'> {{ count }} </div>
    <div class = 'role_name'> {{ roleData.name }} </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  props: [
    'roleData',
    'camp'
  ],
  computed: {
    imagePath () {
      return require(`@/assets/roles/${this.camp}/${this.roleData.name}.png`)
    }
  },
  methods: {
    join () {
      this.count++
      this.$store.dispatch('addRole', { roleData: this.roleData })
    },
    remove () {
      if( this.count > 0 ) this.count--
      this.$store.dispatch('removeRole', { roleName: this.roleData.name })
    }
  },
  created () {
    const roles = this.$store.getters.jinroRoles
    for(let index = 0; index < roles.length; index++)
      if( roles[index].name === this.roleData.name ) this.count++
  }
}
</script>

<style scoped>
.role_button {
  position: relative;
  display: inline-block;
  margin: 4px 2px;
  user-select: none;
}

.role_image {
  width: 100px;
  height: auto;
  margin: 2px;
}

.role_count {
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
  font: 12px;
}

.role_name {
  position: absolute;
  width: 100%;
  color: white;
  top: 110px;
  text-align: center;
  font: 16px;
  font-weight: bold;
  pointer-events: none;
}
</style>