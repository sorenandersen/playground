<template>
  <div v-if="users.length">
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <span v-if="renderLinks">
          <router-link
            :to="{ name: 'DocumentList', params: { userId: user.id } }"
          >
            [Login]
          </router-link>
        </span>
      </li>
    </ul>
  </div>
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
