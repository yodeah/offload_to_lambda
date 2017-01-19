const CONF = require("./conf.json");
const AWS = require("aws-sdk");

var lambda = {};

function init(){
    AWS.config = new AWS.Config({
        accessKeyId:CONF.ID,
        secretAccessKey:CONF.SECRET,
        region:"eu-central-1",
    });
    lambda = new AWS.Lambda();
    runAFunctionOnLambda("hello_world", {
        echo:"stuff_2_echo"
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
