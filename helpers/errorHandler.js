function errorHandler(err,req,res,next){
    return res.status(err.status || 500).json({
        message: err.message || "oops something went wrong"
    })
}
module.exports = errorHandler;