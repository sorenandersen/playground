<template>
  <div class="user-profile">
    <span v-if="user.username">
      User: {{ user.attributes && user.attributes.email }}
    </span>
    <span v-else>
      Not signed in.
    </span>

    <span v-if="user.username">
      <amplify-sign-out></amplify-sign-out>
    </span>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    user: Object
  }
};
</script>
