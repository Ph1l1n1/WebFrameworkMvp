import { pw } from '../../playwright/ServicePlaywright'
import { debug } from '../microService/logger/Logs'

export default class QwaPage {
    public url: string
    public readonly name: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }

    public async goToPage(page: QwaPage): Promise<any> {
        debug('goToPage')
        await pw.page.goto(page.url)
        await this.pageLoaded(page)
    }

    public async pageLoaded(page: QwaPage): Promise<any> {
        debug('pageLoaded')
        await page.isLoaded()
    }

    public async goToUrl(url: string): Promise<void> {
        await pw.page.goto(url)
    }

    public async refresh(options?: {
        timeout?: number
        waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
    }): Promise<void> {
        await pw.page.reload()
    }

    public async isLoaded(): Promise<boolean> {
        return true
    }
}
