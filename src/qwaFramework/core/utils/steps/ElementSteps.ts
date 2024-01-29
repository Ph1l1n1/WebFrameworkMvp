import QwaElement from '../../mainEntities/QwaElement'
import { pw } from '../../../playwright/ServicePlaywright'


export default class ElementSteps {
    public static async click(element : QwaElement): Promise<any> {
        await pw.page.click(element.locator)
    }
}