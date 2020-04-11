/* 
   MATERIALISED VIEWS 
   ** please note: Execute this script in online_retail_adb database first before executing the queries 
*/
/* Create materialized view mview_sum_sale_country */

create table mview_sum_sale_country (Hour int(2), TotalSale decimal(32,2), Country varchar(100));

/*insert into materialized view */

insert into mview_sum_sale_country (
   select fact.Hour ,sum(fact.TotalSale) as total, customerdim.Country 
from fact
 JOIN customerdim
ON
 fact.Customer_ID=customerdim.Customer_ID 
GROUP BY
 fact.Hour,customerdim.Country);

/*  Create materialized view mview_totalsale_product */

create table mview_totalsale_product(
stockCode varchar(15),
Year int(4),
description varchar(100),
Totalsale numeric(10,2));


/*  insert into view mview_totalsale_product */
insert into mview_totalsale_product(
select stockdim.StockCode, fact.year,  stockdim.Description ,sum(fact.TotalSale)from fact join stockdim on fact.StockCode = stockdim.StockCode group by Stockdim.StockCode, Fact.Year, stockdim.Description
);

/*  Create materialized view mview_quantity_product */

create table mview_quantity_product(
stockCode varchar(15),
Month int(2),
description varchar(100),
TotalQuantity int(11));


/*  insert into view mview_quantity_product */
insert into mview_quantity_product(
Select stockdim.StockCode, fact.month,  stockdim.Description ,sum(fact.Quantity) 
    from fact join stockdim on fact.StockCode = stockdim.StockCode
    group by Stockdim.StockCode, Fact.month, stockdim.Description
);

/*  Create materialized view mview_quantity_product_year */

create table mview_quantity_product_year(
stockCode varchar(15),
Year int(4),
description varchar(100),
TotalQuantity int(11));


/*  insert into view mview_quantity_product_year */
insert into mview_quantity_product_year(
Select stockdim.StockCode, fact.year,  stockdim.Description ,sum(fact.Quantity) 
    from fact join stockdim on fact.StockCode = stockdim.StockCode
    group by Stockdim.StockCode, Fact.year, stockdim.Description
);


/* Create materialized view mview_product_country: */
/* Ideally we would like to display description but due to the complexity and heaviness of the query,
 we shall display only stockcode */

create table mview_product_country
(
StockCode varchar(15),
Country varchar(100),
Quantity int(11)
);


/* Insert Materialized view mview_product_country:  */
insert into mview_product_country (
select
         f.StockCode as StockCode,
         c.Country as country,
         sum(f.Quantity) as total
      from
         FACT f
         inner join
            customerdim c
            on f.Customer_ID = c.Customer_ID
      group by
         f.StockCode,
        c.country
);



/*  create Materialized view mview_customer_total_country: */

create table mview_customer_total_country(
Customer_ID varchar(15),
Country varchar(100),
TotalSale numeric(10,2)
);

/* Insert into view mview_customer_total_country */

insert into mview_customer_total_country 
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
         customerdim.Country);


/*  create Materialized view mview_sale_month: */

create table mview_sale_month(
month int(2),
country varchar(100),
totalsale numeric(10,2)
);

/* Insert into materialized view mview_sale_month:  */


insert into mview_sale_month(
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
         fact.Month,
         CUSTOMERDIM.Country
     );   
     


/* create Materialized view mview_yearsale_country:  */

create table mview_yearsale_country(
Year int(4),
totalSale numeric(10,2),
Country varchar(100));


/* Insert into materialized view mview_yearsale_country:  */
insert into mview_yearsale_country(
SELECT fact.Year, sum(fact.TotalSale), customerdim.Country 
from online_retail_adb.fact join online_retail_adb.customerdim
on fact.Customer_ID=customerdim.Customer_ID 
group by fact.year, customerdim.Country
);
