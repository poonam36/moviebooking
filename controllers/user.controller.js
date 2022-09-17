const db = require('../models');
const User = db.users;
//const jwt = require('jsonwebtoken');
const { request } = require('express');


//Here we are creating user if the user is null we are creating user and if not we are saying user already exists
module.exports.signup = (req, res) => {
    //validate request coming from client
    if (!req.body.email_address && !req.body.password) {
        res.status(400).send({
            message: "Please provide emailId  and password to continue"
        });
        return;
        //stop the execution then and there do not proceede
    }
    User.findOne({ email: req.body.email_address }, (err, user) => {
        console.log(user);
        if (user === null) {
            //signup use
            const user = new User({
                "email": req.body.email_address,
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "password": req.body.password,
                "contact": req.body.mobile_number,
            });

            user.
                save(user).
                then((data) => {
                    res.send(data)
                }).catch(err => {
                    res.status(400).send({
                        message: "Something went wrong,please try again later "
                    });
                });
        } else {
            res.status(400).send({
                message: "User already exists",
            });
        }
    });
};



module.exports.login = (req, res) => {
    const email = req.body.email_address;
    const password = req.body.password;

    // Validate request
    if (!email && !password) {
        res.status(400).send({ message: "Please provide email and password to continue." });
        return;
    }

    //const filter = { email: email };
    User.findOne({ email: email }, (err, user) => {

        if (err || user === null) {
            res.status(401).send({
                //better message wrt security. Prevents brute force attacks
                message: "Email is not correct."
            });
        } else {
            if (password === user.password) {
                user.isLoggedIn = true;

                User.findOneAndUpdate({ email: email }, user, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: "Some error occurred, please try again later."
                            });
                        } else {
                            //  const token = jwt.sign({ _id: data._id }, 'myprivatekey');
                            //data.token = token;
                            res.send(data);
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating."
                        });
                    });

            } else {
                res.status(401).send({
                    message: "Password not correct."
                });
            }
        }

    });

};



module.exports.logout = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Please provide user Id." });
        return;
    }

    const id = req.body.id;
    const update = { isLoggedIn: false };

    User.findByIdAndUpdate(id, update)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Some error occurred, please try again later."
                });
            } else res.send({ message: "Logged Out successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating."
            });
        });
};

module.exports.bookShow = (req, res) => {


}
module.exports.getCouponCode = (req, res) => {

    const id = req.params.id;

    User.findOne({ userid: id })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else {
                res.send(data.coupens);
                console.log(data.coupens);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Movie with id=" + id });
        });
};

