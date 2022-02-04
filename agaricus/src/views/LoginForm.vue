<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <h1>Login</h1>
        <form @submit.prevent="login" novalidate autocomplete="off">
          <div class="form-floating mb-3">
            <input
              type="Username"
              class="form-control"
              id="floatingInput"
              placeholder="username"
              v-model="username"
              width="20%"
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="Password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="password"
            />
            <label for="floatingPassword">Password</label>
            <br>
            <router-link class="float-left" :to="{ name: 'RegisterForm' }"
                >Create an Account! </router-link
              >
            <input type="submit" value="Log Me In!" class="btn btn-primary btn-sm float-right">
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AuthService from "@/services/AuthService.js";

export default {
  name: "LoginForm",
  props: {},
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
      let userData = {
        username: this.username,
        password: this.password,
      };
      const uri = "http://localhost:3001/api/login/";
      console.log("starting login process");
      axios
        .post(uri, userData)
        .then(function (response) {
          console.log("backend answered:");
          console.log(response);
          console.log(response.data.token);
          localStorage.setItem(uri, response.data.token);
        })
        .catch(function (error) {
          console.log("something went wrong:");
          console.log(error);
        });
      const response = await AuthService.login(userData);
      this.msg = response.msg;
      const token = response.token;
      const userId = response.userId;
      this.$store.dispatch("login", { token, userId });
      //this.$store.commit(uri, { token, userId });
      this.$router.push("/");
    },
  },
  computed: {
    validation() {
      return this.username.length > 4 && this.username.length < 13;
    },
  },
};
</script>

<style scoped></style>
