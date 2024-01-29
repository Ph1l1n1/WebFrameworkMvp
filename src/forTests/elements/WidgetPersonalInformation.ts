import QwaElement from '../../qwaFramework/core/mainEntities/QwaElement'

export default class WidgetPersonalInformation extends QwaElement {

    firstName = new QwaElement('FirstName', '//input[@data-qa="personal-first-name"]')
    lastName = new QwaElement('LastName', '//input[@data-qa="personal-last-name"]')
    personalEmail = new QwaElement('PersonalEmail', '//input[@data-qa="personal-email"]')
    continue = new QwaElement('Continue', '//button[@data-qa="privacy-continue"]')

    async isLoaded(): Promise<boolean> {
        return await this.firstName.isVisible()
    }
}