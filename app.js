import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import axios from "axios";


// const express = require('express');
// const app = express();
// const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60  * 60 * 24},
  })
);  // session
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));        // Serve frontend
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect(); // database setup

// app.use('/api', apiRoutes);                 // All API routes

app.get("/", (req,res)=>{
  let islogin = true;
  if (!req.isAuthenticated()){
    islogin = false;
  }
  res.render("landing", {
    login: islogin
  })
})

app.get("/dash", (req,res)=>{
  if (req.isAuthenticated()){
    res.render("dashboard");
  }
  else {
    res.redirect("/");
  }
})

// GET inventory page
app.get("/inventory", isAuthenticated, (req, res) => {
  res.render("inventory");
});

// POST route to get inventory data from Flask
// POST route to get inventory data from Flask
app.post("/inventory/data", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5002/inventory_status"); // ✅ Corrected endpoint
    res.json(response.data);
  } catch (err) {
    console.error("Inventory ML service error:", err.message);
    res.json({ error: err.message });
  }
});



app.post("/register",async (req,res)=>{
  const name = req.body.name;
  const gender = req.body.gender;
  const occupation = req.body.occupation;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const rePass = req.body.rePass;

  try {
    const AuthCheck = await db.query("SELECT * FROM authusers WHERE walmartID = $1 ",[username]);
    if (AuthCheck.rows.length === 0){
      return res.redirect("/"); // not authorized
    }
    else {
      const result = await db.query("SELECT * FROM users WHERE walmartID = $1 ",[username]);
      if (result.rows.length > 0){
        return res.redirect("/login"); // already registered
      }
      // else if (password !== rePass){
      //   return res.redirect("/"); // password didnt match
      // }
      else {
        // hash the password
        const hash = await bcrypt.hash(password,saltRounds);

        const result = await db.query("INSERT INTO users (name, gender, occupation, walmartid, email, password) values ($1, $2, $3, $4, $5, $6) RETURNING *",
          [name, gender, occupation, username, email, hash] 
        );
        const user = result.rows[0];
        req.login(user,(err)=>{
          if (err){
            console/log(err);
            return res.redirect("/");
          }
          console.log("register success");
          return res.redirect("/dash");
        });
      }
    } // valid for register
  } catch (err){
    console.log(err);
  }

  // console.log("registered");
  // res.redirect("/dash");
})

app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/dash"); // or show an error page
    }
    res.redirect("/"); // redirect to landing/login page after logout
  });
});

app.post("/login",passport.authenticate("local",{
  successRedirect: "/dash",
  failureRedirect: "/"
}))

passport.use(
  new Strategy(async function verify(username, password, cb){
    try{
      const result = await db.query("SELECT * FROM users WHERE walmartid = $1", [username]);
      if (result.rows.length > 0){
        const user = result.rows[0];
        const storedHAshedPAssword = user.password;
        bcrypt.compare(password, storedHAshedPAssword, (err,result)=>{
          if (err){
            console.log(err);
          } else {
            if (result){
              console.log("correct password");
              return cb(null,user);
            } else {
              console.log("wrong password");
              return cb(null,false);
            }
          }
        });
      } else {
        return cb("user not found");
      }
    } catch (err){
      console.log(err);
    }
  })
)

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});

// //analysis route handler
// app.get("/analysis",(req,res)=>{
//   res.render("analysis");
// })

app.get("/analysis", isAuthenticated, (req, res) => {
  // Loads sidebar, nav, and loader immediately
  res.render("analysis");
});

app.post("/analysis/data", isAuthenticated, async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5001/predict_category_forecasts");
    res.json(response.data);
  } catch (err) {
    console.error("ML service error:", err.message);
    res.status(500).json({ error: "Failed to fetch forecasts." });
  }
});

app.get("/charts", isAuthenticated, async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5003/generate_charts");
    const charts = response.data;
    console.log(charts);

    const barChart = charts.barChart;
    const pieChart = charts.pieChart;

    res.render("charts", {
      barChart,
      pieChart
    });

  } catch (err) {
    console.error("Chart generation error:", err.message);
    res.render("charts", {
      barChart: null,
      pieChart: null
    });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// probable passwords...
// 12345678
//123456
//12345