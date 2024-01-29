import QwaElement from '../../qwaFramework/core/baseObject/QwaElement'

export default class WidgetCreditCard extends QwaElement {

    cardNumber = new QwaElement('CardNumber', '//input[@data-elements-stable-field-name="cardNumber"]')
    cardExpiry = new QwaElement('CardExpiry', '//input[@data-elements-stable-field-name="cardExpiry"]')
    cardCvc = new QwaElement('CardCvc', '//input[@data-elements-stable-field-name="cardCvc"]')
    continue = new QwaElement('Continue', '//button[@data-qa="card-continue"]')
    errorMessage =  new QwaElement('Error', '//p[@data-qa="card-continue-error-message"]')

    async isLoaded(): Promise<boolean> {
        return await this.cardNumber.isVisible()
    }
}