import Vuex from 'vuex'
import users from "./modules/users";

export default Vuex.createStore({
  modules: {
    users,
  },
})

