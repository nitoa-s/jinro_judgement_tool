<template>
  <button class = 'role_button' @click.left = 'join' @click.right = 'remove'>
      <img class = 'role__image' :src = "require(`@/assets/roles/${camp}/${roleData.name}.png`)" />
  </button>
</template>

<script>
export default {
  props: [
    'roleData',
    'camp'
  ],
  methods: {
    join() {
      var roles = JSON.parse(localStorage.getItem('roles'));
      if( roles === null ) {
        roles = [];
        roles.push(this.roleData);
        localStorage.setItem('roles', JSON.stringify(roles));
      } else {
        for( var index = 0; index < roles.length ; index ++ )
          if( roles[index].name === this.roleData.name ) return;
        roles.push(this.roleData);
        localStorage.setItem('roles', JSON.stringify(roles));
      }
    },
    remove() {
      var roles = JSON.parse(localStorage.getItem('roles'));
      if( roles !== null) {
        for( var index = 0; index < roles.length ; index ++ )
          if( roles[index].name === this.roleData.name ) {
            roles.splice(index, 1);
            localStorage.setItem('roles', JSON.stringify(roles));
          }
      }
    }
  }
}
</script>

<style scoped>
.role_button {
  display: inline-block;
  padding: 0;
  border: 0;
  height: auto;
}
.role__image {
  width: 100px;
  height: auto;
  object-fit: contain;
}
</style>