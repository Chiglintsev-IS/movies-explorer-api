const serializeUser = (user) => ({
  email: user.email,
  name: user.name,
});

module.exports = {
  serializeUser,
};
