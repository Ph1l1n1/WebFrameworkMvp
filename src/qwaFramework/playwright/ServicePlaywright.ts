import Pw, { PwType } from './Pw'
import { debug } from '../core/utils/logger/Logs'

export class ServicePlaywright {
    public static async beforeAll(): Promise<void> {
        debug(`ServicePlaywright - beforeAll`)
        pw  = await Pw.init()
    }

    public static async afterAll(): Promise<void> {
        debug(`ServicePlaywright - afterAll`)
        await pw.close()
    }
}

export let pw : Pw