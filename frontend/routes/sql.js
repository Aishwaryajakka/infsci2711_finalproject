/**
 * Created on April 12, 2020
 */
const express = require("express");
const router = express.Router();
require("../public/sqlQueries.js");


router.get("/query1", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query1"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query2", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query2"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query3", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query3"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query4", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query4"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query5", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query5"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query6", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query6"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query7", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query7"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query8", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query8"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query9", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query9"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query10", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query10"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

router.get("/query11", function (req, res) {
    const con = req.app.locals.con;
    con.query(sqlQueries["query11"], function (err, rows) {
        //console.log(rows);
        res.render("sql", {
            data: rows
        }, function (err, html) {
            res.send(html);
        });
    });
});

module.exports = router;