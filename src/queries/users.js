const userQueries = {
  findByEmail: (email) => {
    return {
      name: "fetch-users",
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
  },
};

module.exports = userQueries;
