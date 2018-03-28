'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

/**
 * 异步执行命令
 * @param {*} cmd 命令
 */
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

/**
 * 版本要求
 */
const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    }
]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function () {
    const warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]

        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' + chalk.default.red(mod.currentVersion) + ' should be ' + chalk.default.green(mod.versionRequirement))
        }
    }

    if (warnings.length) {
        console.log('')
        console.log(chalk.default.yellow('To use this template, you must update foolowing to modules:'))
        console.log()

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('   ' + warning)
        }

        console.log()
        process.exit()
    }
}