import { defineStore } from "pinia";
import { actions } from "./actions";
import { state } from "./state";

export const showTodo = defineStore("todo", {
  state,
  actions,
  getters: {
    getAllTodos(state) {
      return state.TODOS;
    },
  },
});
