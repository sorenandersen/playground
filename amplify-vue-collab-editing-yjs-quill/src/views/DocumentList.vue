<template>
  <v-container>
    <h1>Documents</h1>

    <v-container v-if="user">
      <p :style="{ color: user.cursorColor }">Hi {{ user.name }}.</p>
      <p>Please choose a document to edit.</p>

      <p>
        These are just sample documents; a predefined list of docId's to ensure
        that demo users can easily get to collaborate on the same set of
        documents.
      </p>

      <v-card max-width="300">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Document</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.id">
                <td>{{ doc.id }}</td>
                <td class="text-right">
                  <v-btn
                    :to="{ name: 'DocumentEdit', params: { docId: doc.id } }"
                    >Edit</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
    <v-container v-else>
      Invalid userId in path.
    </v-container>
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
        id: "this-is-just-a-demo-doc-11"
      },
      {
        id: "this-is-just-a-demo-doc-12"
      },
      {
        id: "this-is-just-a-demo-doc-13"
      }
    ]
  }),
  created() {
    this.user = UserDirectory.getUser(this.userId);
  }
};
</script>
