import QwaPage from '../qwaFramework/core/baseObject/QwaPage'
import QwaElement from '../qwaFramework/core/baseObject/QwaElement'
import WidgetMain from './elements/WidgetMain'

export default class TestPage extends QwaPage {
    giveNow = new QwaElement(
        'Получить форму для оплаты',
        `//div[@data-qa="donate-button-label"]`
    )

    widgetMain = new WidgetMain(
        'WidgetMain',
        '//div[@data-testid="campaign"]/..'
    )

    async isLoaded(): Promise<boolean> {
        return await this.giveNow.isVisible()
    }
}
