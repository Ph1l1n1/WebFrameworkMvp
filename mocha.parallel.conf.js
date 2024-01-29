const { resolve } = require('path')

module.exports = {
    //extension: ['ts'],
    require: ['ts-node/register'],
    spec: 'tests/**/*.ts',
    colors: true,
    timeout : 30000,
    exit: true,
    parallel : false,
    reporter: "allure-mocha",
    reporterOptions: {
        reporterEnabled: "list, allure-mocha",
        allureMochaReporterOptions: {
            resultsDir: resolve(__dirname, "allure-results"),
        },
    },
}
