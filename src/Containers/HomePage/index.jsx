import React, { useEffect, useState } from "react";
import { CoinDataTable } from "../../components/CoinDataTable";
import { styles } from "./styles.css";

function Home() {
  const [data, setData] = useState([]);

  const dataFetch = async () => {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="home">
      <h1 className="homeHeading">Cryptocurrency Prices by Market Cap</h1>
      <CoinDataTable />
    </div>
  );
}

export default Home;
