<template>
  <div>
    <div id="chart">
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "apexDhtChart",
  props: {
    dhtSensorChart: Array,
    dhtSensorChartCategories: Array,
  },
  data() {
    return {
      series: [
        {
          name: "Website Blog",
          type: "column",
          data: [440, 505, 414,50],
        },
        {
          name: "Social Media",
          type: "line",
          data: [0,6,4,1]
        },
      ],

      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Traffic Sources",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: 
         [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ], 
        xaxis: {
          type: "categories",
        },
        yaxis: [
          {
            title: {
              text: "Humidity",
            },
          },
          {
            opposite: true,
            title: {
              text: "Temperature",
              max: 40,
            },
          },
        ],
      },
    };
  },
  updated() {
    console.log("called updated()");
    this.series = this.dhtSensorChart;
    this.chartOptions = {
      labels: this.dhtSensorChartCategories
    }
  },
}
</script>
