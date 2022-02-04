<template>
  <div class="container wd-100">
    <div class="header">
      <!-- Nav -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Agaricus</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="sensorManager"
                  >Sensor Manager</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link justify-content-end"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                  @click="logout"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div
      v-show="alertWater"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Holy guacamole!</strong> {{ messageWater[i] }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>

    <br />

    <!-- Page Content -->
    <div id="content">

      <div class="row text-justify">
        <div class="col-8 text-start">
          <h3>{{ username }}'s sensor dashboard</h3>
        </div>
        <div class="fw-lighter col-4 text-end">
          Temperature: {{ temperatureNow }}°C Humidity: {{ humidityNow }}%
        </div>
      </div>

      <div
        v-show="showTemperature"
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Warning!</strong> {{ temperatureNow }} {{ messageTemperature }}

        {{ messageTemperature2 }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <div
        v-show="showHumidity"
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Warning!</strong> {{ humidityNow }} {{ messageHumidity }} <br />
        The humidity level of the room must be constant at least 65%. <br />
        {{ messageHumidity2 }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <!-- Charts -->
      <br />
      <div class="row justify-content-center">
        <div
          :id="index"
          v-for="(mySensor, index) in mySensors"
          :key="mySensor"
          class="col-lg-5 grey aligns-items-center"
        >
          <div class="fw-lighter">{{ messageWater[index] }}</div>
          <h5>
            <b>{{ ++index }}. sensor</b>
          </h5>
          <!-- add Sensorname -->

          <b>moisture</b> {{ mySensor[0].moisture }}% <br />
          <b>sensor id:</b> {{ mySensor[0].sensorId }} <br />
          <b>last value:</b> {{ mySensor[0].createdAt }} <br />

          <br />
          <!--  <apexCharts :mySensors="mySensor" /> -->
        </div>
      </div>
      <br />
      <br />

      <div class="col-xxl">
        <div class="row justify-content-end">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col">
            <select
              class="form-select w-70"
              aria-label="Default select example"
              v-model="moistureChartRange"
            >
              <option selected value="5">5 hours</option>
              <option value="24">1 day</option>
              <option value="48">2 days</option>
              <option value="96">4 days</option>
              <option value="168">1 week</option>
            </select>
          </div>
          <div class="col justify-content-start">
            <button
              class="btn btn-primary btn-sm float-right"
              @click="selectCharts"
            >
              Select
            </button>
          </div>
        </div>
        <apexLineChart
          :mySensorsLineChart="mySensorsLineChart"
          :mySensorsLineChartCategories="mySensorsLineChartCategories"
        />
      </div>
      <div>
        <apexDhtChart
          :dhtSensorChart="dhtSensorChart"
          :dhtSensorChartCategories="dhtSensorChartCategories"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";
//import apexCharts from "./apexChart.vue";
import apexLineChart from "./apexLineChart.vue";
import apexDhtChart from "./apexDhtChart.vue";

export default {
  name: "users",
  components: {
    //apexCharts,
    apexLineChart,
    apexDhtChart,
  },

  data() {
    return {
      username: "",
      mySensors: [],
      mySensorsLineChart: [],
      mySensorsLineChartCategories: [],
      dhtSensorChart: [],
      dhtSensorChartCategories: [],
      secretMessage: "",
      isVisible: true,
      alertWater: false,
      messageWater: [],
      msg: "",
      moistureChartRange: this.moistureChartRange,
      humidityNow: [],
      temperatureNow: [],
      showTemperature: false,
      showHumidity: false,
    };
  },

  async created() {
    //let store = this.$store.getters.getUser.username;
    let storage = this.$store.getters.getUser;
    this.username = storage.username;
    this.secretMessage = await AuthService.getSecretContent();

    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }

    if (this.$store.getters.isLoggedIn) {
      console.log("Logged in");
    }

    this.$router.push("/users");
    /* Moisture Data */
    const uriMoisture = "http://localhost:3000/api/sensorData/";
    let range = this.moistureChartRange || 5;

    let sendingData = {
      storage: storage,
      range: range,
    };

    console.log("starting SensorData process");
    axios
      .post(uriMoisture, sendingData)
      .then((response) => {
        let data = response.data;
        console.log("_____oooo________");
        let newData = [];
        let newDataCat = [];
        data.forEach((sensor) => {
          let ns = {};
          let cat = {};
          ns.name = sensor[0].sensorId;
          ns.data = [];

          cat.categories = [];
          sensor.forEach((val) => {
            ns.data.push(val.moisture);
            cat.categories.push(val.createdAt);
          });
          newData.push(ns);
          newDataCat.push(cat);
        });

        this.mySensorsLineChart = [...newData];
        this.mySensorsLineChartCategories = [...newDataCat];
        this.mySensors = data;
        let alert = [...newData];


        for (let i = 0; i < alert.length; i++) {
          let latestValue = [];
          let idOfPlant = [];
          latestValue = alert[i].data[0];
          idOfPlant = alert[i].name;

          this.checkWater(i, latestValue, idOfPlant);
        }
      })

      .catch(function (error) {
        console.log("something went wrong:");
        console.log(error);
      });

    /* DHT hier! */

    const uriDht = "http://localhost:3000/api/dhtData/";
    console.log("starting SensorData process");
    axios
      .post(uriDht, sendingData)
      .then((response) => {
        let data = response.data;


        let newDataDht = [];
        let labels = [];
        data.forEach((sensor) => {
          let ns = {};
          let ns2 = {};

          ns.name = "humidity";
          ns.type = "column";
          ns.data = [];

          ns2.type = "line";
          ns2.name = "temperature";
          ns2.data = [];

          sensor.forEach((val) => {
            ns.data.push(val.humidity);
            ns2.data.push(val.temperature);
            labels.push(val.createdAt);
          });
          newDataDht.push(ns, ns2);
        });
        this.dhtSensorChart = [...newDataDht];
        this.dhtSensorChartCategories = [...labels];

        this.dhtSensors = data;
        let alertDht = [...newDataDht];

        console.log(alertDht);
        for (let i = 0; i < alertDht.length; i++) {
          let latestHumidityValue = [];
          let latestTemperatureValue = [];
          let idOfPlant = [];
          latestHumidityValue = alertDht[0].data[0];
          latestTemperatureValue = alertDht[1].data[0];
          idOfPlant = alertDht[i].name;

          this.temperatureNow = latestTemperatureValue;
          this.humidityNow = latestHumidityValue;

          this.checkHumidity(latestHumidityValue, idOfPlant);
          this.checkTemperature(latestTemperatureValue, idOfPlant);
        }
      })

      .catch(function (error) {
        console.log("something went wrong:");
        console.log(error);
      });
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/api/login");
    },
    sensorManager() {
      this.$router.push("/api/sensors");
    },

    triggerAlert(i, type, status, idOfPlant) {
      if (type == "water") {
        //staus
        console.log(idOfPlant);
        if (status === 1) {
          this.messageWater[i] = "Please water the champignons ";
        } else if (status === 2) {
          this.messageWater[i] = "The champignons are pretty dry";
        } else if (status === 3) {
          this.messageWater[i] = "The champignons need water! They're dying";
        }
      }
    },
    checkWater(i, latestValue, idOfPlant) {
      let type = "water";
      let status;
      if (latestValue < 70 && latestValue > 25) {
        status = 1;
        this.triggerAlert(i, type, status, idOfPlant);
      } else if (latestValue < 25 && latestValue > 15) {
        status = 2;
        this.triggerAlert(i, type, status, idOfPlant);
      } else if (latestValue < 15) {
        status = 3;
        this.triggerAlert(i, type, status, idOfPlant);
      } else {
        console.log("All good")
      }
    },
    checkHumidity(latestHumidityValue) {
      if (latestHumidityValue > 70) {
        this.showHumidity = false;
      } else if (latestHumidityValue <= 70 && latestHumidityValue >= 65) {
        this.messageHumidity = "% is still okay!";
        this.messageHumidity2 =
          "It's okay if the Humidity level goes up tp 90%";
        this.showHumidity = true;
      } else if (latestHumidityValue < 65 && latestHumidityValue >= 55) {
        this.messageHumidity = "% is to low, increase the humidity!";
        this.showHumidity = true;
      } else if (latestHumidityValue < 55) {
        this.messageHumidity =
          "% is to low, increase the humidity immediately or the champignons are going to die!";
        this.showHumidity = true;
      }
    },
    checkTemperature(latestTemperatureValue, idOfPlant) {
      if (latestTemperatureValue < 25) {
        this.messageTemperature = "°C is way to warm!";
        this.messageTemperature2 = "Decrease the temperatures immediately!!";
        this.showTemperature = true;
      }
      if (latestTemperatureValue < 25 && latestTemperatureValue > 21) {
        console.log("The Temperature is going Down: " + idOfPlant);
        this.messageTemperature = "°C is way to warm!";
        this.messageTemperature2 =
          "The temperatures should not exceed 25° and not fall below 15°!";
        this.showTemperature = true;
      } else if (latestTemperatureValue < 16) {
        this.messageTemperature = "°C is way to warm!";
        this.messageTemperature2 = "Increase the temperatures immediately!";
      }
    },
    async selectCharts() {
      let storage = this.$store.getters.getUser;
      const uriMoisture = "http://localhost:3000/api/sensorData/";
      let range = this.moistureChartRange;

      let send = {
        storage: storage,
        range: range,
      };
      /* Refresh Mois Chart */
      axios.post(uriMoisture, send).then((response) => {
        let data = response.data;

        let newData = [];
        let newDataCat = [];
        data.forEach((sensor) => {
          let ns = {};
          let cat = {};
          ns.name = sensor[0].sensorId;
          ns.data = [];

          cat.categories = [];
          sensor.forEach((val) => {
            ns.data.push(val.moisture);
            cat.categories.push(val.createdAt);
          });
          newData.push(ns);
          newDataCat.push(cat);
        });

        this.mySensorsLineChart = [...newData];
        this.mySensorsLineChartCategories = [...newDataCat];
        this.mySensors = data;
        let alert = [...newData];

        console.log(alert);
        for (let i = 0; i < alert.length; i++) {
          let latestValue = [];
          let idOfPlant = [];
          latestValue = alert[i].data[0];
          idOfPlant = alert[i].name;
          this.checkWater(i, latestValue, idOfPlant);
        }
      });

      /* Refresh DHT Chart */
      const uriDht = "http://localhost:3000/api/dhtData/";
      console.log("starting SensorData process");
      axios
        .post(uriDht, send)
        .then((response) => {
          let data = response.data;
          let newDataDht = [];
          let labels = [];
          data.forEach((sensor) => {
            let ns = {};
            let ns2 = {};

            /* Humidity */
            ns.name = "humidity";
            ns.type = "column";
            ns.data = [];
            ns.id = sensor[0].sensorId;

            /* Temperature */
            ns2.type = "line";
            ns2.name = "temperature";
            ns2.data = [];

            sensor.forEach((val) => {
              ns.data.push(val.humidity);
              ns2.data.push(val.temperature);
              labels.push(val.createdAt);
            });
            newDataDht.push(ns, ns2);
          });

          this.dhtSensorChart = [...newDataDht];
          this.dhtSensorChartCategories = [...labels];

          this.dhtSensors = data;
          let alertDht = [...newDataDht];

          for (let i = 0; i < alertDht.length; i++) {
            let latestHumidityValue = [];
            let latestTemperatureValue = [];
            let idOfPlant = [];
            latestHumidityValue = alertDht[i].humidity[0];
            latestTemperatureValue = alertDht[i].temperature[0];
            idOfPlant = alertDht[i].name;

            this.checkHumidity(latestHumidityValue, idOfPlant);
            this.checkTemperature(latestTemperatureValue, idOfPlant);
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
* {
  font-family: Helvetica, Sans-Serif;
  color: #000000;
}
</style>
