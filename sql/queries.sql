/*
 THIS FILE CONTAINS THE LIST OF QUERIES USING MATERIALISED VIEWS
*/

/* ****************************************************************************************************************** */
/* Query 1: What time of the day is the sale maximum per country? */

/*SQL Query (working) */

select a.Hour, a.Total as max_total_sale, a.Country from
(
 SELECT  fact.Hour as Hour ,sum(fact.TotalSale) as total, customerdim.Country as Country 
from fact JOIN customerdim ON  fact.Customer_ID=customerdim.Customer_ID
GROUP BY fact.Hour,customerdim.Country) as a
INNER JOIN
 ( select  max(total) as maxtotal, country from (
 SELECT  fact.Hour as Hour ,sum(fact.TotalSale) as total, customerdim.Country as Country 
from fact JOIN customerdim ON  fact.Customer_ID=customerdim.Customer_ID
GROUP BY fact.Hour,customerdim.Country ) t1 
group by country ) as b 
ON a.total= b.maxtotal and a.country = b.country;

/* Query using materialized view (working) */

select f.hour, f.totalsale, f.Country
from (
   select  max(totalsale)as total,country  from mview_sum_sale_country group by country

) as x inner join mview_sum_sale_country as f on f.totalsale = x.total and x.country = f.country;
/* ****************************************************************************************************************** */

/* Query 2: Annual total sales of per product */

/*SQL Query  (working)*/ 

select fact.StockCode, fact.year, sum(fact.TotalSale), stockdim.Description 
from fact join stockdim on 
fact.StockCode = stockdim.StockCode 
group by stockdim.StockCode, fact.year, stockdim.Description;

/* Query using materialized view (working) */
Select * from mview_totalsale_product;

/* ****************************************************************************************************************** */

/* Query 3: Top product per year */

/*SQL Query (working) */
select f.stockCode, f.description,f.Year, f.TotalSale as totalSale
from (
  SELECT Year, max(Totalsale) as maxtotal FROM (select stockdim.StockCode, fact.year as year,  stockdim.Description ,sum(fact.TotalSale) as TotalSale from fact join stockdim on fact.StockCode = stockdim.StockCode group by Stockdim.StockCode, Fact.Year, stockdim.Description
)t1 group by Year)
 as x inner join ( select stockdim.StockCode, fact.year,  stockdim.Description ,sum(fact.TotalSale)from fact join stockdim on fact.StockCode = stockdim.StockCode group by Stockdim.StockCode, Fact.Year, stockdim.Description
)as f on f.totalsale = x.maxtotal and x.year = f.year;

/* Query using materialized view: (working) */

select f.stockCode, f.description,f.Year, f.TotalSale as totalSale
from (
  SELECT Year, max(Totalsale) as maxtotal FROM mview_totalsale_product group by Year

) as x inner join mview_totalsale_product as f on f.totalsale = x.maxtotal and x.year = f.year;

/* ****************************************************************************************************************** */

/* Query 4: Top product  per country */

/*Query using materialized view: (working) */
select f.stockCode, f.Country, f.Quantity as Total
from (
  SELECT Country, max(Quantity) as maxtotal FROM mview_product_country group by Country

) as x inner join mview_product_country as f on f.Quantity = x.maxtotal and x.Country = f.Country
order by total desc


/* ****************************************************************************************************************** */


/*Query 5: Which item is sold below the threshold value (under-performed products) in 2010 */

/*Query using materialized view: (working) */
select t1.stockcode, t1.description, (t1.totalquant_2010- t2.totalquant_2009) as difference
from 
(select stockcode, year , description, totalquantity as totalquant_2010 from mview_quantity_product_year
where year = 2010) t1 
inner join 
(select stockcode, year , description, totalquantity as totalquant_2009 from mview_quantity_product_year
where year = 2009) t2 
on t1.stockcode = t2.stockcode and t1.description = t2.description 
and t2.totalquant_2009 <= t1.totalquant_2010 
ORDER BY `difference`  ASC limit 25;


/* ****************************************************************************************************************** */


/*Query 6: Which customer spends the most (per country or overall) */
/*SQL Query  (working) but very expensive */
select f.customer_id, f.totalsale, f.Country
from (
   select  max(totalsale) as maxtotal ,country  from (
   select
         fact.Customer_ID as customerID,
         customerdim.Country as country,
         sum(fact.TotalSale) as totalSale
      from
         fact 
         join
            customerdim
            on fact.Customer_ID = customerdim.Customer_ID
      group by
         fact.Customer_ID,
         customerdim.Country) t1
   group by country

) as x inner join
 (select
         fact.Customer_ID as customerID,
         customerdim.Country as country,
         sum(fact.TotalSale) as totalSale
      from
         fact 
         join
            customerdim
            on fact.Customer_ID = customerdim.Customer_ID
      group by
         fact.Customer_ID,
         customerdim.Country
 ) as f on f.totalsale = x.maxtotal and x.country = f.country;


/*Query using materialized view: (working) */
/* Top Spending customer id per country */
select f.customer_id, f.totalsale, f.Country
from (
   select  max(totalsale)as maxtotal ,country  from mview_customer_total_country group by country

) as x inner join mview_customer_total_country as f on f.totalsale = x.maxtotal and x.country = f.country;

/* ****************************************************************************************************************** */

/*Query 7: Best-selling month (per country) [2009-2011] */

/*Query using materialized view: (working)*/

select f.month, f.totalsale, f.Country
from (
   select  max(totalsale) as maxtotal ,country  from mview_sale_month group by country

) as x inner join mview_sale_month as f on f.totalsale = x.maxtotal and x.country = f.country;

/* ****************************************************************************************************************** */


/*Query 8: Best-selling product per month [2009-2011] */

/*Query using materialized view: */
select t2.StockCode, t2.description, t2.Month, t2.TotalQuantity
from
(select StockCode, description, max(totalquantity) as maxtotal  from mview_quantity_product 
group by StockCode, description) as t1 inner join mview_quantity_product t2 
on t2.stockCode=t1.stockcode and t2.description=t1.description and t2.TotalQuantity = t1.maxtotal;

/* ****************************************************************************************************************** */

/*Query 9: What is the change in total sales per country per year (trend of sales) */
/*SQL Query */

SELECT a.sub_2010_2009, b.sub_2011_2010, b.Country
FROM
(select ( t1.totalsale - t2.totalsale) as sub_2010_2009 , t1.country
from(
SELECT totalsale, country 
from mview_yearsale_country
where year = 2010) t1 ,(
SELECT totalsale, country 
from mview_yearsale_country
where year = 2009) t2
where t1.country = t2.country) as a  

INNER JOIN  

(select ( t1.totalsale - t2.totalsale) as sub_2011_2010 , t1.country
from(
SELECT totalsale, country 
from mview_yearsale_country
where year = 2011) t1 ,(
SELECT totalsale, country 
from mview_yearsale_country
where year = 2010) t2
where t1.country = t2.country) as b
on b.country = a.country;


/*Query using materialized view: */
/* ****************************************************************************************************************** */

/*Query 10: Average spending of a customer in that country (Total sales/ no of customer) */
/*SQL Query (working)*/
select (sum(TotalSale)/count(Customer_ID)) as Avg_Spending, country 
from (
   select fact.Customer_ID, sum(fact.TotalSale) as TotalSale, customerdim.Country 
   from fact join customerdim on fact.Customer_ID = customerdim.Customer_ID
   group by fact.Customer_ID, customerdim.Country) as a 
group by Country;

/*Query using materialized view: (working)*/
select (count(Customer_ID)/ sum(TotalSale)) as Avg_Spending, country 
from mview_customer_total_country 
group by Country;


/* ****************************************************************************************************************** */

/*Query 11: Frequently purchased item per customer */
/*SQL Query (working) */
select f.Customer_ID, f.stockCode,f.stockcount
from (
select max(stockcount) as maxstockcount , Customer_ID
from (select Customer_ID, stockCode, count(stockcode) as stockcount
from fact 
group by Customer_ID, stockCode) t1
group by Customer_ID ) as x 
INNER JOIN ( select Customer_ID, stockCode, count(stockcode) as stockcount
from fact 
group by Customer_ID, stockCode) as f 
on f.stockcount = x.maxstockcount and f.customer_id = x.customer_id;



/*Query using materialized view: */
/* No need for using materialized view */

/* ****************************************************************************************************************** */
