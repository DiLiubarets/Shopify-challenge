import React from "react";
import Chart from "chart.js";

class myChart extends React.Component {
  componentDidMount() {
    const node = this.node;
    let massPopChart = new Chart(node, this.props.data);
    this.props.setChart(massPopChart);
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={(node) => (this.node = node)}></canvas>
      </div>
    );
  }
}

export default myChart;
