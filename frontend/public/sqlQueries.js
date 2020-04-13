sqlQueries = {
    "query1": 
        `select f.hour, f.totalsale, f.Country
        from(
        select  max(totalsale)as total,country  from mview_sum_sale_country group by country
        ) as x inner join mview_sum_sale_country as f on f.totalsale = x.total and x.country = f.country;`,
    "query2":
        `Select * from mview_totalsale_product;`,
    "query3": 
        `select f.stockCode, f.description,f.Year, f.TotalSale as totalSale
        from (
        SELECT Year, max(Totalsale) as maxtotal FROM mview_totalsale_product group by Year
        ) as x inner join mview_totalsale_product as f on f.totalsale = x.maxtotal and x.year = f.year;`,
    "query4": 
        `select f.stockCode, f.Country, f.Quantity as Total
        from (
        SELECT Country, max(Quantity) as maxtotal FROM mview_product_country group by Country
        ) as x inner join mview_product_country as f on f.Quantity = x.maxtotal and x.Country = f.Country
        order by total desc`,
    "query5": 
        `select t1.stockcode, t1.description, (t1.totalquant_2010- t2.totalquant_2009) as difference
        from 
        (select stockcode, year , description, totalquantity as totalquant_2010 from mview_quantity_product_year 
        where year = 2010) t1 
        inner join 
        (select stockcode, year , description, totalquantity as totalquant_2009 from mview_quantity_product_year
        where year = 2009) t2 
        on t1.stockcode = t2.stockcode and t1.description = t2.description 
        and t2.totalquant_2009 <= t1.totalquant_2010 
        ORDER BY difference ASC limit 25;`,
    "query6": 
        `select f.customer_id, f.totalsale, f.Country
        from (
        select  max(totalsale)as maxtotal ,country  from mview_customer_total_country group by country
        ) as x inner join mview_customer_total_country as f on f.totalsale = x.maxtotal and x.country = f.country;`,
    "query7": 
        `select f.month, f.totalsale, f.Country
        from (
        select  max(totalsale) as maxtotal ,country  from mview_sale_month group by country
        ) as x inner join mview_sale_month as f on f.totalsale = x.maxtotal and x.country = f.country;`,
    "query8": 
        `select t3.stockCode,t3.description, t3.TotalQuantity as maxtotal, t3.month
        from (select max(maxtotal) as total,month
        from
        (select StockCode, description, Month, max(totalquantity) as maxtotal  from mview_quantity_product 
        group by StockCode, description, Month)t1
        group by month ) t2 inner join mview_quantity_product t3 
        on t3.TotalQuantity=t2.total and t3.Month=t2.month
        order by t3.month asc;`,
    "query9": 
        `SELECT a.sub_2010_2009, b.sub_2011_2010, b.Country
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
        on b.country = a.country;`,
    "query10": 
        `select (count(Customer_ID)/ sum(TotalSale)) as Avg_Spending, country 
        from mview_customer_total_country 
        group by Country;`,
    "query11": 
        `select f.Customer_ID, f.stockCode,f.stockcount
        from (
        select max(stockcount) as maxstockcount , Customer_ID
        from (select Customer_ID, stockCode, count(stockcode) as stockcount
        from fact 
        group by Customer_ID, stockCode) t1
        group by Customer_ID ) as x 
        INNER JOIN ( select Customer_ID, stockCode, count(stockcode) as stockcount
        from fact 
        group by Customer_ID, stockCode) as f 
        on f.stockcount = x.maxstockcount and f.customer_id = x.customer_id;`
}