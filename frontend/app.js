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
var MongoClient = require("mongodb").MongoClient;
const neo4j = require("neo4j-driver");


/* SQL */
// connection

/* SQL */


/* MongoDB */
// connection
const mongoDBurl = "mongodb://localhost:27017/adb";

MongoClient.connect(mongoDBurl, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true}, function (err, client) {
    if (err) throw err;
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
// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
// const session = driver.session()
// const personName = "Alice"

// try {
//   const result = await session.run(
//     "CREATE (a:Person {name: $name}) RETURN a",
//     { name: personName }
//   )

//   const singleRecord = result.records[0]
//   const node = singleRecord.get(0)

//   console.log(node.properties.name)
// } finally {
//   await session.close()
// }

// // on application exit:
// await driver.close()
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