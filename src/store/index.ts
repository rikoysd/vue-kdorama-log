import { Log } from "@/types/Log";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // logListクラスを作った方がよい
    logList: [],
  },
  mutations: {
    /**
     * 作品情報を登録する.
     * @param state - ステート
     * @param payload 登録作品情報
     */
    // registerLog(state, payload) {
    //   state.logList.push(payload.log);
    // },
  },
  actions: {},
  getters: {
    /**
     * 記録作品の一覧を取得.
     * @param state - ステート
     * @returns 記録作品の一覧
     */
    showLogList(state) {
      return state.logList;
    },
    /**
     * idから作品の詳細ページを取得する
     * @param state - ステート
     * @returns 作品情報
     */
    // getSearchLog(state) {
    //   return (id: number) => {
    //     return state.logList.filter((log) => log.id === id);
    //   };
    // },
  },
  modules: {},
});
