//jshint esversion:6

const express= require("express");
const app= express();
const bodyp= require("body-parser");
//const cors = require('cors');
const db= require("./dbconnect");
const notes_router= require("./controllers/notes-ctrl");


app.use(bodyp.urlencoded({extended: true}));
//app.use(cors());
app.use(bodyp.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/", function(req, res){
    res.send("Server is running!!!!");
});

app.use("/api",notes_router);

app.listen(8000, function(req, res){
    console.log("Server started at port 8000!!!");
});

