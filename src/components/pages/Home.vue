<template>
  <div class = 'top_page'>
    <div class = 'jinro_info'>
      <div class = 'join_member_area'>
        <div class = 'member_row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
          <member-button v-for = 'character in characterRow' :key = 'character.id' :characterData = 'character' :clickActive = 'clickActive' @setActive = 'setClickActive' @setInfo = 'setInfo' />
        </div>
      </div>
      <div class = 'role_area'>
        <role-button v-for = '(role, index) in roles' :key = 'index' :role = 'role' :clickActive = 'clickActive' @setActive = 'setClickActive' />
      </div>
      <input class = 'memo' type = 'text'>
    </div>
    <div class = 'role_info'>
      <p class = 'title'>役職情報と襲撃結果</p>
      <result-table ref = 'result' :maxDay = 'maxDay' :clickActive = 'clickActive' @setActive = 'setClickActive'/>
      <info-table :ref = 'roleName' v-for = 'roleName in roleInfoGroups' :key = 'roleName' :maxDay = 'maxDay' :roleName = 'roleName' :clickActive = 'clickActive' @setActive = 'setClickActive'></info-table>
    </div>
  </div>
</template>

<script>
import memberButton from '@/components/modules/MemberButton'
import roleButton from '@/components/modules/RoleButton'
import resultTable from '@/components/modules/ResultTable'
import infoTable from '@/components/modules/InfoTable'
export default {
  data () {
    return {
      characters: this.$store.getters.jinroMembers,
      roles: this.$store.getters.jinroRoles.sort( (a,b) => {
        if(a.id>b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      }),
      sliceNum: 5,
      clickActive: null,
    }
  },
  components: {
    'member-button': memberButton,
    'role-button': roleButton,
    'result-table': resultTable,
    'info-table': infoTable
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
    },
    roleInfoGroups () {
      const infoGroups = this.roles.map( (role) => {
        if ( role.info ) return role.name
      })
      return infoGroups.filter(Boolean).filter(function (x, i, self) { return self.indexOf(x) === i })
    },
    maxDay () {
      return this.characters.length === 0 ? 0 : Math.floor((this.characters.length - 1) / 2)
    }
  },
  methods: {
    setClickActive (clickActive) {
      this.clickActive = clickActive
    },
    setInfo (characterData) {
      const refName = this.clickActive.value.tableName
      const childComponent = this.clickActive.value.tableName === 'result' ? this.$refs[refName] : this.$refs[refName][0]
      childComponent.setCharacterData(characterData)
    }
  }
}
</script>

<style scoped>
.top_page {
  width: 100%;
  height: 100%;
  padding: 10px;
}

.jinro_info {
  margin: 5px 20px 0 0;
  display: inline-block;
  width: 420px;
  height: 100%;
  vertical-align: top;
}

.role_info {
  display: inline-block;
  margin: 5px 0 0;
  height: 100%;
}
.join_member_area {
  width: 100%;
}

.member_row_area {
  display: flex;
  height: 120px;
  margin-bottom: 5px;
}

.memo {
  padding: 10px;
  width: 100%;
  height: 200px;
}
.role_area {
  display: inline;
}

.title {
  margin: 0;
  color: white;
}

</style>