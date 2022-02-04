<template>
  <div>
    <!-- Modal Edit-->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit Sensor: {{ editSensorWithThisId }}
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
                :placeholder="editSensorWithThisName"
                v-model="sensorName"
                width="20%"
              />
            </div>

            <!-- Edit SensorType -->
            <div class="mb-3">
              sensorname
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="sensorType"
              >
                <option selected value="Moisture">Moisture</option>
                <option value="Moisture and DHT">Moisture and DHT</option>
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
              @click.prevent="editSensor()"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "editSensors",
  props: {
    editSensorWithThisId: String,
    editSensorWithThisName: String,
    editSensorWithThisType: String,
  },

  data() {
    return {
      sensorType: "",
      sensorName: "",
    };
  },

  methods: {
    async editSensor() {
      let sentSensorData;
      console.log(this.sensorName + this.sensorType + " yoyoyooyyoyo");
      if (
        this.sensorName === null ||
        this.sensorName === "" ||
        this.sensorName === undefined
      ) {
        sentSensorData = {
          sensorId: this.editSensorWithThisId,
          sensorName: this.editSensorWithThisName,
          sensorType: this.sensorType,
        };
        return sentSensorData;
      } else if (this.sensorType === "") {
        sentSensorData = {
          sensorId: this.editSensorWithThisId,
          sensorName: this.sensorName,
          sensorType: this.editSensorWithThisType,
        };
        return sentSensorData;
      } else if (this.sensorType && this.sensorName === "") {
        sentSensorData = {
          sensorId: this.editSensorWithThisId,
          sensorName: this.editSensorWithThisName,
          sensorType: this.editSensorWithThisType,
        };
        return sentSensorData;
      } else {
        sentSensorData = {
          sensorId: this.editSensorWithThisId,
          sensorName: this.sensorName,
          sensorType: this.sensorType,
        };
      }

      const uri = "http://localhost:3000/api/editSensor/";
      axios.post(uri, sentSensorData).then((response) => {
        console.log(response + "sensor has been edited");
      });
      location.reload();
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
