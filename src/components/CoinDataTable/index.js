import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import styles from "./styles.css";


const getCellStyle = (cell) => {
  if (cell?.getCellProps()["key"].includes("_name")) {
    return "coinTableCell";
  } else if (
    cell?.getCellProps()["key"].includes("price_change_percentage_24h")
  ) {
    if (cell.value > 0) {
      return "cell24hPositive cell24h";
    } else {
      return "cell24hNegative cell24h";
    }
  } 
  
  else if(cell?.getCellProps()["key"].includes("market_cap_rank")){
    return 'rankTableCell'
  }
  else if(cell?.getCellProps()["key"].includes("current_price")){
    return 'priceTableCell'
  }
  else {
    return "eachTableCell";
  }
};

const getCellComp = (cell, row) => {
  // console.log("cell===", cell);
  return cell?.getCellProps()["key"].includes("_name") ? (
    <div className="coinCell">
      <div className="coinCellImageName">
        <img src={row.original.image} width={20}></img>
        <div className="coinName">{row.original.name}</div>
      </div>
      <div className="coinSymbol">{row.original.symbol.toUpperCase()}</div>
    </div>
  ) : (
    cell.render("Cell")
  );
};

export const CoinDataTable = () => {
  const [data, setData] = useState([]);

  const CoinData = async () => {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };
  useEffect(() => {
    CoinData();
  }, []);

  const COLUMNS = [
  

    {
      Header: "#",
      accessor: "market_cap_rank",
      Cell: ({ value }) => {
        return (  value);
      },
    },
    {
      
      Header: "Coin",
      className: "eachTable",
      accessor: "name",
    },
    {
      Header: "  ",
    Cell: () => <button className="buyButton">Buy</button>,
    },
    {
      Header: "Price",
      accessor: "current_price",
      Cell: ({ value }) => {
        return "$" + value.toFixed(2);
      },
    },
    {
      Header: "24h",
      accessor: "price_change_percentage_24h",
      Cell: ({ value }) => {
        return value.toFixed(2) + "%";
      },
    },
    {
      Header: "Volume",
      accessor: "total_volume",
      Cell: ({ value }) => {
        return "$" + value;
      },
    },
    {
      Header: "Mkt Cap",
      accessor: "market_cap",
      Cell: ({ value }) => {
        return "$" + value;
      },
    },

    {
      width: 300,
      Header: "Last 7 days",
      accessor: "id",

      Cell: ({ value }) => {
        return (
          <Link to={"/graphPage?coin_id=" + value}>
            <button className="chartsButton">
              <i className="fa fa-line-chart chartIcon"></i>Charts
            </button>
          </Link>
        );
      },
    },
  ];

  const columnsHeadingData = useMemo(() => COLUMNS, []);
  const tableData = data;
  // console.log("tableData", tableData);

  const tableInstance = useTable(
    {
      columns: columnsHeadingData,
      data: tableData,
    },
    useSortBy
  );

  //destructuring tableInstance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  console.log("getTableProps", getTableProps());
  console.log("getTableBodyProps()", getTableBodyProps());

  return (
    <div className="overFlowX">
      <table {...getTableProps()} className="sortedTable">
        <thead className="tableHead">
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  {
                    console.log("column--", column);
                  }
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                          column.id != "name"
                          ? "eachTableHeading"
                          : "nameTableHeading "
                      }
                      
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ▼"
                            : " ▲"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            {/* console.log("row--", row); */}
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  {
                    /* console.log("cell--", cell.getCellProps()["key"]); */
                  }
                  return (
                    <td {...cell.getCellProps()} className={getCellStyle(cell)}>
                      {getCellComp(cell, row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
