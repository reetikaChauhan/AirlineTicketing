const { Router } = require("express");
const router = Router();

const tokenDAO = require('../daos/token');
const AirportDAO = require('../daos/airports');
const isLoggedIn = require('../middleware/logged_in')
const isAdmin = require('../middleware/authorization')
const isAuthenticated = require('../middleware/authenticateservice')
// create
router.post("/",isAuthenticated,isAdmin, async (req, res, next) => {
    const airportobj = req.body;
    if ( JSON.stringify(airportobj) === '{}') {
        res.status(400).send('is required');
    } else {
        try {
            const airportresult = await AirportDAO.createAirportrec(airportobj);
            res.json(airportresult)
        } catch (error) {
            if (error instanceof AirportDAO.BadDataError) {
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
router.get("/", async (req, res, next) => {
    if(req.query){
        try {
            const airportresults = await AirportDAO.getAirportByCity(req.query.location)
            console.log("in airport routes", airportresults)
            return res.status(200).json(airportresults);
        } catch(e) {
            next(e)
        }

    }else{
        try {
            const airportresults = await AirportDAO.getAirport()
            return res.status(200).json(airportresults);
        } catch(e) {
            next(e)
        }
    }
    

});



//get by Id

router.get("/:id", async (req, res, next) => {
    const airportid = req.params.id
    try {
        const airportresult = await  AirportDAO.getAirportById(airportid);
        return res.status(200).json(airportresult);
        
    } catch(error) {
        if (error instanceof AirportDAO.BadDataError) {
            // Handle specific error types
            return res.status(409).send(error.message); // 409 for duplicate key error
        } else {
            // Handle other errors
            next(error);
        }
    }
});


  module.exports = router;