<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <h1>Register</h1>
        <form @submit.prevent="register" novalidate autocomplete="off">
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
            <br />
            <div>
              Allready have an Account?
              <router-link :to="{ name: 'LoginForm' }"
                >Go back to Login</router-link
              >
            </div>
            <input
              type="submit"
              value="Register!"
              class="btn btn-primary btn-sm float-right"
            />
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
  name: "RegisterForm",
  props: {},
  data() {
    return {
      username: "",
      password: "",
      //  password_repeat: ""
    };
  },
  methods: {
    async register() {
      let userData = {
        username: this.username,
        password: this.password,
        //password_repeat: this.password_repeat
      };
      const uri = "http://localhost:3001/api/register/";
      console.log("starting register process");
      await axios
        .post(uri, userData)
        .then(function (response) {
          console.log("backend answered:");
          console.log(response);
        })
        .catch(function (error) {
          console.log("something went wrong:");
          console.log(error);
        });
      const response = await AuthService.signUp(userData);
      this.msg = response.msg;
    },
  },
};
</script>

<style scoped></style>
