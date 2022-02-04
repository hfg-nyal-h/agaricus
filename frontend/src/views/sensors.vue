<template>
  <div class="container">
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
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  @click="home"
                  >Home</a
                >
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
      <div class="row text-justify">
        <div class="col-8 text-start">
          <h3>{{ username }}'s sensors</h3>
        </div>
        <div class="col-4 text-end"></div>
      </div>
    </div>
    <div class="row"></div>

    <editSensors
      :editSensorWithThisId="editSensorWithThisId"
      :editSensorWithThisName="editSensorWithThisName"
      :editSensorWithThisType="editSensorWithThisType"
    />
    <createSensors />

    <!-- Charts -->
    <div class="row justify-content-center">
      <div
        v-for="(mySensor, index) in mySensors"
        :key="mySensor"
        class="col-lg-5 grey aligns-items-center"
      >
        <br />
        {{ ++index }}. Sensor <br />
        Owner: {{ mySensor.user }} <br />
        Name: {{ mySensor.sensorName }} <br />
        Type: {{ mySensor.sensorType }} <br />
        ID: {{ mySensor._id }} <br />
        Averane Value: ///missing <br />
        Sent Values: ///missing <br />
        Created at: {{ mySensor.createdAt }} <br />
        Modified at: {{ mySensor.modifiedAt }} <br />
        <hr />
        <button
          class="btn btn-primary btn-sm"
          v-on:click="
            editSensor(mySensor._id, mySensor.sensorName, mySensor.sensorType)
          "
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Edit
        </button>
        <button
          class="btn btn-secondary btn-sm"
          v-on:click="deleteSensor(mySensor._id, mySensor.sensorType)"
        >
          Delete
        </button>
      </div>
    </div>

    <button
      class="btn btn-primary btn-sm"
      v-on:click="createSensor()"
      data-bs-toggle="modal"
      data-bs-target="#createModal"
    >
      Create Sensor!
    </button>
  </div>
</template>

<script>
import axios from "axios";
import editSensors from "./editSensors.vue";
import createSensors from "./createSensors.vue";

export default {
  name: "sensors",
  components: {
    editSensors,
    createSensors,
  },

  data() {
    return {
      username: "",
      sensorId: "",
      humiditySensors: "",
      createdAt: "",
      mySensors: [],
      editSensorWithThisId: "",
      editSensorWithThisName: "",
      editSensorWithThisType: "",

      isShow: false,
    };
  },

  async created() {
    let usernameStore = this.$store.getters.getUser;

    if (!usernameStore) {
      this.$router.push("/login");
    }
    this.username = this.$store.getters.getUser.username;

    const uri = "http://localhost:3000/api/sensorInformation/";
    console.log("starting SensorData process");
    axios
      .post(uri, usernameStore)
      .then((response) => {
        this.mySensors = response.data;
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

    editSensor(id, name, type) {
      this.editSensorWithThisId = id;
      this.editSensorWithThisName = name;
      this.editSensorWithThisType = type;
    },

    async deleteSensor(id, type) {
      let sensorData = {
        sensorId: id,
        sensorType: type,
      };
      const uri = "http://localhost:3000/api/deleteSensor/";
      axios.post(uri, sensorData).then((response) => {
        console.log(response + "sensor has been deleted");
      });
      location.reload();
    },
    sensorManager() {
      this.$router.push("/api/sensors");
    },
    home() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
* {
  font-family: Helvetica, Sans-Serif;
  color: #000000;
}
.hidden {
  display: none;
}
</style>
