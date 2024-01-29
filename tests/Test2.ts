import { suite, test } from '@testdeck/mocha'
import MainHooks from '../src/qwaFramework/mainHooks'
import Pages from '../src/forTests/Pages'
import { steps } from '../src/qwaFramework/core/ServiceCore'

const page = Pages.testPage
const widgetDonateForm = Pages.testPage.widgetMain.widgetDonateForm

@suite
export default class Test2 extends MainHooks {
    @test
    async '2. Check pay: card was declined Pay'() {
        await steps
            .createStep('Открытие формы Secure donation', async () => {
                await steps
                    .goTo(page)
                    .click(page.giveNow)
                    .waitForLoad(page.widgetMain)
                    .run()
            })
            .start()

        await steps
            .createStep('Заполнение формы Secure donation', async () => {
                await steps
                    .click(widgetDonateForm.monthlyPlan)
                    .select(widgetDonateForm.currencySelector, 'USD')
                    .fillField(widgetDonateForm.priceInput, '100')
                    .click(widgetDonateForm.donate)
                    .waitForLoad(page.widgetMain.widgetPaymentOption)
                    .run()
            })
            .start()

        await steps
            .createStep('Заполнение формы Payment option', async () => {
                await steps
                    .click(
                        page.widgetMain.widgetPaymentOption
                            .coverTransactionCosts
                    )
                    .click(page.widgetMain.widgetPaymentOption.creditCard)
                    .waitForLoad(page.widgetMain.widgetCreditCard)
                    .run()
            })
            .start()

        await steps
            .createStep('Заполнение формы Credit card', async () => {
                await steps
                    .fillField(
                        page.widgetMain.widgetCreditCard.cardNumber,
                        '4242 4242 4242 4242'
                    )
                    .fillField(
                        page.widgetMain.widgetCreditCard.cardExpiry,
                        '04/24'
                    )
                    .fillField(page.widgetMain.widgetCreditCard.cardCvc, '000')
                    .click(page.widgetMain.widgetCreditCard.continue)
                    .waitForLoad(page.widgetMain.widgetPersonalInformation)
                    .run()
            })
            .start()

        await steps
            .createStep('Заполнение формы Personal Information', async () => {
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
            })
            .start()

        await steps
            .createStep(
                'Проверка отображения виджета CreditCard и ошибки',
                async () => {
                    await steps
                        .checkElementText(
                            page.widgetMain.widgetCreditCard.errorMessage,
                            'Your card was declined. Your request was in live mode, but used a known test card.'
                        )
                        .run()
                }
            )
            .start()
    }
}
