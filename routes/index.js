const { Router } = require("express");
const router = Router();
const isAuthenticated = require('../middleware/authenticateservice')

router.get('/protected-route', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

router.use("/auth", require('./auth'));
router.use("/airports", require('./airports'));
router.use("/airlines", require('./airlines'));
router.use("/flights", require('./flights'));
router.use("/bookings", require('./booking'));
router.use("/passengers", require('./passengers'));

router.use((err,req,res,next) => {
    console.log("user in ticket",req.params)
    if(err.message.includes("Cast to ObjectId failed")){
        res.status(400).send("Invalid id provided")
    } else{
        console.error(err)
        res.status(500).send("Something broke!")
    }
});
module.exports = router;