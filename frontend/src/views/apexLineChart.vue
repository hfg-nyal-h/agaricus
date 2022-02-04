<template>
  <div>
    <div id="chart">
      <button class="btn btn-secondary btn-sm" @click="update">update</button>
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "apexLineChart",
  props: {
    mySensorsLineChart: Array,
    mySensorsLineChartCategories: Array,
  },
  data() {
    return {
      series: [
        {
          name: "test",
          data: [0, 1, 2, 1, 0],
        },
      ],
      chartOptions: {
        chart: {
          animations: {
            enabled: true,
          },
          height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "smooth",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "Moisture",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "1 hour ago",
            "2 hours ago",
            "3 hours ago",
            "4 hours ago",
            "5 hours ago",
            "6 hours ago",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  },
  created() {
/*         console.log("called created() ___________");
    this.series = [...this.mySensorsLineChart];
    this.chartOptions = {
      xaxis: this.mySensorsLineChartCategories[1],
      labels: {
        show: true,
      },
    }; */
  },
  methods:{
    update (){
        console.log("called created() ___________");
    this.series = [...this.mySensorsLineChart];
    this.chartOptions = {
      xaxis: this.mySensorsLineChartCategories[1],
      labels: {
        show: true,
      },
    };
    
    }
  },

  updated() {
/*         console.log("called created() ___________");
    this.series = [...this.mySensorsLineChart];
    this.chartOptions = {
      xaxis: this.mySensorsLineChartCategories[1],
      labels: {
        show: true,
      },
    }; */
},
};
</script>
