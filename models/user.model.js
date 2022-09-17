module.exports = (mongoose) => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                "userid": Number,
                "email": String,
                "first_name": String,
                "last_name": String,
                "username": String,
                "contact": String,
                "password": String,
                "role": String,
                "isLoggedIn": Boolean,
                "uuid": String,
                "accesstoken": String,
                "coupens": [
                    {
                        "id": Number,
                        "discountValue": Number
                    },
                    {
                        "id": Number,
                        "discountValue": Number
                    }
                ],
                "bookingRequests": [
                    {
                        "reference_number": Number,
                        "coupon_code": Number,
                        "show_id": Number,
                        "tickets": [{
                            type: Number,
                            min: 0,
                            max: 3
                        }]
                    }

                ]
            }
        )
    );
    return User;
};