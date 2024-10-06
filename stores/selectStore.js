// stores/selectStore.js
import { defineStore } from 'pinia'

export const useSelectStore = defineStore('select', {
    state: () => ({
        listOneValue: null, // 列表一的值
        listTwoValue: null, // 列表二的值
    }),
    actions: {
        // 从浏览器中读取列表一的状态
        loadListOneFromStorage() {
            console.log("从浏览器中读取列表一的状态")

            // 尝试从 localStorage 读取 listOneValue
            const savedValue = localStorage.getItem('listOneValue')

            if (savedValue) {
                // 如果有存储的值，使用它
                this.listOneValue = savedValue
            } else {
                // 如果没有存储的值，设置默认值为 1 并保存到 localStorage
                console.log("没有找到存储的列表一状态，设置默认值为 1")
                this.listOneValue = '1'  // 确保它是字符串，因为 localStorage 只能存储字符串
                localStorage.setItem('listOneValue', this.listOneValue)
            }

            console.log("当前列表一的值:", this.listOneValue)
        }
        ,
        // loadListOneFromStorage() {
        //     console.log("从浏览器中读取列表一的状态")
        //     this.listOneValue = localStorage.getItem('listOneValue') || null
        // },
        // 保存列表一的状态到浏览器
        saveListOneToStorage() {
            console.log("当前列表一的值是:", this.listOneValue) // 调试输出
            if (this.listOneValue) {
                localStorage.setItem('listOneValue', this.listOneValue)
                console.log("列表一的状态已保存到浏览器") // 调试输出
            } else {
                console.log("列表一的值无效，未能保存") // 调试输出
            }
        },

        // 从服务器获取列表二的状态
        async loadListTwoFromServer() {
            console.log("从服务器获取列表二的状态")
            try {
                const { data } = await $fetch('/api/getListTwo')
                console.log("data", data) // 检查数据结构

                // 如果直接返回 row.list_two_value，则无需 data.value
                if (data) {
                    console.log('服务器返回的列表二的值:', data)
                    this.listTwoValue = data
                } else {
                    console.warn('服务器没有返回列表二的有效值')
                }
            } catch (error) {
                console.error('获取列表二的状态失败:', error)
            }
            console.log("从服务器获取列表二的状态end")
        }


        ,
        // 将列表二的状态保存到服务器
        async saveListTwoToServer() {
            // console.log("将列表二的状态保存到服务器")
            if (this.listTwoValue) {
                console.log("将列表二"+this.listTwoValue+"的状态保存到服务器")
                await $fetch('/api/saveListTwo', {
                    method: 'POST',
                    body: { listTwoValue: this.listTwoValue }
                })
            }
        }
    }
})
