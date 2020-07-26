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
    const jinroMembers = JSON.parse(localStorage.getItem('jinroMembers'));
    jinroMembers.push(member);
    localStorage.setItem('jinroMembers', JSON.stringify(jinroMembers));
  },
  removeMember (state, member) {
    const jinroMembers = JSON.parse(localStorage.getItem('jinroMembers'));
    const index = jinroMembers.indexOf(member);
    if (index >= 0) {
      jinroMembers.splice(index, 1);
      localStorage.setItem('jinroMembers', JSON.stringify(jinroMembers));
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}