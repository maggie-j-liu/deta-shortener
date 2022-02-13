const getUserId = (message) => {
  const user = message.member?.user ?? message.user;
  return user.id;
};

module.exports = getUserId;
