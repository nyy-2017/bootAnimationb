import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ""
  },
  mutations: {
    // 登录成功将, token保存在localStorage中
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    // 退出登录将, token清空
    [types.LOGOUT]: state => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {},
  modules: {}
});
