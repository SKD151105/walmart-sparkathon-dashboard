import express from "express";
import bodyParser from "body-parser";


// const express = require('express');
// const app = express();
// const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));        // Serve frontend
app.set("view engine", "ejs");

// app.use('/api', apiRoutes);                 // All API routes

app.get("/", (req,res)=>{
    res.render("landing");
})

app.get("/dash", (req,res)=>{
    res.render("dashboard");
})

app.post("/register",(req,res)=>{
  console.log("registered");
  res.redirect("/dash");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
