/**
 * Created on April 10, 2020
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const path = require("path");
const url = require("url");
const port = 3000;
//const mongoose = require("mongoose");
const mysql = require("mysql");
const MongoClient = require("mongodb").MongoClient;
const neo4j = require("neo4j-driver");


/* SQL */
// connection
var con = mysql.createConnection({
    host: "localhost",
    port: "7778",
    user: "root",
    password: "root",
    database : "online_retail_adb"
});

con.connect(function (err) {
    if (err) throw "Connection to SQL failed";
    console.log("Connected to SQL");
    app.locals.con = con;
});
/* SQL */


/* MongoDB */
// connection
const mongoDBurl = "mongodb://localhost:27017/adb";

MongoClient.connect(mongoDBurl, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true}, function (err, client) {
    if (err) throw "Connection to MongoDB failed";
    const db = client.db("adb");
    const collection = db.collection("fact");
    app.locals.collection = collection;
    console.log("Connected to MongoDB");
});
/* MongoDB */


/// Failed ///
/* MongoDB (mongoose)
// connection
const mongoDB_uri = ("mongodb://localhost:27017/adb");
mongoose.connect(mongoDB_uri, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true});
const mongoDB = mongoose.connection;
mongoDB.on("connected", function () {
    console.log("Mongoose connected");
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        //console.log(names);
    }); 
});
mongoDB.on("error", function (err) {
    console.log("Mongoose connection error: " + err);
});
mongoDB.on("disconnected", function () {
    console.log("Mongoose disconnected.");
});

const Fact = require("./models/facts");

Fact.find({}, function (err, results) {
    if (err) throw err;
    console.log(results);
});
MongoDB */


/* Neo4j */
// connection
const neo4jUrl = "neo4j://localhost:7687";
const driver = neo4j.driver(neo4jUrl, neo4j.auth.basic("neo4j", "password"));
const session = driver.session({ database: "neo4j", defaultAccessMode: neo4j.session.READ });

session.run("RETURN 1").then(function (res) {
    console.log("Connected to Neo4j");
}).catch(function (err) {
    console.log("Connection to Neo4j failed");
}).then(function () {
    session.close();
});
/* Neo4j */



// use stylesheet in /public folder
app.use(express.static(__dirname + "/public"));

// set views to /views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// initialize root directory to /views/index.ejs
app.get("/", function (req, res) {
    res.render("index");
});

// process form submission
app.get("/process", function (req, res) {
    if (req.query.database == "sql") {
        res.redirect(url.format({
            pathname: "/sql/" + req.query.query,
        }));
    } else if (req.query.database == "mongodb") {
        res.redirect(url.format({
            pathname: "/mongo/" + req.query.query,
        }));
    } else if (req.query.database == "neo4j") {
        res.redirect(url.format({
            pathname: "/neo4j/" + req.query.query,
        }));
    }
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader("Connection", "close");
    next();
});

// load routes
const mongoRouter = require("./routes/mongo");
app.use("/mongo", mongoRouter);
const sqlRouter = require("./routes/sql");
app.use("/sql", sqlRouter);
const neo4jRouter = require("./routes/neo4j");
app.use("/neo4j", neo4jRouter);


app.listen(port, () => console.log(`Listening on port ${port}! (localhost:${port})`))