<template>
<div class="container">
  <div v-if="!isShow">
<h1>welcome to agaricus</h1>
<div class="row">
  <div class="col">
    <button type="button" class="btn btn-secondary" @click=register>Register</button>
       <button type="button" class="btn btn-primary" @click=login >Login</button>
  </div>
</div>
</div>

<div v-if="isShow">
<users/>
</div>
</div>
</template>

<script>
import users from "./Users.vue";
export default {
  name: "Home",
  components: {
    users,
  },
  data() {
    return {
      isShow: false,
    };
  },
  async created() {
    if(this.$store.getters.isLoggedIn){
      this.isShow = true;
    }
  },

  methods: {
   login() {
      this.$router.push("/api/login");
    },
     register() {
      this.$router.push("/api/register");
    },
    },
  }
</script>

<style>
</style>
