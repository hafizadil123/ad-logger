const Logger = require("./logger");

const logger = (() => {
    let instance;

    return () => {
        if (!instance) {
            instance = new Logger();
        }
        return instance;
    };
})();

module.exports = logger();

