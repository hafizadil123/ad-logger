const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logLevels = {
            DEBUG: { value: 1, name: "DEBUG", color: "#0000FF" }, // Blue
            INFO: { value: 2, name: "INFO", color: "#008000" }, // Green
            WARN: { value: 3, name: "WARN", color: "#FFA500" }, // Orange
            ERROR: { value: 4, name: "ERROR", color: "#FF0000" } // Red
        };
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${level.name}] ${message}`;
        this.logToConsole(level, logMessage);
        this.saveToFile(logMessage);
    }

    debug(message) {
        this.log(this.logLevels.DEBUG, message);
    }

    info(message) {
        this.log(this.logLevels.INFO, message);
    }

    warn(message) {
        this.log(this.logLevels.WARN, message);
    }

    error(message) {
        this.log(this.logLevels.ERROR, message);
    }

    logToConsole(level, message) {
        if (typeof console !== 'undefined') {
            console.log(`%c${message}`, `color: ${level.color}`);
        }
    }

    saveToFile(message) {
        const logsDirectory = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory);
        }
        const logFilePath = path.join(logsDirectory, `logs_${new Date().toISOString().replace(/:/g, '-')}.txt`);
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} ${message}`;
        fs.appendFileSync(logFilePath, logMessage + '\n');
    }
}

module.exports = Logger;
