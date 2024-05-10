const { Router } = require("express");
const router = Router();

router.use("/auth", require('./auth'));
router.use("/airports", require('./airports'));
router.use("/airlines", require('./airlines'));
router.use("/flights", require('./flights'));
router.use("/passengers", require('./passengers'));

module.exports = router;