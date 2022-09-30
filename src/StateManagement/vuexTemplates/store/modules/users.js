
import { doAsync } from "@/doAsync";


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

const SUCCESS = 200
const actions = {
    getAllUsers({ commit }) {
      return doAsync({
        url: `users`,
        errorMessage: 'Unable to fetch users',
        successMessage: 'Users are successfully fetched',
      }).then((res) => {
        if (res.status === SUCCESS) commit('updateAllUsers', res.data)
        return res
      })
    },
    addUser({ dispatch }, newData) {
      return doAsync({
        url: `users`,
        httpMethod: 'post',
        data: newData,
        erroMessage: 'Unable to add user. Please try again later',
      }).then((res) => {
        if (res.status === SUCCESS) dispatch("getAllUsers")
        return res
      })
    },
    deleteUser({ dispatch }, id) {
      return doAsync({
        url: `users/${id}`,
        httpMethod: 'delete',
        erroMessage: 'Unable to delete user. Please try again later',
      }).then((res) => {
        if (res.status === SUCCESS) dispatch("getAllUsers")
        return res
      })
    },
    selectedItem({ commit }, id) {
      commit("selectedUser", id);
    },
    editItem({ dispatch }, newData) {
      return doAsync({
        url: `users/${newData.id}`,
        httpMethod: 'patch',
        data: newData,
        erroMessage: 'Unable to update user. Please try again later',
      }).then((res) => {
        if (res.status === SUCCESS) dispatch("getAllUsers")
        return res
      })
    },
  };



const mutations = {
    updateAllUsers: (state, data) => state.users = [...data],
    selectedUser: (state, id) => {
      state.selectedUser = state.users.find((user) => user.id == id);
    },
  };


export default {
  state,
  getters,
  actions,
  mutations,
};
