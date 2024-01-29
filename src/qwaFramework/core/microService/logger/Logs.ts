import pino, { Logger } from 'pino'

export default class Logs {
    static log: Logger

    public static async init(testName: string): Promise<void> {
        Logs.log = pino({
            name: testName,
            level: process.env.LOG ? process.env.LOG : 'info',
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: true,
                    colorize: true,
                },
            },
        })
        debug('Logger started')
    }
}

export function info(message: string): void {
    Logs.log.info(`STEP - ${message}`)
}

export function warn(message: string): void {
    Logs.log.warn(message)
}

export function debug(message: string): void {
    Logs.log.debug(message)
}

export function error(message: string | unknown): void {
    Logs.log.error(message)
}
