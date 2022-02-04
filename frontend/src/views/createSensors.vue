<template>
<!-- Modal -->
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create a new sensor
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Edit Sensorname -->

          <div class="mb-3">
            <label for="sensorName" class="form-label">sensorname</label>
            <input
              type="text"
              class="form-control"
              id="sensorName"
              v-model="sensorName"
              width="20%"
            />
            <!--  <label for="sensorType">new Sensorname</label> -->
          </div>

      

          <!-- Edit SensorType -->
          <!-- <div class="mb-3">
            <label class="form-label" for="sensorType">sensortype</label>
            <input
              type="text"
              class="form-control"
              id="sensorType"
              v-model="sensorType"
              width="20%"
            />
          </div> -->
          <div class="mb-3">
            sensortype
            <select class="form-select" aria-label="Default select example" v-model="sensorType">
  <option value="Moisture" selected >Moisture</option>
  <option value="Moisture and DHT" >Moisture and DHT</option>
</select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click.prevent="cancel()"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click.prevent="createSensor()"
            type="button"
            class="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
     <router-view />
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "sensors",
  components: {},

  data() {
    return {
      //user: '',
      sensorType: "",
      sensorName: "",
      noOwner: [],
    };
  },



  methods: {
    async createSensor() {
      let sensorData = {
        //user: this.user,
        sensorName: this.sensorName,
        sensorType: this.sensorType,
        user: this.$store.getters.getUser.username,
      };

      const uri = "http://localhost:3000/api/sensorData/create/";
      console.log("creating Sensor");
      await axios
        .post(uri, sensorData)
        .then(function (response) {
          console.log("backend answered:");
          console.log(response);
        })
        .catch(function (error) {
          console.log("something went wrong:");
          console.log(error);
        });
      location.reload();

    },

    async searchSensor() {

      const uri = "http://localhost:3000/api/sensorData/searchSensor/";
      console.log("searching Sensor");
      await axios
        .get(uri)
        .then(function (response) {
          this.noOwner = response.data;  
          console.log("backend answered:");
          console.log(response.data);
 
        })
        /* .catch(function (error) {
          console.log("something went wrong:");
          console.log(error);
        }); */
    }, 
    cancel() {
      this.$router.push("/api/sensors/");
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
