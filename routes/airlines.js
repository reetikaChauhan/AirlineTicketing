const { Router } = require("express");
const router = Router();

const tokenDAO = require('../daos/token');
const AirlineDAO = require('../daos/airlines');
const isLoggedIn = require('../middleware/logged_in')


// create
router.post("/", async (req, res, next) => {
    const airlineobj = req.body;
    if ( JSON.stringify(airlineobj) === '{}') {
        res.status(400).send('is required');
    } else {
        try {
            const airlineresult = await AirlineDAO.createAirlinesrec(airlineobj);
            res.json(airlineresult)
        } catch (error) {
            if (error instanceof AirlineDAO.BadDataError) {
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
    try {
        const airlineresults = await AirlineDAO.getAirlines()
        return res.status(200).json(airlineresults);
    } catch(e) {
        next(e)
    }

});

//get by Id

router.get("/:id", async (req, res, next) => {
    const airlineid = req.params.id
    try {
        const airlineresult = await  AirlineDAO.getAirlinesById(airlineid);
        return res.status(200).json(airlineresult);
        
    } catch(error) {
        if (error instanceof AirlineDAO.BadDataError) {
            // Handle specific error types
            return res.status(409).send(error.message); // 409 for duplicate key error
        } else {
            // Handle other errors
            next(error);
        }
    }
});


  module.exports = router;