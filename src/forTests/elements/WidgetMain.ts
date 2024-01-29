import QwaElement from '../../qwaFramework/core/baseObject/QwaElement'
import WidgetDonateForm from './WidgetDonateForm'
import WidgetPaymentOption from './WidgetPaymentOption'
import WidgetCreditCard from './WidgetCreditCard'
import WidgetPersonalInformation from './WidgetPersonalInformation'

export default class WidgetMain extends QwaElement {
    widgetDonateForm = new WidgetDonateForm(
        'WidgetDonateForm',
        '//form[@data-qa="fiat-donate-form"]'
    )
    widgetPaymentOption = new WidgetPaymentOption(
        'WidgetPaymentOption',
        `//*[@data-qa="active-screen-payment-method"]`
    )

    widgetCreditCard = new WidgetCreditCard('WidgetCreditCard', '//*[@data-qa="active-screen-credit-card"]')
    widgetPersonalInformation = new WidgetPersonalInformation('PersonalInformation', '//*[@data-qa="active-screen-privacy"]')


    async isLoaded(): Promise<boolean> {
        return await this.widgetDonateForm.monthlyPlan.isVisible()
    }
}
