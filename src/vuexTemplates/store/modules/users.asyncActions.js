import asyncAction from "../../infrastructure/asyncAction";
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
  getAllUsers({ commit }) {
    return asyncAction({ url: "<%= defaultRoute %>", methodType: "get" }).then(
      (response) => {
        commit("setUsers", response);
      }
    );
  },
  addUser({ commit }, data) {
    return asyncAction({
      url: "<%= defaultRoute %>",
      methodType: "post",
      httpHeaders: {
        body: JSON.stringify(data),
      },
    }).then((response) => {
      commit("addUser", response);
    });
  },
  deleteUser({ commit }, id) {
    return asyncAction({
      url: `<%= defaultRoute %>/${id}`,
      methodType: "delete",
    }).then((response) => {
      commit("removeUser", response);
    });
  },
  selectedItem({ commit }, id) {
    commit("selectedUser", id);
  },
  editItem({ commit }, data) {
    const { id, name, username, email } = data;
    return asyncAction({
      url: `<%= defaultRoute %>/${id}`,
      methodType: "patch",
      httpHeaders: {
        body: JSON.stringify({
          name,
          username,
          email,
        }),
      },
    }).then((response) => {
      commit("editUser", response);
    });
  },
};

const mutations = {
  setUsers: (state, data) => (state.users = data),
  addUser: (state, data) => state.users.unshift(data),
  selectedUser: (state, id) => {
    state.selectedUser = state.users.find((user) => user.id == id);
  },
  removeUser: () => {},
  editUser: () => {},
};

export default {
  state,
  getters,
  actions,
  mutations,
};
