<template>
  <div class="container wd-100">
    <div :show="isVisible">
      <div class="alert alert-secondary">
        This is a primary alert—check it out!
      </div>
    </div>
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

    <br />

    <!-- Page Content -->
    <div id="content">
      <!-- v-if Loged in? -->
      <!-- We'll fill this with dummy content -->
      <div class="row text-justify">
        <div class="col-8 text-start">
          <h3>{{ username }}'s sensor dashboard</h3>
        </div>
        <div class="col-4 text-end"><h3>moin</h3></div>
      </div>

      <!-- Charts -->
      <br />
      <div class="row">
        <div
          v-for="(mySensor, index) in mySensors"
          :key="mySensor"
          class="col-lg-6"
        >
          <h5>
            <b>{{ ++index }}. sensor</b>
          </h5>
          <!-- add Sensorname -->

          <b>moisture</b> {{ mySensor[0].moisture }}% <br />
          <b>sensor id:</b> {{ mySensor[0].sensorId }} <br />
          <b>last value:</b> {{ mySensor[0].createdAt }} <br />
          <br>
          <!--  <apexCharts :mySensors="mySensor" /> -->
        </div>
      </div>
      <br>
      <br>

      <div class="col-xxl">
        <div class="row justify-content-end">
          <div class="col"> </div>
          <div class="col"> </div>
           <div class="col"> </div>
            <div class="col"> </div>
             <div class="col"> {{moistureChartRange}}</div>
          <div class="col">
                <select class="form-select w-70" aria-label="Default select example" v-model="moistureChartRange">
                <option selected value="5" >5 hours</option>
                <option value="24" >1 day</option>
                <option value="48" >2 days</option>
                <option value="96" >4 days </option>
                <option value="168" >1 week</option>
                </select>
            </div>
                <div class="col justify-content-start">
                  <button class="btn btn-primary btn-sm float-right" @click="refreshCharts"> Refresh </button>
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
        <div>
          <div>
        
        <br>
        {{mySensors}}
      </div>
      <br>
      dhtSensorChart
      <br>
      {{dhtSensorChart}}
      <br>
      dhtSensorChartCategories
      <br>
    {{dhtSensorChartCategories}}
    </div>

    <!-- {{mySensors}} -->
  </div>
  </div>
  <!-- <router-view /> -->
</template>

<script>
import AuthService from "@/services/AuthService.js";
import axios from "axios";
//import apexCharts from "./apexChart.vue";
import apexLineChart from "./apexLineChart.vue";
import apexDhtChart from "./apexDhtChart.vue"

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
      isVisible: false,
      moistureChartRange: this.moistureChartRange
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
    let range = this.moistureChartRange || 5

    let sendingData = {
      storage: storage,
      range: range,
    }

    console.log("starting SensorData process");
    axios
      .post(uriMoisture, sendingData)
      .then((response) => {
        let data = response.data;
        console.log("_____________");
        //console.log(this.mySensors);
        //this.mySensors
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
            cat.categories.push(val.createdAt)
          });
          newData.push(ns);
          newDataCat.push(cat);
        });

        //console.log(newData);
        this.mySensorsLineChart = [...newData];
        this.mySensorsLineChartCategories = [...newDataCat];
        this.mySensors = data;
        let alert = [...newData]

console.log(alert);
  for (let i = 0; i < alert.length; i++) {
    let latestValue = [];
    let idOfPlant = [];
    latestValue = alert[i].data[0]
    idOfPlant = alert[i].name

  this.checkWater(latestValue, idOfPlant);

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
        console.log("_____________");
        //console.log(this.mySensors);
        //this.mySensors
        let newDataDht = [];
        let labels= [];
        data.forEach((sensor) => {

          let ns = {};
          let ns2 = {};
        
          //ns.sensorType = "humidity";
          //ns.name = sensor[0].sensorId;
          ns.name = "humidity"
          ns.type = "column"
          ns.data = [];

          //ns2.sensorType = "temperature";
          ns2.type = "line"
          //ns2.name = sensor[0].sensorId;
          ns2.name = "temperature"
          ns2.data = [];

          //let cat = [];
          

          //cat.categories = [];

          sensor.forEach((val) => {

            ns.data.push(val.humidity);
            ns2.data.push(val.temperature);
            labels.push(val.createdAt);
        
          });
          newDataDht.push(ns, ns2);
          //labels.push(labels);
        });

        //console.log(newData);
        this.dhtSensorChart = [...newDataDht];
        this.dhtSensorChartCategories = [...labels];

        this.dhtSensors = data;
        let alertDht = [...newDataDht]

        /* 
          ns aka. dhtSensorChart:
          [{
            "name": "xyz", 
            "humidity": [30, 34, 44, 65, 90],
            "temperature": [21, 22, 23, 24, 25],
            }
          ]
          cat aka dhtSensorChartCategories:
          { 
            "categories": [ "2022-2-2 9:37:10", "2022-2-2 9:36:59", "2022-2-2 9:36:50", "2022-2-2 9:36:40", "2022-2-2 9:36:29" ] 
            }
 */
  

console.log(alertDht);
  for (let i = 0; i < alertDht.length; i++) {
    let latestHumidityValue = [];
    let latestTemperatureValue = [];
    let idOfPlant = [];
    latestHumidityValue = alertDht[i].humidity[0]
    latestTemperatureValue = alertDht[i].temperature[0]
    idOfPlant = alertDht[i].name

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
      triggerAlert() {
        this.showAlert = true
    },
    checkWater(latestValue, idOfPlant){
      if(latestValue < 50 && latestValue > 25) {
      console.log("Water your plant with he id: " + idOfPlant)
      this.showAlert = !this.showAlert
    } else if (latestValue < 25 && latestValue > 10){
      console.log("Your Plant with he id: " + idOfPlant + " is to dry")
    }else if (latestValue < 10){
      console.log("Your Plant with he id: " + idOfPlant + "  is dying")
    }
    },
    checkHumidity(latestHumidityValue, idOfPlant){
      if(latestHumidityValue < 50 && latestHumidityValue > 25) {
      console.log("The Temperature is going Down: " + idOfPlant)
      /* this.showAlert = !this.showAlert */
    } else if (latestHumidityValue < 25 && latestHumidityValue > 10){
      console.log("Temperature: " + idOfPlant + " is to dry")
    }else if (latestHumidityValue < 10){
      console.log("Temperature: " + idOfPlant + "  is dying")
    }
    },
    checkTemperature(latestTemperatureValue, idOfPlant){
      if(latestTemperatureValue < 50 && latestTemperatureValue > 25) {
      console.log("The Temperature is going Down: " + idOfPlant)
      /* this.showAlert = !this.showAlert */
    } else if (latestTemperatureValue < 25 && latestTemperatureValue > 10){
      console.log("Temperature: " + idOfPlant + " is to dry")
    }else if (latestTemperatureValue < 10){
      console.log("Temperature: " + idOfPlant + "  is dying")
    }
    },
    async refreshCharts(){
    let storage = this.$store.getters.getUser;
    const uriMoisture = "http://localhost:3000/api/sensorData/";
    let range = this.moistureChartRange

    let send = {
      storage: storage,
      range: range,
    }
    /* Refresh Mois Chart */
    console.log("refresh Moisture Chart");
    axios
      .post(uriMoisture, send)
      .then((response) => {
        let data = response.data;
        console.log("_____________");
        //console.log(this.mySensors);
        //this.mySensors
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
            cat.categories.push(val.createdAt)
          });
          newData.push(ns);
          newDataCat.push(cat);
        });

        //console.log(newData);
        this.mySensorsLineChart = [...newData];
        this.mySensorsLineChartCategories = [...newDataCat];
        this.mySensors = data;
        let alert = [...newData]

console.log(alert);
  for (let i = 0; i < alert.length; i++) {
    let latestValue = [];
    let idOfPlant = [];
    latestValue = alert[i].data[0]
    idOfPlant = alert[i].name

  this.checkWater(latestValue, idOfPlant);

  }
      })

    /* Refresh DHT Chart */

    const uriDht = "http://localhost:3000/api/dhtData/";
    console.log("starting SensorData process");
    axios
      .post(uriDht, send)
      .then((response) => {
        let data = response.data;
        console.log("_____________");
        //console.log(this.mySensors);
        //this.mySensors
        let newDataDht = [];
        let labels= [];
        data.forEach((sensor) => {

          let ns = {};
          let ns2 = {};
        
          //ns.sensorType = "humidity";
          //ns.name = sensor[0].sensorId;
          ns.name = "humidity"
          ns.type = "column"
          ns.data = [];

          //ns2.sensorType = "temperature";
          ns2.type = "line"
          //ns2.name = sensor[0].sensorId;
          ns2.name = "temperature"
          ns2.data = [];

          //let cat = [];
          

          //cat.categories = [];

          sensor.forEach((val) => {

            ns.data.push(val.humidity);
            ns2.data.push(val.temperature);
            labels.push(val.createdAt);
        
          });
          newDataDht.push(ns, ns2);
          //labels.push(labels);
        });

        //console.log(newData);
        this.dhtSensorChart = [...newDataDht];
        this.dhtSensorChartCategories = [...labels];

        this.dhtSensors = data;
        let alertDht = [...newDataDht]

        /* 
          ns aka. dhtSensorChart:
          [{
            "name": "xyz", 
            "humidity": [30, 34, 44, 65, 90],
            "temperature": [21, 22, 23, 24, 25],
            }
          ]
          cat aka dhtSensorChartCategories:
          { 
            "categories": [ "2022-2-2 9:37:10", "2022-2-2 9:36:59", "2022-2-2 9:36:50", "2022-2-2 9:36:40", "2022-2-2 9:36:29" ] 
            }
 */
  

console.log(alertDht);
  for (let i = 0; i < alertDht.length; i++) {
    let latestHumidityValue = [];
    let latestTemperatureValue = [];
    let idOfPlant = [];
    latestHumidityValue = alertDht[i].humidity[0]
    latestTemperatureValue = alertDht[i].temperature[0]
    idOfPlant = alertDht[i].name

    this.checkHumidity(latestHumidityValue, idOfPlant);
    this.checkTemperature(latestTemperatureValue, idOfPlant);

  }
      }) 

      .catch(function (error) {
        console.log("something went wrong:");
        console.log(error);
      });
  
  },


  }
}

</script>

<style>
* {
  font-family: Helvetica, Sans-Serif;
  color: #000000;
}

/* [class*="col"] {
  background-color: lightblue;
} */
</style>
