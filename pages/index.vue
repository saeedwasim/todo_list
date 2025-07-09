<template>
  <div class="flex">
    <div>
      <Sidebar />
    </div>
    <div class="w-full">
      <div class="h-screen bg-gray-100 overflow-y-auto">
        <div class="h-60 bg-gray-300 flex flex-col justify-center items-center">
          <div class="flex">
            <logo />
            <p class="text-2xl font-bold text-gray-700 flex items-center mt-4">Pinia Todo List</p>
          </div>
          <div class="flex flex-col sm:flex-row mt-3">
            <input v-model="formData.title" type="text" class="h-10 w-72 bg-white rounded shadow-lg outline-none px-2"
              placeholder="I need to..." />
            <button @click="addTodo" class="px-5 py-1 bg-[#f8cb42] mt-3 sm:mt-0 ml-0 sm:ml-3 cursor-pointer rounded">
              Add
            </button>
          </div>
        </div>
        <div class="mx-[10%] sm:mx-[20%] md:mx-[25%] mt-5 overflow-y-auto ">
          <div class="flex flex-col sm:flex-row justify-end">
            <button class="w-full sm:w-32 py-1 mr-5 bg-white border border-gray-400 cursor-pointer rounded"
              @click="showAllTasks">
              All Todos
            </button>
            <button class="px-5 py-1 mt-3 sm:mt-0 bg-[#f8cb42] cursor-pointer rounded" @click="favouriteTasks">
              Favourite Todos
            </button>
          </div>
          <div>
            <p class="text-xl font-semibold text-gray-500 py-2">
              {{ heading }}
            </p>
          </div>
          <div v-if="!filteredTodos.length" class="text-center mt-10 text-gray-500">
            No Todos Found!!
          </div>
          <div v-else>
            <div v-for="item in filteredTodos" :key="item.id" class="h-14 my-5 w-full bg-white shadow-lg rounded">
              <div class="flex justify-between px-3 py-4">
                <div class="flex w-full mr-3">
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
    </div>
  </div>
</template>

<script setup>
import trash from '~/assets/icons/trash.vue';
import borderHeart from '~/assets/icons/border-heart.vue';
import logo from '~/assets/icons/logo.vue';
import Sidebar from '~/components/Sidebar.vue';
import { showTodo } from '@/store/todo';
import { useToast } from 'vue-toastification';
const toast = useToast();
const heading = ref("All Tasks");
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
  if (!formData.title.trim()) {
    alert("Enter something to add a todo.");
    return;
  }
  await todo.handleAddTodo(formData);
  toast.success('Todo Added Successfully!');
  formData.title = "";
  if (heading.value === "All Tasks") {
    filteredTodos.value = todo.getAllTodos
  } else {
    filteredTodos.value = todo.getAllTodos.filter(todo => todo.favourite)
  }
};
const dltTodo = async (id) => {
  await todo.handleDeleteTodo(id);
  filteredTodos.value = filteredTodos.value.filter(item => item.id !== id)
  toast.error('Todo Deleted Successfully!');

};
const changeFavouriteStatus = async (item) => {
  item.favourite = !item.favourite;
  await todo.toHandleFavourite(item);
  if (heading.value == "Favourite Tasks") {
    filteredTodos.value = todo.getAllTodos.filter(todo => todo.favourite)
  } else {
    filteredTodos.value = todo.getAllTodos
  }
};

const showAllTasks = () => {
  filteredTodos.value = todo.getAllTodos;
  heading.value = "All Tasks";
};
const favouriteTasks = () => {
  filteredTodos.value = todo.getAllTodos.filter(todo => todo.favourite);
  heading.value = "Favourite Tasks";
};

onMounted(() => {
  handleAllTodos();
});
</script>
