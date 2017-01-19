const CONF = require("./conf.json");
const AWS = require("aws-sdk");

var lambda = {};

function init(){
    AWS.config = new AWS.Config({
        accessKeyId:CONF.ACCESS_KEY,
        secretAccessKey:CONF.SECRET_KEY,
        region:CONF.REGION,
    });
    lambda = new AWS.Lambda();
    runAFunctionOnLambda(CONF.LAMBDA_FUNCTION, {
        data_to_transform:500
    });
}

function runAFunctionOnLambda(fn_str, payload){
    var settings = {
        FunctionName:fn_str,
        Payload:JSON.stringify(payload)
    };
    lambda.invoke(settings, handleResponse);
}

function handleResponse(err, response){
    if(err){
        console.log("error");
        console.dir(err);
        return;
    }
    var data = JSON.parse(response.Payload);
    console.log(data);
}

init();
