<template>
  <div class="h-screen bg-gray-100 overflow-y-auto">
    <div class="h-60 bg-gray-300 flex flex-col justify-center items-center">
      <p class="text-2xl font-bold text-gray-700">Pinia Todo List</p>
      <div class="flex mt-3">
        <input v-model="formData.title" type="text" class="h-10 w-72 bg-white rounded shadow-lg outline-none px-2"
          placeholder="I need to..." />
        <button @click="addTodo" class="px-5 py-1 bg-[#f8cb42] ml-3 cursor-pointer rounded">
          Add
        </button>
      </div>
    </div>
    <div class="mx-[25%] mt-5 overflow-y-auto">
      <div class="flex justify-end">
        <button class="px-5 py-1 mr-5 bg-white border border-gray-400 cursor-pointer rounded" 
          @click="showAllTasks">
          All Tasks
        </button>
        <button class="px-5 py-1 bg-[#f8cb42] cursor-pointer rounded" 
        @click="favouriteTasks">
          Favourite Tasks
        </button>
      </div>
      <div v-if="!filteredTodos.length" class="text-center mt-10 text-gray-500">
        No Todos Found!!
      </div>
      <div v-else>
        <div v-for="item in filteredTodos" :key="item.id" class="h-14 my-5 w-full bg-white shadow-lg rounded">
          <div class="flex justify-between px-3 py-4">
            <div>
              {{ item.title }}
            </div>
            <div class="flex">
              <trash @click="dltTodo(item.id)" class="w-5 h-5 cursor-pointer mr-2" />
              <borderHeart @click="changeFavouriteStatus(item)" :isFavourite="item.favourite"
                class="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import trash from '~/assets/icons/trash.vue';
import borderHeart from '~/assets/icons/border-heart.vue';
import { showTodo } from '@/store/todo';

const todo = showTodo();
const formData = reactive({
  title: "",
  favourite: false
});
const filteredTodos = ref([]);

const handleAllTodos = async () => {
  await todo.fetchAllTodos();
  filteredTodos.value = todo.getAllTodos;

};
const addTodo = async () => {
  await todo.handleAddTodo(formData);
  formData.title = ""; 
};
const dltTodo = async (id) => {
  await todo.handleDeleteTodo(id);
};
const changeFavouriteStatus = async (item) => {
  item.favourite = !item.favourite;
  await todo.toHandleFavourite(item);
};
const showAllTasks = () => {
  filteredTodos.value = todo.getAllTodos;
};
const favouriteTasks = () => {
  filteredTodos.value = todo.getAllTodos.filter(todo => todo.favourite);
};

onMounted(() => {
  handleAllTodos();
});
</script>
