/* Query 1: What time of the day is the sale maximum per country? */
/*SQL Query */

select Hour, max(Total) as max_total_sale, Country from(
SELECT  fact.Hour as Hour ,sum(fact.TotalSale) as total, customerdim.Country as Country 
from fact  JOIN customerdim ON  fact.Customer_ID=customerdim.Customer_ID  GROUP BY
 fact.Hour,customerdim.Country) as a group by country

/* Query using materialized view */
select Hour,max(TotalSale) as max_total_sale, Country from mview_sum_sale_country group by country

/* Query 2: Annual total sales of per product */

/*SQL Query */ 
select fact.StockCode, fact.year, sum(fact.TotalSale), stockdim.Description from fact join stockdim on fact.StockCode = stockdim.StockCode group by StockCode, year

/* Query using materialized view */
Select * from m_view_totalsale_product

/* Query 3: Top product per year */

/*SQL Query */
select years, max(total), description from (select fact.StockCode, fact.year, sum(fact.TotalSale), stockdim.Description from fact join stockdim on fact.StockCode = stockdim.StockCode group by StockCode, year ) as total group by years

/* Query using materialized view: */

SELECT stockCode, Year, description ,max(Totalsale) FROM online_retail_adb.mview_totalsale_product group by Year


/* Query 4: Top product per country */
/*SQL Query */
use retail_database;
      use retail_database;
      select Country, max(total) from (select
         fact.StockCode as StockCode,
         customerdim.Country as country,
         sum(fact.Quantity) as total
      from
         fact 
         join
            customerdim
            on fact.Customer_ID = customerdim.Customer_ID
      group by
         StockCode,
         country) as total group by Country


/*Query using materialized view: */

SELECT StockCode, Country, max(Quantity) as maxSale FROM online_retail_adb.mview_product_country group by Country
/*Query 5: Which item is sold below the threshold value (under-performed products) */
/*SQL Query */

/*Query using materialized view: */
/*Query 6: Which customer spends the most (per country or overall) */
/*SQL Query */
SELECT CustomerID, country, max(totalSale) FROM 
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
)as a group by country


/*Query using materialized view: */
SELECT Customer_ID, Country, max(TotalSale) FROM online_retail_adb.mview_customer_total_country group by Country


/*Query 7: Best-selling month (per country) [2009-2011] */
/*SQL Query */
select month, country,max(totalsale) from (
select
         fact.Month as Month,
         customerdim.Country as country,
         sum(fact.TotalSale) as totalSale
      from
         fact 
         join
            customerdim
            on fact.Customer_ID = customerdim.Customer_ID
      group by
         Month,
         country
     )    as a
group by country


/*Query using materialized view: */

SELECT month, country,max(totalsale) FROM online_retail_adb.mview_sale_month group by country

/*Query 8: Best-selling product per month [2009-2011] */
/*SQL Query */
select StockCode, Month, max(totalQuantity) as Quantity from (
SELECT fact.StockCode as StockCode, fact.Month as Month, sum(fact.Quantity) as totalQuantity FROM fact group by fact.Month, fact.StockCode) as a group by StockCode,Month;


/*Query using materialized view: */
/*Query 9: What is the change in total sales per country per year (trend of sales) */
/*SQL Query */

/*Query using materialized view: */
/*Query 10: Average spending of a customer in that country (Total sales/ no of customer) */
/*SQL Query */
select (sum(TotalSale)/count(Customer_ID)) as Avg_Spending, country from (select fact.Customer_ID, sum(fact.TotalSale) as TotalSale, customerdim.Country from fact join customerdim on fact.Customer_ID = customerdim.Customer_ID group by fact.Customer_ID, customerdim.Country) as a group by Country

/*Query using materialized view: */
select (count(Customer_ID)/ sum(TotalSale)) as Avg_Spending, country from mview_customer_total_country group by Country
                                
/*Query 11: Frequently purchased item per customer */
/*SQL Query */
select fact.Customer_ID, fact.StockCode, count(fact.StockCode) from fact group by fact.Customer_ID

/*Query using materialized view: */
No need for using materialized view
