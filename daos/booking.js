const Booking = require('../models/booking');


module.exports = {};



module.exports.bookflight = async(bookingobj,userId) => {
    const bookingresult =  await Booking.create({flight_id:bookingobj.flight_id,status:bookingobj.status,passenger_id:userId});
    return bookingresult
}

module.exports.getBookings = async(user) => {
    let allbookings
    if(user){
         allbookings = await Booking.find({passenger_id:user }).lean(); 
         console.log("in daos user with its booking", allbookings)
    }
    else{
         allbookings = await Booking.find({ }).lean(); 
    }
   
    return allbookings;
}
module.exports.getBookingswithid = async(user,id) => {
    let allbookings
    if(user){
         allbookings = await Booking.findOne({passenger_id:user,_id:id }).lean(); 
    }
    else{
         allbookings = await Booking.findOne({ _id:id}).lean(); 
    }
   
    return allbookings;
}


class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;