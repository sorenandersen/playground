<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app>
      <router-link :to="{ name: 'Home' }">
        Home
      </router-link>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
      DEMO! Collaborative editing powered by Yjs and the Quill editor. Props to
      <a href="https://github.com/dmonad" target="_blank">@dmonad</a> for Yjs,
      bindings and sample code.
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
