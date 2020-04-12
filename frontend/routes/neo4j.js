/**
 * Created on April 12, 2020
 */
const express = require("express");
const router = express.Router();
require("../public/mongoDBpipelines.js");
const neo4j = require("neo4j-driver");

const neo4jUrl = "neo4j://localhost:7687";
const driver = neo4j.driver(neo4jUrl, neo4j.auth.basic("neo4j", "password"));
const session = driver.session({ database: "neo4j", defaultAccessMode: neo4j.session.READ });


router.get("/query1", function (req, res) {
    cypher = "CALL{MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.TotalSales), time({Hour:f.Hour, Minute:f.Minute}), c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS TotalSales, Top_Prod[1] AS Time, Top_Prod[2] AS Country ORDER BY TotalSales DESC, Country } RETURN Country, collect(Time)[0] AS Time, ROUND(MAX(TotalSales)) AS TotalSales ORDER BY Country";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query2", function (req, res) {
    cypher = "MATCH(s:STOCKDIM)<-[r1:IS_STOCK]-(f:FACT) RETURN s.Description AS Description, SUM(ROUND(f.TotalSales)) AS Annual_Sales, f.Year AS Year ORDER BY Description, Year";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query3", function (req, res) {
    cypher = "MATCH(s:STOCKDIM)<-[r1:IS_STOCK]-(f:FACT) RETURN s.Description AS Description, SUM(ROUND(f.TotalSales)) AS Annual_Sales, f.Year AS Year ORDER BY Description, Year";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query4", function (req, res) {
    cypher = "CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), s.Description, c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS Quantity, Top_Prod[1] AS Description, Top_Prod[2] AS Country ORDER BY Quantity DESC, Country ASC } RETURN MAX(Quantity), collect(Description)[0], Country ORDER BY Country";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query5", function (req, res) {
    res.send("<h2>This query is not possible in Neo4j!</h2>")
});

router.get("/query6", function (req, res) {
    cypher = "CALL{ MATCH(f:FACT)-[r1:IS_CUSTOMER]->(c:CUSTOMERDIM) WITH [SUM(f.TotalSales), f.CustomerID, c.Country]  AS Sales_per_Customer, c RETURN MAX(Sales_per_Customer[0]) AS Total_Sale, Sales_per_Customer[1] AS CustomerID, Sales_per_Customer[2] AS Country, c, Sales_per_Customer ORDER BY Total_Sale DESC, Country } RETURN MAX(Total_Sale), collect(CustomerID)[0], Country ORDER BY Country";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query7", function (req, res) {
    cypher = "CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), f.Month, c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS Quantity, Top_Prod[1] AS Month, Top_Prod[2] AS Country ORDER BY Quantity DESC, Country } RETURN Country, ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][collect(Month)[0]-1] AS Month, MAX(Quantity) AS Quantity ORDER BY Country";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query8", function (req, res) {
    cypher = "CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), s.Description, f.Month] AS INFO RETURN MAX(INFO[0]) AS Quantity, INFO[1] AS Description, INFO[2] AS Months ORDER BY Quantity DESC, Months } RETURN Months AS SrNo, ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Months-1] AS Month, collect(Description)[0] AS Description, MAX(Quantity) AS Quantity ORDER BY SrNo";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query9", function (req, res) {
    res.send("<h2>This query is not possible in Neo4j!</h2>")
});

router.get("/query10", function (req, res) {
    cypher = "MATCH(f:FACT)-[r1:IS_CUSTOMER]->(c:CUSTOMERDIM) WITH [SUM(f.TotalSales),f.CustomerID]  AS Sales_per_Customer, c RETURN AVG(Sales_per_Customer[0]) AS Average_Spending_Per_Customer, c.Country AS Country";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

router.get("/query11", function (req, res) {
    cypher = "CALL{ MATCH(f:FACT)-[r1:IS_STOCK]-(s:STOCKDIM) WITH [COUNT(f.StockCode), s.Description, f.CustomerID] AS INFO RETURN MAX(INFO[0]) AS Frequency, INFO[1] AS Description, INFO[2] AS CustomerID ORDER BY Frequency DESC, CustomerID } RETURN MAX(Frequency) AS Frequency, collect(Description)[0] AS Description, CustomerID ORDER BY CustomerID";
    session.run(cypher).then(function (result) {
        //console.log(result);
        res.render("neo4j", {
            data: result.records
        });
    }).catch(function (err) {
    })
});

module.exports = router;