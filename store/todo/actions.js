export const actions = {
  async fetchAllTodos() {
    const { $axios } = useNuxtApp();
    try {
      const response = await $axios.get("/todos");
      this.TODOS = response.data;
      return response.data;
    } catch (error) {
      console.error("Fetch error", error);
    }
  },

  async handleAddTodo(payload) {
    const { $axios } = useNuxtApp();
    try {
      const response = await $axios.post("/todos", payload);
      if (response.status === 201) {
        this.TODOS.push(response.data);
      }
      return response;
    } catch (error) {
      console.error("Add error", error);
    }
  },

  async handleDeleteTodo(id) {
    const { $axios } = useNuxtApp();
    try {
      const response = await $axios.delete(`/todos/${id}`);
      if (response.status === 200) {
        const index = this.TODOS.findIndex((todo) => todo.id === id);
        if (index > -1) {
          this.TODOS.splice(index, 1);
        }
      }
      return response;
    } catch (error) {
      console.error("Delete error", error);
    }
  },

  async toHandleFavourite(payload) {
    const { $axios } = useNuxtApp();
    try {
      const response = await $axios.put(`/todos/${payload.id}`, payload);
      return response;
    } catch (error) {
      console.error("Favourite toggle error", error);
    }
  },
};
