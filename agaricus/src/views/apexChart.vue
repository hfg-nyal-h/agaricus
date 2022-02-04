<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "apexCharts",
  props: {
    mySensors: Object,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "newest",
            "15 min ago",
            "30 mina ago",
            "45 min ago",
            "1h ago",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49],
        },
      ],
    };
  },
  created() {
    let val = [];
    let name = [];
    let date = [];
    console.log(val);

    for (var j = 0; j < this.mySensors.length; j++) {
      val[j] = this.mySensors[j].moisture;
      name[j] = this.mySensors[j].sensorId
      date[j] = this.mySensors[j].createdAt
      console.log(j + " value of j");
      console.log(val[j] + " datavalue of j");
    }

    const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

     this.chartOptions = {
      colors: [colors[Math.floor(Math.random() * colors.length)]],
    }; 

    this.series = [
      {
        name: name,
        data: val,
      },
    ];
   
    this.chartOptions.xaxis = {
      categories: date
    }
    console.log(val[0] + " Value of Data in ApexChart.vue");
  },

  methods: {},
};
</script>
