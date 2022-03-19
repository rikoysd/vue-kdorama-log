import { Log } from "@/types/Log";
import { LogList } from "@/types/LogList";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logList: new LogList(0, 0, []),
  },
  mutations: {
    /**
     * 作品情報を登録する.
     * @param state - ステート
     * @param payload 登録作品情報
     */
    registerLog(state, payload) {
      state.logList.logLists.push(payload.log);
    },

    /**
     * 作品情報を上書きする.
     * @param state - ステート
     * @param payload 上書きする作品情報
     */
    overWrightLog(state, payload) {
      state.logList.logLists.splice(payload.log.id, 1, payload.log);
      console.log(state.logList);
    },
  },
  actions: {},
  getters: {
    /**
     * 記録作品の一覧を取得.
     * @param state - ステート
     * @returns 記録作品の一覧
     */
    showLogList(state) {
      return state.logList.logLists;
    },
    /**
     * idから作品の詳細ページを取得する
     * @param state - ステート
     * @returns 作品情報
     */
    getSearchLog(state) {
      // ↓配列（logLists）が返ってくるので、[0]をつける
      return (logId: number) => {
        return state.logList.logLists.filter((log) => log.id === logId)[0];
      };
    },
  },
  modules: {},
});
