import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    // ログインする
    loginUser(state) {
      state.isLogin = true;
    },

    // ログアウトする
    logoutUser(state) {
      state.isLogin = false;
    },
  },
  actions: {},
  getters: {
    /**
     * 現在のログイン状況を取得する.
     * @param state - ステート
     * @returns 現在のログイン状況
     */
    isLogin(state) {
      return state.isLogin;
    },
  },
  modules: {},
});
