import { Log } from "@/types/Log";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logList: [new Log(0, "", "", new Date())],
  },
  mutations: {
    registerLog(state, payload) {
      state.logList.push(payload);
    },
  },
  actions: {},
  getters: {
    /**
     * 記録作品の一覧を取得
     * @param state - ステート
     * @returns 記録作品の一覧
     */
    showLogList(state) {
      return state.logList;
    },
  },
  modules: {},
});
