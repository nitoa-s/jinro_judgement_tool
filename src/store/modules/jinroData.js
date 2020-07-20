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
    commit('addMember', member);
  },
  removeMember({ commit }, { member }) {
    commit('removeMember', member);
  }
}

const mutations = {
  addMember (state, member) {
    state.jinroMembers.push(member);
    localStorage.setItem('jinroMembers', JSON.stringify(state.jinroMembers));
  },
  removeMember (state, member) {
    const index = state.jinroMembers.indexOf(member);
    if (index >= 0) {
      state.jinroMembers.splice(index, 1);
      localStorage.setItem('jinroMembers', JSON.stringify(state.jinroMembers));
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}