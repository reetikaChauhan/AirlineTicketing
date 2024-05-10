const Airport = require('../models/airport');


module.exports = {};



module.exports.getAirport = async() => {
  const airports =  await Airport.find().lean();
  return airports
}


module.exports.getAirportById = async (airportId) => {
    const airport =  await Airport.find({_id:airportId}).lean();
    return airport
}

module.exports.createAirportrec = async(airportrec) => {
    const airportobj =  await Airport.create(airportrec).lean();
    return airportobj
}

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;