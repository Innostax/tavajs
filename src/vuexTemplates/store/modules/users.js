const state = {
  users: [],
  selectedUser: {},
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
  selectedUser: (state) => {
    return state.selectedUser;
  },
};

const actions = {
  addUser({ commit }, newData) {
    const id = state.users.length;
    const data = { ...newData, id };
    commit("addUser", data);
  },
  deleteUser({ commit }, id) {
    commit("removeUser", id);
  },
  selectedItem({ commit }, id) {
    commit("selectedUser", id);
  },
  editItem({ commit }, data) {
    commit("editUser", data);
  },
};

const mutations = {
  addUser: (state, data) => state.users.unshift(data),
  removeUser: (state, id) =>
    (state.users = state.users.filter((user) => user.id !== id)),
  selectedUser: (state, id) => {
    state.selectedUser = state.users.find((user) => user.id == id);
  },
  editUser: (state, data) => {
    const newUsers = state.users.filter((user) => user.id !== data.id);
    state.users = [...newUsers, data];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
