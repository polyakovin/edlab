module.exports = {
  inputs: {
    ip: {
      type: 'string'
    }
  },

  fn: async function(inputs, exits) {
    await Visits.create({ip: inputs.ip});
    exits.success({});
  }
};