import { ServiceCore } from './core/ServiceCore'
import { ServicePlaywright } from './playwright/ServicePlaywright'

/**
 * Все сервисы фреймворка запускаются в рамках хуков
 */
export default abstract class MainHooks {
    static async before() {
        await ServiceCore.beforeAll(this.name)
        await ServicePlaywright.beforeAll()
    }

    static async after() {
        await ServicePlaywright.afterAll()
    }
}
