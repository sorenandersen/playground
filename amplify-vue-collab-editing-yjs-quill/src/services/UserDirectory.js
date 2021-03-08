export default {
  getUser(userId) {
    const user = this.users.find(user => user.id === userId);
    if (!user) return null;
    return user;
  },
  users: [
    {
      id: "alice",
      name: "Alice",
      cursorColor: "red"
    },
    {
      id: "bob",
      name: "Bob",
      cursorColor: "blue"
    },
    {
      id: "ada",
      name: "Ada",
      cursorColor: "green"
    },
    {
      id: "charles",
      name: "Charles",
      cursorColor: "cyan"
    }
  ]
};
