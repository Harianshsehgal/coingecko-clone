import { React, useState, useEffect } from "react";
import CoinGraph from "../../components/CoinGraph";
import styles from './styles.css'

function GraphPage() {

  const [graphType, setGraphType] = useState("prices");

  function SelectGraphType(event) {
    setGraphType(event.target.value);
  }

  return (
    <div className="graphPage">
      <div className="graphHeader">
        <h2>Chart of last 7 days</h2>
      </div>

    <div className="graphButtons">
          <button className={graphType=='prices'?"selectedGraphButton":"graphButton"} id="prices" value='prices' onClick={SelectGraphType}>Price</button>
          <button className={graphType=='market_caps'?"selectedGraphButton":"graphButton"} id="market_caps" value='market_caps'onClick={SelectGraphType}>Market Cap</button>
          <button className={graphType=='total_volumes'?"selectedGraphButton":"graphButton"} id="total_volumes" value='total_volumes'onClick={SelectGraphType}>Total Volumes</button>
        </div>
      <CoinGraph graphType={graphType} /> 
    </div>
  );
}

export default GraphPage;
