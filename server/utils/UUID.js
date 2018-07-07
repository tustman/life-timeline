var uuid = require('node-uuid')

/**
 * time based
 */
exports.generateUuid = function () {
    return uuid.v1()
}

/**
 * random based
 */
exports.generateRandomId = function () {
    return uuid.v4()
}
