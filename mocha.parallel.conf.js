const { resolve } = require('path')

module.exports = {
    //extension: ['ts'],
    require: ['ts-node/register'],
    spec: process.env.SPEC ? process.env.SPEC : 'tests/**/*.ts',
    colors: true,
    timeout: 30000,
    exit: true,
    reporter: 'allure-mocha',
    reporterOptions: {
        reporterEnabled: 'list, allure-mocha',
        allureMochaReporterOptions: {
            resultsDir: resolve(__dirname, 'allure-results'),
        },
    },
}
