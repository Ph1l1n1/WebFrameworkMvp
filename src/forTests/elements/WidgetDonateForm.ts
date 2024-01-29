import QwaElement from '../../qwaFramework/core/baseObject/QwaElement'

export default class WidgetDonateForm extends QwaElement {
    donate = new QwaElement('Donate', '//button[@data-qa="donate-button"]')
    monthlyPlan = new QwaElement(
        'MonthlyPlan',
        '//button[@data-qa="more-frequent-button"]'
    )
    currencySelector = new QwaElement(
        'CurrencySelector',
        '//*[@data-qa="currency-selector"]'
    )
    priceInput = new QwaElement('PriceInput', `//input[@data-qa="amount"]`)

    async isLoaded(): Promise<boolean> {
        return await this.monthlyPlan.isVisible()
    }
}
