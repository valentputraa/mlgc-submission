const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getData = require('../services/getData')
 
async function postPredictHandler(request, h,) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const {label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

 

  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
 
  const response = h.response({
    status: 'success',
    message:'Model is predicted successfully',
    data
  })
  await storeData(id, data);
  response.code(201);
  return response;
}

async function getDataHistoriesHandler(request, h){
  const data = await getData("(default)");

    const response = h.response({
        status: "success",
        data,
    });
    response.code(200)
    return response;
}
 
module.exports ={postPredictHandler, getDataHistoriesHandler};