const Airlines = require('../models/airlines');


module.exports = {};



module.exports.getAirlines = async() => {
  const airlines =  await Airlines.find().lean();
  return airlines
}


module.exports.getAirlinesById = async (airlineId) => {
    const airlines =  await Airlines.find({_id:airlineId}).lean();
    return airlines
}

module.exports.createAirlinesrec = async(airlinerec) => {
    const airlineobj =  await Airlines.create(airlinerec);
    return airlineobj
}

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;