<template>
  <div>
    <div id="chart">
      <button class="btn btn-secondary btn-sm"  @click="update">update</button>
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
          name: "Humidity",
          type: "column",
          data: [20, 40, 60, 40, 20],
        },
        {
          name: "Temperature",
          type: "line",
          data: [24,16,4,16,24 ]
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
          text: "Humidity and Temperature",
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
              
            },
          },
        ],
      },
    };
  },
    methods:{
    update (){
    console.log("called updated() DHT");
    this.series = this.dhtSensorChart;
    this.chartOptions = {
      labels: this.dhtSensorChartCategories,
      //title: this.dhtSensorChart[1].id,
    }
  },
    
  },
  updated() {
/*     console.log("called updated() DHT");
    this.series = this.dhtSensorChart;
    this.chartOptions = {
      labels: this.dhtSensorChartCategories,
      //title: this.dhtSensorChart[1].id,
    } */
  },
}
</script>
