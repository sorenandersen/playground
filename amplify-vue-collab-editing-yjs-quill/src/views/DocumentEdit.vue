<template>
  <v-container>
    <h1>Edit document</h1>

    <v-container v-if="user">
      <p :style="{ color: user.cursorColor }">Hi {{ user.name }}.</p>

      <p>
        When editing this document you'll appear in other users editor with a
        <span :class="[user.cursorColor]">{{ user.cursorColor }} cursor</span>.
      </p>

      <p>
        You're now editing docId: <strong>{{ this.docId }}</strong>
      </p>
      <p>
        Try to open another browser (or this one in incognito mode) and edit the
        same document while simulating another user. Simultaneous users should
        appear each with their colored cursor.
      </p>
      <div>
        <QuillCollabEditor :docId="this.docId" :user="user" />
      </div>
    </v-container>
    <v-container v-else>
      Invalid userId in path.
    </v-container>
  </v-container>
</template>

<script>
import UserDirectory from "../services/UserDirectory";
import QuillCollabEditor from "../components/QuillCollabEditor";
export default {
  props: ["userId", "docId"],
  components: {
    QuillCollabEditor
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = UserDirectory.getUser(this.userId);
  }
};
</script>
