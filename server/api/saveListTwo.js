// server/api/saveListTwo.js
import { getDBConnection } from '../utils/db'

export default defineEventHandler(async (event) => {
    const { listTwoValue } = await readBody(event)
    const db = await getDBConnection()

    // 更新或插入列表二的状态
    await db.run('UPDATE select_states SET list_two_value = ? WHERE id = ?', [listTwoValue, 1])

    return { success: true }
})
