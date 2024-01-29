import Logs, { debug } from './microService/logger/Logs'
import QwaSteps, { StepUtils } from './baseObject/QwaSteps'

export class ServiceCore {
    public static async beforeAll(testName: string): Promise<void> {
        await Logs.init(testName)
        debug(`ServiceCore - beforeAll`)
    }
}

export const steps: QwaSteps = new QwaSteps()
export const stepsUtils: StepUtils = new StepUtils()
