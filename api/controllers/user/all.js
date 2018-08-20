module.exports = {
  description: 'Get all users and tokens.',

  fn: async (inputs, exits) => {
    const users = await User.find();
    const tokens = await Tokens.find();
    exits.success({users: users, tokens: tokens});
  }
};