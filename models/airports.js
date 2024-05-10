const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name: { type: String,unique:true, required: true },
    code: { type: String, index: true,required: true },
    location: { type: String, index: true,required: true },
    
});


module.exports = mongoose.model("airports", airportSchema);