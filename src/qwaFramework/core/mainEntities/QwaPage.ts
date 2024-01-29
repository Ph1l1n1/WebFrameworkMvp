import { pw } from '../../playwright/ServicePlaywright'

export type PwWaitUntil = 'load' | 'domcontentloaded' | 'networkidle' | 'commit'

export type PwGoToOptions = {
    referer?: string
    timeout?: number
    waitUntil?: PwWaitUntil
}

export default class QwaPage {
    public url: string
    public readonly name: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }

    public async goToUrl(url: string, options?: PwGoToOptions): Promise<void> {
        await pw.page.goto(url)
    }

    public async refresh(options?: {
        timeout?: number
        waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
    }): Promise<void> {
        await pw.page.reload(options)
    }

    public async isLoaded(): Promise<boolean> {
        return true
    }
}
