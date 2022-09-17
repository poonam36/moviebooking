const express = require('express');
const bodyParser = require('body-parser');
//Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;
const db = require("./models");
//loaded cors module
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));



//connection to database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");

    })
    .catch(err => {
        console.log("Cannot connect to the database!" + err);
        process.exit();//free up CPU memory

    });
app.get("/movies", (req, res) => {
    res.send("All Movies Data in JSON format from Mongo DB");
});

app.get("/genres", (req, res) => {
    res.send("All Genres Data in JSON format from Mongo DB");
});

app.get("/artists", (req, res) => {
    res.send("All Artists Data in JSON format from Mongo DB");
});


app.get("/", (req, res) => {
    res.json(
        { "message": "Welcome to Upgrad Movie booking application development."
        
     }
     )
  });

  //var artistRoute = require('./routes/artist.routes');
  //artistRoute(app);

 require('./routes/artist.routes')(app)//requiring and invoking the function(in movies.route)
 require('./routes/genre.routes')(app)
 require('./routes/movie.routes')(app)
 require('./routes/user.routes')(app)
 
 

app.listen(port, () => {
    console.log("Server is running on port " + port);
})
module.exports = app;