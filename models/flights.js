const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    departure_airport_id: {  type: mongoose.Schema.Types.ObjectId,
        ref: "airport", },
    arrival_airport_id: {  type: mongoose.Schema.Types.ObjectId,
        ref: "airport", },
    departure_time: { type: String, index: true,required: true },
    departure_date: { type: String, index: true,required: true },
    arrival_date:{ type: String, index: true,required: true },
    arrival_time: { type: String, index: true,required: true },
    airline_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "airline",
    } 
});


module.exports = mongoose.model("flights",  flightSchema);