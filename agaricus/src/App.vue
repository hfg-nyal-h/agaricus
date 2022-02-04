<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/api/login">login</router-link>|
    <router-link to="/api/register">register</router-link>|
    <router-link to="/api/user">user</router-link>|
    <router-link to="/validateToken">valdiateToken</router-link>|

    <router-view/>
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
