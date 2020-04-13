/**
 * Created on April 12, 2020
 */
const express = require("express");
const router = express.Router();
require("../public/mongoDBpipelines.js");


router.get("/query1", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query1"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query2", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query2"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query3", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query3"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query4", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query4"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query5", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query5"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            explanations = []
            results.forEach(function (stkReport) {
                var stkCd = stkReport._id;
                var prevYr = stkReport.sale_q_per_year[0].Year;
                var prevYrAvg = stkReport.sale_q_per_year[0].TotalSaleQ / stkReport.sale_q_per_year[0].count;
                for (i = 1; i < stkReport.sale_q_per_year.length; i++) {
                    var rec = stkReport.sale_q_per_year[i];
                    var curYrAvg = rec.TotalSaleQ / rec.count;
                    explanations.push("for StockCode:" + stkCd + " previous year: " + prevYr + "'s average: " + prevYrAvg + " and current year " + rec.Year + "'s average is " + curYrAvg);
                    prevYrAvg = curYrAvg;
                }
            });
            res.render("mongo", {
                data: results,
                queryAnswers: explanations
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query6", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query6"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query7", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query7"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query8", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query8"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query9", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query9"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            explanations = []
            results.forEach(function(doc) {
                if (doc.all_recs.length > 1) {
                    var prevYear = doc.all_recs[0].Year;
                    var prevYearSale = doc.all_recs[0].TotalSaleInYear;
                    for (i = 1; i < doc.all_recs.length; i++) {var curYear = doc.all_recs[i].Year;
                        var curYearSale = doc.all_recs[i].TotalSaleInYear;
                        var diff = curYearSale - prevYearSale;
                        explanations.push("For " + doc._id + " sale increase between years " + curYear + " and " + prevYear + " is: " + diff);
                        prevYearSale = curYearSale;
                        prevYear = curYear;
                    }
                } else if (doc.all_recs.length == 1) {
                    explanations.push("For " + doc._id + " sale record available for only year: " + doc.all_recs[0].Year + " and sale was: " + doc.all_recs[0].TotalSaleInYear);
                }
            });
            res.render("mongo", {
                data: results,
                queryAnswers: explanations
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query10", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query10"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

router.get("/query11", function (req, res) {
    const collection = req.app.locals.collection;
    collection.aggregate(mongoDBpipelines["query11"], {allowDiskUse: true}).toArray()
        .then(function (results) {
            //res.status(200).json(results);
            //console.log(results);
            status = "200 OK";
            res.render("mongo", {
                data: results
            }, function (err, html) {
                res.send(html);
            });
        })
});

module.exports = router;