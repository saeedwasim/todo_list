export const actions = {
    async fetchAllTodos() {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.get("/todos");
        console.log(response, "response");
        this.TODOS = response.data; // ✅ 'this' works now
        return response.data;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  };
  