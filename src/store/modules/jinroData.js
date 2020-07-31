const state = {
  jinroMembers: [],
  jinroRoles: []
}

const getters = {
  jinroMembers: state => state.jinroMembers,
  jinroRoles: state => state.jinroRoles
}

const actions = {
  addMember({ commit }, { member }) {
    commit('addMember', member)
  },
  removeMember({ commit }, { member }) {
    commit('removeMember', member)
  },
  selfMember({ commit }, { memberName }){
    commit('selfMember', memberName)
  }
}

const mutations = {
  addMember (state, member) {
    let exist = false;
    for(let index = 0; index < state.jinroMembers.length; index++)
      if( state.jinroMembers[index].name === member.name) {
        exist = true
        state.jinroMembers[index].imageIndex = member.imageIndex
      }
    if( !exist ) state.jinroMembers.push(member)
  },
  removeMember (state, member) {
    for(let index = 0; index < state.jinroMembers.length; index++)
      if( state.jinroMembers[index].name === member)
        state.jinroMembers.splice(index, 1)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}