module.exports = {
  authorize: (session, userId) => {
    session.userId = userId;
    session.isAuth = true;
    delete session.changesPassword;
    AuthService.updateLastLogin(userId);
  },

  updateLastLogin: async (userId)  => {
    await User.update({id: userId}, {lastloginedAt: new Date()});
  }
};