<template>
<div>
    <h1 v-if="user">Hello, {{user.username}}</h1>
    <h1 v-if="!user">Hello oo</h1>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "User",
    
    data(){
        return {
            username: this.username
        }

    },

    created() {
        const uri = "http://localhost:3001/api/user";
        axios
        .get(uri)
        .then(response => {
            this.results = response.data
            this.username = response.data.username
          })
        },
        
    }
</script>

