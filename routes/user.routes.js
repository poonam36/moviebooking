module.exports = app => {
    var router = require("express").Router();

    const user = require('../controllers/user.controller')

    router.post("/signup", user.signup);

    router.post("/login", user.login);

    router.post("/logout", user.logout);

    router.get("/:id/auth/coupons", user.getCouponCode);

    router.post("/bookShow", user.bookShow);

    app.use('/api', router);

}
