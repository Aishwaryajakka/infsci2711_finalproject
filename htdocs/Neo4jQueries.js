
function execNeoQuery(sessionNeo, query) {
  
  if (query == null) {
    document.getElementById("results").innerHTML = "No Database and/or Query Selected Or Data being loaded";
  } else if (query == 1) {
    return runQuery1(sessionNeo);
  } else if (query == 2) {
    return runQuery2(sessionNeo);
  } else if (query == 3) {
    return runQuery3(sessionNeo);
  } else if (query == 4) {
    return runQuery4(sessionNeo);
  } else if (query == 5) {
    return runQuery5(sessionNeo);
  } else if (query == 6) {
    return runQuery6(sessionNeo);
  } else if (query == 7) {
    return runQuery7(sessionNeo);
  } else if (query == 8) {
    return runQuery8(sessionNeo);
  } else if (query == 9) {
    return runQuery9(sessionNeo);
  } else if (query == 10) {
    return runQuery10(sessionNeo);
  } else if (query == 11) {
    return runQuery11(sessionNeo);
  } 
  
}


function runQuery1(session) {
        // Query to be run
      cypher = 'CALL{MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.TotalSales), time({Hour:f.Hour, Minute:f.Minute}), c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS TotalSales, Top_Prod[1] AS Time, Top_Prod[2] AS Country ORDER BY TotalSales DESC, Country } RETURN Country, collect(Time)[0] AS Time, ROUND(MAX(TotalSales)) AS TotalSales ORDER BY Country';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 1'
                    + '<table><tr><th>Time</th><th>TotalSales</th><th>Country</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Time')
                            + '</td><td> $'
                            + r.get('TotalSales')
                            + '</td><td>'
                            + r.get('Country')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
          //return qresult;
      });
}


function runQuery2(session) {
  
        cypher = 'MATCH(s:STOCKDIM)<-[r1:IS_STOCK]-(f:FACT) RETURN s.Description AS Description,           SUM(ROUND(f.TotalSales)) AS Annual_Sales, f.Year AS Year ORDER BY Description, Year';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query '
                    + '<table><tr><th>Product</th><th>Annual_Sales</th><th>Year</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Description')
                            + '</td><td> $'
                            + r.get('Annual_Sales')
                            + '</td><td>'
                            + r.get('Year')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });
}


function runQuery3(session) {
  
  cypher = 'MATCH(s:STOCKDIM)<-[r1:IS_STOCK]-(f:FACT) RETURN s.Description AS Description, SUM(ROUND(f.TotalSales)) AS Annual_Sales, f.Year AS Year ORDER BY Description, Year';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 3'
                    + '<table><tr><th>Product</th><th>Annual_Sales</th><th>Year</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Description')
                            + '</td><td> $'
                            + r.get('Annual_Sales')
                            + '</td><td> '
                            + r.get('Year')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


function runQuery4(session) {
       // Query to be run
      cypher = 'CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), s.Description, c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS Quantity, Top_Prod[1] AS Description, Top_Prod[2] AS Country ORDER BY Quantity DESC, Country ASC } RETURN MAX(Quantity) as Quantity, collect(Description)[0] as Description, Country ORDER BY Country';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 4'
                    + '<table><tr><th>Quantity</th><th>Product</th><th>Country</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Quantity')
                            + '</td><td>'
                            + r.get('Description')
                            + '</td><td>'
                            + r.get('Country')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


function runQuery5(session) {
  document.getElementById("results").innerHTML = "Query 5 Not possible in Neo4j";
}


function runQuery6(session) {
       // Query to be run
      cypher = 'CALL{ MATCH(f:FACT)-[r1:IS_CUSTOMER]->(c:CUSTOMERDIM) WITH [SUM(f.TotalSales), f.CustomerID, c.Country]  AS Sales_per_Customer, c RETURN MAX(Sales_per_Customer[0]) AS Total_Sale, Sales_per_Customer[1] AS CustomerID, Sales_per_Customer[2] AS Country, c, Sales_per_Customer ORDER BY Total_Sale DESC, Country } RETURN MAX(Total_Sale) as Sales, collect(CustomerID)[0] as CustomerID, Country ORDER BY Country';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 6'
                    + '<table><tr><th>Sales</th><th> Customer ID</th><th>Country</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Sales')
                            + '</td><td> $'
                            + r.get('CustomerID')
                            + '</td><td>'
                            + r.get('Country')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


function runQuery7(session) {
       // Query to be run
      cypher = 'CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), f.Month, c.Country] AS Top_Prod RETURN MAX(Top_Prod[0]) AS Quantity, Top_Prod[1] AS Month, Top_Prod[2] AS Country ORDER BY Quantity DESC, Country } RETURN Country, ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][collect(Month)[0]-1] AS Month, MAX(Quantity) AS Quantity ORDER BY Country';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 7'
                    + '<table><tr><th>Country</th><th>Month</th><th>Quantity</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Country')
                            + '</td><td>'
                            + r.get('Month')
                            + '</td><td>'
                            + r.get('Quantity')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });
}


function runQuery8(session) {
        // Query to be run
      cypher = 'CALL{ MATCH(c:CUSTOMERDIM)<-[r1:IS_CUSTOMER]-(f:FACT)-[r2:IS_STOCK]->(s:STOCKDIM) WITH [SUM(f.Quantity), s.Description, f.Month] AS INFO RETURN MAX(INFO[0]) AS Quantity, INFO[1] AS Description, INFO[2] AS Months ORDER BY Quantity DESC, Months } RETURN Months AS SrNo, ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][Months-1] AS Month, collect(Description)[0] AS Description, MAX(Quantity) AS Quantity ORDER BY SrNo';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 8'
                    + '<table><tr><th>SrNo</th><th>Month</th><th>Description</th><th>Quantity</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('n.SrNo')
                            + '</td><td>'
                            + r.get('n.Month')
                            + '</td><td> $'
                            + r.get('n.Description')
                            + '</td><td> $'
                            + r.get('n.Quantity')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


function runQuery9(session) {
  document.getElementById("results").innerHTML = "Results for Query 9";
}


function runQuery10(session) {
        cypher = 'MATCH(f:FACT)-[r1:IS_CUSTOMER]->(c:CUSTOMERDIM) WITH [SUM(f.TotalSales),f.CustomerID]  AS Sales_per_Customer, c RETURN AVG(Sales_per_Customer[0]) AS Average_Spending_Per_Customer, c.Country AS Country';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = 'Results of Query 10'
                    + '<table><tr><th>Average_Spending_Per_Customer</th><th>Country</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Average_Spending_Per_Customer')
                            + '</td><td>'
                            + r.get('Country')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


function runQuery11(session) {
        // Query to be run
      cypher = 'CALL{ MATCH(f:FACT)-[r1:IS_STOCK]-(s:STOCKDIM) WITH [COUNT(f.StockCode), s.Description, f.CustomerID] AS INFO RETURN MAX(INFO[0]) AS Frequency, INFO[1] AS Description, INFO[2] AS CustomerID ORDER BY Frequency DESC, CustomerID } RETURN MAX(Frequency) AS Frequency, collect(Description)[0] AS Description, CustomerID ORDER BY CustomerID';
      // Run query and build up result string 
      session.run(cypher)
          .then(result => {
          var res = '<table><tr><th>Frequency</th><th>Description</th><th>TotalSales</th></tr>';
          result.records.forEach(r => 
                  res = res + '<tr><td>' 
                            + r.get('Frequency')
                            + '</td><td>'
                            + r.get('Description')
                            + '</td><td>'
                            + r.get('CustomerID')
                            + '</td></tr>');

          res = res + '</table>';
          document.getElementById("results").innerHTML = res;
      });

}


