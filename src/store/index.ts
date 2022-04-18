import { Log } from "@/types/Log";
import { LogList } from "@/types/LogList";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logList: new LogList(0, 0, []),
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

    showLogList(state, payload) {
      state.logList.logLists.push(
        new Log(payload.id, payload.title, payload.text, payload.watchDate)
      );
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

    /**
     * ログ一覧を取得する.
     * @param state - ステート
     * @returns ログ一覧
     */
    getLogList(state){
      return state.logList.logLists;
    }
  },
  modules: {},
});
