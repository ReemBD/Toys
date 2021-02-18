const fs = require('fs')
const asyncLocalStorage = require('./als.service')

const logsDir = './logs'

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

function getTime() {
    let now = new Date()
    return now.toLocaleDateString()
}

function doLog(level, ...args) {
    const strs = args.map(arg => (typeof arg === 'string') ? arg : JSON.stringify(arg))
    var line = strs.join(' | ')
    const store = asyncLocalStorage.getStore()
    const sessionId = store?.sessionId
    const sid = sessionId ? `(sid: ${sessionId})` : ''
    line = `${getTime()} - ${level} - ${line} ${sid}\n`
    console.log(line);
    fs.appendFileSync('./logs/backend.log', line)
}

module.exports = {
    debug(...args) {
        doLog('DEBUG', ...args)
    },
    info(...args) {
        doLog('INFO', ...args)
    },
    warn(...args) {
        doLog('ERROR', ...args)
    },
    error(...args) {
        doLog('ERROR', ...args)
    }
}