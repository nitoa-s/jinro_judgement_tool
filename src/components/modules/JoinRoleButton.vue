<template>
  <div class = 'role_button' @click.left = 'join' @click.right.prevent = 'remove'>
    <img class = 'role_image' :src = 'imagePath' />
    <div class = 'role_count'> {{ roleCount }} </div>
    <div class = 'role_name' :style = '{color: color}'> {{ roleData.name }} </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      count: 0,
      color: this.roleData.color ? this.roleData.color : 'white'
    }
  },
  props: [
    'roleData',
    'camp'
  ],
  computed: {
    imagePath () {
      return require(`@/assets/roles/${this.camp}/${this.roleData.name}.png`)
    },
    roleCount () {
      return this.$store.getters.jinroRoles.filter( (role) => role.name === this.roleData.name ).length
    }
  },
  methods: {
    join () {
      this.$store.dispatch('addRole', { roleInfo: {
        roleData: this.roleData,
        camp: this.camp
      }})
    },
    remove () {
      this.$store.dispatch('removeRole', { roleName: this.roleData.name })
    }
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