/*CREATE DATABASE */
CREATE DATABASE ONLINE_RETAIL;
USE ONLINE_RETAIL;

/* CREATE ODB TABLE */
CREATE TABLE IF NOT EXISTS ONLINE_RETAIL_ODB(
Invoice varchar(15),
StockCode varchar(15),
Description varchar(100),
Quantity int(11),
InvoiceDate date,
InvoiceTime time(0),
Price numeric(10,2),
Customer_ID varchar(15),
Country varchar(100),
SubTotal numeric(10,2)
);
