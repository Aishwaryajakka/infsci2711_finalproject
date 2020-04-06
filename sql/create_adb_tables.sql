/*CREATE ADB DATABASE */
CREATE DATABASE online_retail_adb;
USE DATABASE online_retail_adb;

/* CREATE FACT TABLE */

CREATE TABLE IF NOT EXISTS FACT (
Customer_ID varchar(15),
StockCode varchar(15),
Year int(4),
Month int(2),
Day int(2),
Hour int(2),
Minute int(2),
Quantity int(11),
TotalSale numeric(10,2));

INSERT INTO FACT(
     SELECT Customer_ID, StockCode, Year(InvoiceDate),Month(InvoiceDate),Day(InvoiceDate),
            Hour(InvoiceTime),Minute(InvoiceTime),Quantity, SubTotal 
     FROM online_retail.online_retail_odb );

/* CREATE CUSTOMERDIM TABLE */

CREATE TABLE IF NOT EXISTS CUSTOMERDIM (
Customer_ID varchar(15),
Country varchar(100));

INSERT INTO CUSTOMERDIM(
    SELECT DISTINCT Customer_ID , Country
    FROM online_retail.online_retail_odb
    GROUP BY Customer_ID, Country
);


/*CREATE STOCKDIM TABLE */

CREATE TABLE IF NOT EXISTS STOCKDIM(
  StockCode varchar(15),
  Description varchar(100),
  Unit_Price numeric(10,2)  
);
/* First create the view & then run the insert query */

/* Max of Unit price to select the cost per item from ODB -*/
create view temp_stockdim as (SELECT distinct(a.StockCode), a.Description, a.Price
FROM online_retail.ONLINE_RETAIL_ODB a
INNER JOIN (
    SELECT StockCode, MAX(Price) as Unit_price
    FROM online_retail.ONLINE_RETAIL_ODB
    GROUP BY StockCode
) b ON a.StockCode = b.StockCode AND a.Price = b.Unit_price   
 group by a.StockCode,a.Description, a.price)

/* Applied Max of description to select one description per stockcode */
INSERT INTO STOCKDIM(
    SELECT a.stockCode, b.description, a.price
FROM temp_stockdim a
INNER JOIN (
    SELECT StockCode, MAX(description) as description
    FROM temp_stockdim
    GROUP BY StockCode
) b ON a.StockCode = b.StockCode  
 group by a.StockCode,b.Description, a.price
);
 

 /*CREATE TIMEDIM TABLE */

CREATE TABLE IF NOT EXISTS TIMEDIM (
Year int(4),
Month int(2),
Day int(2),
Hour int(2),
Minute int(2))

INSERT INTO TIMEDIM(
    SELECT DISTINCT Year(InvoiceDate),Month(InvoiceDate),Day(InvoiceDate),Hour(InvoiceTime),Minute(InvoiceTime)
    from online_retail.ONLINE_RETAIL_ODB );

 