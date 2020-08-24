const state = {
  jinroMembers: [],
  jinroRoles: [],
  attackInfo: []
}

const getters = {
  jinroMembers: state => state.jinroMembers,
  jinroRoles: state => state.jinroRoles
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
      color: roleInfo.roleData.color,
      camp: roleInfo.camp
    }
    state.jinroRoles.push(role)
  },
  removeRole (state, roleName) {
    const index = state.jinroRoles.findIndex( (role) => role.name === roleName )
    if( index != -1) state.jinroRoles.splice(index, 1)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}