import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from './styles.css'

function CoinGraph(props) {

  const [coinApiData, setCoinApiData] = useState([]);

  const searchParam = window.location.search;
  const selectedCoinName = searchParam.substr(9);

  const fetchHistoricalData = async (coinName) => {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/" +
        coinName +
        "/market_chart?vs_currency=usd&days=7&interval=hourly"
    )
      .then((resp) => resp.json())
      .then((resp) => setCoinApiData(resp));
  };

  useEffect(() => {
    fetchHistoricalData(selectedCoinName);
  }, []);

  console.log("coinApiData---", coinApiData);



  var graphPlotData = coinApiData[props?.graphType]?.map((value) => {
    return value[1];
  });


var timeArray=coinApiData[props?.graphType]?.map((value) => {
  return new Date(value[0]).toLocaleString();
});

  const GraphInputData = {
    labels: timeArray,
    datasets: [
      {
        label: props.graphType,
        data: graphPlotData,
        fill: true,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(59,130,246,0.5)",
      },
    ],
  };

  return (
    <div>
      <Line data={GraphInputData} />
    </div>
  );
}
export default CoinGraph;
