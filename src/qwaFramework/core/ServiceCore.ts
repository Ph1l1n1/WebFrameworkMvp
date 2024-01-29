import Logs from './utils/logger/Logs'
import Steps from './utils/steps/Steps'

export class ServiceCore {
    public static async beforeAll(testName : string): Promise<void> {
        await Logs.init(testName)
    }
}

export const steps: Steps = new Steps()
