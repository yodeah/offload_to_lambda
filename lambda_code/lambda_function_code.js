compute_heavy_task = function(data){
    return data*data;
};

exports.handler = (event, context, callback) => {
    context.succeed(
        {
            "lambda_function_name":"convert_stuff",
            "original_data":event.data_to_transform,
            "transformed_data":compute_heavy_task(event.data_to_transform)
        });
};
