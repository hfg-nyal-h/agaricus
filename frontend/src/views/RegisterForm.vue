<template>
  <div class="register-form form">
    <h3>Register</h3>
    <form @submit.prevent="register" novalidate autocomplete="off">
      <label for="username">Username: </label>
      
      <input type="text" id="username" name="username" v-model="username" />
      <br />
      <label for="password">Passwort: </label>
      <input type="text" id="password" name="password" v-model="password" />
      <!-- <input type="text" placeholder="Password (repeat)" v-model="password_repeat" -->
      />
      <br />
      <input type="submit" value="Register!" />
      <div>
        Allready have an Account?
        <router-link :to="{ name: 'LoginForm' }">Go back to Login</router-link>
      </div>
    </form>
  </div>
  <router-view />
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
