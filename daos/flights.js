const Flights = require('../models/flights');

module.exports = {};

module.exports.getFlights = async() => {
  const flights =  await Flights.find().lean();
  return flights
}


module.exports.getFlightsById = async (flightId) => {
    const flight =  await Flights.find({ _id: flightId }).lean();
    return flight
}

module.exports.createFlightrec = async(flightrec) => {
    const flightobj =  await Flights.create(flightrec).lean();
    return flightobj
}

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;