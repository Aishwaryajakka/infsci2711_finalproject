mongoDBpipelines = {
    "query1": [
        {
    $lookup: {
        from: 'customer_dim',
        localField: 'CustomerID',
        foreignField: 'CustomerID',
        as: 'customer_rec'
            }
        },
        {
        $unwind: {
            path: '$customer_rec'
            }
        },
        {
        $project: {
            Hour: 1,
            Country: '$customer_rec.Country',
            TotalSales: 1,
            _id: 0
            }
        },
        {
        $group: {
            _id: {
                Hour: '$Hour',
                Country: '$Country'
                },
            TotalSalePerCountry: {
                $sum: '$TotalSales'
                }
            }
        },
        {
        $project: {
            Hour: '$_id.Hour',
            Country: '$_id.Country',
            TotalSalePerCountry: 1,
            rec: '$$ROOT',
            _id: 0
            }
        },
        {
        $group: {
            _id: '$Country',
            MaxSalePerHourPerCountry: {
                $max: '$TotalSalePerCountry'
                },
            rec: {
                $first: '$rec'
                }
            }
        },
        {
        $project: {
            Country: '$_id',
            MaxSalePerHourPerCountry: 1,
            Hour: '$rec._id.Hour'
            }
        },
        {
        $sort: {
            Country: 1
            }
        }
    ],
    "query2": [
        {
	    $group: {
	        _id: {
                    "Year": "$Year",
                    "Stock": "$StockCode"
                },
	        TotalAnnualSales: {
	            $sum: "$TotalSales"
                }
            }
        },
        {
	    $project: {
	        Year: "$_id.Year",
	        Stock: "$_id.Stock",
	        TotalAnnualSales: 1,
	        _id: 0
            }
        },
        {
	    $sort: {
	        Stock: 1,
	        Year: 1
            }
        },
        {
	    $lookup: {
	        from: "stock_dim",
	        localField: "Stock",
	        foreignField: "StockCode",
	        as: 'stk'
            }
        },
        {
	    $project: {
	        Stock: 1,
	        Year: 1,
	        TotalAnnualSales: 1,
	        first: {
	            $arrayElemAt: [
                        "$stk",
                        0
                    ]
                }
            }
        },
        {
	    $project: {
	        Stock: 1,
	        Year: 1,
	        TotalAnnualSales: 1,
	        Description: "$first.Description"
            }
        }
    ],
    "query3": [
        {
	    $group: {
	        _id: {
                    "Year": "$Year",
                    "StockCode": "$StockCode"
                },
	        TotalAnnualSales: {
	            $max: {
	                $sum: "$TotalSales"
                    }
                }
            }
        },
        {
	    $project: {
	        TotalAnnualSales: 1,
	        stock_doc: "$$ROOT"
            }
        },
        {
	    $group: {
	        _id: "$_id.Year",
	        TotalAnnualSales: {
	            $max: "$TotalAnnualSales"
                },
	        stock_doc: {
	            $first: "$stock_doc"
                }
            }
        },
        {
	    $project: {
	        Year: "$_id",
	        StockCode: "$stock_doc._id.StockCode",
	        TotalAnnualSales: 1,
	        _id: 0
            }
        },
        {
	    $sort: {
	        Year: 1
            }
        }
    ],
    "query4": [
        {
	    $lookup: {
	        from: 'customer_dim',
	        localField: 'CustomerID',
	        foreignField: 'CustomerID',
	        as: 'customer_rec'
            }
        },
        {
	    $unwind: {
	        path: '$customer_rec'
            }
        },
        {
	    $group: {
	        _id: {
	            StockCode: '$StockCode',
	            Country: '$customer_rec.Country'
                },
	        TotalSalePsPc: {
	            $sum: '$TotalSales'
                },
	        all_sales: {
	            $push: {
	                sale_rec: '$$ROOT'
                    }
                }
            }
        },
        {
	    $project: {
	        StockCode: '$_id.StockCode',
	        Country: '$_id.Country',
	        TotalSalePsPc: 1,
	        rec: '$$ROOT',
	        _id: 0
            }
        },
        {
	    $group: {
	        _id: '$Country',
	        TotalSalePerStock: {
	            $max: '$TotalSalePsPc'
                },
	        rec: {
	            $first: '$rec'
                }
            }
        },
        {
	    $project: {
	        StockCode: '$rec._id.StockCode',
	        Country: '$_id',
	        TotalSalePerStock: 1,
	        _id: 0
            }
        },
        {
	    $sort: {
	        TotalSalePerStock: -1
            }
        }
    ],
    "query5": [
        {
              $group: {
                  _id: {
                      StockCode: '$StockCode',
                      Year: '$Year'
                },
                  TotalSaleQ: {
                      $sum: '$Quantity'
                },
                  count: {
                      $sum: 1
                }
            }
        },
        {
              $sort: {
                  _id: 1
            }
        },
        {
              $group: {
                  _id: '$_id.StockCode',
                  sale_q_per_year: {
                      $push: {
                          Year: '$_id.Year',
                          TotalSaleQ: '$TotalSaleQ',
                          count: '$count'
                    }
                }
            }
        }
    ],
    "query6": [
        {
        $lookup: {
            from: 'customer_dim',
            localField: 'CustomerID',
            foreignField: 'CustomerID',
            as: 'customer_rec'
            }
        },
        {
        $unwind: {
            path: '$customer_rec'
            }
        },
        {
        $group: {
            _id: {
                CustomerID: '$CustomerID',
                Country: '$customer_rec.Country'
                },
            TotalSalePerCustomer: {
                $sum: '$TotalSales'
                },
            all_sales: {
                $push: {
                    sale_rec: '$$ROOT'
                    }
                }
            }
        },
        {
        $sort: {
            TotalSalePerCustomer: -1
            }
        },
        {
        $project: {
            CustomerID: '$_id.CustomerID',
            Country: '$_id.Country',
            TotalSalePerCustomer: 1,
            _id: 0
            }
        },
        {
        $group: {
            _id: {
                CustomerID: '$CustomerID',
                Country: '$Country'
                },
            TotalSalePerCustomer: {
                $max: '$TotalSalePerCustomer'
                }
            }
        },
        {
        $sort: {
            TotalSalePerCustomer: -1
            }
        },
        {
        $project: {
            CustomerID: '$_id.CustomerID',
            Country: '$_id.Country',
            TotalSalePerCustomer: 1,
            _id: 0,
            }
        }
    ],
    "query7": [
        {
	    $lookup: {
	        from: 'customer_dim',
	        localField: 'CustomerID',
	        foreignField: 'CustomerID',
	        as: 'customer_rec'
            }
        },
        {
	    $unwind: {
	        path: '$customer_rec'
            }
        },
        {
	    $project: {
	        Month: 1,
	        Country: '$customer_rec.Country',
	        TotalSales: 1,
	        _id: 0
            }
        },
        {
	    $group: {
	        _id: {
	            Month: '$Month',
	            Country: '$Country'
                },
	        TotalSalePerCountry: {
	            $sum: '$TotalSales'
                }
            }
        },
        {
	    $project: {
	        Month: '$_id.Month',
	        Country: '$_id.Country',
	        TotalSalePerCountry: 1,
	        rec: '$$ROOT',
	        _id: 0
            }
        },
        {
	    $group: {
	        _id: '$Country',
	        MaxSalePerHourPerCountry: {
	            $max: '$TotalSalePerCountry'
                },
	        rec: {
	            $first: '$rec'
                }
            }
        },
        {
	    $project: {
	        Country: '$_id',
	        MaxSalePerHourPerCountry: 1,
	        Month: '$rec._id.Month'
            }
        },
        {
	    $sort: {
	        Country: 1
            }
        }
    ],
    "query8": [
        {
        $lookup: {
            from: 'stock_dim',
            localField: 'StockCode',
            foreignField: 'StockCode',
            as: 'StockCode'
            }
        },
        {
        $group: {
            _id: '$Month',
            max: {
                $max: '$Quantity'
                },
            StockCode: {
                $first: '$StockCode'
                }
            }
        },
        {
        $unwind: {
            path: '$StockCode'
            }
        },
        {
        $project: {
            Month: '$_id',
            StockCode: '$StockCode.StockCode',
            StockDescription: '$StockCode.Description',
            Quantity: '$max',
            _id: 0
            }
        },
        {
        $sort: {
            Month: 1
            }
        }
    ],
    "query9": [
        {
        $lookup: {
            from: 'customer_dim',
            localField: 'CustomerID',
            foreignField: 'CustomerID',
            as: 'customer_rec'
            }
        },
        {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                        {
                        $arrayElemAt: [ '$customer_rec',
                                0
                            ]
                        },
                    '$$ROOT'
                    ]
                }
            }
        },
        {
        $group: {
            _id: {
                Country: '$Country',
                Year: '$Year'
                },
            TotalSalePerCountry: {
                $sum: '$TotalSales'
                }
            }
        },
        {
        $sort: {
            _id: 1
            }
        },
        {
        $group: {
            _id: '$_id.Country',
            all_recs: {
                $push: {
                    Year: '$_id.Year',
                    TotalSaleInYear: '$TotalSalePerCountry'
                    }
                }
            }
        }
    ],
    "query10": [
        {
	    $lookup: {
	        from: 'customer_dim',
	        localField: 'CustomerID',
	        foreignField: 'CustomerID',
	        as: 'customer_rec'
            }
        },
        {
	    $unwind: {
	        path: '$customer_rec'
            }
        },
        {
	    $project: {
	        rec: '$$ROOT'
            }
        },
        {
	    $group: {
	        _id: '$rec.customer_rec.Country',
	        AvgSpending: {
	            $avg: '$rec.TotalSales'
                },
	        rec: {
	            $first: '$rec'
                }
            }
        },
        {
	    $project: {
	        Country: '$_id',
	        AvgSpending: 1,
	        _id: 0
            }
        },
        {
	    $sort: {
	        AvgSpending: -1
            }
        }
    ],
    "query11": [
        {
	    $group: {
	        _id: {
	            CustomerID: '$CustomerID',
	            StockCode: '$StockCode'
                },
	        count: {
	            $sum: 1
                }
            }
        },
        {
	    $project: {
	        CustomerID: '$_id.CustomerID',
	        StockCode: '$_id.StockCode',
	        count: 1
            }
        },
        {
	    $sort: {
	        count: -1,
	        CustomerID: 1
            }
        }
    ]
}