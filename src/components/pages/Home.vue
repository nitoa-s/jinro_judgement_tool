<template>
  <div class = 'top_page'>
    <div class = 'jinro_info'>
      <div class = 'join_member_area'>
        <div class = 'member_row_area' v-for = '(characterRow, index) in groupCharacters' :key = 'index'>
          <member-button :ref = 'character.name' v-for = 'character in characterRow' :key = 'character.id' :characterData = 'character' :clickActive = 'clickActive' @setActive = 'setClickActive'/>
        </div>
      </div>
      <div class = 'role_area'>
        <role-button v-for = '(role, index) in roles' :key = 'index' :role = 'role' :clickActive = 'clickActive' @setActive = 'setClickActive' @setCO = 'setCO' />
      </div>
      <input class = 'memo' type = 'text'>
    </div>
    <div class = 'result_info'>
      <p class = 'title'>襲撃情報</p>
      <result-table ref = 'result' :maxDay = 'maxDay' :clickActive = 'clickActive' @setActive = 'setClickActive'/>
      <div class = 'role_info'>
        <p class = 'title'>役職情報</p>
        <button @click = "resultClick('白')">白</button>
        <button @click = "resultClick('黒')">黒</button>
      </div>
      <role-table :ref = 'role.name' v-for = 'role in roleInfoGroups' :key = 'role.name' :maxDay = 'maxDay' :role = 'role' :clickActive = 'clickActive' @setActive = 'setClickActive'></role-table>
    </div>
  </div>
</template>

<script>
import memberButton from '@/components/modules/MemberButton'
import roleButton from '@/components/modules/RoleButton'
import resultTable from '@/components/modules/ResultTable'
import roleTable from '@/components/modules/RoleTable'
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
    'role-table': roleTable
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
      return this.roles.filter( (role, index, roles) => role.info && roles.findIndex(e => e.name === role.name) === index)
    },
    maxDay () {
      return this.characters.length === 0 ? 0 : Math.floor((this.characters.length - 1) / 2)
    }
  },
  methods: {
    setClickActive (clickActive) {
      this.clickActive = clickActive
    },
    resultClick (color) {
      if( this.clickActive && this.clickActive.kind === 'info' && !['襲撃', '処刑'].includes(this.clickActive.value.rowName)) {
        const resultData = {
          roleName: this.clickActive.value.rowName,
          day: this.clickActive.value.day,
          result: color
        }
        this.$store.dispatch('updateResult', { resultData: resultData})
      }
    },
    setCO (character, role) {
      this.$refs[character.name][0].setCO(role)
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

.result_info {
  display: inline-block;
  margin: 5px 0 0;
  height: 100%;
}
.join_member_area {
  width: 100%;
}

.member_row_area {
  display: flex;
  height: 100px;
  margin-bottom: 5px;
}

.memo {
  margin: 10px 0;
  width: 100%;
  height: 200px;
  border: double 10px yellowgreen;
}
.role_area {
  display: inline;
}

.title {
  margin: 0;
  color: white;
}

</style>