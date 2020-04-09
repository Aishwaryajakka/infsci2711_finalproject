/* Switch to or create a new database - odb in mongodb */
use odb


# Some additional data cleaning done in Python.
# Day/Month/Year/Hour/Minute - column splitting done (in Jupyter Notebook)

# Navigate to path where the cleaned data is kept.

# The mongoimport command is executed outside the mongo shell: in a normal terminal.


# Importing the data into odb database 

mongoimport --db odb --collection retail --type csv --headerline --file Online_Retail_Data.csv

