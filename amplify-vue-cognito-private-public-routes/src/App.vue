<template>
  <div id="app">
    <div id="userProfile">
      <UserProfile :user="user" />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/public">Public route</router-link> |
      <router-link to="/private">Private route</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import UserProfile from "@/components/UserProfile.vue";

export default {
  components: {
    UserProfile
  },
  data() {
    return {
      user: {},
      unsubscribeAuth: undefined
    };
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((state, user) => {
      if (state === AuthState.SignedIn) {
        this.user = user;
      } else {
        this.user = {};
      }
    });
  },
  beforeDestroy() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }
};
</script>

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
