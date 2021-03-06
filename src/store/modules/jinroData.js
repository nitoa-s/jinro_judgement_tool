const state = {
  jinroMembers: [],
  jinroRoles: [],
  attackInfo: [],
  hangInfo: []
}

const getters = {
  jinroMembers: state => state.jinroMembers,
  jinroRoles: state => state.jinroRoles,
  attackInfo: state => state.attackInfo,
  hangInfo: state => state.hangInfo
}

const actions = {
  addMember({ commit }, { characterData }) {
    commit('addMember', characterData)
  },
  removeMember({ commit }, { characterName }) {
    commit('removeMember', characterName)
  },
  addRole({ commit }, { roleInfo }) {
    commit('addRole', roleInfo)
  },
  removeRole({ commit }, { roleName }) {
    commit('removeRole', roleName)
  },
  setInfo({ commit }, { infoData }) {
    commit('setInfo', infoData)
  },
  updateResult({ commit }, { resultData }){
    commit('updateResult', resultData)
  }
}

const mutations = {
  addMember (state, characterData) {
    const index = state.jinroMembers.findIndex( (jinroMember) => jinroMember.name === characterData.name )
    const jinroMember = {
      name: characterData.name,
      imageFileName: characterData.imageFileName,
      co: null,
      death: false,
      state: null,
      info: []
    }
    index === -1 ? state.jinroMembers.push(jinroMember) : state.jinroMembers[index].imageFileName = characterData.imageFileName
  },
  removeMember (state, characterName) {
    const index = state.jinroMembers.findIndex( (jinroMember) => jinroMember.name === characterName )
    if ( index != -1) state.jinroMembers.splice(index, 1)
  },
  addRole (state, roleInfo) {
    const role = {
      id: roleInfo.roleData.id,
      name: roleInfo.roleData.name,
      info: roleInfo.roleData.info || 0,
      color: roleInfo.roleData.color || 'white',
      camp: roleInfo.camp
    }
    state.jinroRoles.push(role)
  },
  removeRole (state, roleName) {
    const index = state.jinroRoles.findIndex( (role) => role.name === roleName )
    if( index != -1) state.jinroRoles.splice(index, 1)
  },
  setInfo (state, infoData) {
    const roleInfo = {
      day: infoData.day,
      character: infoData.targetCharacter,
      result: ''
    }
    if(infoData.roleName === '襲撃') {
      const index = state.attackInfo.findIndex( (data) => data.day === infoData.day)
      if( index === -1 ) {
        state.attackInfo.push(roleInfo)
      } else {
        const characterIndex = state.jinroMembers.findIndex( (member) => member.name === state.attackInfo[index].character.name)
        if( characterIndex !== -1 ) state.jinroMembers[characterIndex].death = false
        state.attackInfo.splice(index, 1, roleInfo)
      }
      const i = state.jinroMembers.findIndex( (member) => member.name === infoData.targetCharacter.name)
      if( i !== -1 ) state.jinroMembers[i].death = true
    } else if( infoData.roleName === '処刑') {
      const index = state.hangInfo.findIndex( (data) => data.day === infoData.day)
      if( index === -1 ) {
        state.hangInfo.push(roleInfo)
      } else {
        const characterIndex = state.jinroMembers.findIndex( (member) => member.name === state.hangInfo[index].character.name)
        if( characterIndex !== -1 ) state.jinroMembers[characterIndex].death = false
        state.hangInfo.splice(index, 1, roleInfo)
      }
      const i = state.jinroMembers.findIndex( (member) => member.name === infoData.targetCharacter.name)
      if( i !== -1 ) state.jinroMembers[i].death = true
    }else {
      const index = state.jinroMembers.findIndex( (member) => member.name === infoData.roleName )
      if( index !== -1) {
        const infoIndex = state.jinroMembers[index].info.findIndex( (data) => data.day === infoData.day)
        infoIndex === -1 ? state.jinroMembers[index].info.push(roleInfo) : state.jinroMembers[index].info.splice(infoIndex, 1, roleInfo)
      }
    }
  },
  updateResult(state, resultData) {
    const index = state.jinroMembers.findIndex( (member) => member.name === resultData.roleName )
    if(index !== -1) {
      const infoIndex = state.jinroMembers[index].info.findIndex( (data) => data.day === resultData.day)
      if( infoIndex !== -1) {
        // computedが反応するように変数作ってspliceしている(代入だと反応しない・・・)
        const infoData = {
          day: state.jinroMembers[index].info[infoIndex].day,
          character: state.jinroMembers[index].info[infoIndex].character,
          result: resultData.result
        }
        state.jinroMembers[index].info.splice(infoIndex, 1, infoData)
      }
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}