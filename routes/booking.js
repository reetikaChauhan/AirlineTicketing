const { Router } = require("express");
const router = Router();

const tokenDAO = require('../daos/token');
const BookingDAO = require('../daos/booking');
const isLoggedIn = require('../middleware/logged_in')
const isAdmin = require('../middleware/authorization')

// create
router.post("/",isLoggedIn, async (req, res, next) => {
    const bookingobj = req.body;
    if ( JSON.stringify(bookingobj) === '{}') {
        res.status(400).send('is required');
    } else {
        try {
            const bookingresult = await BookingDAO.bookflight(bookingobj,req.user._id);
            res.json(bookingresult)
        } catch (error) {
            if (error instanceof BookingDAO.BadDataError) {
                // Handle specific error types
                return res.status(409).send(error.message); // 409 for duplicate key error
            } else {
                // Handle other errors
                next(error);
            }
            next(error);
        }
    }
});

// GET
router.get("/",isLoggedIn, async (req, res, next) => {
    let user;
    let bookings;
    console.log("hello there in routes", req.user)
    try {
            if (req.user.roles.includes('admin')) {
                bookings = await BookingDAO.getBookings(user);
            } else {
                console.log("in else")
                bookings = await BookingDAO.getBookings(req.user._id);
            }
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
});



//get by booking Id

router.get("/:id",isLoggedIn, async (req, res, next) => {
    const bookingid = req.params.id
    let user;
    let bookings;
    try {

        if (req.user.roles.includes('admin')) {
                bookings = await BookingDAO.getBookingswithid(user,bookingid);
            } else {
                console.log("hi there")
                bookings = await BookingDAO.getBookingswithid(req.user._id,bookingid);
            }
            res.status(200).json(bookings);
        
    } catch(error) {
        if (error instanceof BookingDAO.BadDataError) {
            // Handle specific error types
            return res.status(409).send(error.message); // 409 for duplicate key error
        } else {
            // Handle other errors
            console.log("error encountered")
            next(error);
        }
    }
});

// GET e-ticket
router.get("/ticket/:id",isLoggedIn, async (req, res, next) => {
    const bookingid = req.params.id
    let user;
    let bookings;
    try {

        if (req.user.roles.includes('admin')) {
                bookings = await BookingDAO.getBookingswithid(user,bookingid);
            } else {
                console.log("hi there")
                bookings = await BookingDAO.getBookingswithid(req.user._id,bookingid);
            }
            res.status(200).json(bookings);
        
    } catch(error) {
        if (error instanceof BookingDAO.BadDataError) {
            // Handle specific error types
            return res.status(409).send(error.message); // 409 for duplicate key error
        } else {
            // Handle other errors
            console.log("error encountered")
            next(error);
        }
    }
});


  module.exports = router;