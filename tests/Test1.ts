import { suite, test } from '@testdeck/mocha'
import MainHooks from '../src/qwaFramework/mainHooks'
import Pages from '../src/forTests/Pages'
import { steps } from '../src/qwaFramework/core/ServiceCore'

const page = Pages.testPage
const widgetDonateForm = Pages.testPage.widgetMain.widgetDonateForm

@suite
export default class Test1 extends MainHooks {
    @test
    async 'Check pay: card was declined Pay'() {
        await steps
            .goTo(page)
            .click(page.giveNow)
            .waitForLoad(page.widgetMain)
            .run()

        await steps
            .click(widgetDonateForm.monthlyPlan)
            .select(widgetDonateForm.currencySelector, 'USD')
            .fillField(widgetDonateForm.priceInput, '100')
            .click(widgetDonateForm.donate)
            .waitForLoad(page.widgetMain.widgetPaymentOption)
            .run()

        await steps
            .click(page.widgetMain.widgetPaymentOption.coverTransactionCosts)
            .click(page.widgetMain.widgetPaymentOption.creditCard)
            .waitForLoad(page.widgetMain.widgetCreditCard)
            .run()

        await steps
            .fillField(
                page.widgetMain.widgetCreditCard.cardNumber,
                '4242 4242 4242 4242'
            )
            .fillField(page.widgetMain.widgetCreditCard.cardExpiry, '04/24')
            .fillField(page.widgetMain.widgetCreditCard.cardCvc, '000')
            .click(page.widgetMain.widgetCreditCard.continue)
            .waitForLoad(page.widgetMain.widgetPersonalInformation)
            .run()

        await steps
            .fillField(
                page.widgetMain.widgetPersonalInformation.firstName,
                'firstName'
            )
            .fillField(
                page.widgetMain.widgetPersonalInformation.lastName,
                'lastName'
            )
            .fillField(
                page.widgetMain.widgetPersonalInformation.personalEmail,
                'test@google.com'
            )
            .click(page.widgetMain.widgetPersonalInformation.continue)
            .run()

        await steps
            //.waitForLoad(page.widgetMain.widgetCreditCard)
            .checkElementText(
                page.widgetMain.widgetCreditCard.errorMessage,
                'Your card was declined. Your request was in live mode, but used a known test card.'
            )
            .run()
    }
}
