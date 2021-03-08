<template>
  <v-container>
    <h1>Lets Collab!</h1>

    <v-row>
      <v-col>
        <h2>What is this?</h2>
        <p>
          A very rough demonstration on collaborative editing - multiple people
          co-editing documents - utilizing the following libraries:
        </p>
        <ul>
          <li>Vue.js</li>
          <li>Yjs</li>
          <li>Yjs bindings for Quill</li>
          <li>Quill editor</li>
          <li>quill-cursors</li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2>Data and persistence</h2>
        <p>
          Beware! Sync runs against an Yjs dev server as used in own demos. In
          other words: No support or guarantees.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2>Getting started</h2>
        <p>
          Navigate to
          <router-link :to="{ name: 'Users' }">users page</router-link> and
          simulate login as one of the available fictive users.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>
