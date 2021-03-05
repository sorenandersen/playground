<template>
  <v-container>
    <h1>DocumentList</h1>

    <div v-if="user">
      <p>User "{{ user.name }}", please choose a document to edit:</p>
      <ul>
        <li v-for="doc in documents" :key="doc.id">
          {{ doc.id }}
          <router-link
            :to="{ name: 'DocumentEdit', params: { docId: doc.id } }"
          >
            [edit]
          </router-link>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import UserDirectory from "../services/UserDirectory";
export default {
  props: ["userId"],
  data: () => ({
    user: null,
    documents: [
      {
        id: "this-is-just-a-demo-doc-1"
      },
      {
        id: "this-is-just-a-demo-doc-2"
      },
      {
        id: "this-is-just-a-demo-doc-3"
      }
    ]
  }),
  created() {
    this.user = UserDirectory.getUser(this.userId);
  }
};
</script>
