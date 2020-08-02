<template>
  <div class = 'top_page'>
    <div class = 'jinro_info'>
      <div class = 'join_member_area'>
        <div class = 'member_row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
          <member-button v-for = 'character in characterRow' :key = 'character.id' :characterData = 'character' :activeRoleName = 'activeRole'/>
        </div>
      </div>
      <div class = 'role_area'>
        <role-button v-for = '(role, index) in roles' :key = 'index' :roleName = 'role.name' @setRole = 'setActiveRole' />
      </div>
    </div>
    <div class = 'role_info'>
      <role-info></role-info>
    </div>
  </div>
</template>

<script>
import memberButton from '@/components/modules/MemberButton'
import roleButton from '@/components/modules/RoleButton'
import roleInfo from '@/components/modules/RoleInfo'
export default {
  data () {
    return {
      characters: this.$store.getters.jinroMembers.sort( (a,b) => {
        if(a.id>b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      }),
      roles: this.$store.getters.jinroRoles.sort( (a,b) => {
        if(a.id>b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      }),
      sliceNum: 5,
      activeRole: null
    }
  },
  components: {
    'member-button': memberButton,
    'role-button': roleButton,
    'role-info': roleInfo
  },
  computed: {
    groupCharacters () {
      const arrayLength = this.characters.length
      const groupedArray = []
      for( let index = 0; index < Math.ceil(arrayLength / this.sliceNum); index++ ) {
        let groupedFirstIndex = index * this.sliceNum;
        groupedArray.push(this.characters.slice(groupedFirstIndex, groupedFirstIndex + this.sliceNum))
      }
      return groupedArray
    }
  },
  methods: {
    setActiveRole (roleName) {
      this.activeRole = roleName
      console.log(this.activeRole)
    }
  }
}
</script>

<style scoped>
.top_page {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.jinro_info {
  display: inline-block;
  width: 420px;
  height: 100%;
  background-color: rosybrown;
  vertical-align: top;
}

.role_info {
  display: inline-block;
  height: 100%;
  background-color: royalblue;
}
.join_member_area {
  width: 100%;
  height: 340px;
}

.member_row_area {
  display: flex;
  height: 80px;
  padding-bottom: 2px;
}

.role_area {
  display: inline;
}


</style>