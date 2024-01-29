import QwaPage from './QwaPage'
import { Locator } from 'playwright'
import { pw } from '../../playwright/ServicePlaywright'
import { debug, error } from '../microService/logger/Logs'

export default class QwaElement {
    public name: string
    public parent: QwaElement | QwaPage | unknown
    public locator: string

    constructor(name: string, locator: string, parent?: QwaElement) {
        this.name = name
        this.locator = locator
        this.parent = parent
    }

    // @ts-ignore
    private async findElementInIframe(): Promise<Locator> {
        const start = Date.now()
        const time = pw.getDefaultTimeout()
        while (Date.now() - start < time) {
            debug('findElementInIframe')
            for (const frame of pw.page.frames()) {
                const element = frame.locator(this.locator).first()
                if (element && (await element.isVisible())) {
                    return element
                }
            }
            await pw.page.waitForTimeout(1000)
        }
    }

    public async click(): Promise<void> {
        const webElement = await this.findElementInIframe()
        await webElement.click()
    }

    public async select(value: string): Promise<void> {
        const webElement = await this.findElementInIframe()
        await webElement.selectOption(value)
    }

    public async getText(): Promise<string | null> {
        const webElement = await this.findElementInIframe()
        const text = await webElement.textContent()
        return text
    }

    public async input(value: string): Promise<void> {
        const webElement = await this.findElementInIframe()
        await webElement.fill('', { force: true, timeout: 100 })
        await webElement.fill(value, { force: true, timeout: 100 })
    }

    public async isVisible(): Promise<boolean> {
        try {
            const webElement = await this.findElementInIframe()
            await webElement.waitFor({ state: 'visible' })
        } catch (e) {
            error(e)
            throw e
        }
        return true
    }
}
