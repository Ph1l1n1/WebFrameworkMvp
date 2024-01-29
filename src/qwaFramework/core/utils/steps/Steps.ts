import { error, info } from '../logger/Logs'
import QwaElement from '../../mainEntities/QwaElement'
import QwaPage from '../../mainEntities/QwaPage'
import { pw } from '../../../playwright/ServicePlaywright'
import assert from 'assert'
import { steps } from '../../ServiceCore'

type AnyAsyncFunction = (...args: any[]) => Promise<any>

export default class Steps {
    private asyncFunctions: AnyAsyncFunction[] = []
    private asyncConteinerFunctions: AnyAsyncFunction[] = []
    public prefix = ''

    // @step('Переход по страницу')
    @qwaStep('Переход по страницу: {0}')
    private async _goTo(name: string, page: QwaPage): Promise<any> {
        await pw.page.goto(page.url, { waitUntil: 'domcontentloaded' })
        await page.isLoaded()
    }

    public goTo(page: QwaPage): Steps {
        this.asyncFunctions.push(async () => await this._goTo(page.name, page))
        return this
    }

    @qwaStep('Клик на элемент: {0}')
    private async _click(name: string, element: QwaElement): Promise<void> {
        await element.click()
    }

    public click(element: QwaElement): Steps {
        this.asyncFunctions.push(
            async () => await this._click(element.name, element)
        )
        return this
    }

    @qwaStep('{0}')
    private async _createStep(
        stepName: string,
        asyncFunction: () => Promise<void>
    ): Promise<void> {
        this.prefix = '  '
        await asyncFunction()
        this.prefix = ''
    }

    public createStep(
        stepName: string,
        asyncFunction: () => Promise<void>
    ): Steps {
        this.asyncConteinerFunctions.push(
            async () => await this._createStep(stepName, asyncFunction)
        )
        return this
    }

    @qwaStep('Ожидание элемента: {0}')
    private async _waitForLoad(
        name: string,
        element: QwaElement
    ): Promise<void> {
        await element.isVisible()
    }

    public waitForLoad(element: QwaElement): Steps {
        this.asyncFunctions.push(
            async () => await this._waitForLoad(element.name, element)
        )
        return this
    }

    @qwaStep('Заполяется поле: {0} значением {1}')
    private async _fillField(
        name: string,
        value: string,
        element: QwaElement
    ): Promise<void> {
        await element.input(value)
    }

    public fillField(element: QwaElement, value: string): Steps {
        this.asyncFunctions.push(
            async () => await this._fillField(element.name, value, element)
        )
        return this
    }

    @qwaStep('Заполняется поле селектора: {0} значением {1}')
    private async _select(
        name: string,
        value: string,
        element: QwaElement
    ): Promise<void> {
        await element.select(value)
    }

    public select(element: QwaElement, value: string): Steps {
        this.asyncFunctions.push(
            async () => await this._select(element.name, value, element)
        )
        return this
    }

    @qwaStep('Проверка текста: {1} у элемента: {0}')
    private async _checkElementText(
        name: string,
        expectedValue: string,
        element: QwaElement
    ): Promise<void> {
        await element.isVisible()
        const actualValue = await element.getText()
        try {
            assert(
                actualValue === expectedValue,
                `\nАктуальное значение "${actualValue}" не совпало с значением "${expectedValue}" `
            )
        } catch (e) {
            throw e
        }
    }

    public checkElementText(element: QwaElement, expectedValue: string): Steps {
        this.asyncFunctions.push(
            async () =>
                await this._checkElementText(
                    element.name,
                    expectedValue,
                    element
                )
        )
        return this
    }

    public async run(): Promise<void> {
        for (const asyncFunc of this.asyncFunctions) {
            try {
                await asyncFunc()
            } catch (e) {
                throw e
            }
        }
        this.asyncFunctions = []
    }

    public async start(): Promise<void> {
        for (const asyncFunc of this.asyncConteinerFunctions) {
            try {
                await asyncFunc()
            } catch (e) {
                throw e
            }
        }
        this.asyncConteinerFunctions = []
    }
}

/**
 * Замена {0} на значения который будут использоваться в названии щагов
 */
function formatString(template: string, ...args: any[]): string {
    return template.replace(/\{(\d+)\}/g, (match, index) => `"${args[index]}"`)
}

/**
 * Декоратор для всех шагов
 */
function qwaStep(logText: string) {
    return function (
        target: any,
        methodName: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value

        descriptor.value = async function (...args: any[]) {
            const stepName = formatString(logText, ...args)
            info(steps.prefix + stepName)
            try {
                await pw.page.waitForTimeout(100)
                await originalMethod.apply(this, args)
                //allure.logStep(stepName, Status.PASSED)
            } catch (e) {
                const errorText = `Проблема в шаге: "${stepName}", по причине: "${e}"`
                error(errorText)
                // allure.step(stepName, () => {
                //     allure.attachment('Ошибка:', errorText, ContentType.TEXT)
                //     throw errorText
                // })
            }
        }
        return descriptor
    }
}
