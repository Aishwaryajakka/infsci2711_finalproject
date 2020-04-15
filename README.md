# infsci2711_finalproject

## This project is a multi-database warehouse built using SQL, MongoDB and Neo4j on dataset : https://archive.ics.uci.edu/ml/datasets/Online+Retail+II

Each branch is an implementation of a type of database system.

For more information please contact Team Coordinator : aishwaryajakka@pitt.edu

|Database    | Team |
| ----------- | ----------- |
| MySQL      | Aishwarya Jakka, Shruti Gupta       |
| Neo4j   | Soham Bhatnagar, Aishwarya Jakka, Kwesi Alguillera, Kenny Wu        |
| MongoDB   |Piu Mallick, Reshma Pothen        |

Other subgroups:

|Group task    | Team |
| ----------- | ----------- |
| Data Cleaning      | Kwesi Alguillera      |
| Documentation   | Piu mallick, Reshma Pothen , Shruti Gupta       |

## Online Retail Database

This Online Retail II data set (the original dataset is a excel file) contains all the transactions occurring for a UK-based and registered, non-store online retail between 01/12/2009 (1st Dec 2009) and 09/12/2011 (9th Dec 2011). The company mainly sells unique all-occasion giftware. Many customers of the company are wholesalers.

## Data Description

The dataset has the following attributes:
1.InvoiceNo: Invoice number. Nominal. A 6-digit integral number uniquely assigned to each transaction. If this code starts with the letter 'c', it indicates a cancellation.
2.StockCode: Product (item) code. Nominal. A 5-digit integral number uniquely assigned to each distinct product.
3.Description: Product (item) name. Nominal.
4.Quantity: The quantities of each product (item) per transaction. Numeric.
5.InvoiceDate: Invoice date and time. Numeric. The date and time when a transaction was generated.
6.UnitPrice: Unit price. Numeric. Product price per unit in sterling (Â£).
7.CustomerID: Customer number. Nominal. A 5-digit integral number uniquely assigned to each customer.
8.Country: Country name. Nominal. The name of the country where a customer resides.

## Aggregate Queries

1.What time of the day (which hour of the day) is the sale maximum per country?
2. What is the annual TotalSales per product?
3. What is the top product per year?
4. What is the top product per country?
5.Which item is sold below a certain threshold value? Or, what are the under-performed products based on the average sales last year (the year denotes either 2009 or 2010)?
6.Which customer spends the most (per country/overall)?
7.What is the best-selling month per country? (Given the year range, 2009-2011)
8.What is the best-selling product per month? (Given the year range, 2009-2011)
9.What is the change in TotalSales per country per year (Trend of Sales)?
10.What is the average spending of a customer per country? (TotalSales/Number of customers)
11.What is the frequently purchased item per customer?

## Instructions to Run the DataWarehouse of Online Retail Database
npm start 


