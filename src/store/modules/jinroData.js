const state = {
  jinroMembers: [],
  jinroRoles: []
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
  addRole({ commit }, { roleData }) {
    commit('addRole', roleData)
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
      co: '',
      death: false,
      state: null,
    }
    index === -1 ? state.jinroMembers.push(jinroMember) : state.jinroMembers[index].imageFileName = characterData.imageFileName
  },
  removeMember (state, characterName) {
    const index = state.jinroMembers.findIndex( (jinroMember) => jinroMember.name === characterName )
    if ( index != -1) state.jinroMembers.splice(index, 1)
  },
  addRole (state, roleData) {
    state.jinroRoles.push(roleData)
  },
  removeRole (state, roleName) {
    for(let index = 0; index < state.jinroRoles.length; index++)
      if( state.jinroRoles[index].name === roleName) {
        state.jinroRoles.splice(index, 1)
        break
      }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}