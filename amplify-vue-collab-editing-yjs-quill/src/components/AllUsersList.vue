<template>
  <v-card max-width="300">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td :style="{ color: user.cursorColor }">{{ user.name }}</td>
            <td class="text-right">
              <v-btn :to="{ name: 'DocumentList', params: { userId: user.id } }"
                >Simulate login</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import UserDirectory from "../services/UserDirectory";
export default {
  props: {
    renderLinks: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    users: UserDirectory.users
  })
};
</script>
