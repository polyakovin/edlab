module.exports = {
  description: 'Register a new user.',

  inputs: {
     firstName: {
       type: 'string',
       required: true
     },
     familyName: {
       type: 'string',
       required: true
     },
     patroName: {
       type: 'string',
       required: true
     },
     email: {
       type: 'string',
       required: true
     },
     phone: {
       type: 'string'
     }
  },

  exits: {
     success: {
      outputExample: {email: 'e@mail.ru'}
     },
     emailExists: {
       description: 'User with this e-mail exists.',
       statusCode: 400
     }
  },

  fn: async function(user, exits) {
    const req = this.req;
    const userFound = await Teacher.findOne({email: user.email});
    if (userFound) throw 'emailExists';
    await Teacher.create(user).fetch();
    sendEmail();

    return exits.success({email: user.email});

    async function sendEmail() {
      user.hostName = req.headers.host;
      await EmailService.signUpTeacher(user);
    }
  }
};