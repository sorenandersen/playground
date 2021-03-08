<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Lets Collab!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="primary lighten-2">
      <div class="primary lighten-2 white--text xs12">
        DEMO! Collaborative editing powered by Yjs and the Quill editor. Props
        to
        <a href="https://github.com/dmonad" target="_blank">@dmonad</a> for Yjs,
        bindings and sample code.
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "Users",
          url: "/users"
        }
      ]
    };
  }
};
</script>
