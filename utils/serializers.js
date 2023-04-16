const serializeUser = (user) => {
  const { password, ...serializedUser } = user.toObject();
  return serializedUser;
};

module.exports = {
  serializeUser,
};
