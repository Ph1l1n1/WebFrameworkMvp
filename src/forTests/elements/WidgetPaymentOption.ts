import QwaElement from '../../qwaFramework/core/baseObject/QwaElement'

export default class WidgetPaymentOption extends QwaElement {

    amount = new QwaElement('Amount', '//*[@data-qa="donation-amount-label"]')
    coverTransactionCosts = new QwaElement('CoverTransactionCosts', '//*[@data-qa="cover-fee-checkbox"]')
    creditCard = new QwaElement('CreditCard', '//*[@data-qa="cc-button"]')

    async isLoaded(): Promise<boolean> {
        return await this.amount.isVisible()
    }
}