const { CustomAPIError } = require("../errors/customError")

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res
            .status(err.statusCode)
            .json({ message: err.message, type: err._message })
    } else {
        return res
            .status(500)
            .json({ message: "something went wrong, try again later" })
    }
}

module.exports = errorHandler
