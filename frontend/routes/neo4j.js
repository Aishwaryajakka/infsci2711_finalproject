/**
 * Created on April 12, 2020
 */
const express = require("express");
const router = express.Router();
require("../public/neo4jCyphers.js");
const neo4j = require("neo4j-driver");

const neo4jUrl = "neo4j://localhost:7687";
const driver = neo4j.driver(neo4jUrl, neo4j.auth.basic("neo4j", "password"));
const session = driver.session({ database: "neo4j", defaultAccessMode: neo4j.session.READ });


router.get("/query1", function (req, res) {
    session.run(neo4jCyphers["query1"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query2", function (req, res) {
    session.run(neo4jCyphers["query2"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query3", function (req, res) {
    session.run(neo4jCyphers["query3"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query4", function (req, res) {
    session.run(neo4jCyphers["query4"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query5", function (req, res) {
    res.send("<p>This query is not possible in Neo4j!</p>")
});

router.get("/query6", function (req, res) {
    session.run(neo4jCyphers["query6"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query7", function (req, res) {
    session.run(neo4jCyphers["query7"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query8", function (req, res) {
    session.run(neo4jCyphers["query8"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query9", function (req, res) {
    res.send("<p>This query is not possible in Neo4j!</p>")
});

router.get("/query10", function (req, res) {
    session.run(neo4jCyphers["query10"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

router.get("/query11", function (req, res) {
    session.run(neo4jCyphers["query11"]).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        }, function (err, html) {
            res.send(html);
        });
    }).catch(function (err) {
    })
});

module.exports = router;