<template>
  <div>
    <label for="listTwo">列表二：</label>
    listTwoValue:{{listTwoValue}}
    <select id="listTwo" v-model="listTwoValue" @change="saveListTwoToServer">
      <option value="a">a</option>
      <option value="b">b</option>
      <option value="c">c</option>
    </select>
  </div>
</template>

<script setup>
import { useSelectStore } from '@/stores/selectStore'
import { onMounted, computed } from 'vue'

const selectStore = useSelectStore()

onMounted(() => {
  // 页面加载时从服务器获取列表二的状态
  console.log('页面加载时从服务器获取列表二的状态')
  selectStore.loadListTwoFromServer()
})

const listTwoValue = computed({
  get: () => selectStore.listTwoValue,
  set: (value) => {
    console.log('用户选择了列表二的值:', value) // 调试日志
    selectStore.listTwoValue = value
  }
})

const saveListTwoToServer = () => {
  console.log('保存列表二的状态到服务器xxxxx') // 调试日志
  selectStore.saveListTwoToServer()
}
</script>
