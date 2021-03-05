<template>
  <v-container>
    <v-container>
      <h1>Home</h1>
      <div>
        <p>
          Simulate login as one of the following users:
        </p>
        <AllUsersList />
      </div>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <h2>What is this?</h2>
      <p>
        A very rough demonstration on collaborative editing - multiple people
        co-editing documents - utilizing the follwing libraries:
      </p>
      <ul>
        <li>Yjs</li>
        <li>Yjs bindings for Quill</li>
        <li>Quill editor</li>
        <li>quill-cursors</li>
        <li>Vue.js</li>
      </ul>
    </v-container>

    <v-container>
      <h2>Data and persistence</h2>
      <p>
        Beware! Sync runs against an Yjs dev server as used in own demos. In
        other words: No guarantees or support.
      </p>
    </v-container>
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
