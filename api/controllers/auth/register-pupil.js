module.exports = {
  description: 'Register a new user.',

  inputs: {
     firstName: {
       type: 'string',
       required: true
     },
    //  familyName: {
    //    type: 'string',
    //    required: true
    //  },
    //  patroName: {
    //    type: 'string',
    //    required: true
    //  },
    //  email: {
    //    type: 'string',
    //    required: true
    //  },
     phone: {
       type: 'string'
     },
    //  school: {
    //    type: 'string',
    //    required: true
    //  },
    //  form: {
    //    type: 'string',
    //    required: true
    //  }
  },

  exits: {
     success: {
      outputExample: {phone: '89268888888'}
     },
     emailExists: {
       description: 'User with this e-mail exists.',
       statusCode: 400
     }
  },

  fn: async function(user, exits) {
    const req = this.req;
    const userFound = await Pupil.findOne({phone: user.phone});
    if (userFound) throw 'emailExists';
    await Pupil.create(user).fetch();
    // sendEmail();

    return exits.success({email: user.email});

    async function sendEmail() {
      user.hostName = req.headers.host;
      await EmailService.signUpPupil(user);
      // await EmailService.signUpPupilNotification(user);
    }
  }
};