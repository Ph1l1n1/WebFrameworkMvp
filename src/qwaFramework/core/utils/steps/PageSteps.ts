import QwaPage from '../../mainEntities/QwaPage'
import { debug, error } from '../logger/Logs'
import { pw } from '../../../playwright/ServicePlaywright'

export default class PageSteps {
    // todo decorator todo logger
    public static async goToPage(page: QwaPage): Promise<any> {
        await debug('goToPage')
        await pw.page.goto(page.url)
        await this.pageLoaded(page)
    }

    public static async pageLoaded(page: QwaPage): Promise<any> {
        await debug('pageLoaded')
        await page.isLoaded()
    }
}
