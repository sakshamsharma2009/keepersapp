//jshint esversion:6

const express= require("express");
const app= express();
const body_parser= require("body-parser");
const mongoose= require("mongoose");

app.use(body_parser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser: true, useUnifiedTopology: true});

const notesSchema={
    title: String,
    content: String
};

const Notes = mongoose.model("note", notesSchema);

app.listen(5000, function(req, res){
    console.log("Server started at port 5000!!!");
});

app.get("/", function(req, res){
    res.send("Server is running!!!!");
});
