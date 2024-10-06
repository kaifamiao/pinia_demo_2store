<!-- components/ListOne.vue -->
<template>
  <div>
    <label for="listOne">列表一：</label>
    {{listOneValue}}
    <select id="listOne" v-model="listOneValue" @change="saveListOneToStorage">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
</template>

<script setup>
import { useSelectStore } from '@/stores/selectStore'
import { computed } from 'vue'

const selectStore = useSelectStore()
onMounted(() => {
  // 页面加载时从 localStorage 加载列表一的状态
  selectStore.loadListOneFromStorage()
})

// 确保 v-model 绑定 Pinia 中的状态
const listOneValue = computed({
  get: () => selectStore.listOneValue,
  set: (value) => {
    console.log('设置 listOneValue 为:', value)
    selectStore.listOneValue = value
  }
})

// 保存状态到 localStorage
const saveListOneToStorage = () => selectStore.saveListOneToStorage()
</script>
