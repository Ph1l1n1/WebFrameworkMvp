import Driver from './Driver'
import { debug } from '../core/microService/logger/Logs'

export class ServicePlaywright {
    public static async beforeAll(): Promise<void> {
        debug(`ServicePlaywright - beforeAll`)
        pw = await Driver.init()
    }

    public static async afterAll(): Promise<void> {
        debug(`ServicePlaywright - afterAll`)
        await pw.close()
    }
}

export let pw: Driver
