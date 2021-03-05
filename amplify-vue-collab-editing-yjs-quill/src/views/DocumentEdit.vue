<template>
  <v-container>
    <h1>DocumentEdit</h1>

    <div v-if="user">
      <p>
        User "{{ user.name }}" ({{ user.cursorColor }} cursor) is now editing
        doc "{{ this.docId }}"
      </p>
      <div>
        <QuillCollabEditor :docId="this.docId" :user="user" />
      </div>
    </div>
    <div v-else>
      Invalid userId in path. For this demo the following users exist:
      <AllUsersList :renderLinks="false" />
    </div>
  </v-container>
</template>

<script>
import UserDirectory from "../services/UserDirectory";
import AllUsersList from "../components/AllUsersList";
import QuillCollabEditor from "../components/QuillCollabEditor";
export default {
  props: ["userId", "docId"],
  components: {
    AllUsersList,
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
