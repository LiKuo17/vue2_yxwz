const state = {
  msgSessions: [],
};
const mutations = {
  changeMsgSessions(state, list) {
    state.msgSessions = list;
    localStorage.msgSessions = JSON.stringify(list);
  },
};
export default {
  state,
  mutations,
};
