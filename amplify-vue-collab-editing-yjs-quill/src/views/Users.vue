<template>
  <v-container>
    <h1>Users</h1>

    <v-row>
      <v-col>
        <p>
          Simulate login as one of the following users:
        </p>
        <AllUsersList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AllUsersList from "../components/AllUsersList";
export default {
  name: "Home",
  components: {
    AllUsersList
  },
  data() {
    return {};
  }
};
</script>
