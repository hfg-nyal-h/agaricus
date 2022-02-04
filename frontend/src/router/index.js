import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import users from "../views/Users.vue";
import RegisterForm from "../views/RegisterForm.vue";
import LoginForm from "../views/LoginForm.vue";
import NotFound from "../views/NotFound.vue";
import sensors from "../views/sensors.vue";
import createSensors from "../views/createSensors.vue";
import editSensors from "../views/editSensors.vue";
import apexLineChart from "../views/apexLineChart.vue";
import apexDhtChart from "../views/apexDhtChart.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
    children: [
      {
        path: "/users",
        name: "users",
        component: users,
        props: true,
        children: [
          {
            path: "chartLine",
            name: "apexLineChart",
            component: apexLineChart,
            props: true,
          },
          {
            path: "chartDht",
            name: "apexDhtChart",
            component: apexDhtChart,
            props: true,
          },
        ],
      },
    ],
  },

  {
    path: "/api/login",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: "/api/register",
    name: "RegisterForm",
    component: RegisterForm,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
  {
    path: "/api/sensors",
    name: "sensors",
    component: sensors,
    props: true,
    children: [
      {
        path: "create",
        name: "createSensors",
        component: createSensors,
        props: true,
      },
      {
        path: "edit",
        name: "editSensors",
        component: editSensors,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: "http://localhost:8080",
  routes,
});

export default router;
