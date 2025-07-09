<script setup>
import { moduleMenu } from '@/utils/moduleMenu'
import {ChevronDown} from 'lucide-vue-next'
const router = useRouter()
const activeItem = ref('Dashboard')
const activeSubItem = ref(null)
const openDropdownId = ref(null)

const handleActiveTab = (item) => {
  activeItem.value = item.label
  if (item.subItems) {
    handleOpenDropdown(item.id)
  } else {
    activeSubItem.value = null
  }
}

const handleActiveSubItem = (subItem) => {
  activeSubItem.value = subItem.label
}

const handleOpenDropdown = (id) => {
  openDropdownId.value = openDropdownId.value === id ? null : id
}
const logout = () => {
router.push('/auth/signup')
}
</script>
<template>
  <div class="w-72 h-screen border border-r-[#f3f4f6]">
    <div class="h-10 flex items-center">
      <div class="px-5">
        <img src="@/assets/svg/logo.png" alt="Logo" />
      </div>
    </div>
    <hr />
    <div>
      <p class="mt-5 text-sm font-semibold text-gray-800 px-4">Module Menu</p>
      <div v-for="item in moduleMenu" :key="item.id" class="px-2">
        <div class="flex items-center rounded-md cursor-pointer hover:bg-[#0273731A]" @click="handleActiveTab(item)">
          <component :is="item.icon" class="w-5 h-5 ml-2" />
          <p class="text-sm font-normal py-2 ml-2"
            :class="{ 'text-[#027373] font-semibold': activeItem === item.label }">
            {{ item.label }}
          </p>
          <ChevronDown v-if="item.subItems" class="ml-auto w-5 h-5 mr-2" />
        </div>

        <div v-if="item.subItems && openDropdownId === item.id" class="ml-4 border-l">
          <div v-for="subItem in item.subItems" :key="subItem.label" class="px-2">
            <p class="text-sm font-normal py-1 ml-2 cursor-pointer" @click="handleActiveSubItem(subItem)"
              :class="{ 'text-[#027373] font-semibold': activeSubItem === subItem.label }">
              {{ subItem.label }}
            </p>
          </div>
         
        </div>
      </div>
    </div>
    <hr class="mt-3"/>
    <div class="absolute bottom-0 px-5 py-4 cursor-pointer" @click="logout">
        <p class="text-red-600 font-semibold">Logout</p>
    </div>
  </div>
</template>
