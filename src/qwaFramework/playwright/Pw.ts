import { Browser, BrowserContext, chromium, devices, Page } from 'playwright'
import { debug, error } from '../core/utils/logger/Logs'

export type PwType = {
    browser: Browser
    browserContext: BrowserContext
    page: Page
    defaultTimeout: number
    init(): Promise<void>
    close(): Promise<void>
    setDefaultTimeouts(): Promise<void>
}

export default class Pw /*implements PwType*/ {
    public browser: Browser
    public browserContext: BrowserContext
    public page: Page
    public defaultTimeout = 30000

    constructor(browser: Browser, browserContext: BrowserContext, page: Page) {
        this.browser = browser
        this.browserContext = browserContext
        this.page = page
        this.setDefaultTimeouts()
    }

    public getDefaultTimeout() {
        return this.defaultTimeout
    }

    /**
     * initialization playwright entities
     * @private
     */
    // @ts-ignore
    public static async init(): Promise<Pw> {
        //let browserContext : BrowserContext
        try {
            const browser = await chromium.launch({
                chromiumSandbox: true,
                headless: process.env.HEADLESS === 'false' ? false : true,
            })

            const device = process.env.DEVICE || '';
            const browserContext = await browser.newContext(device ? devices[device] : {});


            const page = await browserContext.newPage()
            debug(`Browser started`)
            return new Pw(browser, browserContext, page)
        } catch (e) {
            error(e)
        }
    }

    async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close()
            debug('Browser stopped')
        }
    }

    public setDefaultTimeouts(): void {
        this.page.setDefaultTimeout(this.defaultTimeout)
    }
}
