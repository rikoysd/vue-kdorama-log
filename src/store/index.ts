import { Log } from "@/types/Log";
import { LogList } from "@/types/LogList";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // logListクラスを作った方がよい
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
      return (logId: number) => {
        return state.logList.logLists.filter((log: Log) => log.id === logId);
      };
    },
  },
  modules: {},
});
