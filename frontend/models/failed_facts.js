const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactSchema = new Schema(
    {
        StockCode: Number,
        Quantity: Number,
        CustomerID: Number,
        Year: Number,
        Month: Number,
        Day: Number,
        Hour: Number,
        Minute: Number,
        TotalSales: mongoose.Decimal128
    }
);

module.exports = mongoose.model("fact", FactSchema);