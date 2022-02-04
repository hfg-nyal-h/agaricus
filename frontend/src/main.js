import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Vuex from 'vuex';
import store from "./store";
import axios from "axios";
import VueApexCharts from 'vue3-apexcharts'

// set auth header
axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

const app = createApp(App);
app
.use(store)
.use(router)
.use(Vuex)
.use(VueApexCharts)
.mount("#app");