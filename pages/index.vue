<template>
  <div class="h-screen bg-gray-100">
    <div class="h-60 bg-gray-300 flex flex-col justify-center items-center">
      <p class="text-2xl font-bold text-gray-700">Pinia Todo List</p>
      <div class="flex mt-3">
        <input v-model="item" type="text" class="h-10 w-72 bg-white rounded shadow-lg outline-none px-2"
          placeholder="I need to..." />
        <button class="px-5 py-1 bg-[#f8cb42] ml-3 cursor-pointer rounded">
          Add
        </button>
      </div>
    </div>
    <div class="mx-[25%] mt-5 overflow-y-auto">
      <div class="flex justify-end">
        <button class="px-5 py-1 mr-5 bg-white border border-gray-400 cursor-pointer rounded">
          All Tasks
        </button>
        <button class="px-5 py-1 bg-[#f8cb42] cursor-pointer rounded">
          Favourite Tasks
        </button>
      </div>
      <div v-for="item in todo.getAllTodos" :key="item.id" class="h-14 mt-5 w-full bg-white shadow-lg rounded">
        {{ item.title }}
      </div>

    </div>

  </div>
</template>
<script setup>
import { showTodo } from '@/store/todo';
const todo = showTodo()
const item = ref("")
const handleAllTodos = async () => {
  console.log("1")
  await todo.fetchAllTodos()
}
onMounted(() => {
  handleAllTodos()
})
</script>