import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";


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

app.get("/inventory",(req,res)=>{
  res.render("inventory");
})

app.post("/register",(req,res)=>{
  console.log("registered");
  res.redirect("/dash");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
