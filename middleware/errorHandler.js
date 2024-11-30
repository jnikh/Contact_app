
const {constants} = require('../constants')
const errorHandler = (err , request, response ,next)=>{
  const statusCode = response.statusCode ? response.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
        response.json({title:"validation Failed " ,message:err.message ,stackTrace:err.stack})
        break;
    case constants.UNAUTHORIZED:
        response.json({title:"Unauthorized ",message:err.message ,stackTrace :err.stack})
        break;

    case constants.NOT_FOUND:
        response.json({title:"Not Found",message:err.message ,stackTrace :err.stack})
        break;
    case constants.FORBIDDEN:
        response.json({title:"Forbidden",message:err.message ,stackTrace :err.stack})
        break;
    case constants.SERVER_ERROR:
        response.json({title:"server error",message:err.message ,stackTrace :err.stack})

    default:
        console.log("No error , Everything is good!")
        break;
  }
 
  
}

module.exports = errorHandler