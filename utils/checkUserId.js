const checkUserId = (req) => {
  if (!req.user || !req.user._id) {
    throw new Error('User ID not found');
  }
};

module.exports = {
  checkUserId,
};
