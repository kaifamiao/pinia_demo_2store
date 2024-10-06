export default defineEventHandler(() => {
    console.log('API 测试路由已执行')
    return { data: {age: 1}, }
})

